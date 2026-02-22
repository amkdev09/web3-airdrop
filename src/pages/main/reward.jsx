import React, { useMemo } from "react";

/* ------------------ MOCK DATA ------------------ */

const TOTAL_REQUIRED = 10;
const currentInvites = 3;

const gifts = [
    { name: "iPhone 16", image: "/images/iphone16.png" },
    { name: "Selsila Cap", image: "/images/cap.png" },
    { name: "Selsila T-Shirt", image: "/images/shirt.png" },
    { name: "Selsila Tumblr", image: "/images/tumbler.png" },
    { name: "Selsila Umbrella", image: "/images/umbrella.png" },
    { name: "20 Selsila Token", image: "/images/20token.png" },
    { name: "10 Selsila Token", image: "/images/10token.png" },
    { name: "5 Selsila Token", image: "/images/5token.png" },
];

const recentActivity = [
    {
        title: "Welcome Reward",
        amount: "+2.5 Selsila",
        date: "2/22/2026",
    },
];

/* ------------------ PAGE ------------------ */

export default function RewardPage() {
    const progressBars = useMemo(() => {
        return Array.from({ length: TOTAL_REQUIRED });
    }, []);

    return (
        <main className="max-w-5xl w-full mx-auto pt-12 px-4 text-white">

            <HeaderSection />

            <ProgressCard
                progressBars={progressBars}
                currentInvites={currentInvites}
            />

            <ReferralSection />

            <GiftSection />

            <RecentActivitySection />
        </main>
    );
}

/* ------------------ COMPONENTS ------------------ */

function HeaderSection() {
    return (
        <div className="space-y-5 text-center">
            <h1 className="text-3xl tracking-widest uppercase font-bold">
                Reward
            </h1>
            <p className="text-base leading-6 max-w-lg mx-auto text-gray-300">
                Invite your friends and earn big! For every 10 successful invitations,
                you'll get a chance to win exclusive gifts. Start inviting now!
            </p>
        </div>
    );
}

/* ------------------ PROGRESS ------------------ */

function ProgressCard({ progressBars, currentInvites }) {
    return (
        <div className="mt-10 bg-slate-900/70 border border-emerald-400/20 backdrop-blur-md p-6 rounded-2xl relative">

            <div className="flex justify-end">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-400/10 border border-emerald-400/30 hover:bg-emerald-400/20 transition">
                    Share Now
                </button>
            </div>

            <p className="mt-4 text-sm text-gray-400">
                Each bar represents 1 invitation. Collect 10 invitations to claim your reward!
            </p>

            <div className="flex items-end justify-center gap-3 mt-8">
                {progressBars.map((_, index) => (
                    <ProgressBar
                        key={index}
                        active={index < currentInvites}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

function ProgressBar({ active, index }) {
    const height = 40 + index * 25;

    return (
        <div
            className={`w-6 sm:w-7 border-2 rounded-sm transition-all duration-700 ease-out
      ${active
                    ? "border-emerald-400 bg-gradient-to-b from-emerald-400 to-transparent shadow-lg shadow-emerald-400/40"
                    : "border-white/10 bg-gradient-to-b from-white/10 to-transparent"
                }`}
            style={{ height }}
        />
    );
}

/* ------------------ REFERRAL ------------------ */

function ReferralSection() {
    return (
        <div className="mt-8 text-center space-y-3">
            <p className="text-white">
                The more you share, the more you earn — start referring now!
            </p>

            <div className="flex gap-2 bg-indigo-900/40 p-3 rounded-xl border border-purple-500">
                <p className="truncate text-white">
                    https://selsi.io/?ref=Amk5419
                </p>
                <button className="ml-auto bg-white/10 px-3 rounded-lg hover:bg-white/20 transition">
                    Copy
                </button>
            </div>
        </div>
    );
}

/* ------------------ GIFTS ------------------ */

function GiftSection() {
    return (
        <div className="mt-12">
            <p className="text-center mb-6">
                Gift for completing 10 referrals
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {gifts.map((gift, index) => (
                    <GiftCard key={index} gift={gift} />
                ))}
            </div>
        </div>
    );
}

function GiftCard({ gift }) {
    return (
        <div className="bg-slate-900/70 border border-cyan-400/30 rounded-xl p-5 flex flex-col items-center text-center hover:border-cyan-400/50 transition">
            <div className="h-24 w-24 mb-3">
                <img
                    src={gift.image}
                    alt={gift.name}
                    className="object-contain h-full w-full"
                />
            </div>
            <p className="text-sm">{gift.name}</p>
        </div>
    );
}

/* ------------------ ACTIVITY ------------------ */

function RecentActivitySection() {
    return (
        <div className="mt-12">
            <p className="mb-4">Recent Activity:</p>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 max-h-72 overflow-y-auto">
                {recentActivity.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 border-b last:border-b-0 border-white/10 py-4"
                    >
                        <div>
                            <h3 className="text-sm font-medium">{item.title}</h3>
                            <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                        <p className="text-sm text-right self-center text-gray-300">
                            {item.amount}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}