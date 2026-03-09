import { getMetaMaskSDK } from "./metamaskSDK";

/** User rejected the request (e.g. MetaMask popup cancelled). */
export const ERROR_USER_REJECTED = "USER_REJECTED";

/** Chain switch was rejected or failed. */
export const ERROR_CHAIN_SWITCH = "CHAIN_SWITCH";

/**
 * Normalize API response to a single transaction object.
 * Handles both { transaction: { ... } } and raw { to, data, value, ... }.
 * @param {object} apiResponse - Response from withdraw/invest etc.
 * @returns {{ to: string, data: string, value: string, gasLimit?: string, chainId?: number }}
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
  const value = rawValue.startsWith("0x") ? rawValue : `0x${BigInt(rawValue).toString(16)}`;

  const normalized = {
    to: String(tx.to).trim(),
    data: String(tx.data).trim(),
    value,
    gasLimit: tx.gasLimit != null ? String(tx.gasLimit) : undefined,
    chainId: tx.chainId != null ? Number(tx.chainId) : undefined,
  };
  return normalized;
}

/**
 * Switch to the chain required by the transaction if needed.
 * @param {object} provider - EIP-1193 provider (e.g. from MetaMask SDK)
 * @param {number} chainId - Decimal chain id (e.g. 56)
 * @throws {Error} With code ERROR_CHAIN_SWITCH or message on failure
 */
export async function ensureChain(provider, chainId) {
  if (!chainId || !provider?.request) return;
  const hexChainId = `0x${chainId.toString(16)}`;
  try {
    const currentChain = await provider.request({ method: "eth_chainId", params: [] });
    if (currentChain === hexChainId) return;
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });
  } catch (err) {
    const code = err?.code ?? err?.error?.code;
    const message = err?.message ?? err?.error?.message ?? "Chain switch failed";
    if (code === 4001) {
      const e = new Error("User rejected chain switch");
      e.code = ERROR_USER_REJECTED;
      throw e;
    }
    const e = new Error(message);
    e.code = ERROR_CHAIN_SWITCH;
    throw e;
  }
}

/**
 * Broadcast an unsigned transaction via the user's wallet (MetaMask).
 * Ensures correct chain, then sends the tx; user signs in the wallet.
 * @param {object} transaction - Normalized tx: { to, data, value, gasLimit?, chainId? }
 * @param {string} fromAddress - Sender address (0x...)
 * @returns {Promise<string>} Transaction hash (0x...)
 * @throws {Error} On reject, wrong chain, or send failure (with code or message)
 */
export async function broadcastTransaction(transaction, fromAddress) {
  if (!fromAddress || typeof fromAddress !== "string") {
    throw new Error("Sender address is required");
  }
  const from = String(fromAddress).trim();
  if (!from.startsWith("0x")) {
    throw new Error("Invalid sender address");
  }

  const provider = getMetaMaskSDK().getProvider();
  if (!provider?.request) {
    throw new Error("Wallet provider not available");
  }

  const tx = normalizeTransaction({ transaction });

  await ensureChain(provider, tx.chainId);

  const params = {
    from,
    to: tx.to,
    data: tx.data,
    value: tx.value,
    ...(tx.gasLimit && { gasLimit: tx.gasLimit }),
  };

  try {
    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [params],
    });
    if (!txHash || typeof txHash !== "string") {
      throw new Error("No transaction hash returned");
    }
    return txHash;
  } catch (err) {
    const code = err?.code ?? err?.error?.code;
    const message = err?.message ?? err?.error?.message ?? "Transaction failed";
    if (code === 4001) {
      const e = new Error("Transaction rejected by user");
      e.code = ERROR_USER_REJECTED;
      throw e;
    }
    const e = new Error(message);
    e.code = code ?? "BROADCAST_FAILED";
    throw e;
  }
}

/**
 * Fetch unsigned transaction from API and broadcast it via MetaMask.
 * Convenience helper: normalizes API response, ensures chain, sends tx.
 * @param {Promise<object>} fetchUnsignedTx - Async function that returns API response (e.g. { transaction })
 * @param {string} fromAddress - Sender address (0x...)
 * @returns {Promise<string>} Transaction hash (0x...)
 */
export async function fetchAndBroadcast(fetchUnsignedTx, fromAddress) {
  const apiResponse = await fetchUnsignedTx();
  const transaction = normalizeTransaction(apiResponse);
  return broadcastTransaction(transaction, fromAddress);
}
