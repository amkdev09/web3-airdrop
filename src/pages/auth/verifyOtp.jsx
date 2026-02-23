import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(150); // 2:30 countdown
  const inputsRef = useRef([]);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // allow only single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    console.log("OTP Entered:", finalOtp);
    console.log(token);

    navigate("/");
    // TODO: Call verify API
  };

  const handleResend = () => {
    setTimeLeft(150);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0].focus();
    console.log("OTP Resent");
    // TODO: Call resend API
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <main className="max-w-120 w-full mx-auto">
      <div className="w-full max-w-md mx-auto space-y-4 sm:space-y-6 py-4 sm:py-6 px-4 sm:px-5">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--material-symbols w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-selsila-green)]" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.713 10.713Q9 10.425 9 10t-.288-.712T8 9t-.712.288T7 10t.288.713T8 11t.713-.288m4 0Q13 10.426 13 10t-.288-.712T12 9t-.712.288T11 10t.288.713T12 11t.713-.288m4 0Q17 10.426 17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11t.713-.288M2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z">
              </path>
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            We just sent an email
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Enter the OTP code we sent to your email
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-2 sm:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-10 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-lg border-2 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-selsila-green focus:border-transparent transition-all border-[var(--color-gray-600)]"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className="w-full py-3 px-4 mb-8.5 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base min-h-[44px]"
        >
          Verify
        </button>

        {/* Resend */}
        <div className="text-center mb-8.5">
          <p className="text-gray-400 text-sm sm:text-base">
            Didn't receive code?{" "}
            {timeLeft > 0 ? (
              <button
                disabled
                className="text-gray-500 cursor-not-allowed font-medium"
              >
                Resend - {formatTime(timeLeft)}
              </button>
            ) : (
              <button
                onClick={handleResend}
                className="text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
              >
                Resend
              </button>
            )}
          </p>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Having trouble?{" "}
            <a
              href="https://t.me/SelsilaOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default OTPVerification;