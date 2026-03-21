import { useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import useWallet from "../wallet/useWallet";
import { decryptData, encryptData } from "../utils/encryption";

const useAuth = () => {
  const { currentAddress, disconnectWallet, status } = useWallet();
  const storedAddressCipher = Cookies.get("address");

  const storedAddress = useMemo(() => {
    if (!storedAddressCipher) return null;

    // Handle both legacy unencoded values and new encodeURIComponent values
    let cipherText = storedAddressCipher;
    try {
      cipherText = decodeURIComponent(storedAddressCipher);
    } catch {
      cipherText = storedAddressCipher;
    }

    const decrypted = decryptData(cipherText);
    if (decrypted) return decrypted;
    if (typeof cipherText === "string" && /^0x[a-fA-F0-9]{40}$/.test(cipherText)) {
      return cipherText;
    }
    return null;
  }, [storedAddressCipher]);

  // If wagmi is *disconnected*, treat wallet as disconnected (even if cookie lingers).
  // If wagmi is connecting/reconnecting, allow cookie address as a transitional fallback.
  const resolvedAddress =
    currentAddress ?? (status !== "disconnected" ? storedAddress : null);

  const clearAddress = useCallback(async () => {
    await disconnectWallet();
    Cookies.remove("address");
    Cookies.remove("isRegistered");
  }, [disconnectWallet]);

  const refferalLink = useMemo(() => {
    if (storedAddressCipher) return `${window.location.origin}/?ref=${storedAddressCipher}`;
    if (currentAddress) {
      const encrypted = encodeURIComponent(encryptData(currentAddress));
      return `${window.location.origin}/?ref=${encrypted}`;
    }
    return null;
  }, [storedAddressCipher, currentAddress]);

  return {
    isRegistered: Cookies.get("isRegistered") === "true",
    address: resolvedAddress,
    clearAddress,
    refferalLink,
  };
};

export default useAuth;
