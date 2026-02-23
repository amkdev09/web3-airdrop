import React from "react";
import cryptoRoadmap from "../../assets/images/crypto-roadmap.webp";
import selsilaBrandLogo from "../../assets/images/sslogo.png";

export default function Home() {
  return (
    <main className="max-w-120 w-full mx-auto pt-12">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-wavacorp text-base tracking-[0.45em]">Selsila Airdrop</h1>
      </div>
      <div className="px-5 relative mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className=" flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp">01</p>
            <p className="font-sans text-sm">Airdrop Release</p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center">
            <p className="text-xs font-wavacorp">02</p>
            <p className="font-sans text-sm">Selsi Launchpad Launching</p>
          </div>
        </div>
        <div className="relative size-full aspect-video z-10">
          <img alt="crypto-roadmap" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={cryptoRoadmap} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp">03</p>
            <p className="font-sans text-sm">Selsi Wallet Launching</p>
          </div>
          <div className="flex flex-col gap-y-0.5 items-center z-20">
            <p className="text-xs font-wavacorp">04</p>
            <p className="font-sans text-sm">SWEG App Launching <br /> &amp; Selsila Public Listing</p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#be87ff66] to-transparent max-w-[200px]"></div>
          <h2 className="mx-6 tracking-[0.7em] font-wavacorp text-lg text-shadow-[0_2px_8px_var(--color-selsila-purple),0_2px_8px_var(--color-selsila-green)]" style={{ color: 'rgba(160, 200, 255, 0.85)' }}>ROADMAP</h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#be87ff66] to-transparent max-w-[200px]"></div>
        </div>
        <div className="grid grid-cols-2 gap-8 auto-rows-auto px-5 mt-5">
          <div className="flex flex-col gap-y-2">
            <div className="bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
              <p className="text-2xl font-sans text-center">320.3K</p>
            </div>
            <p className="text-xs text-center">TOTAL USER</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
              <p className="text-2xl font-sans text-center">2.9M</p>
            </div>
            <p className="text-xs text-center">LIVE DISTRIBUTION</p>
          </div>
        </div>
        <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
          <p className="text-base text-shadow-purple-green">Selsi Future X Plan</p>
          <div className="relative w-full">
            <div className="relative h-64 flex items-center justify-center perspective-1000 select-none">
              <div className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-4" style={{ transform: 'translateX(60%) scale(0.85) rotateY(-25deg)', zIndex: 4, opacity: 0.8, filter: 'blur(2px)' }}>
                <p className="text-sm">wallet is a digital wallet that lets users store, send, and receive crypto while interacting with decentralized apps (dApps).</p>
              </div>
              <div className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-4" style={{ transform: 'translateX(120%) scale(0.7) rotateY(-35deg)', zIndex: 3, opacity: 0.6, filter: 'blur(4px)' }}>
                <div className="relative w-24 h-24"><img alt="selsila" loading="lazy" decoding="async" data-nimg="fill" className="object-contain" sizes="100vw" srcSet="/_next/image?url=%2Fselsila-brand-logo.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2Fselsila-brand-logo.png&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=%2Fselsila-brand-logo.png&amp;w=3840&amp;q=75" style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                </div>
                <div className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-4" style={{ transform: 'translateX(-120%) scale(0.7) rotateY(35deg)', zIndex: 3, opacity: 0.6, filter: 'blur(4px)' }}>
                  <p className="text-sm">Selsi Dex Finance is Trade smarter, faster, and easier with SelsiDEX's spot, perp, and copy trading at your fingertips.</p>
                </div>
                <div className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-4" style={{ transform: 'translateX(-60%) scale(0.85) rotateY(25deg)', zIndex: 4, opacity: 0.8, filter: 'blur(2px)' }}>
                  <p className="text-sm">Fairlaunch is Launch freely, fairly, and efficiently with Selsila's low-cost, user-first token creation protocol.</p>
                </div>
                <div className="absolute w-52 h-full cursor-pointer transition-all duration-700 ease-out preserve-3d bg-linear-(--hologram-gradient) shadow-cyan-neon rounded-[40px] border-2 border-selsila-purple flex flex-col items-center justify-center text-center p-4" style={{ transform: 'translateX(0px) scale(1) rotateY(0deg)', zIndex: 5, opacity: 1, filter: 'blur(0px)' }}>
                  <p className="text-sm">Global Expand is Selsila is actively preparing for its upcoming listing on a centralized exchange (CEX), marking a major step forward in its growth journey</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-4 px-5 overflow-x-hidden">
            <p className="text-base text-shadow-purple-green">Want to know more about SELSILA?</p>
            <div className="space-y-6">
              <div className="max-w-2xl mx-auto relative">
                <div className="px-5"><button className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">VISIT OUR WEBSITE</button></div>
                <div className="bg-[#141439] rounded-3xl border border-selsila-purple transition-all duration-500 ease-in-out mt-0 max-h-0 opacity-0 transform -translate-y-4 overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="mt-5"><a className="text-center text-sm hover:underline" target="_blank" href="https://selsiworld.com/">https://selsiworld.com/</a></div>
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
                <div className="px-5"><button className="w-full h-11 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">SELSILA X SOLANA</button></div>
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
            <h2 className="text-lg text-white">Join the Future of Web3 Gaming with SELSILA WORLD!</h2>
            <p className="text-sm mt-5">Partner with Selsila and be part of the world’s first fully immersive Web3 gaming revolution. Leverage cutting-edge blockchain technology, AI-driven ecosystems, and limitless opportunities in decentralized gaming.</p>
            <p className="text-lg mt-5">Let’s build the future together.</p>
            <div className="mt-6 relative w-24 h-14 mx-auto">
              <img alt="selsila-world" loading="lazy" decoding="async" data-nimg="fill" src={selsilaBrandLogo} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
