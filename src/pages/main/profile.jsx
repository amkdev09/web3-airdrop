import React from "react";

export default function ProfilePage() {
    const user = {
        name: "Amk",
        email: "amar@corazor.com",
        avatar: "https://avatar.vercel.sh/amar@corazor.com",
        wallet: null,
        referralCode: "Amk5419",
    };

    return (
        <main className="max-w-[480px] w-full mx-auto text-white">
            <Header />

            <KYCWarning />

            <ProfileCard user={user} />

            <LogoutButton />

            <SupportSection />
        </main>
    );
}

/* ================= HEADER ================= */

function Header() {
    return (
        <div className="space-y-2 mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl tracking-widest uppercase font-bold">
                Profile
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
                Manage your profile information.
            </p>
        </div>
    );
}

/* ================= KYC WARNING ================= */

function KYCWarning() {
    return (
        <div className="mb-6 bg-orange-500/20 rounded-2xl border border-orange-500/30 p-4">
            <div className="flex items-start gap-3">
                <div className="text-orange-500 mt-1">⚠️</div>
                <div className="space-y-2">
                    <p className="text-sm text-orange-400">
                        Complete KYC verification before claiming your tokens.
                    </p>
                    <a
                        href="/profile/kyc"
                        className="block text-xs font-semibold text-orange-500 hover:underline"
                    >
                        Verify Now →
                    </a>
                </div>
            </div>
        </div>
    );
}

/* ================= PROFILE CARD ================= */

function ProfileCard({ user }) {
    return (
        <div className="bg-white/5 rounded-3xl border border-white/10 p-6 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="relative size-16 sm:size-20 rounded-full overflow-hidden bg-white/5 mb-4">
                    <img
                        src={user.avatar}
                        alt="Profile"
                        className="rounded-full object-cover mb-4"
                    />
                </div>
                <h2 className="text-lg font-medium">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
            </div>

            <div className="space-y-5 pt-5 border-t border-white/10">
                <InfoItem
                    label="Wallet Address"
                    value={user.wallet || "Not Available"}
                    muted={!user.wallet}
                />

                <InfoItem
                    label="Referral Code"
                    value={user.referralCode}
                />
            </div>
        </div>
    );
}

/* ================= INFO ITEM ================= */

function InfoItem({ label, value, muted }) {
    return (
        <div>
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p
                className={`text-sm font-medium ${muted ? "text-white/50" : "text-white"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

/* ================= LOGOUT ================= */

function LogoutButton() {
    return (
        <button className="w-full py-3 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors mb-6">
            Logout
        </button>
    );
}

/* ================= SUPPORT ================= */

function SupportSection() {
    return (
        <p className="text-center text-sm text-gray-400">
            Need help? Contact us on{" "}
            <a
                href="https://t.me/SelsilaOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
            >
                Telegram
            </a>
        </p>
    );
}