import React from "react";

const dailyTasks = [
    { title: "Watch Selsila Premium Youtube", reward: "+0.3 SELSI", action: "Watch" },
    { title: "Watch Selsila Video Daily", reward: "+0.3 SELSI", action: "Watch" },
    { title: "Watch Video On Facebook", reward: "+0.2 SELSI", action: "Watch" },
    { title: "Watch Video on Selsila Instagram", reward: "+0.2 SELSI", action: "Watch" },
];

const earnMoreTasks = [
    { title: "Welcome Reward", reward: "+2.5 SELSI", completed: true },
    { title: "Follow Selsila X", reward: "+0.6 SELSI", action: "Follow" },
    { title: "Join Selsila Telegram Chat", reward: "+0.6 SELSI", action: "Start" },
    { title: "Subscribe Selsila Youtube Channel", reward: "+0.6 SELSI", action: "Follow" },
    { title: "Follow Selsila Instagram", reward: "+0.5 SELSI", action: "Follow" },
    { title: "Join Selsila Telegram Channel", reward: "+0.5 SELSI", action: "Start" },
    { title: "Follow Selsila Facebook", reward: "+0.3 SELSI", action: "Follow" },
    { title: "Join Selsila Whatsapp", reward: "+0.3 SELSI", action: "Start" },
    { title: "Follow Selsila Threads", reward: "+0.2 SELSI", action: "Follow" },
    { title: "Follow Selsila TikTok", reward: "+0.2 SELSI", action: "Follow" },
];

export default function AirdropPage() {
    return (
        <main className="max-w-5xl w-full mx-auto pt-12 px-4 text-white">
            {/* Header */}
            <div className="text-center space-y-3">
                <h1 className="text-3xl tracking-widest uppercase font-bold">
                    Airdrop
                </h1>
                <p className="text-sm uppercase tracking-[0.3em]">
                    Listing Price = USD 3
                </p>
            </div>

            {/* Earnings Card */}
            <div className="mt-8 bg-gradient-to-br from-purple-800/40 to-cyan-700/40 rounded-3xl p-8 border border-purple-500">
                <div className="flex justify-between items-center">
                    <p className="text-gray-300">Total Earning</p>
                    <p className="text-3xl font-bold">$7.50</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-8">
                    <StatBox value="2.5" label="YOUR HOLDINGS" />
                    <StatBox value="0" label="YOUR PARTNER" />
                </div>
            </div>

            {/* Claim Section */}
            <div className="mt-10 space-y-4">
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    Wallet address not set.
                </div>

                <button
                    disabled
                    className="w-full h-14 rounded-xl bg-gradient-to-b from-pink-400/70 to-cyan-600/70 uppercase tracking-widest disabled:opacity-50"
                >
                    Claim NFT POH
                </button>

                <button
                    disabled
                    className="w-full h-14 rounded-xl bg-gradient-to-b from-purple-400/70 to-cyan-600/70 uppercase tracking-widest disabled:opacity-50"
                >
                    Claim Token
                </button>

                <p className="text-xs text-gray-400 text-center">
                    Complete your identity verification (KYC) to claim tokens.
                </p>
            </div>

            {/* Referral */}
            <div className="mt-10 text-center space-y-3">
                <p>The more you share, the more you earn — start referring now!</p>
                <div className="flex items-center bg-indigo-900/40 p-3 rounded-xl border border-purple-500">
                    <span className="truncate">
                        https://selsi.io/?ref=Amk5419
                    </span>
                    <button className="ml-auto bg-white/10 px-3 py-1 rounded-lg text-sm">
                        Copy
                    </button>
                </div>
            </div>

            {/* Daily Tasks */}
            <TaskSection title="Daily Task" tasks={dailyTasks} />

            {/* Earn More */}
            <TaskSection title="Earn More Selsila" tasks={earnMoreTasks} />
        </main>
    );
}

/* ------------------ Components ------------------ */

function StatBox({ value, label }) {
    return (
        <div className="bg-gradient-to-r from-purple-700/40 to-cyan-700/40 rounded-xl py-4 text-center border border-purple-500">
            <p className="text-xl font-semibold">{value}</p>
            <p className="text-xs text-gray-300">{label}</p>
        </div>
    );
}

function TaskSection({ title, tasks }) {
    return (
        <section className="mt-12 space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            {tasks.map((task, index) => (
                <TaskCard key={index} {...task} />
            ))}
        </section>
    );
}

function TaskCard({ title, reward, action, completed }) {
    return (
        <div className="flex justify-between items-center p-4 rounded-xl border border-purple-500 bg-white/5">
            <div>
                <h3 className="text-base">{title}</h3>
                <p className="text-xs text-gray-400">{reward}</p>
            </div>

            {completed ? (
                <span className="text-green-400 font-semibold">✓</span>
            ) : (
                action && (
                    <button className="text-sm px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 transition">
                        {action}
                    </button>
                )
            )}
        </div>
    );
}