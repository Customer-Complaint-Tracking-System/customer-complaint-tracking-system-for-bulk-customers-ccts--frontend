"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface Props {
  email: string;
  onBack: () => void;
  onSuccess: (token: string) => void;
}

export default function VerifyResetCode({ email, onBack, onSuccess }: Props) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length !== 6) return;

    try {
      setIsLoading(true);

      // TODO: Verify OTP with your backend
      // const response = await verifyResetCode({ email, code });
      // onSuccess(response.resetToken);

      onSuccess(code);
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setIsResending(true);

      // TODO: Call resend OTP endpoint
      // await resendResetCode({ email });

      setCode("");
    } catch (error) {
      console.error("Failed to resend code:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl text-center font-bold tracking-tight text-slate-900">
            Verify your email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-slate-800">{email}</span>. Enter
            the code below to continue.
          </p>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-3">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-12 w-12 rounded-lg border-slate-200 text-lg"
                />
              ))}
            </InputOTPGroup>

            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-12 w-12 rounded-lg border-slate-200 text-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="h-12 w-full rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Verify code
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="space-y-4 text-center">
        <p className="text-sm text-slate-500">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className="font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        </p>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={15} />
          Change email address
        </button>
      </div>
    </div>
  );
}
