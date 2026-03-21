import { useEffect, useRef } from "react";
import { useReconnect } from "wagmi";

/**
 * Mobile Safari/Chrome often suspend the tab while MetaMask / Trust opens via WalletConnect.
 * When the user returns, the WC session may not sync into wagmi until we reconnect.
 */
export default function MobileWalletReconnect() {
  const { reconnectAsync } = useReconnect();
  const debounceRef = useRef(null);

  useEffect(() => {
    const run = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        reconnectAsync().catch(() => {
          /* ignore — no prior session or still connecting */
        });
      }, 350);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") run();
    };

    /** iOS: returning from wallet app often restores via bfcache */
    const onPageShow = (e) => {
      if (e.persisted) run();
    };

    window.addEventListener("focus", run);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      window.removeEventListener("focus", run);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [reconnectAsync]);

  return null;
}
