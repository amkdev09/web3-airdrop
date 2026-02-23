import React, { useRef, memo } from "react";
import adsBanner from "../../assets/images/ads-banner-3.webp"
import userProfile from '../../assets/images/userProfile.webp'

export default function Leaderboard() {
  return (
    <main className="max-w-120 w-full mx-auto pt-12 px-4">
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">leaderboard</h1>
        <p className="text-center text-sm sm:text-base leading-6">Compete for a Top 3 Position to earn more Exclusive Reward.</p>
      </div>
      <div className="space-y-8 mt-10">
        <div className="relative grid grid-cols-3 gap-2 sm:gap-4">
          <div className="flex flex-col items-center pt-12">
            <div className="flex flex-col items-center relative">
              <div className="flex flex-col items-center ">
                <div className="relative size-16 sm:size-20 rounded-full border-2 border-emerald-400/30 overflow-hidden ring-4 ring-emerald-400/10">
                  <img alt="choigapro" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="text-center mt-2">
                  <p className="text-white text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[100px] block mx-auto drop-shadow" title="choigapro">choigapro</p>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <span className="text-white/80 text-xs">3,728 Shares</span>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-xs" width="1em" height="1em" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                      </svg>
                      <span className="text-white/60 text-xs">15,430.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center h-14 w-full border-emerald-400 bg-gradient-to-t from-emerald-400/100 rounded-sm to-emerald-400/20 mt-3 font-wavacorp">2</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center">
              <div className="flex flex-col items-center ">
                <div className="relative size-20 sm:size-24 rounded-full border-2 border-emerald-400/30 overflow-hidden ring-4 ring-emerald-400/10">
                  <img alt="Iwak999" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                </div>
                <div className="text-center mt-2">
                  <p className="text-white text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[120px] block mx-auto drop-shadow" title="Iwak999">Iwak999</p>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <span className="text-white/80 text-xs">5,998 Shares</span>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-xs" width="1em" height="1em" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                      </svg>
                      <span className="text-white/60 text-xs">18,077.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center h-22 w-full border-emerald-400 bg-gradient-to-t from-emerald-400/100 rounded-sm to-emerald-400/20 mt-3 font-wavacorp">1</div>
          </div>
          <div className="flex flex-col items-center pt-16">
            <div className="relative flex flex-col items-center">
              <div className="flex flex-col items-center ">
                <div className="relative size-16 sm:size-20 rounded-full border-2 border-emerald-400/30 overflow-hidden ring-4 ring-emerald-400/10">
                  <img alt="asip90" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="text-center mt-2">
                  <p className="text-white text-xs sm:text-sm font-medium truncate max-w-[80px] sm:max-w-[100px] block mx-auto drop-shadow" title="asip90">asip90</p>
                  <div className="flex flex-col items-center gap-0.5 mt-1">
                    <span className="text-white/80 text-xs">3,024 Shares</span>
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-xs" width="1em" height="1em" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                      </svg>
                      <span className="text-white/60 text-xs">8,083.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center h-10 w-full border-emerald-400 bg-gradient-to-t from-emerald-400/100 rounded-sm to-emerald-400/20 mt-3 font-wavacorp">3</div>
          </div>
        </div>
        <div className="w-full relative">
          <div className="overflow-hidden rounded-lg">
            <div className="flex" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
              <div className="min-w-0 flex-[0_0_100%] px-0" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                <div className="relative group">
                  <div className="relative w-full h-28 sm:h-32">
                    <img alt="Advertisement Banner 1" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={adsBanner} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-[0_0_100%] px-0">
                <div className="relative group">
                  <div className="relative w-full h-28 sm:h-32">
                    <img alt="Advertisement Banner 2" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={adsBanner} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-[0_0_100%] px-0">
                <div className="relative group">
                  <div className="relative w-full h-28 sm:h-32">
                    <img alt="Advertisement Banner 3" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={adsBanner} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-[0_0_100%] px-0">
                <div className="relative group">
                  <div className="relative w-full h-28 sm:h-32">
                    <img alt="Advertisement Banner 4" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={adsBanner} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="space-y-2 transition-transform duration-300 ease-out" style={{ transform: 'translateX(0px)' }}>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20">
                  <img alt="Iwak999" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#1</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">Iwak999</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">5,998 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">18,077.5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="choigapro" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#2</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">choigapro</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">3,728 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">15,430.2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="asip90" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#3</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">asip90</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">3,024 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">8,083.4</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="nst2mohn" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#3</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">nst2mohn</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">2,581 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">12,864.2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="Albarra" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">Albarra</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">2,540 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">6,817.4</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="Ooy721" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">Ooy721</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">2,241 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">5,138.8</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="Alijondan" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">Alijondan</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">2,030 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">5,518.4</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="Fundamental" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">Fundamental</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">1,857 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">5,078.7</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="R_Yudi" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">R_Yudi</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">1,841 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">4,988.5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/20"><img alt="sontran" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 min-w-6 h-4 px-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[10px] font-medium text-white/90">#4</div>
              </div>
              <div className="flex-grow flex items-center justify-between">
                <span className="text-white text-sm font-medium">sontran</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-white/80 text-sm">1,500 Shares</span>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-selsila-green text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                      <path fill="currentColor" d="M207.58 63.84C186.85 53.48 159.33 48 128 48s-58.85 5.48-79.58 15.84S16 88.78 16 104v48c0 15.22 11.82 29.85 32.42 40.16S96.67 208 128 208s58.85-5.48 79.58-15.84S240 167.22 240 152v-48c0-15.22-11.82-29.85-32.42-40.16m-87.58 96v32c-19-.62-35-3.42-48-7.49v-31.3a203.4 203.4 0 0 0 48 6.81Zm16 0a203.4 203.4 0 0 0 48-6.81v31.31c-13 4.07-29 6.87-48 7.49ZM32 152v-18.47a83 83 0 0 0 16.42 10.63c2.43 1.21 5 2.35 7.58 3.43V178c-15.83-7.84-24-17.71-24-26m168 26v-30.41c2.61-1.08 5.15-2.22 7.58-3.43A83 83 0 0 0 224 133.53V152c0 8.29-8.17 18.16-24 26"></path>
                    </svg>
                    <span className="text-white/60 text-sm">3,895.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 pt-6 px-4">
            <button disabled="" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                <path fill="currentColor" d="M168 48v160a8 8 0 0 1-13.66 5.66l-80-80a8 8 0 0 1 0-11.32l80-80A8 8 0 0 1 168 48"></path>
              </svg>
              <span className="hidden sm:inline text-sm font-medium text-white/80">Previous</span>
            </button>
            <div className="flex items-center gap-1"><button className="px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 min-w-[32px] sm:min-w-[40px] text-sm bg-emerald-500 text-white font-medium">1</button><button className="px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 min-w-[32px] sm:min-w-[40px] text-sm bg-white/10 hover:bg-white/20 text-white/80 hover:text-white">3</button></div>
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30">
              <span className="hidden sm:inline text-sm font-medium text-white/80">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ph text-sm" width="1em" height="1em" viewBox="0 0 256 256">
                <path fill="currentColor" d="m181.66 133.66l-80 80A8 8 0 0 1 88 208V48a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0 11.32"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}