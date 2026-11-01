"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import VerifyResetCode from "@/components/auth/verify-reset-code";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export type ForgotPasswordStep = "email" | "verify" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Form */}
        {step === "email" && (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            onSuccess={() => setStep("verify")}
          />
        )}

        {step === "verify" && (
          <VerifyResetCode
            email={email}
            onBack={() => setStep("email")}
            onSuccess={(token) => {
              setResetToken(token);
              setStep("reset");
            }}
          />
        )}

        {step === "reset" && (
          <ResetPasswordForm
            resetToken={resetToken}
            onSuccess={() => {
              window.location.href = "/login";
            }}
          />
        )}

        {/* Back to login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
