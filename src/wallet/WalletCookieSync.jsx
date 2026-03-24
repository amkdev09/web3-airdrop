import React, { useLayoutEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useAccount } from "wagmi";
import { isAddress } from "viem";

/**
 * Syncs wagmi account state into the legacy cookie format used by the API layer.
 * This prevents "UI shows connected address but backend auth fails" after refresh.
 */
export default function WalletCookieSync() {
  const { address, isConnected, status } = useAccount();
  // If a legacy cookie exists on mount, it likely came from a previous session.
  // We only clear it if wagmi ultimately restores to a disconnected state.
  const wasConnectedRef = useRef(Boolean(Cookies.get("address")));

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Avoid clearing cookies during the initial "reconnecting" phase.
    const shouldClear = status === "disconnected" && wasConnectedRef.current;

    if (isConnected && address && isAddress(address)) {
      wasConnectedRef.current = true;
      try {
        Cookies.set("address", address, {
          path: "/",
          sameSite: "Lax",
          secure: window.location.protocol === "https:",
        });
      } catch (e) {
        // If encryption fails (e.g. missing VITE_CRYPTO_SECRET_KEY), still store checksum address
        // so API auth works; prefer fixing env in production.
        console.warn(
          "WalletCookieSync: encrypt failed, storing plain address",
          e,
        );
        Cookies.set("address", encodeURIComponent(address), {
          path: "/",
          sameSite: "Lax",
          secure: window.location.protocol === "https:",
        });
      }
      // Do not touch "isRegistered" here; registration is app-level state.
      return;
    }

    if (shouldClear) {
      wasConnectedRef.current = false;
      Cookies.remove("address");
      Cookies.remove("isRegistered");
    }
  }, [address, isConnected, status]);

  return null;
}
