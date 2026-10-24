"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Users,
  UserRound,
  Clock,
  AlertCircle,
  Bell,
  ChevronDown,
  Headset,
  X,
  Building2,
} from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  organization: string;
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Frontend only: do not fabricate customer records.
  const customers: Customer[] = [];

  const query = search.trim().toLowerCase();

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.id.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.organization.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#142747]">
      {/* CCTS navigation header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#152d4e] text-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10968c]">
              <Users size={22} />
            </span>

            <span className="text-[25px] font-bold tracking-tight sm:text-[30px]">
              CCTS
            </span>

            <span className="mx-1 hidden h-8 w-px bg-white/30 sm:block" />


          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/help"
              title="Help and support"
              aria-label="Help and support"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white sm:w-auto sm:gap-2 sm:px-3"
            >
              <Headset size={20} />
              <span className="hidden text-sm sm:inline">Support</span>
            </Link>

            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((value) => !value);
                  setAccountOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Bell size={20} />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-[#dce5ef] bg-white p-4 text-[#152d4e] shadow-xl">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="mt-2 text-sm text-[#647895]">
                    You have no new notifications.
                  </p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
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
                  setAccountOpen((value) => !value);
                  setNotificationsOpen(false);
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

      {/* Page heading */}
      <section className="border-b border-[#dce5ef] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#647895] transition hover:text-[#087f78]"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.13em] text-[#087f78]">
            Customer management
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <Users size={25} />
              </span>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#152d4e] sm:text-3xl">
                  Customers
                </h1>
                <p className="mt-1 text-sm text-[#647895]">
                  View and search customer information.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-[#dce5ef] bg-white px-3 py-2.5 text-sm font-medium text-[#536781]">
              <Users size={17} className="text-[#087f78]" />
              <span>{customers.length} customers</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Summary cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#dce5ef] bg-white p-5 transition hover:border-[#b9dcd8]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#647895]">
                Total customers
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <Users size={20} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#152d4e]">
              {customers.length}
            </p>
            <p className="mt-1 text-xs text-[#71829a]">
              Customer records currently available
            </p>
          </article>

          <article className="rounded-2xl border border-[#dce5ef] bg-white p-5 transition hover:border-[#b9dcd8]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#647895]">
                Search results
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2f9] text-[#315b87]">
                <Search size={20} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-[#152d4e]">
              {filteredCustomers.length}
            </p>
            <p className="mt-1 text-xs text-[#71829a]">
              Results matching your search
            </p>
          </article>

          <article className="rounded-2xl border border-[#dce5ef] bg-white p-5 transition hover:border-[#b9dcd8]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#647895]">
                Customer history
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <Clock size={20} />
              </span>
            </div>

            <Link
              href="/customer-history"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#087f78] transition hover:text-[#065f59] hover:underline"
            >
              View history
              <ArrowLeft size={15} className="rotate-180" />
            </Link>

            <p className="mt-1 text-xs text-[#71829a]">
              Open customer complaint history
            </p>
          </article>
        </section>

        {/* Customer directory */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#dce5ef] bg-white">
          <div className="border-b border-[#e3eaf2] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                <Building2 size={20} />
              </span>

              <div>
                <h2 className="font-bold text-[#152d4e]">
                  Customer directory
                </h2>
                <p className="mt-1 text-sm text-[#647895]">
                  Search available customer records by name, email, ID, or
                  organization.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <label className="relative block min-w-0 flex-1">
                <span className="sr-only">Search customers</span>
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8292a8]"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, ID, or organization..."
                  className="w-full rounded-lg border border-[#d7e1ed] bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-[#8a9ab0] focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
                />
              </label>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-lg border border-[#d7e1ed] px-4 py-3 text-sm font-semibold text-[#536781] transition hover:border-[#9bd7d0] hover:bg-[#f1f8f8] hover:text-[#087f78]"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {filteredCustomers.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f6f4] text-[#087f78]">
                {search ? <Search size={27} /> : <UserRound size={27} />}
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#152d4e]">
                {search ? "No matching customers" : "No customer records yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647895]">
                {search
                  ? "No customer records match your search. Try another search term or clear the search."
                  : "This page contains no sample customer data. Customer records can be displayed here when they are supplied by your application."}
              </p>


              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-lg bg-[#087f78] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b65] focus:outline-none focus:ring-4 focus:ring-[#087f78]/20"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5f8fb] text-xs uppercase tracking-wide text-[#647895]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-t border-[#e8edf4] text-[#314866] transition hover:bg-[#f8fbfc]"
                    >
                      <td className="px-6 py-4 font-semibold text-[#152d4e]">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">{customer.organization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#dce5ef] py-5 text-xs text-[#71829a]">
          <span className="font-semibold text-[#152d4e]">
            CCTS · Customer care
          </span>
          <span>Here to help, every step of the way.</span>
        </footer>
      </div>
    </main>
  );
}
