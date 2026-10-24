"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
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
    icon: Activity,
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
    <main className="min-h-screen bg-[#F7F9FC] text-[#24364B]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#152D4E] px-4 text-white shadow-sm sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10968C] text-white">
            <MessageSquare size={22} />
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
          <LayoutDashboard size={17} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-9">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#087F78] transition hover:text-[#065F59]"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <section className="relative mb-8 overflow-hidden rounded-2xl bg-[#152D4E] p-6 text-white shadow-sm sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[32px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-[#10968C]/10" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#55D2C3]">
                <ShieldCheck size={25} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#67D5C8]">
                  Staff portal
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Customer Complaint Tracking System
                </p>
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Staff Workspace
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Access the available CCTS workspace sections and navigate to
              the tools needed for complaint tracking.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/assigned-complaints"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10968C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#087F78]"
              >
                <ClipboardList size={18} />
                Open complaints
              </Link>

              <Link
                href="/account"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <UserRound size={18} />
                My account
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Assigned complaints"
            description="Open the complaints page to review available records."
            icon={ClipboardList}
            href="/assigned-complaints"
          />

          <SummaryCard
            title="Customer records"
            description="Navigate to the customer directory."
            icon={Users}
            href="/customers"
          />

          <SummaryCard
            title="Complaint activity"
            description="Open the customer history section."
            icon={Activity}
            href="/customer-history"
          />

          <SummaryCard
            title="Staff account"
            description="Review your available account options."
            icon={UserRound}
            href="/account"
          />
        </section>

        <section className="rounded-xl border border-[#DCE5EF] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#152D4E]">
                Workspace tools
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#718096]">
                Select a section to continue working in CCTS.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#B7DCD7] bg-[#EAF8F5] px-3 py-1.5 text-xs font-semibold text-[#087F78]">
              <span className="h-2 w-2 rounded-full bg-[#10968C]" />
              workspace
            </span>
          </div>

          <div className="relative mt-6">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
            />
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search workspace tools..."
              aria-label="Search workspace tools"
              className="w-full rounded-lg border border-[#DCE5EF] bg-white py-3 pl-10 pr-4 text-sm text-[#24364B] outline-none transition placeholder:text-[#9AA6B5] focus:border-[#10968C] focus:ring-2 focus:ring-[#10968C]/15"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-xl border border-[#DCE5EF] bg-white p-4 transition hover:border-[#A9D8D2] hover:bg-[#F5FBFA]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F5] text-[#087F78] transition group-hover:bg-[#10968C] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-[#152D4E]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-[#718096]">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="mt-1 shrink-0 text-[#9AA6B5] transition group-hover:translate-x-0.5 group-hover:text-[#087F78]"
                  />
                </Link>
              );
            })}
          </div>

          {filteredLinks.length === 0 && (
            <div className="mt-5 rounded-xl border border-dashed border-[#CBD7E4] px-4 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#718096]">
                <Search size={24} />
              </div>
              <p className="mt-3 font-semibold text-[#152D4E]">
                No matching workspace tools
              </p>
              <p className="mt-1 text-sm text-[#718096]">
                Try another search term to find a workspace section.
              </p>
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="mt-4 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-[#087F78] transition hover:bg-[#EAF8F5]"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        {showInfo && (
          <section className="mt-6 flex items-start gap-3 rounded-xl border border-[#B7DCD7] bg-[#EAF8F5] p-4">
            <CheckCircle2
              size={21}
              className="mt-0.5 shrink-0 text-[#087F78]"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#155E59]">
                About this workspace
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#347C75]">
                This page provides frontend navigation. Complaint counts,
                customer information, staff permissions, and activity records
                are not invented or generated here. Live records require a
                connected data source.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowInfo(false)}
              aria-label="Dismiss information"
              className="cursor-pointer rounded-md px-2 text-xl text-[#087F78] transition hover:bg-[#D6F0EB]"
            >
              ×
            </button>
          </section>
        )}

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE5EF] py-5 text-xs text-[#8190A3]">
          <p>CCTS · Staff workspace</p>
          <Link
            href="/help"
            className="inline-flex items-center gap-1.5 font-semibold text-[#087F78] transition hover:text-[#065F59]"
          >
            <CircleHelp size={15} />
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
      className="group rounded-xl border border-[#DCE5EF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#A9D8D2] hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8F5] text-[#087F78] transition group-hover:bg-[#10968C] group-hover:text-white">
          <Icon size={21} />
        </div>
        <ChevronRight
          size={18}
          className="text-[#9AA6B5] transition group-hover:translate-x-1 group-hover:text-[#087F78]"
        />
      </div>

      <h3 className="mt-4 font-bold text-[#152D4E]">{title}</h3>
      <p className="mt-2 text-sm leading-5 text-[#718096]">{description}</p>
    </Link>
  );
}