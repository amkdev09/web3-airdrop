import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { clearUser, setUserData } from '../store/slices/userAuthSlice';
import { getMetaMaskSDK } from '../lib/metamaskSDK';
import { encryptData } from '../utils/encryption';

let rehydrationPromise = null;

/** Rehydrate wallet address from MetaMask on load (no user prompt). Runs once per app. */
function rehydrateAddress(dispatch) {
  if (rehydrationPromise) return rehydrationPromise;
  rehydrationPromise = (async () => {
    try {
      const provider = getMetaMaskSDK().getProvider();
      if (!provider?.request) return;
      const accounts = await provider.request({ method: 'eth_accounts', params: [] });
      if (Array.isArray(accounts) && accounts.length > 0) {
        dispatch(setUserData({ address: accounts[0] }));
      }
    } catch {
      // ignore
    }
  })();
  return rehydrationPromise;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userAuth);
  const address = userAuth?.address;
  const isConnected = !!address;

  const clearAddress = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  const setAddress = useCallback(
    (addr) => {
      dispatch(setUserData({ address: addr }));
    },
    [dispatch]
  );

  const connectMetaMask = useCallback(async () => {
    try {
      const MMSDK = getMetaMaskSDK();
      const accounts = await MMSDK.connect();
      if (accounts?.length > 0) {
        setAddress(accounts[0]);
        return accounts[0];
      }
      throw new Error('No accounts found');
    } catch (err) {
      if (err.code === 4001) {
        throw new Error('Connection rejected by user');
      }
      if (err.message?.includes('user rejected') || err.message?.includes('User rejected')) {
        throw new Error('Connection rejected by user');
      }
      throw err;
    }
  }, [setAddress]);

  /** Revoke MetaMask connection (EIP-2255) and clear local state. */
  const disconnectMetaMask = useCallback(async () => {
    try {
      const provider = getMetaMaskSDK().getProvider();
      if (provider?.request) {
        await provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        });
      }
    } catch {
      // Revoke not supported or failed; still clear local state
    } finally {
      clearAddress();
    }
  }, [clearAddress]);

  // Rehydrate address from MetaMask on mount (e.g. after refresh) — eth_accounts does not prompt
  useEffect(() => {
    rehydrateAddress(dispatch);
  }, [dispatch]);

  // Sync store when user switches account or disconnects in MetaMask
  useEffect(() => {
    let provider;
    try {
      provider = getMetaMaskSDK().getProvider();
    } catch {
      return;
    }
    if (!provider?.on) return;
    const handleAccountsChanged = (accounts) => {
      if (accounts?.length > 0) {
        setAddress(accounts[0]);
      } else {
        clearAddress();
      }
    };
    provider.on('accountsChanged', handleAccountsChanged);
    return () => provider.removeListener?.('accountsChanged', handleAccountsChanged);
  }, [clearAddress, setAddress]);

  const refferalLink = useCallback(() => {
    return address ? `${window.location.origin}/?ref=${encodeURIComponent(encryptData(address))}` : null;
  }, [address]);

  return {
    address,
    isConnected,
    clearAddress,
    setAddress,
    connectMetaMask,
    disconnectMetaMask,
    refferalLink: refferalLink(),
  };
};

export default useAuth;
