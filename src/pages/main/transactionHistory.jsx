import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import userServices from "../../services/userServices";

const PAGE_SIZE = 10;

/** txType from API: 1=Deposit, 2=Redeposit, 3=WithdrawIncome, 4=WithdrawCapital */
const TX_TYPE_LABELS = {
  1: "Deposit",
  2: "Redeposit",
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
    typeof timestamp === "number" && timestamp < 1e12 ? timestamp * 1000 : timestamp,
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
  const t = Number(txType);
  return TX_TYPE_LABELS[t] ?? `Type ${txType}`;
}

function formatTxAmountLine(entry) {
  const raw = entry.amount;
  if (raw == null || raw === "") return "—";
  const n = Number(raw);
  if (Number.isNaN(n)) return String(raw);
  const tx = Number(entry.txType);
  const isWithdraw = tx === 3 || tx === 4;
  const sign = isWithdraw ? "−" : "+";
  return `${sign}${formatNumber(Math.abs(n))} USDT`;
}

function TransactionHistoryList({ address }) {
  const [offset, setOffset] = useState(0);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["transactionLogs", address, offset],
    queryFn: () =>
      userServices.getTransactionLogs({ limit: PAGE_SIZE, offset }),
    enabled: !!address,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const { entries = [], total = 0, limit = PAGE_SIZE } = data ?? {};
  const hasMore = offset + entries.length < total;
  const showPagination = total > PAGE_SIZE;
  const isLoadingOrFetching = isLoading || isFetching;

  const goNext = useCallback(() => {
    setOffset((o) => o + PAGE_SIZE);
  }, []);

  const goPrev = useCallback(() => {
    setOffset((o) => Math.max(0, o - PAGE_SIZE));
  }, []);

  if (isLoading && !data) {
    return (
      <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-10 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-cyan-400/60 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading transactions…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-red-300 font-medium text-sm">Failed to load transactions</p>
        <p className="text-xs text-red-200/80 mt-1">
          {error?.message ?? "Something went wrong."}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-center text-sm text-gray-400">
        No transactions yet.
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 max-h-64 sm:max-h-80 overflow-y-auto">
        {entries.map((entry, idx) => (
          <div
            key={`${offset}-${idx}-${entry.timestamp}-${entry.txType}-${entry.amount}-${entry.cycleNumber}`}
            className="grid grid-cols-2 gap-x-2 border-b last:border-b-0 border-white/10 py-4"
            data-testid={`transaction-entry-${offset + idx}`}
          >
            <div className="min-w-0 space-y-1">
              <h3 className="text-sm sm:text-base font-medium text-left text-white">
                {getTxTypeLabel(entry.txType)}
              </h3>
              <p className="text-xs text-gray-400">{formatDateTime(entry.timestamp)}</p>
              {entry.cycleNumber != null && entry.cycleNumber !== "" ? (
                <p className="text-xs text-gray-400">Cycle #{entry.cycleNumber}</p>
              ) : null}
            </div>
            <p className="text-xs sm:text-sm text-gray-400 text-right self-center">
              {formatTxAmountLine(entry)}
            </p>
          </div>
        ))}
      </div>

      {showPagination && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={goPrev}
            disabled={offset === 0 || isLoadingOrFetching}
            className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 border border-white/10"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            {offset + 1}–{Math.min(offset + limit, total)} of {total}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!hasMore || isLoadingOrFetching}
            className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 border border-white/10"
          >
            Next
          </button>
        </div>
      )}

      {isFetching && data && (
        <div className="flex justify-center py-1">
          <div className="w-6 h-6 border-2 border-cyan-400/60 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}

export default function TransactionHistory() {
  const navigate = useNavigate();
  const { address } = useAuth();

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
          Transaction Logs
        </h1>
        <p className="text-center text-sm uppercase tracking-[0.3em] text-[#D9D9D9]">
          Deposit, redeposit & withdrawal logs
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-sm sm:text-base text-white">Recent transactions :</p>

        {!address ? (
          <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-center text-sm text-gray-400">
            Connect wallet to view transaction logs.
          </div>
        ) : (
          <TransactionHistoryList key={address} address={address} />
        )}
      </div>
    </main>
  );
}
