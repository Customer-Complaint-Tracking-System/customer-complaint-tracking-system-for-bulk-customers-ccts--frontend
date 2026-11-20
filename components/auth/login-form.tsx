"use client";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useProfileHook from "@/hooks/use-profile.hook";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import CustomButton from "../shared/custom-button";
import { useQueryClient } from "@tanstack/react-query";
import axiosHandler from "@/lib/axios";
import { getProfile } from "@/service/profile/profile.service";
import { getDashboardRoute } from "@/lib/dashboard-route";
import { ProfileResponse } from "@/service/profile/profile.type";
import { queryKeys } from "@/lib/query-keys";



export default function LoginForm() {
  const queryClient = useQueryClient();
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

    // 1. Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // 2. Ensure your Axios handler can authenticate the profile request.
    // If your Axios interceptor already reads the Supabase session,
    // you don't need to set this manually.
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      throw new Error("Authentication token not found");
    }

    axiosHandler.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // Fetch profile directly
    const profile = await getProfile();
    console.log(profile);
    

    // Store profile in TanStack Query cache
    queryClient.setQueryData(queryKeys.profile.root, profile);

    // 4. Redirect based on user's role
    router.replace(getDashboardRoute(profile.data.role));
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
        <CustomButton
          title={isLoading ? "Signing in..." : "Sign in"}
          className="w-full"
          disabled={isLoading}
          type="submit"
        />
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
