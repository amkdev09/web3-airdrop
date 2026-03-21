import { useCallback, useEffect, useMemo } from "react";
import { useAccount, useDisconnect, usePublicClient, useWalletClient } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { isAddress } from "viem";

/** If user opens connect (e.g. WalletConnect) but never approves, wagmi can stay `connecting` forever. Abort after this. */
const CONNECTION_PENDING_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export default function useWallet() {
  const { address, chain, isConnected, status, isConnecting } = useAccount();
  const chainId = chain?.id ?? null;

  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  // Clear stuck "connecting" when user abandons the wallet approval (modal / deep link left open).
  // Do NOT run this for `reconnecting` (auto-restore on load) — only user-initiated `connecting`.
  useEffect(() => {
    if (status !== "connecting") return;

    const id = setTimeout(() => {
      disconnect().catch(() => {
        /* noop */
      });
    }, CONNECTION_PENDING_TIMEOUT_MS);

    return () => clearTimeout(id);
  }, [status, disconnect]);

  // Reads
  const publicClient = usePublicClient({ chainId: chainId ?? undefined });

  // Writes (signing + send)
  const { data: walletClient } = useWalletClient({
    chainId: chainId ?? undefined,
    account: address ?? undefined,
    query: {
      enabled: Boolean(isConnected && address && chainId),
    },
  });

  const currentAddress = useMemo(() => {
    if (!address) return null;
    return isAddress(address) ? address : null;
  }, [address]);

  const connectWallet = useCallback(() => {
    open();
  }, [open]);

  const disconnectWallet = useCallback(async () => {
    // Wagmi handles connector-specific disconnect behavior.
    await disconnect();
  }, [disconnect]);

  const ensureChain = useCallback(
    async (targetChainId) => {
      if (!walletClient || !targetChainId) return;
      const current = walletClient.chain?.id;
      if (current === targetChainId) return;
      try {
        // Prompts user to switch chain (or switches automatically if supported).
        await walletClient.switchChain({ id: targetChainId });
      } catch (err) {
        const code = err?.code ?? err?.error?.code;
        if (code === 4001) {
          const e = new Error("User rejected chain switch");
          e.code = "USER_REJECTED";
          throw e;
        }
        throw err;
      }
    },
    [walletClient]
  );

  return {
    connectWallet,
    disconnectWallet,
    currentAddress,
    isConnected: Boolean(isConnected),
    isConnecting,
    status,
    chainId,
    // WalletClient can sign + send txs.
    signer: walletClient,
    provider: publicClient,
    walletClient,
    publicClient,
    ensureChain,
  };
}

