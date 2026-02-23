import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify-otp?token=1234567890");
    console.log("Login Data:", formData);
  };

  return (
    <main className="max-w-120 w-full mx-auto">
      <div className="w-full max-w-md mx-auto space-y-6 py-6 px-5">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

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
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:border-transparent transition-colors border-[var(--color-gray-600)]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:border-transparent transition-colors border-[var(--color-gray-600)]"
            />

            <div className="flex justify-end mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[var(--color-selsila-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-selsila-green)]/90 focus:outline-none focus:ring-2 focus:ring-selsila-green focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="relative py-2">
          <p className="text-gray-400 italic text-center">
            Or continue with
          </p>
        </div>

        <div className="flex items-center justify-center">
          <button className="cursor-pointer flex items-center gap-x-2.5 py-3 px-8 rounded-full text-[var(--color-selsila-green)] bg-[var(--color-selsila-green)]/20 border border-[var(--color-selsila-green)] transition-colors hover:bg-[var(--color-selsila-green)]/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              className="text-xl"
              width="1em"
              height="1em"
              fill="currentColor"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301c1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
            <span className="font-semibold text-sm">
              Sign in with Gmail
            </span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[var(--color-selsila-green)] hover:text-[var(--color-selsila-green)]/80 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}