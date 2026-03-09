import React, { useState } from "react";
import { useSelector } from "react-redux";
import userServices from "../../services/userServices";
import NumberSpinner from "../input/numberSpinner";
import { useNavigate } from "react-router-dom";

function formatCurrency(value) {
    if (value == null || Number.isNaN(Number(value))) return "$0";
    const num = Number(value);
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function InvestmentCalculator() {
    const navigate = useNavigate();
    const address = useSelector((state) => state.userAuth?.address);
    const [amount, setAmount] = useState("");
    const [useOneDayCycle, setUseOneDayCycle] = useState(false);
    const [simulation, setSimulation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const canSimulate = !!address

    const handleSimulate = async () => {
        try {
            setIsLoading(true);
            const response = await userServices.simulateInvestment({ amount, useOneDayCycle });
            console.log('response: ', response);
            setSimulation(response);
        } catch (error) {
            console.error('Error simulating investment: ', error);
            setIsError(true);
            setError(error?.response?.data?.message || error?.message || "Unable to load simulation. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!address) {
        return (
            <div className="rounded-xl border border-selsila-purple/50 bg-white/5 backdrop-blur-sm p-6">
                <h3 className="text-lg tracking-wider text-[#D9D9D9] mb-2">
                    Investment Calculator
                </h3>
                <p className="text-sm text-gray-400">
                    Connect your wallet to simulate potential returns based on your investment amount and cycle type.
                </p>
                <button
                    className="mt-5 w-full px-5 h-10 bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider mt-2"
                    onClick={() => navigate("/connect-metamask")}
                >
                    Connect Wallet
                </button>
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
                    label="Investment value (USDT)"
                    placeholder="Enter value"
                    min={1}
                    defaultValue=""
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
                <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={() => canSimulate && handleSimulate()}
                        disabled={!canSimulate || isLoading}
                        className="inline-flex items-center justify-center gap-2 px-6 h-10 min-w-[140px] bg-[linear-gradient(180deg,#D9D9D9_0%,#009C8A_100%)] text-black uppercase text-base rounded-full border-0 relative z-10 shadow-lg transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:brightness-110"
                    >
                        {isLoading ? (
                            <>
                                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin shrink-0" />
                                Calculating…
                            </>
                        ) : (
                            "Simulate"
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg bg-white/5 p-3 border border-white/5">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Daily ROI</p>
                        <p className="text-lg font-semibold text-[var(--color-selsila-green)] mt-1">
                            {formatCurrency(simulation?.dailyROIAmount) || "0"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total ROI (Cycle)</p>
                        <p className="text-lg font-semibold text-[#D9D9D9] mt-1">
                            {formatCurrency(simulation?.totalROIForCycle) || "0"}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Max Allowed</p>
                        <p className="text-lg font-semibold text-[#D9D9D9] mt-1">
                            {formatCurrency(simulation?.maxAllowed) || "0"}
                        </p>
                    </div>
                </div>
                {canSimulate && !simulation && !isLoading && (
                    <p className="text-sm text-gray-500">Click Simulate to see projections.</p>
                )}
                {isError && (
                    <p className="text-sm text-red-400">
                        {error || "Unable to load simulation. Please try again."}
                    </p>
                )}
                {simulation && !simulation?.isValid && (
                    <p className="text-sm text-amber-400">
                        This investment may exceed limits or not meet requirements.
                    </p>
                )}
            </div>
        </div>
    );
}
