"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      router.push("/manager");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl text-center font-semibold tracking-tight text-slate-900">
          Welcome back
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email address
          </Label>

          <div className="group relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600"
            />

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 text-sm transition focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </Label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="group relative">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600"
            />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 pr-12 text-sm transition focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-500/10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
          />

          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm font-normal text-slate-600"
          >
            Keep me signed in
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="group h-12 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-base font-semibold shadow-lg shadow-emerald-600/25 transition hover:from-emerald-700 hover:to-emerald-800 hover:shadow-emerald-600/40 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-10 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600" />

        <p className="text-xs leading-5 text-slate-500">
          Protected access to the Customer Complaint Tracking System. Contact
          your administrator if you need account assistance.
        </p>
      </div>
    </div>
  );
}
