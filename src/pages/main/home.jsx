import React, { useState, useCallback, useRef, useEffect } from "react";
import cryptoRoadmap from "../../assets/images/crypto-roadmap.png";
import selsilaBrandLogo from "../../assets/images/sslogo.png";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userServices from "../../services/userServices";
import { formatCompactNumber } from "../../utils/utils";
import InvestmentCalculator from "../../components/investmentCalculator/InvestmentCalculator";

const CAROUSEL_CARDS = [
  {
    id: "fairlaunch",
    title: "100% Smart Contract",
    text: "All transactions and operations are automatically executed by smart contracts, constrained by predefined rules and conditions. Once these conditions are met, the contract automatically performs the corresponding actions.",
  },
  {
    id: "global",
    title: "Full Automation",
    text: "BitNest does not store your assets; all assets are fully stored on the blockchain, with assets automatically moving between participants and contracts.",
  },
  {
    id: "wallet",
    title: "Decentralization",
    text: "No one, not even the creators of the code, can modify the operation of any BitNest smart contracts.",
  },
  {
    id: "dex",
    title: "Transparency",
    text: "Smart contracts run on the blockchain, and transaction records are stored on the blockchain, allowing anyone to view them at any time. This ensures fair conditions and reliable statistics that you can trust.",
  },
  {
    id: "logo",
    title: "Immutability",
    text: "The algorithm is stored on the blockchain, so no one, not even the creators of BitNest, can intervene, cancel, or alter your transactions.",
  },
];

