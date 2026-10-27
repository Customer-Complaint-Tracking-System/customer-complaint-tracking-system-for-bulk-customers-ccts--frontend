"use client";

import {
  Clock3,
  ArrowUpRight,
  ClipboardCheck,
  CircleAlert,
  ChevronRight,
} from "lucide-react";

const attentionItems = [
  {
    title: "Overdue",
    count: 3,
    description: "In-progress complaints past deadline",
    icon: Clock3,
    color: "text-red-600",
    background: "bg-red-50",
    href: "/manager/complaints?status=overdue",
  },
  {
    title: "Escalated",
    count: 4,
    description: "Complaints needing manager review",
    icon: ArrowUpRight,
    color: "text-amber-700",
    background: "bg-orange-50",
    href: "/manager/escalations",
  },
  {
    title: "Pending Approvals",
    count: 3,
    description: "Requests awaiting your decision",
    icon: ClipboardCheck,
    color: "text-violet-600",
    background: "bg-violet-50",
    href: "/manager/approvals",
  },
  {
    title: "High Priority",
    count: 5,
    description: "Open complaints marked high priority",
    icon: CircleAlert,
    color: "text-red-600",
    background: "bg-rose-50",
    href: "/manager/complaints?priority=high",
  },
];

const NeedsYourAttention = () => {
  return (
    <section className="w-full space-y-3">
      {/* Section heading */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-base font-semibold tracking-tight text-slate-800">
          Needs Your Attention
        </h2>

        <p className="text-xs text-slate-500">
          Review urgent issues and pending decisions
        </p>
      </div>

      {/* Attention cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {attentionItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.title}
              href={item.href}
              className={`group flex min-h-[132px] flex-col justify-center gap-3 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-3.5 lg:p-4 ${item.background}`}
            >
              {/* Title and count */}
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`flex min-w-0 items-center gap-2 ${item.color}`}
                >
                  <Icon className="size-[17px] shrink-0" strokeWidth={2} />

                  <span className="truncate text-xs font-medium">
                    {item.title}
                  </span>
                </div>

                <div
                  className={`flex shrink-0 items-center gap-2 ${item.color}`}
                >
                  <span className="text-xl font-bold leading-none">
                    {item.count}
                  </span>

                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] leading-relaxed text-slate-500">
                {item.description}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default NeedsYourAttention;
