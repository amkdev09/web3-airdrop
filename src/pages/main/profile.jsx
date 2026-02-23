import React from "react";
import userProfile from '../../assets/images/userProfile.webp'
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
    }
    return (
        <main className="max-w-120 w-full mx-auto pt-12 px-4">
            <div className="space-y-2 mb-6">
                <h1 className="text-2xl sm:text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">Profile</h1>
                <p className="text-center text-sm sm:text-base leading-6">Manage your profile information.</p>
            </div>
            <div className="mb-6 w-full bg-orange-500/20 backdrop-blur-md rounded-2xl border border-orange-500/30 p-4">
                <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5 text-orange-500 shrink-0" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022zM12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clip-rule="evenodd"></path>
                    </svg>
                    <div className="space-y-2.5">
                        <p className="text-sm text-orange-400/90">Complete KYC verification before claiming your tokens.</p>
                        <a className="block text-orange-500 hover:underline font-semibold text-xs" href="/profile/kyc">Verify Now →</a>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="relative w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative size-16 sm:size-20 rounded-full overflow-hidden bg-white/5 mb-4">
                            <img alt="Profile" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={userProfile} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} />
                        </div>
                        <div className="min-w-0 w-full">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <h2 className="text-lg font-medium text-white truncate">Amk</h2>
                            </div>
                            <p className="text-sm text-[#D9D9D9] truncate">amar@corazor.com</p>
                        </div>
                    </div>
                    <div className="space-y-5 pt-5 border-t border-white/10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-4 text-[#D9D9D9]" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                                    <path fill="currentColor" fill-rule="evenodd" d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z" clip-rule="evenodd"></path>
                                </svg>
                                <span className="text-sm text-[#D9D9D9]">Wallet Address</span>
                            </div>
                            <p className="text-sm text-white/50 font-medium">Not Available</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ci size-4 text-[#D9D9D9]" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6H6c-.932 0-1.398 0-1.766.152a2 2 0 0 0-1.082 1.083C3 7.602 3 8.068 3 9a3 3 0 1 1 0 6c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C4.602 18 5.068 18 6 18h8m0-12h4c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C21 7.602 21 8.068 21 9a3 3 0 1 0 0 6c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C19.398 18 18.932 18 18 18h-4m0-12v12"></path>
                                </svg>
                                <span className="text-sm text-[#D9D9D9]">Referral Code</span>
                            </div>
                            <p className="text-sm text-white/50 font-medium">Amk5419</p>
                        </div>
                    </div>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75" clip-rule="evenodd"></path>
                        <path fill="currentColor" d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"></path>
                    </svg>
                    <span>Logout</span>
                </button>
                <p className="text-center text-sm text-[#D9D9D9] mt-6">Need help? Contact us on <a href="https://t.me/SelsilaOfficial" target="_blank" rel="noopener noreferrer" className="text-selsila-purple hover:underline">Telegram</a></p>
            </div>
        </main>
    );
}