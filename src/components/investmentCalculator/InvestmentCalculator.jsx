import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import userServices from "../../services/userServices";
import NumberSpinner from "../input/numberSpinner";

function formatCurrency(value) {
    if (value == null || Number.isNaN(Number(value))) return "$0";
    const num = Number(value);
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function InvestmentCalculator() {
    const address = useSelector((state) => state.userAuth?.address);
    const [amount, setAmount] = useState(1);
    const [useOneDayCycle, setUseOneDayCycle] = useState(false);

    const numericAmount = useMemo(() => Number(amount) || 0, [amount]);
    const canSimulate = !!address && numericAmount > 0;

    const {
        data: simulation,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["simulateInvestment", address, numericAmount, useOneDayCycle],
        queryFn: () =>
            userServices.simulateInvestment({
                amount: numericAmount,
                useOneDayCycle,
            }),
        enabled: canSimulate,
        staleTime: 30_000,
    });

    const dailyROI = simulation?.dailyROIAmount;
    const totalROI = simulation?.totalROIForCycle;
    const maxAllowed = simulation?.maxAllowed;
    const isValid = simulation?.isValid ?? false;

    if (!address) {
        return (
            <div className="rounded-xl border border-selsila-purple/50 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-lg font-wavacorp tracking-wider text-[#D9D9D9] mb-2">
                    Investment Calculator
                </h3>
                <p className="text-sm text-gray-400">
                    Connect your wallet to simulate potential returns based on your investment amount and cycle type.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-selsila-purple/50 bg-white/5 backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
                <svg
                    className="w-5 h-5 text-[var(--color-selsila-green)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="text-lg tracking-wider text-[#D9D9D9]">
                    Estimate Your Returns
                </h3>
            </div>
            <p className="text-xs text-gray-400">
                Enter an amount and cycle type to see projected daily ROI, total ROI for the cycle, and max allowed.
            </p>

            <div className="space-y-3">
                <NumberSpinner
                    label="Investment amount (USDT)"
                    min={1}
                    defaultValue={1}
                    onChange={(v) => setAmount(v)}
                />
                <div className="reinvest-checkbox-wrapper-46 mt-2">
                    <input
                        type="checkbox"
                        id="cbx-46"
                        className="inp-cbx"
                        checked={useOneDayCycle}
                        onChange={(e) => setUseOneDayCycle(e.target.checked)}
                    />
                    <label htmlFor="cbx-46" className="cbx">
                        <span>
                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                        <span className="text-sm text-gray-300 cursor-pointer">Use One Day Cycle</span>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button className="px-5 h-10 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider">Simulate</button>
                </div>
            </div>

            <div className="space-y-2">
                {!canSimulate ? (
                    <p className="text-sm text-gray-500">Enter an amount to see projections.</p>
                ) : isLoading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="inline-block w-4 h-4 border-2 border-[var(--color-selsila-green)] border-t-transparent rounded-full animate-spin" />
                        Calculating…
                    </div>
                ) : isError ? (
                    <p className="text-sm text-red-400">
                        {error?.message ?? "Unable to load simulation. Please try again."}
                    </p>
                ) : (
                    <>
                        {!isValid && (
                            <p className="text-sm text-amber-400">
                                This investment may exceed limits or not meet requirements.
                            </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Daily ROI</p>
                                <p className="text-lg font-semibold text-[var(--color-selsila-green)] mt-1">
                                    {formatCurrency(dailyROI)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Total ROI (Cycle)</p>
                                <p className="text-lg font-semibold text-[#D9D9D9] mt-1">
                                    {formatCurrency(totalROI)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Max Allowed</p>
                                <p className="text-lg font-semibold text-[#D9D9D9] mt-1">
                                    {formatCurrency(maxAllowed)}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
