import React from "react";
import abstractDistant from "../../assets/images/abstract-distant.webp";
import selsilaBrandLogo from "../../assets/images/selsila-brand-horizontal.webp";

export default function AirdropPage() {
    return (
        <main className="max-w-120 w-full mx-auto pt-12 px-4">
            <div className="flex justify-end">
                <div>
                    <button className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ic size-7 text-[#009C8A]" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="space-y-3 -mt-3">
                <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">Team</h1>
                <p className="text-center text-sm uppercase tracking-[0.3em]">LISTING PRICE = USD 3</p>
            </div>
            <div className="mt-5">
                <div>
                    <div className="relative w-full aspect-video overflow-hidden rounded-4xl border-[1.5px] border-selsila-purple">
                        <div className="relative w-full h-full">
                            <img alt="abstract-distant" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={abstractDistant} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                        </div>
                        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <p className="text-base text-[#D9D9D9]">Amk</p>
                                </div>
                                <img alt="sesila logo" loading="lazy" width="120" height="40" decoding="async" data-nimg="1" className="ml-auto" src={selsilaBrandLogo} style={{ color: 'transparent' }} />
                            </div>
                            <div className="space-y-0.5 sm:space-y-2 mt-4 sm:mt-5">
                                <p className="text-sm text-gray-400">Total Earning</p>
                                <p className="text-2xl sm:text-4xl text-[#D9D9D9]">$7.50</p>
                            </div>
                            <div className="mt-auto flex justify-end text-sm">
                                <button className="flex items-center gap-1 text-[#D9D9D9] text-sm cursor-pointer" id="headlessui-menu-button-«r2»" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                                    Currency
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--line-md" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-dasharray="10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l-5 -5M12 15l5 -5">
                                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="10;0"></animate>
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 auto-rows-auto mt-8">
                        <div className="flex flex-col gap-y-0.5 bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
                            <p className="text-xl font-sans text-center">2.5</p>
                            <p className="text-xs text-center text-[#D9D9D9]">MY DEPOSIT</p>
                        </div>
                        <div className="flex flex-col gap-y-0.5 bg-linear-(--hologram-gradient) shadow-cyan-neon py-1.5 rounded-xl border border-selsila-purple">
                            <p className="text-xl font-sans text-center">0</p>
                            <p className="text-xs text-center text-[#D9D9D9]">TEAM DEPOSIT</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-2 text-[#D9D9D9] text-sm cursor-pointer h-14 border border-white/5 bg-white/10 backdrop-blur-md w-full rounded-xl px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5 shrink-0" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                            <path fill="currentColor" fill-rule="evenodd" d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z" clip-rule="evenodd"></path>
                        </svg>
                        <p className="text-sm">Wallet address not set.</p>
                    </div>
                    <div>
                        <p className="text-base text-white">Personal</p>
                        <div className="grid grid-cols-3 gap-x-2">
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(255,135,149,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Claim</button>
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(190,135,255,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Amount</button>
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(190,135,255,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Reinvest</button>
                        </div>
                    </div>
                    <div>
                        <p className="text-base text-white">Team</p>
                        <div className="grid grid-cols-3 gap-x-2">
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(255,135,149,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Claim</button>
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(190,135,255,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Amount</button>
                            <button disabled="" className="flex gap-2.5 justify-center items-center bg-gradient-to-b from-[rgba(190,135,255,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Reinvest</button>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-3">Complete your identity verification (KYC) in your profile to be eligible for claiming tokens.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 space-y-3">
                <p className="text-base max-w-xs mx-auto text-white text-center leading-5">The more you share, the more you earn <br /> start referring now!</p>
                <div className="flex gap-2 bg-[#1A1A52B2] shadow-cyan-neon p-3 rounded-xl border border-selsila-purple undefined">
                    <p className="text-base text-white truncate">https://selsi.io/?ref=Amk5419</p>
                    <div className="ml-auto flex items-center gap-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                                    <path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"></path>
                                </g>
                            </svg>
                        </button>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22m0-2q.425 0 .713-.287T18 19t-.288-.712T17 18t-.712.288T16 19t.288.713T17 20M5 13q.425 0 .713-.288T6 12t-.288-.712T5 11t-.712.288T4 12t.288.713T5 13m12.713-7.288Q18 5.426 18 5t-.288-.712T17 4t-.712.288T16 5t.288.713T17 6t.713-.288M17 5"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-base text-white">Claim</p>
                            <p className="text-base text-white">Reinvest</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Watch Selsila Premium Youtube</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.3 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Watch</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Watch Selsila Video Daily</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.3 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Watch</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Watch Video On Facebook</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.2 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Watch</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Watch Video on Selsila Instagram</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.2 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Watch</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-base text-white">Earn More Selsila</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Welcome Reward</h3>
                                        <p className="text-xs text-[#D9D9D9]">+2.5 SELSI</p>
                                    </div>
                                </div>
                                <div className="text-sm flex items-center justify-center size-8 rounded-full bg-green-500/20 text-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols size-6" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m10 13.6l5.9-5.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-6.6 6.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Follow Selsila X</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.6 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Join Selsila Telegram Chat</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.6 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Start</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Subscribe Selsila Youtube Channel</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.6 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Follow Selsila Instagram</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.5 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Join Selsila Telegram Channel</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.5 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Start</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Follow Selsila Facebook</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.3 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Join Selsila Whatsapp</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.3 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Start</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Follow Selsila Threads</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.2 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl border border-selsila-purple bg-white/5 backdrop-blur-md gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center size-10 shrink-0 rounded-full bg-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fluent size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764a2.25 2.25 0 0 0-2.236-2m-3.5 1.5h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5m2.25 6.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m.75 4.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 1 1 0-1.5m-2.47-5.22l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 1 1 1.06 1.06m0 4.44a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.47-1.47a.75.75 0 0 1 1.06 0"></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base text-white">Follow Selsila TikTok</h3>
                                        <p className="text-xs text-[#D9D9D9]">+0.2 SELSI</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3"><button className="text-sm px-4 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50">Follow</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}