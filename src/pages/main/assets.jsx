import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import { CiWallet } from "react-icons/ci";
import userServices from "../../services/userServices";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { address, clearAddress, referralLink } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const { data: vaultSummary, isLoading } = useQuery({
    queryKey: ["vaultSummary", address],
    queryFn: () => userServices.getVaultSummary(),
  });

  const totalAssetsUsd =
    Number(vaultSummary?.activeInvestment ?? 0) +
    Number(vaultSummary?.availableIncome ?? 0);
  const assetsDisplay = Number.isFinite(totalAssetsUsd)
    ? `$${totalAssetsUsd.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "$0.00";

  const handleLogoutClick = useCallback(() => {
    setLogoutModalOpen(true);
  }, []);

  const handleLogoutConfirm = useCallback(async () => {
    setLogoutLoading(true);
    try {
      await clearAddress();
      showSnackbar("Disconnected successfully.", "success");
      setLogoutModalOpen(false);
      navigate("/connect-metamask", { replace: true });
    } catch {
      showSnackbar("Logout failed. Please try again.", "error");
    } finally {
      setLogoutLoading(false);
    }
  }, [clearAddress, showSnackbar, navigate]);

  return (
    <main className="max-w-120 w-full mx-auto pt-12 px-4">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl tracking-widest text-center font-wavacorp uppercase text-shadow-purple-green">
          Assets
        </h1>
        <p className="text-center text-sm sm:text-base leading-6">
          Manage your assets information.
        </p>
      </div>
      <div className="space-y-6">
        <div className="relative w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative size-16 sm:size-20 rounded-full overflow-hidden bg-white/5 mb-4">
              <div className="absolute inset-0 flex items-center justify-center text-white/35">
                <CiWallet className="text-5xl text-white/50" />
              </div>
            </div>
            <div className="min-w-0 w-full">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <h2 className="text-lg font-medium text-white truncate">
                  {isLoading ? "Loading..." : assetsDisplay}
                </h2>
              </div>
            </div>
          </div>
          <div className="space-y-5 pt-5 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--solar size-4 text-[#D9D9D9]"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                  ></path>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71c-.138 1.028-.14 2.382-.14 4.289s.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm text-[#D9D9D9]">Referral Link</span>
              </div>
              <p className="break-all text-sm text-white/50 font-medium">
                {referralLink || "Not Available"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--ci size-4 text-[#D9D9D9]"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 6H6c-.932 0-1.398 0-1.766.152a2 2 0 0 0-1.082 1.083C3 7.602 3 8.068 3 9a3 3 0 1 1 0 6c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.082 1.083C4.602 18 5.068 18 6 18h8m0-12h4c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C21 7.602 21 8.068 21 9a3 3 0 1 0 0 6c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C19.398 18 18.932 18 18 18h-4m0-12v12"
                  ></path>
                </svg>
                <span className="text-sm text-[#D9D9D9]">Referral address</span>
              </div>
              <p className="text-sm text-white/50 font-medium break-all">
                {address || "Not Available"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/deposit")}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 shrink-0"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            <span>Deposit</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/withdraw")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 shrink-0"
            >
              <path d="M12 21V9" />
              <path d="m7 14 5-5 5 5" />
              <path d="M5 3h14" />
            </svg>
            <span>Withdraw</span>
          </button>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="col-span-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="iconify iconify--solar size-5"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M16.125 12a.75.75 0 0 0-.75-.75H4.402l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68h10.972a.75.75 0 0 0 .75-.75"
                clipRule="evenodd"
              ></path>
              <path
                fill="currentColor"
                d="M9.375 8c0 .702 0 1.053.169 1.306a1 1 0 0 0 .275.275c.253.169.604.169 1.306.169h4.25a2.25 2.25 0 0 1 0 4.5h-4.25c-.702 0-1.053 0-1.306.168a1 1 0 0 0-.275.276c-.169.253-.169.604-.169 1.306c0 2.828 0 4.243.879 5.121c.878.879 2.292.879 5.12.879h1c2.83 0 4.243 0 5.122-.879c.879-.878.879-2.293.879-5.121V8c0-2.828 0-4.243-.879-5.121S19.203 2 16.375 2h-1c-2.829 0-4.243 0-5.121.879c-.879.878-.879 2.293-.879 5.121"
              ></path>
            </svg>
            <span>Disconnect Wallet</span>
          </button>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 transition-colors"
          onClick={() => navigate("/transaction-logs")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 shrink-0"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <span>Transactions Logs</span>
        </button>

        <p className="text-center text-sm text-[#D9D9D9] mt-6">
          Need help? Contact us on{" "}
          <a
            href="https://t.me/SelsilaOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-selsila-purple hover:underline"
          >
            Telegram
          </a>
        </p>
      </div>
      <ConfirmationModal
        open={logoutModalOpen}
        onClose={() => !logoutLoading && setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Disconnect Wallet?"
        description="Your wallet will be disconnected from this app. You can connect again anytime from the connect wallet page."
        okText={logoutLoading ? "Disconnecting…" : "Disconnect Wallet"}
        cancelText="Cancel"
        loading={logoutLoading}
      />
    </main>
  );
}
