import { Card, CardContent } from "@/components/ui/card";
import {
  CircleCheck,
  CircleX,
  Clock3,
  Wallet
} from "lucide-react";

const stats = [
  {
    title: "Pending Requests",
    value: "48",
    description: "All outstanding requests",
    icon: Clock3,
  },
  {
    title: "Approved This Month",
    value: "12",
    description: "Decisions · 1–3 Nov 2026",
    icon: CircleCheck,
  },
  {
    title: "Rejected This Month",
    value: "18",
    description: "Decisions · 1–3 Nov 2026",
    icon: CircleX,
  },
  {
    title: "Total Amount Pending (₦)",
    value: "N185,000",
    description: "Across all 6 pending requests",
    icon: Wallet,
  },
];

const ApprovalHeader = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Approvals
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review and manage staff requests requiring manager authorisation.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          Reporting period: 1–31 Oct 2026
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="border-slate-200 shadow-none rounded-xl"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{stat.title}</p>
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  {stat.value}
                </h2>

                <p className="text-[11px] text-slate-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalHeader;
