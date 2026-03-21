import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const PAGE_SIZE = 20;

/** txType from API: 1=Invest, 2=Reinvest, 3=WithdrawIncome, 4=WithdrawCapital */
const TX_TYPE_LABELS = {
    1: "Invest",
    2: "Reinvest",
    3: "Withdraw Income",
    4: "Withdraw Capital",
};

function formatNumber(val) {
    if (val == null || val === "") return "—";
    const num = Number(val);
    if (Number.isNaN(num)) return String(val);
    return num.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatDateTime(timestamp) {
    if (timestamp == null || timestamp === "") return "—";
    const date = new Date(
        typeof timestamp === "number" && timestamp < 1e12 ? timestamp * 1000 : timestamp
    );
    if (Number.isNaN(date.getTime())) return String(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${day}.${month}.${year} ${hh}:${mm}:${ss}`;
}

function getTxTypeLabel(txType) {
    return TX_TYPE_LABELS[txType] ?? `Type ${txType}`;
}

/** Single row: timestamp, txType, amount, cycleNumber (API response shape) */
function TransactionCard({ entry, index }) {
    const typeLabel = getTxTypeLabel(entry.txType);
    const isWithdraw = entry.txType === 3 || entry.txType === 4;
    const isInvest = entry.txType === 1 || entry.txType === 2;

    return (
        <div
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
            data-testid={`transaction-entry-${index}`}
        >
            <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 sm:gap-y-0">
                <div>
                    <p className="text-xs text-[#D9D9D9] mb-0.5">Type</p>
                    <p className="text-sm font-medium text-white">{typeLabel}</p>
                </div>
                <div>
                    <p className="text-xs text-[#D9D9D9] mb-0.5">Amount (USDT)</p>
                    <p
                        className={`text-sm font-medium ${
                            isInvest ? "text-[var(--color-selsila-green)]" : "text-sky-400"
                        }`}
                    >
                        {isWithdraw ? "−" : "+"}
                        {formatNumber(entry.amount)}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-[#D9D9D9] mb-0.5">Date & Time</p>
                    <p className="text-sm text-white">{formatDateTime(entry.timestamp)}</p>
                </div>
                <div>
                    <p className="text-xs text-[#D9D9D9] mb-0.5">Cycle</p>
                    <p className="text-sm text-white">
                        {entry.cycleNumber != null && entry.cycleNumber !== ""
                            ? `#${entry.cycleNumber}`
                            : "—"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function TransactionHistory() {
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);

    const {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["transactionLogs", offset],
        queryFn: () => userServices.getTransactionLogs({ limit: PAGE_SIZE, offset }),
        staleTime: 60 * 1000,
        placeholderData: (prev) => prev,
    });

    const { entries = [], total = 0, limit = PAGE_SIZE } = data ?? {};
    const hasMore = offset + entries.length < total;
    const currentCount = offset + entries.length;

    const goNext = useCallback(() => {
        setOffset((o) => o + PAGE_SIZE);
    }, []);

    const goPrev = useCallback(() => {
        setOffset((o) => Math.max(0, o - PAGE_SIZE));
    }, []);

    const showPagination = total > PAGE_SIZE;
    const isLoadingOrFetching = isLoading || isFetching;

    return (
        <main className="max-w-120 w-full mx-auto pt-4 px-4 pb-8">
            <div className="flex justify-start">
                <button
                    type="button"
                    className="cursor-pointer p-1 -m-1"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    <MdOutlineArrowBackIosNew className="text-2xl text-[var(--color-selsila-green)]" />
                </button>
            </div>

            <div className="space-y-3 mt-3">
                <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">
                    Transaction History
                </h1>
                <p className="text-center text-sm uppercase tracking-[0.3em] text-[#D9D9D9]">
                    Invest, reinvest & withdrawal logs
                </p>
            </div>

            <div className="mt-8 space-y-4">
                {isLoading && !data ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <div className="w-10 h-10 border-2 border-[var(--color-selsila-green)] border-t-transparent rounded-full animate-spin" />
                        <p className="text-[#D9D9D9]">Loading transactions…</p>
                    </div>
                ) : isError ? (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                        <p className="text-red-300 font-medium">Failed to load transactions</p>
                        <p className="text-sm text-red-200/80 mt-1">
                            {error?.message ?? "Something went wrong."}
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-selsila-green)] text-white text-sm font-medium hover:opacity-90"
                        >
                            Try again
                        </button>
                    </div>
                ) : !entries.length ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-12 text-center">
                        <p className="text-[#D9D9D9]">No transactions yet</p>
                        <p className="text-sm text-[#D9D9D9]/80 mt-1">
                            Your invest, reinvest and withdrawal history will appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-xs text-[#D9D9D9]">
                            Showing {currentCount} of {total} entries
                        </p>
                        <ul className="space-y-3 list-none p-0 m-0">
                            {entries.map((entry, idx) => (
                                <li key={`${entry.timestamp}-${idx}-${entry.txType}-${entry.amount}`}>
                                    <TransactionCard entry={entry} index={offset + idx} />
                                </li>
                            ))}
                        </ul>

                        {showPagination && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    disabled={offset === 0 || isLoadingOrFetching}
                                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-[#D9D9D9]">
                                    {offset + 1}–{Math.min(offset + limit, total)} of {total}
                                </span>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    disabled={!hasMore || isLoadingOrFetching}
                                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {isFetching && data && (
                            <div className="flex justify-center py-2">
                                <div className="w-6 h-6 border-2 border-[var(--color-selsila-green)] border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
