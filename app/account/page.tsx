"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Headset,
  LockKeyhole,
  LogOut,
  MessageSquare,
  Save,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Profile = {
  fullName: string;
  email: string;
  staffId: string;
  department: string;
};

const STORAGE_KEY = "ccts-account-profile";

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    email: "",
    staffId: "",
    department: "",
  });

  const [saved, setSaved] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const data = JSON.parse(stored) as Partial<Profile>;

        setProfile({
          fullName: data.fullName ?? "",
          email: data.email ?? "",
          staffId: data.staffId ?? "",
          department: data.department ?? "",
        });
      }
    } catch {
      // Keep the form empty if browser data cannot be read.
    }
  }, []);

  function updateField(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
    } catch {
      window.alert("Unable to save your profile in this browser.");
    }
  }

  const initials = profile.fullName.trim()
    ? profile.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#142747]">
      {/* CCTS brand header */}
      <header className="relative z-20 bg-[#152d4e] text-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label="CCTS dashboard"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10968c]">
              <MessageSquare size={23} strokeWidth={2.3} />
            </span>

            <span className="text-[25px] font-bold tracking-tight sm:text-[30px]">
              CCTS
            </span>

            <span className="mx-1 hidden h-8 w-px bg-white/30 sm:block" />

            <span className="hidden text-sm text-slate-300 sm:block md:text-base">
              Customer care
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/help"
              className="hidden items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white md:flex"
            >
              <Headset size={19} />
              <span>Here to help, every step of the way</span>
            </Link>

            <Link
              href="/help"
              aria-label="Help and support"
              title="Help and support"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              <Headset size={21} />
            </Link>

            <span className="mx-1 hidden h-8 w-px bg-white/20 sm:block" />

            <Link
              href="/dashboard"
              aria-label="Dashboard"
              title="Dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>

            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white"
              onClick={() =>
                window.alert("Notifications are not connected in this demo.")
              }
            >
              <Bell size={20} />
            </button>

            <div className="relative">
              <button
                type="button"
                aria-label="Open account menu"
                aria-expanded={accountMenuOpen}
                onClick={() => setAccountMenuOpen((open) => !open)}
                className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10968c] text-xs font-bold text-white">
                  {initials}
                </span>
                <ChevronDown
                  size={15}
                  className={`hidden text-slate-200 transition sm:block ${
                    accountMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-[#dce5ef] bg-white py-2 text-[#142747] shadow-xl">
                  <div className="border-b border-[#e8edf4] px-4 py-3">
                    <p className="text-sm font-semibold">
                      {profile.fullName || "Your account"}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {profile.email || "Profile settings"}
                    </p>
                  </div>

                  <Link
                    href="/account"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f3f7fa]"
                  >
                    <UserRound size={17} />
                    Account options
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f3f7fa]"
                  >
                    <Settings size={17} />
                    Settings
                  </Link>

                  <Link
                    href="/login"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-3 border-t border-[#e8edf4] px-4 py-3 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <section className="border-b border-[#e0e8f1] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#07877f]">
              Account management
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-[30px]">
              Account Options
            </h1>
            <p className="mt-2 text-sm text-[#647895]">
              Manage your profile and review your account settings.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-[#dbe4ef] bg-white px-4 py-2.5 text-sm font-semibold text-[#183454] transition hover:border-[#0b8b82] hover:bg-[#f5fbfa]"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7">
        <section className="overflow-hidden rounded-2xl border border-[#dce5ef] bg-white">
          <div className="flex items-center gap-3 border-b border-[#e3eaf2] px-5 py-5 sm:px-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
              <UserRound size={22} />
            </span>

            <div>
              <h2 className="font-bold">Staff profile</h2>
              <p className="mt-1 text-sm text-[#647895]">
                Your contact and staff details
              </p>
            </div>
          </div>

          <form onSubmit={saveProfile} className="space-y-5 p-5 sm:p-7">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-[#203653]"
              >
                Full name
              </label>
              <input
                id="fullName"
                value={profile.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                className="w-full rounded-lg border border-[#d7e1ed] bg-white px-4 py-3 text-sm text-[#142747] outline-none transition placeholder:text-[#8a9ab0] focus:border-[#07877f] focus:ring-4 focus:ring-[#07877f]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#203653]"
              >
                Work email address
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="Enter your work email"
                autoComplete="email"
                className="w-full rounded-lg border border-[#d7e1ed] bg-white px-4 py-3 text-sm text-[#142747] outline-none transition placeholder:text-[#8a9ab0] focus:border-[#07877f] focus:ring-4 focus:ring-[#07877f]/10"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="staffId"
                  className="mb-2 block text-sm font-semibold text-[#203653]"
                >
                  Staff ID
                </label>
                <input
                  id="staffId"
                  value={profile.staffId}
                  onChange={(event) =>
                    updateField("staffId", event.target.value)
                  }
                  placeholder="Enter staff ID"
                  className="w-full rounded-lg border border-[#d7e1ed] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#8a9ab0] focus:border-[#07877f] focus:ring-4 focus:ring-[#07877f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-semibold text-[#203653]"
                >
                  Department
                </label>
                <input
                  id="department"
                  value={profile.department}
                  onChange={(event) =>
                    updateField("department", event.target.value)
                  }
                  placeholder="Enter department"
                  className="w-full rounded-lg border border-[#d7e1ed] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#8a9ab0] focus:border-[#07877f] focus:ring-4 focus:ring-[#07877f]/10"
                />
              </div>
            </div>

            {saved && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-lg border border-[#b9e5d8] bg-[#effaf6] px-4 py-3 text-sm font-medium text-[#146b57]"
              >
                <Check size={18} />
                Your profile has been saved in this browser.
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-[#e7edf4] pt-5">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087f78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b65] focus:outline-none focus:ring-4 focus:ring-[#087f78]/20"
              >
                <Save size={17} />
                Save changes
              </button>

              <Link
                href="/dashboard"
                className="rounded-lg border border-[#d7e1ed] px-5 py-3 text-sm font-semibold text-[#314866] transition hover:bg-[#f5f8fb]"
              >
                Cancel
              </Link>
            </div>

            <p className="text-xs leading-5 text-[#71829a]">
              This frontend demo saves your profile in this browser only.
              It does not update a server or verify staff identity.
            </p>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-[#dce5ef] bg-white p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <ShieldCheck size={21} />
              </span>
              <div>
                <h2 className="font-bold">Account security</h2>
                <p className="mt-1 text-xs text-[#647895]">
                  Profile and access
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[#e3eaf2] bg-[#f8fafc] p-4">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={18}
                  className="mt-0.5 shrink-0 text-[#647895]"
                />
                <div>
                  <p className="text-sm font-semibold">Password management</p>
                  <p className="mt-1 text-sm leading-5 text-[#647895]">
                    Password updates and account verification are not
                    connected yet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#dce5ef] bg-white p-5 sm:p-6">
            <h2 className="mb-3 font-bold">Quick links</h2>
            <p className="mb-4 text-sm text-[#647895]">
              Find other CCTS options.
            </p>

            <div className="space-y-1">
              <Link
                href="/settings"
                className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#203653] transition hover:bg-[#f2f8f8] hover:text-[#087f78]"
              >
                <Settings
                  size={18}
                  className="text-[#647895] group-hover:text-[#087f78]"
                />
                Settings
                <span className="ml-auto text-[#92a1b5]">›</span>
              </Link>

              <Link
                href="/help"
                className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#203653] transition hover:bg-[#f2f8f8] hover:text-[#087f78]"
              >
                <CircleHelp
                  size={18}
                  className="text-[#647895] group-hover:text-[#087f78]"
                />
                Help and support
                <span className="ml-auto text-[#92a1b5]">›</span>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#dce5ef] bg-white p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <Headset size={21} />
              </span>
              <h2 className="font-bold">Need help?</h2>
            </div>

            <p className="mb-4 text-sm leading-6 text-[#647895]">
              Visit the CCTS support workspace for help with the system.
            </p>

            <Link
              href="/help"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#07877f] px-4 py-3 text-sm font-semibold text-[#087f78] transition hover:bg-[#effaf8]"
            >
              <Headset size={17} />
              Contact support
            </Link>
          </section>

          <section className="rounded-2xl border border-[#f0d8d8] bg-white p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-3 text-[#a33d3d]">
              <LogOut size={20} />
              <h2 className="font-bold">Sign out</h2>
            </div>

            <p className="mb-4 text-sm leading-6 text-[#647895]">
              Go to the sign-in page. Real session sign-out requires
              authentication to be connected.
            </p>

            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e7caca] px-4 py-3 text-sm font-semibold text-[#a33d3d] transition hover:bg-[#fff5f5]"
            >
              <LogOut size={17} />
              Go to sign in
            </Link>
          </section>
        </aside>
      </div>

      <footer className="border-t border-[#e0e8f1] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 text-xs text-[#71829a] sm:px-8">
          <span className="font-semibold tracking-wide text-[#183454]">
            CCTS · Customer care
          </span>
          <span>Here to help, every step of the way.</span>
        </div>
      </footer>
    </main>
  );
}
