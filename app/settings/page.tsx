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

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  function saveSettings() {
    try {
      localStorage.setItem(
        "ccts-settings",
        JSON.stringify({
          notifications,
          emailAlerts,
          compactView,
        })
      );
      setShowSaved(true);
    } catch {
      setShowSaved(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
            <SettingsIcon size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">CCTS</h1>
            <p className="text-xs text-slate-500">Complaint tracking</p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Menu size={17} />
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-1 text-sm text-slate-500">Preferences</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Settings
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage your CCTS interface preferences.
          </p>
        </div>

        {showSaved && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
            <Check size={19} />
            Your settings have been saved on this device.
            <button
              type="button"
              onClick={() => setShowSaved(false)}
              className="ml-auto cursor-pointer underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Preferences
            </p>
            <a
              href="#notifications"
              className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700"
            >
              <Bell size={18} />
              Notifications
            </a>
            <a
              href="#appearance"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Monitor size={18} />
              Appearance
            </a>
            <a
              href="#security"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <LockKeyhole size={18} />
              Security
            </a>
            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <CircleHelp size={18} />
              Help and support
            </Link>
          </aside>

          <div className="space-y-6">
            <section
              id="notifications"
              className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="mb-5 flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                  <Bell size={21} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Notification preferences
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose which notification preferences you want to use.
                  </p>
                </div>
              </div>

              <SettingToggle
                title="In-app notifications"
                description="Allow notification messages to appear in the interface."
                checked={notifications}
                onChange={setNotifications}
              />

              <SettingToggle
                title="Email alert preference"
                description="Save your preference for email alerts. Actual emails require an email service."
                checked={emailAlerts}
                onChange={setEmailAlerts}
              />
            </section>

            <section
              id="appearance"
              className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="mb-5 flex items-start gap-3">
                <div className="rounded-lg bg-violet-50 p-3 text-violet-700">
                  <Monitor size={21} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Appearance</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Adjust the density of interface content.
                  </p>
                </div>
              </div>

              <SettingToggle
                title="Compact view"
                description="Save a preference for a more compact interface."
                checked={compactView}
                onChange={setCompactView}
              />

              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                The compact-view preference is saved here; applying it across
                every page requires connecting this preference to those pages.
              </p>
            </section>

            <section
              id="security"
              className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
                  <ShieldCheck size={21} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">Security</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Account security controls.
                  </p>
                  <Link
                    href="/account"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    View account options
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                Password changes and authentication security must be handled
                by a connected authentication service.
              </p>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">
                Preferences are stored locally in this browser.
              </p>
              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <Save size={17} />
                Save settings
              </button>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <UserRound size={21} className="text-slate-500" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    Account options
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage your account page and sign-out link.
                  </p>
                </div>
                <Link
                  href="/account"
                  aria-label="Open account options"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-700"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-8 border-t border-slate-200 py-5 text-xs text-slate-500">
          CCTS · Settings · Frontend interface
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
    <div className="flex items-center justify-between gap-4 border-t border-slate-100 py-5 first:border-t-0">
      <div>
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition ${
          checked ? "bg-blue-700" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}