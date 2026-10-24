"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  History,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";

const workspaceLinks = [
  {
    title: "Dashboard",
    description: "View your complaint tracking overview.",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assigned complaints",
    description: "Open the complaints assigned to staff.",
    href: "/assigned-complaints",
    icon: ClipboardList,
  },
  {
    title: "Customers",
    description: "Access the customer section.",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Customer history",
    description: "Open customer history records.",
    href: "/customer-history",
    icon: History,
  },
  {
    title: "Account options",
    description: "View account options.",
    href: "/account",
    icon: UserRound,
  },
  {
    title: "Settings",
    description: "Manage interface preferences.",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help and support",
    description: "Find help using CCTS.",
    href: "/help",
    icon: CircleHelp,
  },
];

export default function StaffWorkspacePage() {
  const [searchText, setSearchText] = useState("");
  const [showInfo, setShowInfo] = useState(true);

  const filteredLinks = workspaceLinks.filter((item) => {
    const search = searchText.trim().toLowerCase();

    return (
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">CCTS</h1>
            <p className="text-xs text-slate-500">Complaint tracking</p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium transition hover:bg-slate-50"
        >
          <LayoutDashboard size={17} />
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-7xl p-4 sm:p-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        {/* Page title */}
        <section className="mb-8 rounded-2xl bg-blue-700 p-6 text-white sm:p-9">
          <div className="flex items-center gap-3">
            <ShieldCheck size={30} />
            <span className="text-sm font-semibold text-blue-100">
              STAFF PORTAL
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            Staff Workspace
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Access the available CCTS workspace sections and navigate to the
            tools needed for complaint tracking.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/assigned-complaints"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              <ClipboardList size={18} />
              Open complaints
            </Link>

            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <UserRound size={18} />
              My account
            </Link>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Assigned complaints"
            description="Complaint records available through the complaints page."
            icon={ClipboardList}
            href="/assigned-complaints"
          />

          <SummaryCard
            title="Customer records"
            description="Open the customer section."
            icon={Users}
            href="/customers"
          />

          <SummaryCard
            title="Complaint activity"
            description="View the customer history section."
            icon={Activity}
            href="/customer-history"
          />

          <SummaryCard
            title="Staff account"
            description="Review account options."
            icon={UserRound}
            href="/account"
          />
        </section>

        {/* Workspace tools */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Workspace tools
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Select a section to continue.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Frontend workspace
            </span>
          </div>

          <div className="relative mt-6">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search workspace tools..."
              aria-label="Search workspace tools"
              className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="rounded-lg bg-slate-100 p-3 text-slate-600 transition group-hover:bg-white group-hover:text-blue-700">
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                  />
                </Link>
              );
            })}
          </div>

          {filteredLinks.length === 0 && (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center">
              <Search className="mx-auto text-slate-400" size={26} />
              <p className="mt-3 font-semibold text-slate-800">
                No matching workspace tools
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try another search term.
              </p>
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="mt-3 cursor-pointer text-sm font-semibold text-blue-700 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Information notice */}
        {showInfo && (
          <section className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0 text-blue-700"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">
                About this workspace
              </h3>
              <p className="mt-1 text-sm leading-6 text-blue-800">
                This page provides frontend navigation only. Complaint counts,
                customer information, staff permissions, and activity records
                are not generated or invented here.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowInfo(false)}
              aria-label="Dismiss information"
              className="cursor-pointer px-2 text-lg text-blue-700 hover:text-blue-900"
            >
              ×
            </button>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-500">
          <p>CCTS · Staff workspace</p>
          <Link href="/help" className="font-medium text-blue-700 hover:underline">
            Need help?
          </Link>
        </footer>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: typeof ClipboardList;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
          <Icon size={21} />
        </div>
        <ChevronRight
          size={18}
          className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
        />
      </div>

      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-5 text-slate-500">{description}</p>
    </Link>
  );
}