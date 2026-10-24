"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  LockKeyhole,
  Menu,
  Monitor,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const SETTINGS_KEY = "ccts-settings";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  function saveSettings() {
    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          notifications,
          emailAlerts,
          compactView,
        })
      );
      setShowSaved(true);
      setSaveError(false);
    } catch {
      setShowSaved(false);
      setSaveError(true);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#24364B]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#DCE5EF] bg-[#152D4E] px-4 text-white shadow-sm sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10968C] text-white">
            <SettingsIcon size={21} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">CCTS</h1>
            <p className="text-xs text-slate-300">
              Complaint tracking system
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium transition hover:bg-white/10"
        >
          <Menu size={17} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-9">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#087F78] transition hover:text-[#065F59]"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#10968C]">
            Preferences
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#152D4E] sm:text-4xl">
            Settings
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68788D] sm:text-base">
            Manage your notification preferences, appearance, and account
            security options.
          </p>
        </div>

        {showSaved && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#A9DED7] bg-[#EAF8F5] p-4 text-sm text-[#086B63]">
            <Check size={19} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Settings saved successfully</p>
              <p className="mt-1 text-[#347C75]">
                Your preferences have been saved in this browser.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSaved(false)}
              className="cursor-pointer font-medium underline underline-offset-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {saveError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            Your settings could not be saved. Check your browser storage and
            try again.
          </div>
        )}

        <div className="grid items-start gap-6 md:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-[#DCE5EF] bg-white p-3 shadow-sm md:sticky md:top-24">
            <p className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A98AA]">
              Settings menu
            </p>

            <a
              href="#notifications"
              className="flex items-center gap-3 rounded-lg border-l-[3px] border-[#10968C] bg-[#EAF8F5] px-3 py-3 text-sm font-semibold text-[#087F78]"
            >
              <Bell size={18} />
              Notifications
            </a>

            <a
              href="#appearance"
              className="mt-1 flex items-center gap-3 rounded-lg border-l-[3px] border-transparent px-3 py-3 text-sm font-medium text-[#53657A] transition hover:bg-[#F3F7FA] hover:text-[#152D4E]"
            >
              <Monitor size={18} />
              Appearance
            </a>

            <a
              href="#security"
              className="mt-1 flex items-center gap-3 rounded-lg border-l-[3px] border-transparent px-3 py-3 text-sm font-medium text-[#53657A] transition hover:bg-[#F3F7FA] hover:text-[#152D4E]"
            >
              <LockKeyhole size={18} />
              Security
            </a>

            <div className="my-3 border-t border-[#E8EDF3]" />

            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#53657A] transition hover:bg-[#F3F7FA] hover:text-[#087F78]"
            >
              <CircleHelp size={18} />
              Help and support
            </Link>
          </aside>

          <div className="min-w-0 space-y-6">
            <section
              id="notifications"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <div className="flex items-start gap-4 border-b border-[#E8EDF3] px-5 py-5 sm:px-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F5] text-[#087F78]">
                  <Bell size={21} />
                </div>
                <div>
                  <h3 className="font-bold text-[#152D4E]">
                    Notification preferences
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Choose how you would like notification preferences to be
                    configured.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6">
                <SettingToggle
                  title="In-app notifications"
                  description="Allow notification messages to appear in the interface."
                  checked={notifications}
                  onChange={(value) => {
                    setNotifications(value);
                    setShowSaved(false);
                  }}
                />

                <SettingToggle
                  title="Email alert preference"
                  description="Save your preference for email alerts. Sending actual emails requires a connected email service."
                  checked={emailAlerts}
                  onChange={(value) => {
                    setEmailAlerts(value);
                    setShowSaved(false);
                  }}
                />
              </div>
            </section>

            <section
              id="appearance"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <div className="flex items-start gap-4 border-b border-[#E8EDF3] px-5 py-5 sm:px-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FA] text-[#152D4E]">
                  <Monitor size={21} />
                </div>
                <div>
                  <h3 className="font-bold text-[#152D4E]">Appearance</h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Configure your preferred interface display.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6">
                <SettingToggle
                  title="Compact view"
                  description="Save a preference for a more compact interface."
                  checked={compactView}
                  onChange={(value) => {
                    setCompactView(value);
                    setShowSaved(false);
                  }}
                />
              </div>

              <div className="mx-5 mb-5 rounded-lg border border-[#DCE5EF] bg-[#F7F9FC] p-4 sm:mx-6">
                <p className="text-xs leading-5 text-[#68788D]">
                  This preference is stored locally. Applying compact view
                  throughout CCTS requires connecting the preference to the
                  other pages.
                </p>
              </div>
            </section>

            <section
              id="security"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F5] text-[#087F78]">
                  <ShieldCheck size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#152D4E]">
                    Security and access
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Review your account options and available security
                    settings.
                  </p>

                  <Link
                    href="/account"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#B7DCD7] px-4 py-2.5 text-sm font-semibold text-[#087F78] transition hover:bg-[#EAF8F5]"
                  >
                    View account options
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="mx-5 mb-5 flex items-start gap-3 rounded-lg border border-[#E7D9B5] bg-[#FFFAED] p-4 sm:mx-6">
                <LockKeyhole
                  size={18}
                  className="mt-0.5 shrink-0 text-[#987128]"
                />
                <p className="text-sm leading-5 text-[#80672F]">
                  Password changes and authentication security must be handled
                  by a connected authentication service. This settings page
                  does not change your password.
                </p>
              </div>
            </section>

            <section className="rounded-xl border border-[#DCE5EF] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-[#152D4E]">
                    Save preferences
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Your changes are not saved until you select Save settings.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={saveSettings}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#10968C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087F78] focus:outline-none focus:ring-2 focus:ring-[#10968C] focus:ring-offset-2"
                >
                  <Save size={17} />
                  Save settings
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-[#DCE5EF] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#53657A]">
                  <UserRound size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#152D4E]">
                    Account options
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Manage your account profile and available account actions.
                  </p>
                </div>
                <Link
                  href="/account"
                  aria-label="Open account options"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DCE5EF] text-[#53657A] transition hover:border-[#10968C] hover:bg-[#EAF8F5] hover:text-[#087F78]"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-9 flex flex-col gap-2 border-t border-[#DCE5EF] py-5 text-xs text-[#8190A3] sm:flex-row sm:items-center sm:justify-between">
          <p>CCTS · Customer Complaint Tracking System</p>
          <p>Settings and preferences</p>
        </footer>
      </div>
    </main>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-t border-[#E8EDF3] py-5 first:border-t-0">
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-[#24364B]">{title}</h4>
        <p className="mt-1 max-w-md text-sm leading-5 text-[#718096]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#10968C] focus:ring-offset-2 ${
          checked ? "bg-[#10968C]" : "bg-[#CBD5E1]"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}