import { getWalletClient } from "wagmi/actions";
import { wagmiConfig } from "../wallet/wagmiConfig";
import {
  ERROR_CHAIN_SWITCH,
  ERROR_USER_REJECTED,
  normalizeTransaction,
  sendTransaction,
} from "../wallet/txHelpers";

export { ERROR_CHAIN_SWITCH, ERROR_USER_REJECTED, normalizeTransaction };

/**
 * Broadcast an unsigned transaction via the connected wallet (MetaMask, WalletConnect, Coinbase, Injected, ...).
 * Ensures correct chain (switch prompts if needed), then sends the tx.
 */
export async function broadcastTransaction(transaction, fromAddress) {
  if (!fromAddress || typeof fromAddress !== "string") {
    throw new Error("Sender address is required");
  }

  const from = String(fromAddress).trim();
  if (!from.startsWith("0x")) {
    throw new Error("Invalid sender address");
  }

  const walletClient = await getWalletClient(wagmiConfig);
  // `sendTransaction` normalizes input internally (supports normalized tx too).
  return sendTransaction({
    walletClient,
    transaction,
    fromAddress: from,
  });
}

/**
 * Fetch unsigned transaction from API and broadcast it via the connected wallet.
 * Convenience helper: normalizes API response, ensures chain, sends tx.
 */
export async function fetchAndBroadcast(fetchUnsignedTx, fromAddress) {
  const apiResponse = await fetchUnsignedTx();
  const transaction = normalizeTransaction(apiResponse);
  return broadcastTransaction(transaction, fromAddress);
}
