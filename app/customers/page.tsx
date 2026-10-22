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
} from "lucide-react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  // Frontend only: no fake customer records.
  const customers: {
    id: string;
    name: string;
    email: string;
    organization: string;
  }[] = [];

  const filteredCustomers = customers.filter((customer) => {
    const query = search.trim().toLowerCase();

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.organization.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Customers
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View and search customer information.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
              <Users size={17} />
              <span>{customers.length} customers</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total customers
              </p>
              <Users size={20} className="text-blue-700" />
            </div>
            <p className="mt-4 text-3xl font-bold">{customers.length}</p>
            <p className="mt-1 text-xs text-slate-500">
              Customer records currently available
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Search customers
              </p>
              <Search size={20} className="text-indigo-600" />
            </div>
            <p className="mt-4 text-3xl font-bold">
              {filteredCustomers.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Results matching your search
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Customer history
              </p>
              <Clock size={20} className="text-emerald-600" />
            </div>
            <Link
              href="/customer-history"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View history
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
            <p className="mt-1 text-xs text-slate-500">
              Open the customer history page
            </p>
          </article>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <h2 className="font-semibold">Customer directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              Search the customer records available in this interface.
            </p>

            <label className="relative mt-5 block max-w-lg">
              <span className="sr-only">Search customers</span>
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, or organization..."
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>

          {filteredCustomers.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                {search ? (
                  <Search size={25} />
                ) : (
                  <UserRound size={25} />
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {search ? "No matching customers" : "No customer records yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "No customer records match your search. Try another search term."
                  : "This frontend page does not contain sample customer data. Customer records can be displayed here when they are supplied by your application."}
              </p>

              {!search && (
                <div className="mx-auto mt-5 flex max-w-md items-start gap-2 rounded-lg bg-amber-50 p-3 text-left text-xs leading-5 text-amber-800">
                  <AlertCircle size={17} className="mt-0.5 shrink-0" />
                  <p>
                    This is an empty frontend state, not confirmation that
                    your actual customer database is empty.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t border-slate-100">
                      <td className="px-6 py-4 font-medium">
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
      </div>
    </main>
  );
}