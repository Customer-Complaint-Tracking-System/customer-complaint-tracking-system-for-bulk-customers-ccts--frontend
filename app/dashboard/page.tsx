"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  Activity,
  Bell,
  ChevronRight,
  ChevronDown,
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
  Headset,
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
    <div className="min-h-screen bg-[#f7f9fc] text-[#142747]">
      {/* Navy CCTS header */}
      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/10 bg-[#152d4e] px-4 text-white sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={sidebarOpen}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#36c4b5]"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10968c] text-white">
              <MessageSquare size={22} />
            </span>

            <span className="text-[25px] font-bold tracking-tight sm:text-[30px]">
              CCTS
            </span>

            <span className="mx-1 hidden h-8 w-px bg-white/30 sm:block" />

            
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/help"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white lg:flex"
          >
            <Headset size={19} />
            <span>Here to help, every step of the way</span>
          </Link>

          <Link
            href="/help"
            aria-label="Help and support"
            title="Help and support"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Headset size={20} />
          </Link>

          <span className="mx-1 hidden h-8 w-px bg-white/20 sm:block" />

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
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#36c4b5]"
            >
              <Bell size={20} />
            </button>

            {noticeOpen && (
              <div className="absolute right-0 top-12 z-[110] w-64 rounded-xl border border-[#dce5ef] bg-white p-4 text-[#142747] shadow-xl">
                <h3 className="font-semibold">Notifications</h3>
                <p className="mt-2 text-sm text-[#647895]">
                  You have no new notifications.
                </p>
                <button
                  type="button"
                  onClick={() => setNoticeOpen(false)}
                  className="mt-3 cursor-pointer text-sm font-semibold text-[#087f78] hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Compact account control */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAccountOpen((previous) => !previous);
                setNoticeOpen(false);
              }}
              aria-label="Open account menu"
              aria-expanded={accountOpen}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#36c4b5]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10968c] text-white">
                <UserRound size={18} />
              </span>
              <span className="hidden text-sm font-medium sm:inline">
                Account
              </span>
              <ChevronDown
                size={15}
                className={`text-slate-300 transition ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-12 z-[110] w-56 rounded-xl border border-[#dce5ef] bg-white p-2 text-[#142747] shadow-xl">
                <Link
                  href="/account"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[#edf8f7]"
                >
                  <UserRound size={17} className="text-[#087f78]" />
                  Account options
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-[#edf8f7]"
                >
                  <Settings size={17} className="text-[#087f78]" />
                  Settings
                </Link>
                <Link
                  href="/login"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-700 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Clickable overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-[80] cursor-pointer bg-[#10233d]/40"
        />
      )}

      {/* Slide-out sidebar */}
      <aside
        aria-label="Main navigation"
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 left-0 z-[90] flex w-[280px] max-w-[85vw] flex-col border-r border-[#dce5ef] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[77px] shrink-0 items-center justify-between border-b border-[#e2e9f1] px-5">
          <Link
            href="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10968c] text-white">
              <MessageSquare size={23} />
            </span>
            <span>
              <span className="block text-lg font-bold text-[#152d4e]">
                CCTS
              </span>
              <span className="block text-xs text-[#647895]">
                Customer care
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            tabIndex={sidebarOpen ? 0 : -1}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#647895] transition hover:bg-[#edf8f7] hover:text-[#087f78]"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {navigation.map((section) => (
            <section key={section.heading}>
              <h3 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#8292a8]">
                {section.heading}
              </h3>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.href === "/dashboard";

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      tabIndex={sidebarOpen ? 0 : -1}
                      onClick={closeSidebar}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-[#e8f6f4] text-[#087f78]"
                          : "text-[#536781] hover:bg-[#f1f8f8] hover:text-[#087f78]"
                      }`}
                    >
                      <Icon size={19} />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight size={16} className="opacity-60" />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className="shrink-0 border-t border-[#e2e9f1] p-4">
          <Link
            href="/account"
            tabIndex={sidebarOpen ? 0 : -1}
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl border border-[#e2e9f1] bg-[#f8fafc] p-3 transition hover:border-[#b7e2dd] hover:bg-[#edf8f7]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f3f0] text-[#087f78]">
              <UserRound size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#152d4e]">
                Staff account
              </span>
              <span className="block text-xs text-[#647895]">
                Account options
              </span>
            </span>
          </Link>
        </div>
      </aside>

      {/* Dashboard body */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-[#087f78]">
              Workspace
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#152d4e] sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#647895]">
              Overview of your complaint tracking workspace.
            </p>
            {currentDate && (
              <p className="mt-2 text-xs text-[#8292a8]">{currentDate}</p>
            )}
          </div>

          <Link
            href="/assigned-complaints"
            className="inline-flex items-center gap-2 rounded-lg bg-[#087f78] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b65] focus:outline-none focus:ring-4 focus:ring-[#087f78]/20"
          >
            <ClipboardList size={18} />
            View complaints
          </Link>
        </div>

        {/* Summary cards */}
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
          <section className="rounded-xl border border-[#dce5ef] bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#152d4e]">
                  Recent complaints
                </h2>
                <p className="mt-1 text-sm text-[#647895]">
                  Your complaint activity will appear here.
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <ClipboardList size={21} />
              </span>
            </div>

            <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-[#d5e0ec] px-4 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f5f9] text-[#536781]">
                <FileText size={23} />
              </div>
              <h3 className="mt-4 font-semibold text-[#152d4e]">
                No complaint records to display
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#647895]">
                No sample complaints are being shown. Real complaint records
                can appear here when a data source is connected.
              </p>
              <Link
                href="/assigned-complaints"
                className="mt-4 text-sm font-semibold text-[#087f78] hover:underline"
              >
                Open assigned complaints →
              </Link>
            </div>
          </section>

          {/* Quick access */}
          <section className="rounded-xl border border-[#dce5ef] bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#152d4e]">Quick access</h2>
            <p className="mt-1 text-sm text-[#647895]">
              Navigate to other sections.
            </p>

            <div className="mt-5 space-y-2">
              <QuickLink
                href="/assigned-complaints"
                icon={ClipboardList}
                label="Assigned complaints"
              />
              <QuickLink href="/customers" icon={Users} label="Customers" />
              <QuickLink
                href="/customer-history"
                icon={History}
                label="Customer history"
              />
              <QuickLink href="/settings" icon={Settings} label="Settings" />
              <QuickLink
                href="/help"
                icon={CircleHelp}
                label="Help and support"
              />
            </div>
          </section>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#dce5ef] py-5 text-xs text-[#71829a]">
          <p className="font-semibold text-[#152d4e]">CCTS · Customer care</p>
          <p>Here to help, every step of the way.</p>
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
      className="group rounded-xl border border-[#dce5ef] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#9bd7d0] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#647895]">{title}</p>
          <p className="mt-3 text-3xl font-bold text-[#152d4e]">{value}</p>
        </div>
        <div className="rounded-xl bg-[#e8f6f4] p-3 text-[#087f78] transition group-hover:bg-[#d7f0ec]">
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-[#71829a]">{description}</p>
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
      className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-sm font-medium text-[#536781] transition hover:border-[#dce5ef] hover:bg-[#f1f8f8] hover:text-[#087f78]"
    >
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      <ChevronRight size={16} className="text-[#8292a8]" />
    </Link>
  );
}
