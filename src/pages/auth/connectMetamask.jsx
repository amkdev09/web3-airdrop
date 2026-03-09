import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";
import metaMaskIcon from "../../assets/svg/metamask.svg";
import userService from "../../services/userServices";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const META_MASK_DOWNLOAD_URL = "https://metamask.io/download/";
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export default function ConnectMetamask() {
    const navigate = useNavigate();
    const location = useLocation();

    const { address, isConnected, connectMetaMask } = useAuth();
    const { showSnackbar } = useSnackbar();

    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [needsRegistration, setNeedsRegistration] = useState(null);
    const [sponsorAddress, setSponsorAddress] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerError, setRegisterError] = useState(null);

    const from = location.state?.from?.pathname || "/";
    const referralId = location.state?.referralId || null;

    const checkSummaryAndNavigate = useCallback(async () => {
        try {
            const userSummary = await userService.getVaultSummary();
            if (userSummary?.registered) {
                navigate(from, { replace: true });
                showSnackbar("Wallet connected", "success");
            } else {
                setNeedsRegistration(true);
            }
        } catch {
            setNeedsRegistration(true);
        }
    }, [navigate, from, showSnackbar]);

    const handleConnect = useCallback(async () => {
        setError(null);
        setIsConnecting(true);
        try {
            await connectMetaMask();
            showSnackbar("Wallet connected successfully", "success");
            await checkSummaryAndNavigate();
        } catch (err) {
            const message =
                err.message === "Connection rejected by user"
                    ? "Connection was rejected"
                    : err.message?.includes("not installed")
                        ? "MetaMask is not installed"
                        : err.message || "Failed to connect wallet";
            setError(message);
            showSnackbar(message, "error");
        } finally {
            setIsConnecting(false);
        }
    }, [connectMetaMask, showSnackbar, checkSummaryAndNavigate]);

    useEffect(() => {
        if (referralId) setSponsorAddress(referralId);
    }, [referralId]);

    useEffect(() => {
        if (isConnected && needsRegistration === null) {
            checkSummaryAndNavigate();
        }
    }, [isConnected, needsRegistration, checkSummaryAndNavigate]);

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
        setRegisterError(null);
        setIsRegistering(true);
        try {
            await userService.registerReferral({ referralId: trimmed });
            showSnackbar("Registration successful", "success");
            navigate(from, { replace: true });
        } catch (err) {
            const message = err?.message || err?.error || "Registration failed";
            setRegisterError(message);
            showSnackbar(message, "error");
        } finally {
            setIsRegistering(false);
        }
    }, [sponsorAddress, navigate, from, showSnackbar]);

    const handleRetry = useCallback(() => {
        setError(null);
        handleConnect();
    }, [handleConnect]);

    return (
        <main className="max-w-120 w-full mx-auto">
            <div className="w-full max-w-md mx-auto space-y-6 py-6 px-5">
                <div className="flex justify-start">
                    <button className="cursor-pointer" onClick={() => navigate(-1)}>
                        <MdOutlineArrowBackIosNew className="text-2xl text-[#009C8A]" />
                    </button>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">
                        Connect Wallet
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Connect with MetaMask to access your account
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        type="button"
                        onClick={handleConnect}
                        disabled={isConnecting || isConnected}
                        className="w-full py-3 px-4 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
                    >
                        <figure className="w-6 h-6 shrink-0">
                            <img src={metaMaskIcon} alt="MetaMask" />
                        </figure>
                        <span>
                            {isConnecting ? "Connecting…" : isConnected ? "Connected" : "Connect with MetaMask"}
                        </span>
                    </button>

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
                </div>
                {needsRegistration && (
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
                <div className="rounded-lg border border-[var(--color-gray-600)] bg-gray-800/30 p-4 text-sm text-gray-400">
                    <p className="font-medium text-gray-300 mb-1">New to MetaMask?</p>
                    <p className="mb-3">
                        MetaMask is a crypto wallet for your browser and phone. Install it to connect in one click on desktop or mobile.
                    </p>
                    <a
                        href={META_MASK_DOWNLOAD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
                    >
                        <figure className="w-8 h-8 shrink-0">
                            <img src={metaMaskIcon} alt="MetaMask" />
                        </figure>
                        Download MetaMask
                    </a>
                </div>
            </div>
        </main>
    );
}
