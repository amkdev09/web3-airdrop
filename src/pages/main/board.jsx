import React, { useRef, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

/* ================= MOCK DATA ================= */

const topThree = [
  { id: 1, name: "Pavani", shares: 6, score: 6, avatar: "/avatars/1.jpg" },
  { id: 2, name: "nst2mohn", shares: 6, score: 6, avatar: "/avatars/2.jpg" },
  { id: 3, name: "asip90", shares: 5, score: 5, avatar: "/avatars/3.jpg" },
];

const leaderboardData = Array.from({ length: 1000 }).map((_, i) => ({
  id: i + 4,
  rank: i + 4,
  name: `User_${i + 4}`,
  shares: Math.floor(Math.random() * 10),
  score: Math.floor(Math.random() * 10),
  avatar: "/avatars/default.jpg",
}));

/* ================= MAIN COMPONENT ================= */

export default function Leaderboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-12 text-white">
      <h1 className="text-3xl font-bold text-center mb-10 tracking-widest uppercase">
        Leaderboard
      </h1>

      <TopThree users={topThree} />

      <LeaderboardList users={leaderboardData} />
    </div>
  );
}

/* ================= TOP 3 PODIUM ================= */

function TopThree({ users }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-12 items-end">
      {users.map((user, index) => (
        <div
          key={user.id}
          className={`text-center ${
            index === 0 ? "order-2 scale-110" : ""
          }`}
        >
          <img
            src={user.avatar}
            width={80}
            height={80}
            alt={user.name}
            className="mx-auto rounded-full border-4 border-yellow-400 object-cover"
          />

          <p className="mt-2 font-semibold">{user.name}</p>
          <p className="text-sm text-gray-400">
            Shares: {user.shares}
          </p>

          <div
            className={`mt-4 rounded-t-xl py-3 text-xl font-bold ${
              index === 0
                ? "bg-yellow-500 h-24"
                : index === 1
                ? "bg-gray-400 h-20"
                : "bg-orange-500 h-16"
            }`}
          >
            #{index + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================= VIRTUALIZED LIST ================= */

function LeaderboardList({ users }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-[500px] overflow-auto rounded-2xl border border-white/10 bg-white/5"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];

          return (
            <div
              key={user.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <LeaderboardRow user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= ROW COMPONENT ================= */

const LeaderboardRow = memo(function LeaderboardRow({ user }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 hover:bg-white/10 transition">
      <div className="flex items-center gap-4">
        <span className="w-8 text-center font-bold text-gray-400">
          #{user.rank}
        </span>

        <img
          src={user.avatar}
          width={48}
          height={48}
          alt={user.name}
          className="rounded-full object-cover"
        />

        <span>{user.name}</span>
      </div>

      <div className="text-sm text-gray-300">
        {user.shares} Shares | {user.score} Score
      </div>
    </div>
  );
});