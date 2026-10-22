"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  Activity,
  Bell,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  History,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  X,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  function toggleSidebar() {
    setSidebarOpen((previous) => !previous);
    setNoticeOpen(false);
    setAccountOpen(false);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const navigation = [
    {
      heading: "Workspace",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: Home },
        {
          label: "Assigned complaints",
          href: "/assigned-complaints",
          icon: ClipboardList,
        },
        { label: "Customers", href: "/customers", icon: Users },
        {
          label: "Customer history",
          href: "/customer-history",
          icon: History,
        },
      ],
    },
    {
      heading: "Preferences",
      items: [
        { label: "Settings", href: "/settings", icon: Settings },
        { label: "Help and support", href: "/help", icon: CircleHelp },
      ],
    },
    {
      heading: "Staff workspace",
      items: [
        {
          label: "Staff workspace",
          href: "/staff-workspace",
          icon: ShieldCheck,
        },
      ],
    },
    {
      heading: "Staff account",
      items: [
        { label: "Account options", href: "/account", icon: UserRound },
        { label: "Sign out", href: "/login", icon: LogOut },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarOpen}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-blue-700 text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {sidebarOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
            <MessageSquare size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">CCTS</h1>
            <p className="text-xs text-slate-500">Complaint tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNoticeOpen((previous) => !previous);
                setAccountOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={noticeOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Bell size={21} />
            </button>

            {noticeOpen && (
              <div className="absolute right-0 top-12 z-[110] w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                <h3 className="font-semibold text-slate-900">
                  Notifications
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  You have no new notifications.
                </p>
                <button
                  type="button"
                  onClick={() => setNoticeOpen(false)}
                  className="mt-3 cursor-pointer text-sm font-medium text-blue-700 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Account menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAccountOpen((previous) => !previous);
                setNoticeOpen(false);
              }}
              aria-label="Open account menu"
              aria-expanded={accountOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              <UserRound size={21} />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-12 z-[110] w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                <Link
                  href="/account"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100"
                >
                  <UserRound size={17} />
                  Account options
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100"
                >
                  <Settings size={17} />
                  Settings
                </Link>
                <Link
                  href="/login"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Clickable background overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-[80] cursor-pointer bg-black/40"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Main navigation"
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 left-0 z-[90] flex w-[280px] max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[77px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white">
              <MessageSquare size={23} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">CCTS</h2>
              <p className="text-xs text-slate-500">Complaint tracking</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            tabIndex={sidebarOpen ? 0 : -1}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {navigation.map((section) => (
            <section key={section.heading}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {section.heading}
              </h3>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={sidebarOpen ? 0 : -1}
                      onClick={closeSidebar}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Icon size={19} />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight size={16} />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-4">
          <Link
            href="/account"
            tabIndex={sidebarOpen ? 0 : -1}
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 hover:bg-blue-50"
          >
            <UserRound size={21} className="text-blue-700" />
            <div>
              <p className="text-sm font-semibold">Staff account</p>
              <p className="text-xs text-slate-500">Account options</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Dashboard content */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm text-slate-500">Workspace</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Overview of your complaint tracking workspace.
            </p>
            {currentDate && (
              <p className="mt-2 text-xs text-slate-400">{currentDate}</p>
            )}
          </div>

          <Link
            href="/assigned-complaints"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <ClipboardList size={18} />
            View complaints
          </Link>
        </div>

        {/* Summary cards: no invented complaint counts */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="All complaints"
            value="—"
            description="Live complaint data not connected"
            icon={FileText}
            href="/assigned-complaints"
          />
          <SummaryCard
            title="New complaints"
            value="—"
            description="Live complaint data not connected"
            icon={Activity}
            href="/assigned-complaints?status=New"
          />
          <SummaryCard
            title="In progress"
            value="—"
            description="Live complaint data not connected"
            icon={ClipboardList}
            href="/assigned-complaints?status=In%20Progress"
          />
          <SummaryCard
            title="Resolved"
            value="—"
            description="Live complaint data not connected"
            icon={ShieldCheck}
            href="/assigned-complaints?status=Resolved"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Recent complaints */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent complaints
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your complaint activity will appear here.
                </p>
              </div>
              <ClipboardList className="text-slate-400" size={22} />
            </div>

            <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FileText size={23} className="text-slate-500" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                No complaint records to display
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                No sample complaints are being shown. Real complaint records
                can appear here when a data source is connected.
              </p>
              <Link
                href="/assigned-complaints"
                className="mt-4 text-sm font-semibold text-blue-700 hover:underline"
              >
                Open assigned complaints →
              </Link>
            </div>
          </section>

          {/* Quick access */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Quick access</h2>
            <p className="mt-1 text-sm text-slate-500">
              Navigate to other sections.
            </p>

            <div className="mt-5 space-y-2">
              <QuickLink
                href="/assigned-complaints"
                icon={ClipboardList}
                label="Assigned complaints"
              />
              <QuickLink
                href="/customers"
                icon={Users}
                label="Customers"
              />
              <QuickLink
                href="/customer-history"
                icon={History}
                label="Customer history"
              />
              <QuickLink
                href="/settings"
                icon={Settings}
                label="Settings"
              />
              <QuickLink
                href="/help"
                icon={CircleHelp}
                label="Help and support"
              />
            </div>
          </section>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-500">
          <p>CCTS · Complaint tracking</p>
          <p>Frontend interface</p>
        </footer>
      </main>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-blue-700 transition group-hover:bg-blue-100">
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{description}</p>
    </Link>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: IconType;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-200 hover:bg-slate-50 hover:text-blue-700"
    >
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      <ChevronRight size={16} />
    </Link>
  );
}