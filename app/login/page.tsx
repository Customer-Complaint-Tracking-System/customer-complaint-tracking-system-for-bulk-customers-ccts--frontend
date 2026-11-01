"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MessageSquare,
  ShieldCheck,
  CircleHelp,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setNotice(
      "Your details are valid, but CCTS authentication is not connected yet. Connect the login API to sign in."
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#24364B]">
      <header className="flex h-[72px] items-center justify-between border-b border-[#DCE5EF] bg-[#152D4E] px-5 text-white sm:px-10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10968C]">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">CCTS</h1>
            <p className="text-xs text-slate-300">
              Complaint tracking system
            </p>
          </div>
        </Link>

        <Link
          href="/help"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium transition hover:bg-white/10"
        >
          <CircleHelp size={17} />
          <span className="hidden sm:inline">Help and support</span>
        </Link>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-14">
        <section className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden rounded-2xl bg-[#152D4E] p-9 text-white shadow-sm lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-[45px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#10968C]/10" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10968C]">
              <ShieldCheck size={30} />
            </div>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#67D5C8]">
              Staff portal
            </p>

            <h2 className="mt-4 max-w-lg text-4xl font-bold leading-tight xl:text-5xl">
              Welcome back to CCTS
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
              Sign in to access your staff workspace, review assigned
              complaints and manage customer support activities.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10968C]/20 text-[#67D5C8]">
                <LockKeyhole size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Secure staff access</p>
                <p className="mt-1 text-xs text-slate-300">
                  Access is intended for authorised staff members.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Customer Complaint Tracking System · CCTS
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10968C] text-white">
              <ShieldCheck size={25} />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#152D4E]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#718096]">
              Sign in to continue to your CCTS staff workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCE5EF] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#10968C]">
                Staff account
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#152D4E]">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#718096]">
                Enter your account details to access your workspace.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {notice && (
              <div
                role="status"
                className="mb-5 flex items-start gap-2 rounded-lg border border-[#B7DCD7] bg-[#EAF8F5] p-3 text-sm leading-5 text-[#086B63]"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {notice}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#34465B]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                      setNotice("");
                    }}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-lg border border-[#DCE5EF] bg-white py-3 pl-10 pr-4 text-sm text-[#24364B] outline-none transition placeholder:text-[#A0AAB8] focus:border-[#10968C] focus:ring-2 focus:ring-[#10968C]/15"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#34465B]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                      setNotice("");
                    }}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-[#DCE5EF] bg-white py-3 pl-10 pr-12 text-sm text-[#24364B] outline-none transition placeholder:text-[#A0AAB8] focus:border-[#10968C] focus:ring-2 focus:ring-[#10968C]/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8190A3] transition hover:bg-[#F0F4F8] hover:text-[#087F78]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#53657A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-[#CBD5E1] accent-[#10968C]"
                  />
                  Remember me
                </label>

                <Link
                  href="/help"
                  className="text-sm font-semibold text-[#087F78] transition hover:text-[#065F59] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#10968C] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087F78] focus:outline-none focus:ring-2 focus:ring-[#10968C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="my-6 border-t border-[#E8EDF3]" />

            <p className="text-center text-sm text-[#53657A]">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#087F78] transition hover:text-[#065F59] hover:underline"
              >
                Sign up
              </Link>
            </p>

            <div className="mt-6 rounded-lg bg-[#F7F9FC] p-4 text-center">
              <p className="text-xs leading-5 text-[#718096]">
                This portal is for authorised CCTS staff. If you cannot access
                your account, contact your system administrator.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#8A98AA]">
            CCTS · Customer Complaint Tracking System
          </p>
        </section>
      </div>
    </main>
  );
}