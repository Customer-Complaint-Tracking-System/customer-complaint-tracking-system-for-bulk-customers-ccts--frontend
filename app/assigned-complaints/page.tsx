"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  ClipboardList,
  RefreshCw,
} from "lucide-react";

type ComplaintStatus = "New" | "In Progress" | "Resolved";

const STATUS_OPTIONS = [
  "All statuses",
  "New",
  "In Progress",
  "Resolved",
] as const;

export default function AssignedComplaintsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All statuses");
  const [notice, setNotice] = useState("");

  // Read the status passed from the dashboard URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedStatus = params.get("status");

    if (
      requestedStatus &&
      STATUS_OPTIONS.includes(requestedStatus as (typeof STATUS_OPTIONS)[number])
    ) {
      setStatus(requestedStatus);
    }
  }, []);

  // No complaint records are fabricated.
  // Real records will be loaded here after backend integration.
  const complaints: {
    id: string;
    subject: string;
    customer: string;
    status: ComplaintStatus;
  }[] = [];

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesStatus =
        status === "All statuses" || complaint.status === status;

      const searchText = search.trim().toLowerCase();

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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Assigned complaints
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage complaints assigned to you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setNotice(
                "No complaint records have been loaded. Connect the complaint API to display real records."
              );
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold transition hover:bg-slate-100"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {notice && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
          >
            <p>{notice}</p>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss message"
              className="font-semibold hover:text-blue-700"
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
              <Filter size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Find complaints</h2>
              <p className="text-sm text-slate-500">
                Search by complaint ID, subject, or customer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_240px_auto]">
            <label className="relative block">
              <span className="sr-only">Search complaints</span>
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search complaints..."
                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-100"
            >
              Clear filters
            </button>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              <h2 className="font-semibold">Complaint records</h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredComplaints.length} records displayed
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {status}
            </span>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <ClipboardList size={26} />
              </div>

              <h3 className="text-lg font-semibold">
                No complaints available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                There are no complaint records to display for these filters.
                Real assigned complaints will appear here when the backend is
                connected and returns records for your account.
              </p>

              {(search || status !== "All statuses") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Complaint ID</th>
                    <th className="px-6 py-4 font-semibold">Subject</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="border-t border-slate-100">
                      <td className="px-6 py-4 font-medium">{complaint.id}</td>
                      <td className="px-6 py-4">{complaint.subject}</td>
                      <td className="px-6 py-4">{complaint.customer}</td>
                      <td className="px-6 py-4">{complaint.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}