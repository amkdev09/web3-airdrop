import React, { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import userServices from "../../services/userServices";
import { fetchAndBroadcast, ERROR_USER_REJECTED } from "../../lib/broadcastTransaction";
import useSnackbar from "../../hooks/useSnackbar";
import abstractDistant from "../../assets/images/abstract-distant.webp";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NumberSpinner from "../../components/input/numberSpinner";

export default function InvestPage() {
    const navigate = useNavigate();
    const address = useSelector((state) => state.userAuth?.address);
    const [amount, setAmount] = useState(1);
    const [useOneDayCycle, setUseOneDayCycle] = useState(false);

    const [selectedInvest, setSelectedInvest] = useState("invest");
    const handleSelectInvest = (invest) => {
        setSelectedInvest(invest);
    };

    const [investLoading, setInvestLoading] = useState(false);
    const { showSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { data: vaultSummary, isLoading } = useQuery({
        queryKey: ["vaultSummary", address],
        queryFn: () => userServices.getVaultSummary(),
    });

    const handleInvest = useCallback(async () => {
        if (!address) {
            showSnackbar("Connect your wallet first.", "error");
            return;
        }
        if (!amount || amount <= 0) {
            showSnackbar("Enter a valid investment amount.", "error");
            return;
        }
        setInvestLoading(true);
        try {
            const numericAmount = Number(amount);
            const fetchApproveTx = () => userServices.approveUsdt({ amount: numericAmount });
            const approveTxHash = await fetchAndBroadcast(fetchApproveTx, address);
            showSnackbar("Approval submitted. Hash: " + approveTxHash.slice(0, 10) + "...", "success");

            const fetchInvestTx = () => userServices.invest({ amount: numericAmount, useOneDayCycle: false });
            const investTxHash = await fetchAndBroadcast(fetchInvestTx, address);
            showSnackbar("Investment submitted. Hash: " + investTxHash.slice(0, 10) + "...", "success");

            queryClient.invalidateQueries({ queryKey: ["vaultSummary", address] });
        } catch (err) {
            const message = err?.code === ERROR_USER_REJECTED
                ? "Transaction was rejected."
                : err?.message ?? "Invest failed. Please try again.";
            showSnackbar(message, "error");
        } finally {
            setInvestLoading(false);
        }
    }, [address, amount, showSnackbar, queryClient]);

    const handleReinvest = useCallback(async () => {
        if (!address) {
            showSnackbar("Connect your wallet first.", "error");
            return;
        }
        if (!vaultSummary?.invested || Number(vaultSummary.invested) <= 0) {
            showSnackbar("No invested amount available to reinvest.", "error");
            return;
        }
        setInvestLoading(true);
        try {
            const amountToReinvest = Number(vaultSummary.invested);
            const fetchTx = () => userServices.reinvest({ amount: amountToReinvest, useOneDayCycle });
            const txHash = await fetchAndBroadcast(fetchTx, address);
            showSnackbar("Reinvest submitted. Hash: " + txHash.slice(0, 10) + "...", "success");
            queryClient.invalidateQueries({ queryKey: ["vaultSummary", address] });
        } catch (err) {
            const message = err?.code === ERROR_USER_REJECTED
                ? "Transaction was rejected."
                : err?.message ?? "Reinvest failed. Please try again.";
            showSnackbar(message, "error");
        } finally {
            setInvestLoading(false);
        }
    }, [address, vaultSummary, useOneDayCycle, showSnackbar, queryClient]);

    return (
        <main className="max-w-120 w-full mx-auto pt-12 px-4">
            <div className="flex justify-start">
                <button className="cursor-pointer" onClick={() => navigate("/team")}>
                    <MdOutlineArrowBackIosNew className="text-2xl text-[#009C8A]" />
                </button>
            </div>
            <div className="space-y-3 -mt-3">
                <h1 className="text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">Invest</h1>
                <p className="text-center text-sm uppercase tracking-[0.3em]">Invest your tokens here</p>
            </div>
            <div className="glass-radio-group mt-5">
                <input
                    type="radio"
                    name="plan"
                    id="glass-silver"
                    checked={selectedInvest === "invest"}
                    onChange={() => handleSelectInvest("invest")}
                />
                <label htmlFor="glass-silver">Invest</label>
                <input
                    type="radio"
                    name="plan"
                    id="glass-platinum"
                    checked={selectedInvest === "reinvest"}
                    onChange={() => handleSelectInvest("reinvest")}
                />
                <label htmlFor="glass-platinum">Reinvest</label>
                <div className="glass-glider"></div>
            </div>
            <div className="relative w-full overflow-hidden rounded-4xl border-[1.5px] border-selsila-purple mt-5">
                <div className="relative w-full h-full">
                    <img loading="lazy" className="object-cover" src={abstractDistant} />
                </div>
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="flex items-center">
                            <p className="text-base text-[#D9D9D9]">Amk</p>
                        </div>
                        <p className="font-wavacorp text-lg tracking-[0.15em]">UltraDefi</p>
                    </div>
                    <div className="space-y-0.5 sm:space-y-2 mt-4 sm:mt-5">
                        <p className="text-sm text-gray-400 capitalize">{selectedInvest === "invest" ? "Invested" : "Available Income"}</p>
                        <p className="text-2xl sm:text-4xl text-[#D9D9D9]">{isLoading ? "Loading..." : selectedInvest === "invest" ? vaultSummary?.invested ? `$${vaultSummary?.invested}` : "$0" : vaultSummary?.availableIncome ? `$${vaultSummary?.availableIncome}` : "$0"}</p>
                    </div>
                    <div className="mt-auto flex justify-end text-sm">
                        <button className="flex items-center gap-1 text-[#D9D9D9] text-sm cursor-pointer" id="headlessui-menu-button-«r2»" type="button" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="">
                            Currency
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--line-md" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeDasharray="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l-5 -5M12 15l5 -5">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="10;0"></animate>
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex my-5 items-center gap-2 text-[#D9D9D9] text-sm cursor-pointer h-14 border border-white/5 bg-white/10 backdrop-blur-md w-full rounded-xl px-3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--solar size-5 shrink-0" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z" clipRule="evenodd"></path>
                </svg>
                <p className="text-sm break-all">{address || "Wallet address not set."}</p>
            </div>
            <div>
                {selectedInvest === "reinvest" ? (
                    <>
                        <div className="flex items-center justify-start">
                            <p className="text-sm text-gray-400 capitalize">
                                Amount {vaultSummary?.invested ? `$${vaultSummary?.invested}` : "$0"} will be reinvested
                            </p>
                        </div>
                        <div className="reinvest-checkbox-wrapper-46 mt-2">
                            <input
                                type="checkbox"
                                id="cbx-46"
                                className="inp-cbx"
                                checked={useOneDayCycle}
                                onChange={() => setUseOneDayCycle(!useOneDayCycle)}
                            />
                            <label htmlFor="cbx-46" className="cbx">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span>Use One Day Cycle</span>
                            </label>
                        </div>
                    </>
                ) : (
                    <NumberSpinner
                        label="Enter Investment Amount"
                        min={1}
                        defaultValue={amount}
                        onChange={(value) => setAmount(value)}
                    />
                )}
                <button
                    type="button"
                    onClick={selectedInvest === "invest" ? handleInvest : handleReinvest}
                    disabled={investLoading}
                    className="w-full mt-5 bg-gradient-to-b from-[rgba(255,135,149,0.7)] to-[rgba(0,156,138,0.7)] font-wavacorp uppercase tracking-widest text-sm sm:text-base h-14 rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {investLoading ? "Confirm in wallet…" : selectedInvest === "invest" ? "Invest" : "Reinvest"}
                </button>
            </div>
        </main>
    );
}