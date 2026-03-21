import { isAddress } from "viem";

/** User rejected the request (popup cancelled, chain switch rejected, etc.). */
export const ERROR_USER_REJECTED = "USER_REJECTED";

/** Chain switch was rejected or failed. */
export const ERROR_CHAIN_SWITCH = "CHAIN_SWITCH";

/**
 * Normalize API response to a single transaction object.
 * Handles both { transaction: { ... } } and raw { to, data, value, ... }.
 */
export function normalizeTransaction(apiResponse) {
  if (!apiResponse || typeof apiResponse !== "object") {
    throw new Error("Invalid API response: no transaction data");
  }

  const tx = apiResponse.transaction ?? apiResponse;
  if (!tx || typeof tx !== "object") {
    throw new Error("Invalid API response: missing transaction object");
  }

  if (!tx.to || typeof tx.data !== "string") {
    throw new Error("Invalid transaction: missing 'to' or 'data'");
  }

  const rawValue = tx.value != null ? String(tx.value) : "0";
  const value = rawValue.startsWith("0x")
    ? rawValue
    : `0x${BigInt(rawValue).toString(16)}`;

  return {
    to: String(tx.to).trim(),
    data: String(tx.data).trim(),
    value, // 0x...
    gasLimit: tx.gasLimit != null ? String(tx.gasLimit) : undefined,
    chainId: tx.chainId != null ? Number(tx.chainId) : undefined,
  };
}

function toBigInt(value) {
  // BigInt("0x...") and BigInt("123") are both supported.
  return BigInt(value);
}

export async function ensureChain(walletClient, chainId) {
  if (!chainId || !walletClient) return;
  const currentChainId = walletClient.chain?.id;
  if (currentChainId === chainId) return;

  try {
    await walletClient.switchChain({ id: chainId });
  } catch (err) {
    const code = err?.code ?? err?.error?.code;
    if (code === 4001) {
      const e = new Error("User rejected chain switch");
      e.code = ERROR_USER_REJECTED;
      throw e;
    }

    const message =
      err?.message ?? err?.error?.message ?? "Chain switch failed";
    const e = new Error(message);
    e.code = ERROR_CHAIN_SWITCH;
    throw e;
  }
}

/**
 * Sends a transaction signed by the connected wallet.
 * - Auto-switches chain to the API-provided `transaction.chainId`.
 * - Returns the tx hash immediately (caller can wait for receipt if desired).
 */
export async function sendTransaction({
  walletClient,
  transaction,
  fromAddress,
}) {
  if (!walletClient) throw new Error("Wallet client not available");

  const tx = normalizeTransaction(transaction);

  if (!isAddress(tx.to)) {
    throw new Error("Invalid transaction recipient address");
  }

  const from = fromAddress ? String(fromAddress).trim() : null;
  if (from && !isAddress(from)) {
    throw new Error("Invalid sender address");
  }

  await ensureChain(walletClient, tx.chainId);

  // viem uses `gas` instead of `gasLimit`.
  const gas =
    tx.gasLimit != null ? toBigInt(tx.gasLimit) : undefined;

  try {
    const hash = await walletClient.sendTransaction({
      account: from ?? undefined,
      to: tx.to,
      data: tx.data,
      value: toBigInt(tx.value),
      gas,
    });

    if (!hash || typeof hash !== "string") {
      throw new Error("No transaction hash returned");
    }

    // Success path: we return the hash (receipt waiting is caller's responsibility).
    return hash;
  } catch (err) {
    const code = err?.code ?? err?.error?.code;
    if (code === 4001) {
      const e = new Error("Transaction rejected by user");
      e.code = ERROR_USER_REJECTED;
      throw e;
    }

    // Some wallets attach code as a raw number; preserve it where possible.
    const message = err?.message ?? err?.error?.message ?? "Transaction failed";
    const e = new Error(message);
    e.code = code ?? "BROADCAST_FAILED";
    throw e;
  }
}

export async function waitForTransactionReceipt({
  publicClient,
  txHash,
  confirmations = 1,
  timeoutMs = 180_000,
}) {
  if (!publicClient) throw new Error("Public client not available");
  if (!txHash || typeof txHash !== "string") throw new Error("Tx hash is required");

  return publicClient.waitForTransactionReceipt({
    hash: txHash,
    confirmations,
    timeout: timeoutMs,
  });
}

export async function signMessage({ walletClient, message, account }) {
  if (!walletClient) throw new Error("Wallet client not available");
  if (typeof message !== "string" || message.length === 0) {
    throw new Error("Message must be a non-empty string");
  }

  const toSignAccount = account ?? walletClient.account;
  if (toSignAccount && !isAddress(toSignAccount)) {
    throw new Error("Invalid signing account");
  }

  return walletClient.signMessage({
    account: toSignAccount ?? undefined,
    message,
  });
}

