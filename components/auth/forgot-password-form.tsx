"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
}

export default function ForgotPasswordForm({
  email,
  setEmail,
  onSuccess,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // TODO: Call your forgot password API
      // await forgotPassword({ email });

      onSuccess();
    } catch (error) {
      console.error("Failed to send reset code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
       

        <div>
          <h1 className="text-2xl text-center font-bold tracking-tight text-slate-900">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No worries. Enter your registered email address and we'll send you a
            verification code to reset your password.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl bg-slate-50/60"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending code...
            </>
          ) : (
            <>
              Send verification code
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
