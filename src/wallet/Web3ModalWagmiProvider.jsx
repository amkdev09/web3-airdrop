import React from "react";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./wagmiConfig";
import WalletCookieSync from "./WalletCookieSync";
import MobileWalletReconnect from "./MobileWalletReconnect";

export default function Web3ModalWagmiProvider({ children }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* Keeps legacy `Cookies["address"]` auth flow in sync with wagmi. */}
      <WalletCookieSync />
      {/* Resume WalletConnect session after returning from wallet apps on mobile */}
      <MobileWalletReconnect />
      {children}
    </WagmiConfig>
  );
}

