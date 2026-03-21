import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { bsc, mainnet, polygon } from "viem/chains";

/**
 * WalletConnect Cloud / WalletGuide listing IDs (64-char hex).
 * Only these wallets appear in the modal (see `createWeb3Modal` below).
 * IDs verified via Explorer API; copy new ones from https://walletguide.walletconnect.network/
 */
export const WALLETCONNECT_WALLET_IDS = [
  "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // Trust Wallet
  "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", // Phantom
  "d0ca99ff52b99abc48743dad0f7fc891e041be73574f7fac4afe5d4bb83845c8", // Coinbase Wallet
  "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1", // Rabby
  "e9ff15be73584489ca4a66f64d32c4537711797e30b6660dbcb71ea72a42b1f4", // Exodus
  "85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041", // Frontier
  "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // Bitget Wallet
];

/**
 * Reown (WalletConnect) public demo project id — used only when `VITE_WALLETCONNECT_PROJECT_ID` is unset
 * so WalletConnect + modal wallet list work on mobile (no browser extension).
 * Create your own project at https://cloud.reown.com and set `VITE_WALLETCONNECT_PROJECT_ID` for production.
 */

// WalletConnect project id — required for mobile; env overrides fallback.
// Add to `.env`: VITE_WALLETCONNECT_PROJECT_ID=your_project_id
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// Central list of supported chains for this app.
// Backend returns `transaction.chainId`; these should cover the possible values.
export const chains = [bsc, polygon, mainnet];

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "UltraDefi",
    description: "UltraDefi wallet connection",
    url: typeof window !== "undefined" ? window.location.origin : "https://ultradefi.com",
    icons: ["https://ultradefi.com/favicon.ico"],
  },
  // WalletConnect is how most users connect on mobile (Safari / Chrome — no injected extension).
  enableWalletConnect: true,
  enableCoinbase: true,
  enableInjected: true,
  // Do not add email/social AppKit auth connectors — wallet-only UX.
  auth: {
    email: false,
    socials: [],
  },
  // Critical for the "auto-connect on refresh" requirement.
  autoConnect: true,
});

// Create the Web3Modal instance once (browser-only).
if (typeof window !== "undefined") {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    defaultChain: bsc,
    includeWalletIds: WALLETCONNECT_WALLET_IDS,
    /**
     * `HIDE` removes "All Wallets" everywhere — on mobile that can block WalletConnect
     * for wallets that don’t appear on the main modal view (see Web3Modal `allWallets` docs).
     * `ONLY_MOBILE` keeps desktop minimal and restores full wallet access on phones.
     */
    allWallets: "ONLY_MOBILE",
    /** Helps discover injected providers (e.g. MetaMask / Trust in-app browser). */
    enableEIP6963: true,
  });
}
