"use client";

import {
  ClipboardList,
  Inbox,
  LoaderCircle,
  CircleCheck,
  AlertCircle,
  Clock,
  Info,
  ChevronRight,
} from "lucide-react";

interface ComplaintOverviewProps {
  onNavigate?: (status: string) => void;
  date?: string;
}

const overviewStats = [
  {
    title: "My Assigned Complaints",
    count: 6,
    description: "View all assigned",
    status: "assigned",
    icon: ClipboardList,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "New Complaints",
    count: 2,
    description: "View new",
    status: "new",
    icon: Inbox,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "In Progress Complaints",
    count: 3,
    description: "View in progress",
    status: "in-progress",
    icon: LoaderCircle,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Resolved Complaints",
    count: 1,
    description: "View resolved",
    status: "resolved",
    icon: CircleCheck,
    iconColor: "text-green-700",
    iconBg: "bg-green-50",
  },
];

const attentionItems = [
  {
    title: "High Priority",
    description: "Critical/high priority complaints that need immediate action",
    count: 2,
    status: "high-priority",
    icon: AlertCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    titleColor: "text-red-600",
    countColor: "text-red-600",
  },
  {
    title: "Overdue Complaints",
    description: "Complaints past the deadline",
    count: 1,
    status: "overdue",
    icon: Clock,
    iconColor: "text-amber-700",
    bgColor: "bg-orange-50",
    titleColor: "text-amber-800",
    countColor: "text-amber-800",
  },
  {
    title: "Awaiting Customer Information",
    description: "Waiting for customer response or documents",
    count: 3,
    status: "awaiting-customer",
    icon: Info,
    iconColor: "text-white",
    bgColor: "bg-indigo-50",
    titleColor: "text-indigo-700",
    countColor: "text-indigo-700",
  },
];

export default function ComplaintOverview({
  onNavigate,
  date = "As of 9 Oct 2026",
}: ComplaintOverviewProps) {
  return (
    <section className="w-full space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-500">
          Your complaint overview
        </h2>

        <span className="text-xs text-slate-500">{date}</span>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.status}
              type="button"
              onClick={() => onNavigate?.(stat.status)}
              className="group flex min-h-[132px] items-start justify-between rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-md ${stat.iconBg}`}
                  >
                    <Icon size={17} className={stat.iconColor} />
                  </div>

                  <span className="text-xl font-bold text-blue-600">
                    {stat.count}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="max-w-[145px] text-xs font-semibold leading-4 text-slate-800">
                    {stat.title}
                  </p>

                  <span className="text-[11px] text-slate-500">
                    {stat.description}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={17}
                className="mt-auto text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
              />
            </button>
          );
        })}
      </div>

      {/* Needs Attention */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">
            Needs Attention
          </h3>

          <button
            type="button"
            onClick={() => onNavigate?.("needs-attention")}
            className="flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800"
          >
            View All
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {attentionItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.status}
                type="button"
                onClick={() => onNavigate?.(item.status)}
                className={`group flex min-h-[112px] items-center gap-4 rounded-md ${item.bgColor} p-4 text-left transition-all hover:brightness-[0.98]`}
              >
                {/* Icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    item.status === "awaiting-customer" ? "bg-indigo-700" : ""
                  }`}
                >
                  <Icon
                    size={23}
                    strokeWidth={2.2}
                    className={item.iconColor}
                  />
                </div>

                {/* Description */}
                <div className="min-w-0 flex-1 space-y-1">
                  <h4
                    className={`text-[11px] font-semibold leading-4 ${item.titleColor}`}
                  >
                    {item.title}
                  </h4>

                  <p className="max-w-[190px] text-[10px] leading-[14px] text-slate-500">
                    {item.description}
                  </p>
                </div>

                {/* Count and Arrow */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`text-sm font-semibold ${item.countColor}`}>
                    {item.count}
                  </span>

                  <ChevronRight
                    size={17}
                    className={`transition-transform group-hover:translate-x-1 ${item.titleColor}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