const SWIPE_THRESHOLD = 50;
const AUTO_SCROLL_MS = 5000;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const referralId = searchParams.get("ref") || "";

  const [carouselIndex, setCarouselIndex] = useState(1);

  const touchStartX = useRef(0);
  const autoScrollRef = useRef(null);

  const { data, isLoading: isLoadingPoolLiquidity } = useQuery({
    queryKey: ["poolLiquidity", "poolPositiveValue"],
    queryFn: () => Promise.all([userServices.poolLiquidity(), userServices.poolPositiveValue()]),
  });
  const [poolLiquidity, poolPositiveValue] = data ?? [];

  const { data: bnbPriceData } = useQuery({
    queryKey: ["bnbPrice"],
    queryFn: async () => {
      const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT");
      if (!res.ok) throw new Error("Failed to fetch BNB price");
      const json = await res.json();
      return Number(json.price);
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
  });
  const bnbPriceUsd = bnbPriceData ?? 0;

  const handleReferralReg = useCallback(() => {
    if (referralId) {
      navigate(`/connect-metamask`, { state: { from: location.pathname, referralId: referralId } });
    }
  }, [referralId, location.pathname, navigate]);

  useEffect(() => {
    handleReferralReg();
  }, [handleReferralReg]);

  const goPrev = useCallback(
    () => setCarouselIndex((i) => (i - 1 + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length),
    []
  );

  const goNext = useCallback(
    () => setCarouselIndex((i) => (i + 1) % CAROUSEL_CARDS.length),
    []
  );

  const resetAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(goNext, AUTO_SCROLL_MS);
  }, [goNext]);

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [resetAutoScroll]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = touchStartX.current - endX;
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        if (delta > 0) goNext();
        else goPrev();
      }
      resetAutoScroll();
    },
    [goNext, goPrev, resetAutoScroll]
  );

  return (
    <main className="max-w-120 w-full mx-auto pt-12">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-wavacorp text-base tracking-[0.45em]">UltraDefi</h1>
      </div>
      <div className="relative mt-4">
        {/* <div className="flex items-center justify-between mb-4">
          <div className=" flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp">01</p>
            <p className="font-sans text-sm">Airdrop Release</p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp">02</p>
            <p className="font-sans text-sm">UltraDefi Launchpad Launching</p>
          </div>
        </div> */}
        <div className="relative size-full aspect-video z-10">
          <img alt="crypto-roadmap" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={cryptoRoadmap} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
        </div>
        {/* <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp">03</p>
            <p className="font-sans text-sm">UltraDefi Wallet Launching</p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp">04</p>
            <p className="font-sans text-sm">UltraDefi App Launching <br /> &amp; UltraDefi Public Listing</p>
          </div>
        </div> */}
      </div>
      <div className="my-0">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#be87ff66] to-transparent max-w-[200px]"></div>
          <h2 className="mx-6 tracking-[0.7em] font-wavacorp text-lg text-shadow-[0_2px_8px_var(--color-selsila-purple),0_2px_8px_var(--color-selsila-green)]" style={{ color: 'rgba(160, 200, 255, 0.85)' }}>ROADMAP</h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#be87ff66] to-transparent max-w-[200px]"></div>
        </div>
        <div className="grid grid-cols-2 gap-8 auto-rows-auto px-5 mt-5">
          <div className="flex flex-col gap-y-2">
            <div className="bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
              <p className="text-2xl font-sans text-center">{isLoadingPoolLiquidity ? '...' : poolLiquidity?.usdtInLP ? formatCompactNumber(poolLiquidity?.usdtInLP) : '0'}</p>
            </div>
            <p className="text-xs text-center">CRYPTO LIQUIDITY</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
              <p className="text-2xl font-sans text-center">{isLoadingPoolLiquidity ? '...' : poolPositiveValue ? formatCompactNumber((Number(poolPositiveValue?.usdtBalance) || 0) + (Number(poolPositiveValue?.wbnbBalance) || 0) * bnbPriceUsd) : '0'}</p>
            </div>
            <p className="text-xs text-center">OUR LIQUIDITY</p>
          </div>
        </div>
        <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
          <p className="text-base text-shadow-purple-green">UltraDefi Future X Plan</p>
          <div className="relative w-full">
            <div
              className="relative h-68 flex items-center justify-center perspective-[1000px] select-none overflow-visible touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {CAROUSEL_CARDS.map((card, index) => {
                const pos = (index - carouselIndex + CAROUSEL_CARDS.length) % CAROUSEL_CARDS.length;
                const offset = pos > CAROUSEL_CARDS.length / 2 ? pos - CAROUSEL_CARDS.length : pos;
                const visible = Math.abs(offset) <= 2;
                const isLeftSide = offset < 0;
                const isRightSide = offset > 0;
                const getStyle = () => {
                  if (!visible) return { transform: `translateX(${offset * 80}%) scale(0.5)`, zIndex: 1, opacity: 0, pointerEvents: "none", filter: "blur(8px)" };
                  if (offset === -2) return { transform: "translateX(-88%) scale(0.62)", zIndex: 2, opacity: 0.65, filter: "blur(3px)" };
                  if (offset === -1) return { transform: "translateX(-60%) scale(0.78)", zIndex: 4, opacity: 0.85, filter: "blur(2px)" };
                  if (offset === 0) return { transform: "translateX(0) scale(1)", zIndex: 5, opacity: 1, filter: "blur(0px)" };
                  if (offset === 1) return { transform: "translateX(60%) scale(0.78)", zIndex: 4, opacity: 0.85, filter: "blur(2px)" };
                  if (offset === 2) return { transform: "translateX(88%) scale(0.62)", zIndex: 2, opacity: 0.65, filter: "blur(3px)" };
                  return {};
                };
                const style = getStyle();
                return (
                  <div
                    key={`${card.id}-${index}`}
                    className="absolute w-58 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-3"
                    style={style}
                    onClick={() => (isLeftSide ? goPrev() : isRightSide ? goNext() : null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (isLeftSide ? goPrev() : isRightSide ? goNext() : null)}
                    aria-label={isLeftSide ? "Previous card" : isRightSide ? "Next card" : undefined}
                  >
                    {card.type === "logo" ? (
                      <div className="relative w-24 h-24">
                        <img alt="selsila" loading="lazy" decoding="async" className="object-contain w-full h-full" src={selsilaBrandLogo} />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-y-2 text-center">
                        <p className="text-base text-white font-bold">{card.title}</p>
                        <p className="text-sm text-white">{card.text}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
            <p className="text-base text-shadow-purple-green">Want to know more about UltraDefi?</p>
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto relative">
                <div className="px-5">
                  <button onClick={() => navigate("/deposit")} className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">
                    Start Investing
                  </button>
                </div>
                <div className="mt-5 -mx-5">
                  <InvestmentCalculator />
                </div>
                <div className="bg-[#141439] rounded-3xl border border-selsila-purple transition-all duration-500 ease-in-out mt-0 max-h-0 opacity-0 transform -translate-y-4 overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="mt-5"><a className="text-center text-sm hover:underline" target="_blank" href="https://ultradefi.com/">https://ultradefi.com/</a></div>
                  </div>
                </div>
              </div>
              <div className="max-w-2xl mx-auto relative">
                <div className="px-5"><button className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">WHITEPAPER</button></div>
                <div className="bg-[#141439] rounded-3xl border border-selsila-purple transition-all duration-500 ease-in-out -mt-6 max-h-96 opacity-100 transform translate-y-0 overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="mt-5">
                      <p className="text-sm">Curious about how our ecosystem works? Read our White Paper to discover the vision, technology, and tokenomics behind it.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-2xl mx-auto relative">
                <div className="px-5"><button className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">Telegram</button></div>
                <div className="bg-[#141439] rounded-3xl border border-selsila-purple transition-all duration-500 ease-in-out mt-0 max-h-0 opacity-0 transform -translate-y-4 overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="mt-5">
                      <p className="text-sm">Built on Solana’s ultra-fast network, Selsila is redefining the future of Web3 with seamless scalability and innovation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center text-white px-5">
            <h2 className="text-lg text-white">Join the Future of Web3 Gaming with UltraDefi WORLD!</h2>
            <p className="text-sm mt-5">Partner with Selsila and be part of the world’s first fully immersive Web3 gaming revolution. Leverage cutting-edge blockchain technology, AI-driven ecosystems, and limitless opportunities in decentralized gaming.</p>
            <p className="text-lg mt-5">Let’s build the future together.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
