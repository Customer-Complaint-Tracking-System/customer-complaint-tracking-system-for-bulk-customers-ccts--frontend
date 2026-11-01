"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";

export default function SignOutPage() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  function handleSignOut() {
    setSigningOut(true);

    // Clear frontend sign-in information.
    // Add other CCTS session keys here if your login uses different names.
    localStorage.removeItem("ccts-user");
    localStorage.removeItem("ccts-staff");
    localStorage.removeItem("ccts-session");
    localStorage.removeItem("ccts-auth-token");
    sessionStorage.clear();

    router.replace("/login");
  }

  useEffect(() => {
    // Keep the page ready for the user's confirmation.
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#152D4E]">
      <header className="bg-[#152D4E] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10968C] font-bold">
              C
            </div>
            <div>
              <p className="text-lg font-bold">CCTS</p>
              <p className="text-xs text-slate-300">Staff Portal</p>
            </div>
          </Link>

          <span className="text-sm text-slate-300">Sign out</span>
        </div>
      </header>

      <section className="flex min-h-[80vh] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#DCE5EF] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5F3]">
            <LogOut className="h-8 w-8 text-[#10968C]" />
          </div>

          <h1 className="text-2xl font-bold">Sign out of CCTS?</h1>

          <p className="mt-3 text-sm leading-6 text-[#718096]">
            Are you sure you want to sign out of your staff account? You will
            need to sign in again to access your staff dashboard.
          </p>

          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10968C] px-5 py-3 font-semibold text-white transition hover:bg-[#087F78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="h-5 w-5" />
                  Yes, sign me out
                </>
              )}
            </button>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCE5EF] px-5 py-3 font-semibold text-[#152D4E] transition hover:bg-[#F7F9FC]"
            >
              <ArrowLeft className="h-4 w-4" />
              Cancel and return to dashboard
            </Link>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#718096]">
            <ShieldCheck className="h-4 w-4 text-[#10968C]" />
            Your CCTS account security matters.
          </div>
        </div>
      </section>
    </main>
  );
}