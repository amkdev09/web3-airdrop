import React from "react";

// Gradient and shadow utilities matching theme
const hologramBg = {
  background: "linear-gradient(0deg, #1a1a527d 0%, #009c8fb3 100%)",
};
const borderSelsila = "1px solid var(--color-selsila-purple)";
const shadowCyan = "0 0 16px rgba(0, 156, 143, 0.35)";
const textShadowPurpleGreen = "0 2px 8px var(--color-selsila-purple), 0 2px 8px var(--color-selsila-green)";

export default function Home() {
  return (
    <main className="max-w-[30rem] w-full mx-auto pt-12 pb-24">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-wavacorp text-base tracking-[0.45em] text-white">
          Selsila Airdrop
        </h1>
      </div>

      <div className="px-5 relative mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp text-white">01</p>
            <p className="font-sans text-sm text-white">Airdrop Release</p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp text-white">02</p>
            <p className="font-sans text-sm text-white">Selsi Launchpad Launching</p>
          </div>
        </div>
        <div className="relative w-full aspect-video z-10 rounded-xl overflow-hidden bg-[#0A001F]/50 border border-white/10">
          {/* Placeholder for roadmap image: set src when asset is available */}
          <img
            alt="crypto-roadmap"
            decoding="async"
            className="object-cover w-full h-full"
            src=""
            style={{ position: "absolute", inset: 0, color: "transparent" }}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp text-white">03</p>
            <p className="font-sans text-sm text-white text-center">
              Selsi Wallet Launching
            </p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp text-white">04</p>
            <p className="font-sans text-sm text-white text-center">
              SWEG App Launching
              <br />
              & Selsila Public Listing
            </p>
          </div>
        </div>
      </div>

      <div className="my-10">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#be87ff66] to-transparent max-w-[200px]" />
          <h2
            className="mx-6 tracking-[0.7em] font-wavacorp text-lg text-white"
            style={{ textShadow: textShadowPurpleGreen }}
          >
            ROADMAP
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#be87ff66] to-transparent max-w-[200px]" />
        </div>
        <div className="grid grid-cols-2 gap-8 auto-rows-auto px-5 mt-5">
          <div className="flex flex-col gap-y-2">
            <div
              className="py-1.5 rounded-xl border text-center"
              style={{ ...hologramBg, border: borderSelsila, boxShadow: shadowCyan }}
            >
              <p className="text-2xl font-sans text-white">319.9K</p>
            </div>
            <p className="text-xs text-center text-white">TOTAL USER</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <div
              className="py-1.5 rounded-xl border text-center"
              style={{ ...hologramBg, border: borderSelsila, boxShadow: shadowCyan }}
            >
              <p className="text-2xl font-sans text-white">2.9M</p>
            </div>
            <p className="text-xs text-center text-white">LIVE DISTRIBUTION</p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
        <p className="text-base text-white" style={{ textShadow: textShadowPurpleGreen }}>
          Selsi Future X Plan
        </p>
        <div className="relative w-full">
          <div className="relative h-64 flex items-center justify-center select-none">
            <div
              className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out bg-opacity-90 rounded-[40px] border-2 flex flex-col items-center justify-center text-center p-4"
              style={{
                transform: "translateX(0px) scale(1) rotateY(0deg)",
                zIndex: 5,
                opacity: 1,
                ...hologramBg,
                border: borderSelsila,
                boxShadow: shadowCyan,
              }}
            >
              <p className="text-sm text-white">
                Wallet is a digital wallet that lets users store, send, and receive crypto while
                interacting with decentralized apps (dApps).
              </p>
            </div>
            <div
              className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out rounded-[40px] border-2 flex flex-col items-center justify-center text-center p-4"
              style={{
                transform: "translateX(60%) scale(0.85) rotateY(-25deg)",
                zIndex: 4,
                opacity: 0.8,
                filter: "blur(2px)",
                ...hologramBg,
                border: borderSelsila,
                boxShadow: shadowCyan,
              }}
            >
              <div className="relative w-24 h-24 bg-white/10 rounded-full" />
            </div>
            <div
              className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out rounded-[40px] border-2 flex flex-col items-center justify-center text-center p-4"
              style={{
                transform: "translateX(120%) scale(0.7) rotateY(-35deg)",
                zIndex: 3,
                opacity: 0.6,
                filter: "blur(4px)",
                ...hologramBg,
                border: borderSelsila,
                boxShadow: shadowCyan,
              }}
            >
              <p className="text-sm text-white">
                Selsi Dex Finance is Trade smarter, faster, and easier with SelsiDEX&apos;s spot,
                perp, and copy trading at your fingertips.
              </p>
            </div>
            <div
              className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out rounded-[40px] border-2 flex flex-col items-center justify-center text-center p-4"
              style={{
                transform: "translateX(-120%) scale(0.7) rotateY(35deg)",
                zIndex: 3,
                opacity: 0.6,
                filter: "blur(4px)",
                ...hologramBg,
                border: borderSelsila,
                boxShadow: shadowCyan,
              }}
            >
              <p className="text-sm text-white">
                Fairlaunch is Launch freely, fairly, and efficiently with Selsila&apos;s low-cost,
                user-first token creation protocol.
              </p>
            </div>
            <div
              className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out rounded-[40px] border-2 flex flex-col items-center justify-center text-center p-4"
              style={{
                transform: "translateX(-60%) scale(0.85) rotateY(25deg)",
                zIndex: 4,
                opacity: 0.8,
                filter: "blur(2px)",
                ...hologramBg,
                border: borderSelsila,
                boxShadow: shadowCyan,
              }}
            >
              <p className="text-sm text-white">
                Global Expand is Selsila is actively preparing for its upcoming listing on a
                centralized exchange (CEX), marking a major step forward in its growth journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
        <p className="text-base text-white" style={{ textShadow: textShadowPurpleGreen }}>
          Want to know more about SELSILA?
        </p>
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto relative">
            <div className="px-5">
              <a
                href="https://selsiworld.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-11 leading-[2.75rem] bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 text-center font-semibold shadow-lg transition-all duration-300 tracking-wider"
              >
                VISIT OUR WEBSITE
              </a>
            </div>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div className="px-5">
              <button
                type="button"
                className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 font-semibold shadow-lg transition-all duration-300 tracking-wider"
              >
                WHITEPAPER
              </button>
            </div>
            <div className="bg-[#141439] rounded-3xl border border-[var(--color-selsila-purple)] transition-all duration-500 ease-in-out -mt-6 mx-5 overflow-hidden">
              <div className="p-6 text-center">
                <p className="text-sm text-white">
                  Curious about how our ecosystem works? Read our White Paper to discover the
                  vision, technology, and tokenomics behind it.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div className="px-5">
              <button
                type="button"
                className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 font-semibold shadow-lg transition-all duration-300 tracking-wider"
              >
                SELSILA X SOLANA
              </button>
            </div>
            <div className="bg-[#141439] rounded-3xl border border-[var(--color-selsila-purple)] transition-all duration-500 ease-in-out mt-2 mx-5 overflow-hidden opacity-0 max-h-0 -translate-y-4">
              <div className="p-6 text-center">
                <p className="text-sm text-white">
                  Built on Solana&apos;s ultra-fast network, Selsila is redefining the future of
                  Web3 with seamless scalability and innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-white px-5">
        <h2 className="text-lg text-white font-semibold">
          Join the Future of Web3 Gaming with SELSILA WORLD!
        </h2>
        <p className="text-sm mt-5 text-white/90">
          Partner with Selsila and be part of the world&apos;s first fully immersive Web3 gaming
          revolution. Leverage cutting-edge blockchain technology, AI-driven ecosystems, and
          limitless opportunities in decentralized gaming.
        </p>
        <p className="text-lg mt-5 text-white">Let&apos;s build the future together.</p>
        <div className="mt-6 relative w-24 h-14 mx-auto flex items-center justify-center rounded-full border-2 border-white/30 bg-white/5">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
      </div>
    </main>
  );
}
