import React, { useEffect, useMemo, useRef, useState } from "react";

import { WALLETCONNECT_WALLET_IDS } from "../wallet/wagmiConfig";

const EXPLORER_PROJECT_ID_FALLBACK = "b56e18d47c72ab683b10814fe9495694"; // Reown public demo projectId

const WALLET_PRESETS = [
  { id: WALLETCONNECT_WALLET_IDS[0], name: "MetaMask", initial: "M", bg: "rgba(247, 222, 7, 0.18)" },
  { id: WALLETCONNECT_WALLET_IDS[1], name: "Trust Wallet", initial: "T", bg: "rgba(0, 156, 143, 0.18)" },
  { id: WALLETCONNECT_WALLET_IDS[2], name: "Phantom", initial: "P", bg: "rgba(168, 255, 238, 0.12)" },
  { id: WALLETCONNECT_WALLET_IDS[3], name: "Coinbase Wallet", initial: "C", bg: "rgba(0, 0, 0, 0.20)" },
  { id: WALLETCONNECT_WALLET_IDS[4], name: "Rabby", initial: "R", bg: "rgba(190, 135, 255, 0.16)" },
  { id: WALLETCONNECT_WALLET_IDS[5], name: "Exodus", initial: "E", bg: "rgba(233, 212, 255, 0.10)" },
  { id: WALLETCONNECT_WALLET_IDS[6], name: "Frontier", initial: "F", bg: "rgba(0, 156, 143, 0.10)" },
  { id: WALLETCONNECT_WALLET_IDS[7], name: "Bitget Wallet", initial: "B", bg: "rgba(56, 189, 248, 0.12)" },
];

export default function WalletSupportCarousel() {
  const explorerProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || EXPLORER_PROJECT_ID_FALLBACK;

  const containerRef = useRef(null);
  const [walletIcons, setWalletIcons] = useState(() =>
    WALLET_PRESETS.map((w) => ({ id: w.id, name: w.name, initial: w.initial, bg: w.bg, imageUrl: null }))
  );

  const walletItems = useMemo(() => walletIcons, [walletIcons]);

  useEffect(() => {
    let cancelled = false;

    async function loadIcons() {
      try {
        const idsParam = WALLET_PRESETS.map((w) => w.id).join(",");
        const url = `https://explorer-api.walletconnect.com/v3/all?projectId=${encodeURIComponent(
          explorerProjectId
        )}&ids=${encodeURIComponent(idsParam)}&entries=${WALLET_PRESETS.length}&page=1`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Explorer request failed (${res.status})`);
        const data = await res.json();

        const listings = data?.listings ?? {};

        const next = WALLET_PRESETS.map((w) => {
          const listing = listings?.[w.id];
          const imageUrl =
            listing?.image_url?.md || listing?.image_url?.lg || listing?.image_url?.sm || null;
          return {
            id: w.id,
            name: w.name,
            initial: w.initial,
            bg: w.bg,
            imageUrl,
          };
        });

        if (!cancelled) setWalletIcons(next);
      } catch {
        // Keep fallback initials if API fails or projectId is invalid.
      }
    }

    loadIcons();
    return () => {
      cancelled = true;
    };
  }, [explorerProjectId]);

  // Parallax-like depth shift (single layer) based on mouse position + page scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafMouse = 0;
    let rafScroll = 0;
    let mouseX = 0;
    let scrollY = 0;

    const apply = () => {
      el.style.setProperty("--parallax-x", `${mouseX}px`);
      el.style.setProperty("--parallax-y", `${scrollY}px`);
    };

    const onMouseMove = (e) => {
      if (rafMouse) return;
      rafMouse = window.requestAnimationFrame(() => {
        rafMouse = 0;
        const rect = el.getBoundingClientRect();
        const xNorm = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5; // -0.5..0.5
        mouseX = xNorm * 26; // px
        apply();
      });
    };

    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = window.requestAnimationFrame(() => {
        rafScroll = 0;
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const yNorm = centerOffset / (window.innerHeight / 2); // roughly -1..1
        scrollY = Math.max(-1, Math.min(1, yNorm)) * 12; // px
        apply();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mousemove", onMouseMove);

    // Initialize parallax vars.
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("mousemove", onMouseMove);
      if (rafMouse) window.cancelAnimationFrame(rafMouse);
      if (rafScroll) window.cancelAnimationFrame(rafScroll);
    };
  }, []);

  return (
    <section className="wallet-support-carousel" ref={containerRef} aria-label="Supported wallets carousel">
      <div className="wallet-support-carousel__fade" aria-hidden="true" />

      <div className="wallet-support-carousel__layer">
        <div className="wallet-support-carousel__track">
          {[...walletItems, ...walletItems].map((w, idx) => (
            <div
              key={`${w.id}-${idx}`}
              className="wallet-support-carousel__item"
              style={{ background: w.bg }}
              aria-label={w.name}
            >
              {w.imageUrl ? (
                <img src={w.imageUrl} alt={w.name} loading="lazy" />
              ) : (
                <span className="wallet-support-carousel__item--fallback">{w.initial}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

