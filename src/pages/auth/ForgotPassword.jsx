import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // TODO: Add your API call here
    setLinkSent(true);
  };

  if (linkSent) {
    return (
      <main className="max-w-120 w-full mx-auto">
        <div className="w-full max-w-md mx-auto space-y-6 py-6 px-5">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--material-symbols w-8 h-8 text-green-600"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
            <p className="text-gray-400 mt-2">
              We've sent a password reset link to{" "}
              <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-gray-400 mt-2">
              Please check your email and follow the instructions to reset your
              password.
            </p>
          </div>
          <div className="text-center">
            <Link
              className="text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
              to="/login"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-120 w-full mx-auto">
      <div className="w-full max-w-md mx-auto space-y-6 py-6 px-5">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[var(--color-selsila-green)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="m4 6l8 5l8-5zm0 14q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v5q0 .425-.288.713T21 12t-.712-.288T20 11V8l-7.475 4.675q-.075.05-.525.15q-.125 0-.262-.037t-.263-.113L4 8v10h5.5q.425 0 .713.288T10.5 19t-.288.713T9.5 20zm11.95-.8l4.95-4.95q.275-.275.7-.275t.7.275t.275.7t-.275.7l-5.65 5.65q-.3.3-.7.3t-.7-.3l-2.85-2.85q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Forgot Password?
          </h2>
          <p className="text-gray-400 mt-2">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:border-transparent transition-colors border-[var(--color-gray-600)]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;