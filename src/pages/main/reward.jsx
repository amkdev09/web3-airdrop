import React, { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import userServices from "../../services/userServices";
import {
  fetchAndBroadcast,
  ERROR_USER_REJECTED,
} from "../../lib/broadcastTransaction";
import useSnackbar from "../../hooks/useSnackbar";
import useAuth from "../../hooks/useAuth";
import { copyToClipboard } from "../../utils/utils";
import { GiCheckMark } from "react-icons/gi";

const INCOME_LOGS_PAGE_SIZE = 10;

function formatCurrency(value) {
  if (value == null || Number.isNaN(Number(value))) return "$0";
  const num = Number(value);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
  return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatIncomeTypeLabel(type) {
  if (type == null || type === "") return "Income";
  const s = String(type).replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function formatSelsilaAmount(amount) {
  if (amount == null || amount === "") return "—";
  const n = Number(amount);
  if (Number.isNaN(n)) return String(amount);
  const sign = n >= 0 ? "+" : "";
  const formatted = Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
  return `${sign}${formatted} Selsila`;
}

function formatIncomeLogTimestamp(timestamp) {
  if (timestamp == null || timestamp === "") return "—";
  const date = new Date(
    typeof timestamp === "number" && timestamp < 1e12 ? timestamp * 1000 : timestamp,
  );
  if (Number.isNaN(date.getTime())) return String(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

function truncateHexAddress(addr) {
  if (addr == null || addr === "") return null;
  const s = String(addr).trim();
  if (!s) return null;
  if (s.length <= 14) return s;
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

/** Normalize API entry (supports incomeType / type, level / leve). */
function getIncomeLogFields(entry) {
  const incomeType = entry.incomeType ?? entry.type;
  const level = entry.level ?? entry.leve;
  return { ...entry, incomeType, level };
}

export default function RewardPage() {
  const { address, referralLink } = useAuth();
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [claimRank6Loading, setClaimRank6Loading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [incomeLogsOffset, setIncomeLogsOffset] = useState(0);

  useEffect(() => {
    setIncomeLogsOffset(0);
  }, [address]);

  const { data: data, isLoading } = useQuery({
    queryKey: ["roi", address],
    queryFn: () =>
      Promise.all([userServices.getVaultSummary(), userServices.getGlobalPool()]),
    enabled: !!address,
  });
  const [vaultSummary, globalPoolData] = data ?? [];

  const {
    data: incomeLogsData,
    isLoading: incomeLogsLoading,
    isError: incomeLogsError,
    error: incomeLogsErrorObj,
    isFetching: incomeLogsFetching,
    refetch: refetchIncomeLogs,
  } = useQuery({
    queryKey: ["incomeLogs", address, incomeLogsOffset],
    queryFn: () =>
      userServices.getIncomeLogs({
        limit: INCOME_LOGS_PAGE_SIZE,
        offset: incomeLogsOffset,
      }),
    enabled: !!address,
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const {
    entries: incomeEntries = [],
    total: incomeTotal = 0,
    limit: incomeLimit = INCOME_LOGS_PAGE_SIZE,
  } = incomeLogsData ?? {};
  const incomeHasMore = incomeLogsOffset + incomeEntries.length < incomeTotal;
  const incomeShowPagination = incomeTotal > INCOME_LOGS_PAGE_SIZE;
  const incomeLoadingOrFetching = incomeLogsLoading || incomeLogsFetching;

  const globalRank6Pool = globalPoolData?.globalRank6Pool ?? 0;
  const totalRank6Users = globalPoolData?.totalRank6Users ?? 0;

  const handleClaimRank6 = useCallback(async () => {
    if (!address) {
      showSnackbar("Connect your wallet first.", "error");
      return;
    }
    setClaimRank6Loading(true);
    try {
      const fetchTx = () => userServices.claimGlobalRank6();
      const txHash = await fetchAndBroadcast(fetchTx, address);
      showSnackbar(
        "Rank 6 Withdraw submitted. Hash: " + txHash.slice(0, 10) + "...",
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["roi", address] });
      queryClient.invalidateQueries({ queryKey: ["globalPool"] });
    } catch (err) {
      const message =
        err?.code === ERROR_USER_REJECTED
          ? "Transaction was rejected."
          : (err?.message ?? "Withdraw failed. Please try again.");
      showSnackbar(message, "error");
    } finally {
      setClaimRank6Loading(false);
    }
  }, [address, showSnackbar, queryClient]);

  const handleCopyReferral = useCallback(async () => {
    if (referralLink) {
      await copyToClipboard(referralLink, setCopied);
    }
  }, [referralLink, setCopied]);

  const goIncomeLogsNext = useCallback(() => {
    setIncomeLogsOffset((o) => o + INCOME_LOGS_PAGE_SIZE);
  }, []);

  const goIncomeLogsPrev = useCallback(() => {
    setIncomeLogsOffset((o) => Math.max(0, o - INCOME_LOGS_PAGE_SIZE));
  }, []);

  return (
    <main className="max-w-120 w-full mx-auto pt-12 px-4">
      <div className="space-y-5">
        <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">
          RANK
        </h1>
        <p className="text-center text-base leading-6">
          Invite your friends and earn big! For every 10 successful invitations,
          you'll get a chance to win in our exclusive gifts. Don't miss out
          &amp; start inviting now!
        </p>
      </div>
      {/* <div className="mt-10">
                <div>
                    <div className="relative flex flex-col border border-emerald-400/10 bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md p-5 rounded-2xl sm:p-6">
                        <div className="flex justify-end">
                            <div>
                                <button className="cursor-pointer text-white flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-emerald-400/20 to-emerald-400/5 border border-emerald-400/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ic size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"></path>
                                    </svg>
                                    <span className="text-sm">Share Now</span>
                                </button>
                            </div>
                        </div>
                        <p className="absolute top-24 sm:top-28 left-5 text-sm sm:text-base text-white/50 max-w-3xs">Each bar represents 1 invitation. Collect 10 invitations to Withdraw your rank!</p>
                        <div className="flex items-end justify-center gap-2 sm:gap-3 mt-16 sm:mt-10">
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "40px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "65px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "90px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "115px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "140px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "165px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "190px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "215px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "240px", transformOrigin: "center bottom" }}></div>
                            </div>
                            <div className="relative flex flex-col items-center">
                                <div className="
                     w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
                     border-white/5 bg-gradient-to-b from-white/10 to-transparent
                     " style={{ height: "265px", transformOrigin: "center bottom" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-md p-5">
          <p className="text-xs text-cyan-400/80 uppercase tracking-wider">
            Rank
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white mt-2">
            {!address ? "—" : isLoading ? "…" : vaultSummary?.rank}
          </p>
          {!address && (
            <p className="text-xs text-gray-500 mt-1">Connect wallet</p>
          )}
        </div>
        <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-md p-5">
          <p className="text-xs text-cyan-400/80 uppercase tracking-wider">
            Rank 6 Pool
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white mt-2">
            {isLoading ? "…" : formatCurrency(globalRank6Pool)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {Number(totalRank6Users) || 0} users
          </p>
        </div>
        <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-md p-5 flex flex-col justify-between">
          <p className="text-xs text-cyan-400/80 uppercase tracking-wider">
            Withdraw Rank 6
          </p>
          <button
            type="button"
            onClick={handleClaimRank6}
            disabled={!address || claimRank6Loading}
            className="mt-3 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 border border-cyan-400/40 text-white font-medium text-sm hover:from-cyan-400/40 hover:to-emerald-400/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {claimRank6Loading ? "Confirm in wallet…" : "Withdraw Pool Share"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-y-2 space-y-3">
          <p className="text-base max-w-xs mx-auto text-white text-center leading-5">
            The more you share, the more you earn <br /> start referring now!
          </p>
          <div className="flex gap-2 bg-[#1A1A52B2] shadow-cyan-neon p-3 rounded-xl border border-selsila-purple">
            <p className="text-base text-white truncate flex-1 min-w-0">
              {referralLink || "Connect wallet to get referral link"}
            </p>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyReferral}
                disabled={!referralLink}
                className="p-1 rounded hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Copy referral link"
              >
                {copied ? (
                  <GiCheckMark className="text-green-500 size-5" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--solar size-5 text-white"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                      <path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"></path>
                    </g>
                  </svg>
                )}
              </button>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--material-symbols size-5 text-white"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22m0-2q.425 0 .713-.287T18 19t-.288-.712T17 18t-.712.288T16 19t.288.713T17 20M5 13q.425 0 .713-.288T6 12t-.288-.712T5 11t-.712.288T4 12t.288.713T5 13m12.713-7.288Q18 5.426 18 5t-.288-.712T17 4t-.712.288T16 5t.288.713T17 6t.713-.288M17 5"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-12">
                <div className="w-full">
                    <p className="text-sm sm:text-base text-white mb-5 text-center">Gift for complete 10 referrals</p>
                    <div className="overflow-hidden">
                        <div className="flex" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2">
                                                <img alt="iPhone 16" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">iPhone 16</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="Selsila Cap" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Cap</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="Selsila T-Shirt" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila T-Shirt</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="Selsila Tumblr" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Tumblr</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="Selsila Umbrella" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Umbrella</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="20 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">20 Selsila Token</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="10 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">10 Selsila Token</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
                                <div className="relative group">
                                    <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-end h-full">
                                            <div className="relative size-24 mb-2"><img alt="5 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
                                            <div className="text-xs sm:text-sm text-white mb-2 text-center">5 Selsila Token</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8 space-x-2"><button className="size-[10px] rounded-full transition-all duration-300 bg-cyan-400 shadow-lg shadow-cyan-400/50"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button></div>
                </div>
            </div> */}
      <div className="mt-12">
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-white">Recent Income Logs :</p>
          {!address ? (
            <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-center text-sm text-gray-400">
              Connect wallet to view income logs.
            </div>
          ) : incomeLogsLoading && !incomeLogsData ? (
            <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-10 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-cyan-400/60 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading income logs…</p>
            </div>
          ) : incomeLogsError ? (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center">
              <p className="text-red-300 font-medium text-sm">Failed to load income logs</p>
              <p className="text-xs text-red-200/80 mt-1">
                {incomeLogsErrorObj?.message ?? "Something went wrong."}
              </p>
              <button
                type="button"
                onClick={() => refetchIncomeLogs()}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20"
              >
                Try again
              </button>
            </div>
          ) : !incomeEntries.length ? (
            <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 text-center text-sm text-gray-400">
              No income entries yet.
            </div>
          ) : (
            <>
              <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 max-h-64 sm:max-h-80 overflow-y-auto">
                {incomeEntries.map((entry, idx) => {
                  const e = getIncomeLogFields(entry);
                  const fromShort = truncateHexAddress(e.from);
                  return (
                    <div
                      key={`${incomeLogsOffset}-${idx}-${e.timestamp}-${e.incomeType}-${e.amount}-${e.from}`}
                      className="grid grid-cols-2 gap-x-2 border-b last:border-b-0 border-white/10 py-4"
                    >
                      <div className="min-w-0 space-y-1">
                        <h3 className="text-sm sm:text-base font-medium text-left text-white">
                          {formatIncomeTypeLabel(e.incomeType)}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {formatIncomeLogTimestamp(e.timestamp)}
                        </p>
                        {e.level != null && e.level !== "" ? (
                          <p className="text-xs text-gray-400">Level {e.level}</p>
                        ) : null}
                        {fromShort ? (
                          <p className="text-xs text-gray-400">
                            <span className="text-gray-500">From</span>{" "}
                            <span className="font-mono">{fromShort}</span>
                          </p>
                        ) : null}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 text-right self-center">
                        {formatSelsilaAmount(e.amount)}
                      </p>
                    </div>
                  );
                })}
              </div>
              {incomeShowPagination && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={goIncomeLogsPrev}
                    disabled={incomeLogsOffset === 0 || incomeLoadingOrFetching}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 border border-white/10"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-400">
                    {incomeLogsOffset + 1}–
                    {Math.min(incomeLogsOffset + incomeLimit, incomeTotal)} of {incomeTotal}
                  </span>
                  <button
                    type="button"
                    onClick={goIncomeLogsNext}
                    disabled={!incomeHasMore || incomeLoadingOrFetching}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 border border-white/10"
                  >
                    Next
                  </button>
                </div>
              )}
              {incomeLogsFetching && incomeLogsData && (
                <div className="flex justify-center py-1">
                  <div className="w-6 h-6 border-2 border-cyan-400/60 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// import React from "react";
// import iphone from "../../assets/images/iphone16.webp"

// export default function RewardPage() {

//     return (
//         <main className="max-w-120 w-full mx-auto pt-12 px-4">
//             <div className="space-y-5">
//                 <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">REWARD</h1>
//                 <p className="text-center text-base leading-6">Invite your friends and earn big! For every 10 successful invitations, you'll get a chance to win in our exclusive gifts. Don't miss out &amp; start inviting now!</p>
//             </div>
//             <div className="mt-10">
//                 <div>
//                     <div className="relative flex flex-col border border-emerald-400/10 bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md p-5 rounded-2xl sm:p-6">
//                         <div className="flex justify-end">
//                             <div>
//                                 <button className="cursor-pointer text-white flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-emerald-400/20 to-emerald-400/5 border border-emerald-400/30">
//                                     <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--ic size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
//                                         <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65c0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92M18 4c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 13c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1m12 7.02c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"></path>
//                                     </svg>
//                                     <span className="text-sm">Share Now</span>
//                                 </button>
//                             </div>
//                         </div>
//                         <p className="absolute top-24 sm:top-28 left-5 text-sm sm:text-base text-white/50 max-w-3xs">Each bar represents 1 invitation. Collect 10 invitations to Withdraw your rank!</p>
//                         <div className="flex items-end justify-center gap-2 sm:gap-3 mt-16 sm:mt-10">
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "40px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "65px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "90px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "115px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "140px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "165px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "190px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "215px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "240px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                             <div className="relative flex flex-col items-center">
//                                 <div className="
//                      w-6 sm:w-7 border-2 rounded-sm transition-all duration-1000 ease-out
//                      border-white/5 bg-gradient-to-b from-white/10 to-transparent
//                      " style={{ height: "265px", transformOrigin: "center bottom" }}></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-8">
//                 <div className="flex flex-col gap-y-2 space-y-3">
//                     <p className="text-base max-w-xs mx-auto text-white text-center leading-5">The more you share, the more you earn <br /> start referring now!</p>
//                     <div className="flex gap-2 bg-[#1A1A52B2] shadow-cyan-neon p-3 rounded-xl border border-selsila-purple undefined">
//                         <p className="text-base text-white truncate">https://selsi.io/?ref=Amk5419</p>
//                         <div className="ml-auto flex items-center gap-2">
//                             <button>
//                                 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
//                                     <g fill="none" stroke="currentColor" strokeWidth="1.5">
//                                         <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
//                                         <path d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"></path>
//                                     </g>
//                                 </svg>
//                             </button>
//                             <div>
//                                 <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols size-5 text-white" width="1em" height="1em" viewBox="0 0 24 24">
//                                     <path fill="currentColor" d="M17 22q-1.25 0-2.125-.875T14 19q0-.15.075-.7L7.05 14.2q-.4.375-.925.588T5 15q-1.25 0-2.125-.875T2 12t.875-2.125T5 9q.6 0 1.125.213t.925.587l7.025-4.1q-.05-.175-.062-.337T14 5q0-1.25.875-2.125T17 2t2.125.875T20 5t-.875 2.125T17 8q-.6 0-1.125-.213T14.95 7.2l-7.025 4.1q.05.175.063.338T8 12t-.012.363t-.063.337l7.025 4.1q.4-.375.925-.587T17 16q1.25 0 2.125.875T20 19t-.875 2.125T17 22m0-2q.425 0 .713-.287T18 19t-.288-.712T17 18t-.712.288T16 19t.288.713T17 20M5 13q.425 0 .713-.288T6 12t-.288-.712T5 11t-.712.288T4 12t.288.713T5 13m12.713-7.288Q18 5.426 18 5t-.288-.712T17 4t-.712.288T16 5t.288.713T17 6t.713-.288M17 5"></path>
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-12">
//                 <div className="w-full">
//                     <p className="text-sm sm:text-base text-white mb-5 text-center">Gift for complete 10 referrals</p>
//                     <div className="overflow-hidden">
//                         <div className="flex" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2">
//                                                 <img alt="iPhone 16" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">iPhone 16</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="Selsila Cap" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Cap</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="Selsila T-Shirt" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila T-Shirt</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="Selsila Tumblr" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Tumblr</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="Selsila Umbrella" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">Selsila Umbrella</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="20 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">20 Selsila Token</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="10 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">10 Selsila Token</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-0 flex-[0_0_50%] md:flex-[0_0_45%] px-2">
//                                 <div className="relative group">
//                                     <div className="relative bg-gradient-to-tr from-slate-900/80 via-slate-800/from-slate-900/80 to-slate-900/from-slate-900/80 backdrop-blur-md rounded-xl h-44 p-5 flex flex-col justify-center items-center text-center border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
//                                         <div className="flex flex-col items-center justify-end h-full">
//                                             <div className="relative size-24 mb-2"><img alt="5 Selsila Token" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" sizes="100vw" src={iphone} style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, color: 'transparent' }} /></div>
//                                             <div className="text-xs sm:text-sm text-white mb-2 text-center">5 Selsila Token</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-center mt-8 space-x-2"><button className="size-[10px] rounded-full transition-all duration-300 bg-cyan-400 shadow-lg shadow-cyan-400/50"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button><button className="size-[10px] rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button></div>
//                 </div>
//             </div>
//             <div className="mt-12">
//                 <div className="space-y-4">
//                     <p className="text-sm sm:text-base text-white">Recent Activity :</p>
//                     <div className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 max-h-64 sm:max-h-80 overflow-y-auto">
//                         <div className="grid grid-cols-2 gap-x-2 border-b last:border-b-0 border-white/10 py-4">
//                             <div>
//                                 <h3 className="text-sm sm:text-base font-medium text-left">Welcome Rank</h3>
//                                 <p className="text-xs text-gray-400">2/22/2026</p>
//                             </div>
//                             <p className="text-xs sm:text-sm text-gray-400 text-right self-center">+2.5 Selsila</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }
