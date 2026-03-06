import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

/**
 * Format number with commas (e.g. 64297.10 → "64,297.10")
 */
function formatNumber(val) {
    if (val == null || val === "") return "—";
    const num = Number(val);
    if (Number.isNaN(num)) return String(val);
    return num.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/**
 * Format timestamp to "DD. MM HH:mm:ss"
 */
function formatDateTime(timestamp) {
    if (timestamp == null || timestamp === "") return "—";
    const date = new Date(
        typeof timestamp === "number" && timestamp < 1e12 ? timestamp * 1000 : timestamp
    );
    if (Number.isNaN(date.getTime())) return String(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${day}. ${month} ${hh}:${mm}:${ss}`;
}

/**
 * Normalize transaction item from API (supports multiple field naming conventions)
 */
function normalizeTx(tx) {
    if (!tx || typeof tx !== "object") return null;
    return {
        symbol: tx.symbol ?? tx.pair ?? tx.asset ?? "—",
        amount: tx.amount ?? tx.amountUsdt ?? tx.size ?? 0,
        entryPrice: tx.entryPrice ?? tx.entry ?? 0,
        closePrice: tx.closePrice ?? tx.close ?? tx.exitPrice ?? 0,
        pnl: tx.pnl ?? tx.pnlUsdt ?? tx.profit ?? 0,
        pnlRate: tx.pnlRate ?? tx.roi ?? tx.rate ?? 0,
        openTime: tx.openTime ?? tx.openAt ?? tx.createdAt ?? null,
        closeTime: tx.closeTime ?? tx.closedAt ?? tx.updatedAt ?? null,
        status: (tx.status ?? tx.result ?? "").toLowerCase(),
    };
}

const ArrowUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4 shrink-0 text-[var(--color-selsila-green)]"
    >
        <path d="M7 14l5-5 5 5H7z" />
    </svg>
);

const defaultTransaction = [{
    symbol: "BTC",
    amount: 100,
    pnl: 100,
    pnlRate: 100,
    entryPrice: 100,
    closePrice: 100,
    closeTime: "2021-01-01 12:00:00",
}];

export default function TransactionHistory() {
    const navigate = useNavigate();
    const data = defaultTransaction;
    const isLoading = false;
    // const { data = defaultTransaction, isLoading } = useQuery({
    //     queryKey: ["transactionHistory"],
    //     queryFn: () => userServices.transactionHistory(),
    // });

    const transactions = React.useMemo(() => {
        const raw = Array.isArray(data) ? data : data?.transactions ?? data?.data ?? [];
        return raw.map(normalizeTx).filter(Boolean);
    }, [data]);

    return (
        <main className="max-w-120 w-full mx-auto pt-4 px-4">
            <div className="flex justify-start">
                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    <MdOutlineArrowBackIosNew className="text-2xl text-[var(--color-selsila-green)]" />
                </button>
            </div>

            <div className="space-y-3 mt-3">
                <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">
                    Transaction
                </h1>
                <p className="text-center text-sm uppercase tracking-[0.3em] text-[#D9D9D9]">
                    Your past transactions
                </p>
            </div>

            <div className="mt-8 space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <p className="text-[#D9D9D9]">Loading...</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="rounded-2xl border border-selsila-purple bg-white/5 backdrop-blur-md p-8 text-center">
                        <p className="text-[#D9D9D9]">No transactions yet</p>
                    </div>
                ) : (
                    transactions.map((tx, idx) => {
                        const isWin = tx.status === "win" || (tx.pnl > 0 && tx.status !== "lose");
                        const winClass = "text-[var(--color-selsila-green)]";
                        const loseClass = "text-red-400";

                        return (
                            <div
                                key={tx.symbol + idx}
                                className="border-b rounded-lg shadow-md bg-white/5 backdrop-blur-md overflow-hidden"
                            >
                                {/* Details grid */}
                                <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-4">
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Amount (USDT)</p>
                                        <p className="text-sm text-white">{formatNumber(tx.amount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Pnl Rate</p>
                                        <p
                                            className={`text-sm font-medium ${isWin ? winClass : loseClass
                                                }`}
                                        >
                                            {formatNumber(tx.pnlRate)}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Entry Price</p>
                                        <p className="text-sm text-white">
                                            {formatNumber(tx.entryPrice)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Close Price</p>
                                        <p className="text-sm text-white">
                                            {formatNumber(tx.closePrice)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Close Time</p>
                                        <p className="text-sm text-white">
                                            {formatDateTime(tx.closeTime)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Open Time</p>
                                        <p className="text-sm text-white">
                                            {formatDateTime(tx.openTime)}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-[#D9D9D9] mb-0.5">Status</p>
                                        <p
                                            className={`text-sm font-medium capitalize ${isWin ? winClass : loseClass
                                                }`}
                                        >
                                            {isWin ? "Win" : "Lose"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
}
