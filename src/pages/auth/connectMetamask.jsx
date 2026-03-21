import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import useWallet from "../../wallet/useWallet";
import userService from "../../services/userServices";
import { fetchAndBroadcast, ERROR_USER_REJECTED } from "../../lib/broadcastTransaction";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Cookies from "js-cookie";
import WalletSupportCarousel from "../../components/WalletSupportCarousel";

const META_MASK_DOWNLOAD_URL = "https://metamask.io/download/";
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export default function ConnectMetamask() {
    const navigate = useNavigate();
    const location = useLocation();
    const { showSnackbar } = useSnackbar();
    const {
        currentAddress: address,
        isConnected,
        chainId,
        isConnecting,
        connectWallet,
        disconnectWallet,
    } = useWallet();

    const [searchParams] = useSearchParams();
    const from = location.state?.from?.pathname || "/";
    const reason = location.state?.reason || searchParams.get("reason") || null;
    const referralId = location.state?.referralId || null;

    const [error, setError] = useState(null);
    const [needsRegistration, setNeedsRegistration] = useState(false);
    const [sponsorAddress, setSponsorAddress] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState(null);

    const hasHandledConnectionRef = useRef(false);

    const handleConnect = useCallback(() => {
        setError(null);
        connectWallet();
    }, [connectWallet]);

    useEffect(() => {
        if (referralId) setSponsorAddress(referralId);
    }, [referralId]);

    useEffect(() => {
        // Reset the guard if user disconnects and re-connects.
        if (!isConnected) hasHandledConnectionRef.current = false;
    }, [isConnected]);

    useEffect(() => {
        const runAfterConnect = async () => {
            try {
                showSnackbar("Wallet connected successfully", "success");

                const userSummary = await userService.getVaultSummary();
                if (userSummary?.registered) {
                    Cookies.set("isRegistered", "true");
                    navigate(from, { replace: true });
                    showSnackbar("Wallet connected", "success");
                } else {
                    setNeedsRegistration(true);
                }
            } catch {
                // If we can't get the summary, fall back to showing registration form.
                setNeedsRegistration(true);
            }
        };

        if (!isConnected || !address) return;
        if (hasHandledConnectionRef.current) return;
        hasHandledConnectionRef.current = true;

        // Handles both the "manual connect" flow and auto-restore on refresh.
        runAfterConnect();
    }, [isConnected, address, from, navigate, reason, showSnackbar]);

    const handleRegister = useCallback(async () => {
        const trimmed = sponsorAddress?.trim();
        if (!trimmed) {
            showSnackbar("Please enter sponsor address", "error");
            return;
        }
        if (!ETH_ADDRESS_REGEX.test(trimmed)) {
            showSnackbar("Invalid wallet address format", "error");
            return;
        }
        if (!address || !isConnected) {
            showSnackbar("Connect your wallet first", "error");
            return;
        }
        setRegisterError(null);
        setIsRegistering(true);
        try {
            const txHash = await fetchAndBroadcast(
                () => userService.registerReferral({ referrer: trimmed }),
                address
            );
            showSnackbar(
                txHash
                    ? `Registration submitted. Tx: ${txHash.slice(0, 10)}...`
                    : "Registration successful",
                "success"
            );
            Cookies.set("isRegistered", "true");
            navigate(from, { replace: true });
        } catch (err) {
            const message =
                err?.code === ERROR_USER_REJECTED
                    ? "Transaction was rejected"
                    : err?.message || err?.error || "Registration failed";
            setRegisterError(message);
            showSnackbar(message, "error");
            Cookies.remove("isRegistered");
        } finally {
            setIsRegistering(false);
        }
    }, [sponsorAddress, address, isConnected, navigate, from, showSnackbar]);

    const handleRetry = useCallback(() => {
        setError(null);
        handleConnect();
    }, [handleConnect]);

    const shortenAddress = (addr) => {
        if (!addr) return "";
        if (addr.length < 12) return addr;
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const chainLabel =
        chainId === 56
            ? "BSC"
            : chainId === 137
                ? "Polygon"
                : chainId === 1
                    ? "Ethereum"
                    : chainId
                        ? `Chain ${chainId}`
                        : "Unknown";

    const handleDisconnectClick = useCallback(async () => {
        try {
            hasHandledConnectionRef.current = false;
            setNeedsRegistration(false);
            setRegisterError(null);
            setError(null);
            await disconnectWallet();
            showSnackbar("Disconnected successfully.", "success");
        } catch {
            showSnackbar("Disconnect failed. Please try again.", "error");
        }
    }, [disconnectWallet, showSnackbar]);

    return (
        <main className="max-w-120 w-full mx-auto">
            <div className="w-full max-w-md mx-auto space-y-6 py-6 px-5">
                <div className="flex justify-start">
                    <button className="cursor-pointer" onClick={() => navigate(referralId ? `/` : -1)}>
                        <MdOutlineArrowBackIosNew className="text-2xl text-[#009C8A]" />
                    </button>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">
                        Connect Wallet
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Connect with a wallet (MetaMask, WalletConnect, Coinbase, Injected, etc.)
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={handleConnect}
                        disabled={isConnecting || isConnected}
                        className="w-full py-3 px-4 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                    >
                        <span>
                            {isConnecting
                                ? "Connecting…"
                                : isConnected
                                    ? `Connected (${shortenAddress(address)})`
                                    : "Connect Wallet"}
                        </span>
                    </button>

                    {isConnected && address && (
                        <div className="rounded-lg border border-[var(--color-gray-600)] bg-gray-800/30 p-4 text-sm text-gray-400">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-gray-300 font-medium">Wallet</p>
                                    <p className="mt-1 text-xs break-all text-gray-400">{shortenAddress(address)}</p>
                                    <p className="mt-1 text-xs text-gray-500">Network: {chainLabel}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDisconnectClick}
                                    className="shrink-0 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-colors"
                                >
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div
                            className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                            role="alert"
                        >
                            <p className="font-medium">Connection failed</p>
                            <p className="mt-1 opacity-90">{error}</p>
                            <button
                                type="button"
                                onClick={handleRetry}
                                className="mt-3 text-sm font-medium text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    )}
                    {reason === "required-registration" && (
                        <div
                            className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300"
                            role="alert"
                        >
                            <p className="font-medium">Registration required</p>
                            <p className="mt-1 opacity-90">Please register your wallet to access the vault</p>
                        </div>
                    )}
                </div>
                {(needsRegistration && address) && (
                    <div className="rounded-lg border border-[var(--color-gray-600)] bg-gray-800/30 p-4 text-sm text-gray-400 space-y-3">
                        <p className="font-medium text-gray-300">Register your wallet</p>
                        <p className="text-gray-400">
                            Enter your sponsor address to complete registration. If you joined via referral link, it is pre-filled.
                        </p>
                        <div>
                            <label htmlFor="sponsor-address" className="block text-gray-400 text-xs mb-1">
                                Sponsor address
                            </label>
                            <input
                                id="sponsor-address"
                                type="text"
                                value={sponsorAddress}
                                onChange={(e) => setSponsorAddress(e.target.value)}
                                placeholder="0x..."
                                className="w-full px-3 py-2.5 rounded-lg bg-gray-900/80 border border-[var(--color-gray-600)] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-selsila-green)] focus:border-transparent"
                            />
                        </div>
                        {registerError && (
                            <p className="text-red-400 text-xs">{registerError}</p>
                        )}
                        <button
                            type="button"
                            onClick={handleRegister}
                            disabled={isRegistering}
                            className="w-full py-3 px-4 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRegistering ? "Registering…" : "Register"}
                        </button>
                    </div>
                )}

                <div className="mt-2">
                    <p className="text-gray-400 text-sm font-medium mb-3">Supported wallets</p>
                    <WalletSupportCarousel />
                </div>

                <div className="rounded-lg border border-[var(--color-gray-600)] bg-gray-800/30 p-4 text-sm text-gray-400">
                    <p className="font-medium text-gray-300 mb-1">New to wallets?</p>
                    <p className="mb-3">
                        Choose your preferred wallet via Web3Modal. If you&apos;re on desktop and don&apos;t have one installed, MetaMask is a popular option.
                    </p>
                </div>
            </div>
        </main>
    );
}
