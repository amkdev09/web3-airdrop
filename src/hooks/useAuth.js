import { useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import useWallet from "../wallet/useWallet";

const useAuth = () => {
  const { currentAddress, disconnectWallet, status } = useWallet();
  const address = Cookies.get("address");

  // If wagmi is *disconnected*, treat wallet as disconnected (even if cookie lingers).
  // If wagmi is connecting/reconnecting, allow cookie address as a transitional fallback.
  const resolvedAddress =
    currentAddress ?? (status !== "disconnected" ? address : null); 

  const clearAddress = useCallback(async () => {
    await disconnectWallet();
    Cookies.remove("address");
    Cookies.remove("isRegistered");
  }, [disconnectWallet]);

  const referralLink = useMemo(() => {
    if (address) return `${window.location.origin}/?ref=${address}`;
    return null;
  }, [address]);

  return {
    isRegistered: Cookies.get("isRegistered") === "true",
    address: resolvedAddress,
    clearAddress,
    referralLink,
  };
};

export default useAuth;
