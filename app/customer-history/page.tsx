
import Link from "next/link";
import { ArrowLeft, History } from "lucide-react";

export default function CustomerHistoryPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-800 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="flex items-center gap-3">
            <History size={28} className="text-blue-700" />
            <h1 className="text-2xl font-bold">Customer history</h1>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Customer complaint history will appear here when real records are
            available.
          </p>

          <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
            <p className="font-semibold">No customer history available</p>
            <p className="mt-2 text-sm text-slate-500">
              No sample records are displayed.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
