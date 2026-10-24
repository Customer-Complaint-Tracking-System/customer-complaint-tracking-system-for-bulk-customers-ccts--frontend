"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  ClipboardList,
  RefreshCw,
  X,
  MessageSquare,
  UserRound,
  Bell,
  ChevronDown,
  Headset,
} from "lucide-react";

type ComplaintStatus = "New" | "In Progress" | "Resolved";

const STATUS_OPTIONS = [
  "All statuses",
  "New",
  "In Progress",
  "Resolved",
] as const;

type Complaint = {
  id: string;
  subject: string;
  customer: string;
  status: ComplaintStatus;
};

export default function AssignedComplaintsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All statuses");
  const [notice, setNotice] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedStatus = params.get("status");

    if (
      requestedStatus &&
      STATUS_OPTIONS.includes(
        requestedStatus as (typeof STATUS_OPTIONS)[number]
      )
    ) {
      setStatus(requestedStatus);
    }
  }, []);

  // Real complaints will be supplied by the connected data source.
  const complaints: Complaint[] = [];

  const filteredComplaints = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesStatus =
        status === "All statuses" || complaint.status === status;

      const matchesSearch =
        !searchText ||
        complaint.id.toLowerCase().includes(searchText) ||
        complaint.subject.toLowerCase().includes(searchText) ||
        complaint.customer.toLowerCase().includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [complaints, search, status]);

  function clearFilters() {
    setSearch("");
    setStatus("All statuses");
    window.history.replaceState({}, "", window.location.pathname);
  }

  function refreshComplaints() {
    setNotice(
      "No complaint records have been loaded. Real complaints will appear here when the complaint data source is connected."
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#142747]">
      {/* CCTS navy header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#152d4e] text-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10968c]">
              <MessageSquare size={22} />
            </span>

            <span className="text-[25px] font-bold tracking-tight sm:text-[30px]">
              CCTS
            </span>

            <span className="mx-1 hidden h-8 w-px bg-white/30 sm:block" />

          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/help"
              aria-label="Help and support"
              title="Help and support"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white sm:w-auto sm:gap-2 sm:px-3"
            >
              <Headset size={20} />
              <span className="hidden text-sm sm:inline">Support</span>
            </Link>

            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={noticeOpen}
                onClick={() => {
                  setNoticeOpen((previous) => !previous);
                  setAccountOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Bell size={20} />
              </button>

              {noticeOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-[#dce5ef] bg-white p-4 text-[#152d4e] shadow-xl">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="mt-2 text-sm text-[#647895]">
                    You have no new notifications.
                  </p>
                  <button
                    type="button"
                    onClick={() => setNoticeOpen(false)}
                    className="mt-3 text-sm font-semibold text-[#087f78] hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Open account menu"
                aria-expanded={accountOpen}
                onClick={() => {
                  setAccountOpen((previous) => !previous);
                  setNoticeOpen(false);
                }}
                className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 transition hover:bg-white/15"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10968c]">
                  <UserRound size={18} />
                </span>
                <span className="hidden text-sm sm:inline">Account</span>
                <ChevronDown size={15} className="text-slate-300" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-[#dce5ef] bg-white p-2 text-[#152d4e] shadow-xl">
                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[#edf8f7]"
                  >
                    Account options
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[#edf8f7]"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-red-700 hover:bg-red-50"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page title */}
      <section className="border-b border-[#dce5ef] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#647895] transition hover:text-[#087f78]"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.13em] text-[#087f78]">
              Workspace
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#152d4e] sm:text-3xl">
              Assigned complaints
            </h1>

            <p className="mt-2 text-sm text-[#647895]">
              Review and manage complaints assigned to you.
            </p>
          </div>

          <button
            type="button"
            onClick={refreshComplaints}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#dce5ef] bg-white px-4 py-2.5 text-sm font-semibold text-[#203653] transition hover:border-[#9bd7d0] hover:bg-[#f1f8f8] hover:text-[#087f78]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {notice && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-[#b9e5df] bg-[#edf8f7] p-4 text-sm text-[#175c58]"
          >
            <p className="leading-6">{notice}</p>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="shrink-0 rounded-md p-1 hover:bg-[#d8f0ec]"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Search and filters */}
        <section className="rounded-2xl border border-[#dce5ef] bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
              <Filter size={20} />
            </span>

            <div>
              <h2 className="font-bold text-[#152d4e]">Find complaints</h2>
              <p className="mt-1 text-sm text-[#647895]">
                Search by complaint ID, subject, or customer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_230px_auto]">
            <label className="relative block">
              <span className="sr-only">Search complaints</span>
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8292a8]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search complaints..."
                className="w-full rounded-lg border border-[#d7e1ed] bg-white py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-[#8a9ab0] focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
              />
            </label>

            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-[#d7e1ed] bg-white px-3 py-3 text-sm text-[#203653] outline-none transition focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-[#d7e1ed] px-4 py-3 text-sm font-semibold text-[#536781] transition hover:border-[#9bd7d0] hover:bg-[#f1f8f8] hover:text-[#087f78]"
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* Complaint list */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#dce5ef] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3eaf2] px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-bold text-[#152d4e]">Complaint records</h2>
              <p className="mt-1 text-sm text-[#647895]">
                {filteredComplaints.length} records displayed
              </p>
            </div>

            <span className="rounded-full border border-[#dce5ef] bg-[#f5f8fb] px-3 py-1.5 text-xs font-semibold text-[#536781]">
              {status}
            </span>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6f4] text-[#087f78]">
                <ClipboardList size={26} />
              </div>

              <h3 className="text-lg font-bold text-[#152d4e]">
                No complaints available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647895]">
                There are no complaint records to display for these filters.
                Real assigned complaints will appear here when the complaint
                data source is connected and returns records for your account.
              </p>

              {(search || status !== "All statuses") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#087f78] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b65] focus:outline-none focus:ring-4 focus:ring-[#087f78]/20"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5f8fb] text-xs uppercase tracking-wide text-[#647895]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Complaint ID</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="border-t border-[#e8edf4] text-[#314866] transition hover:bg-[#f8fbfc]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#152d4e]">
                        {complaint.id}
                      </td>
                      <td className="px-6 py-4">{complaint.subject}</td>
                      <td className="px-6 py-4">{complaint.customer}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#e8f6f4] px-3 py-1 text-xs font-semibold text-[#087f78]">
                          {complaint.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#dce5ef] py-5 text-xs text-[#71829a]">
          <span className="font-semibold text-[#152d4e]">CCTS · Customer care</span>
          <span>Here to help, every step of the way.</span>
        </footer>
      </div>
    </main>
  );
}
