import {
  CircleCheck,
  ClipboardList,
  Clock3,
  Inbox,
  Loader
} from "lucide-react";

const stats = [
  {
    title: "Total Complaints",
    value: 24,
    description: "All time",
    icon: ClipboardList,
    color: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "New Complaints",
    value: 6,
    description: "Awaiting initial handling",
    icon: Inbox,
    color: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "In Progress",
    value: 10,
    description: "Being handled by staffs",
    icon: Loader,
    color: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Overdue Complaints",
    value: 3,
    description: "Requires immediate action",
    icon: Clock3,
    color: "text-red-600",
    iconBg: "bg-red-50",
  },
  {
    title: "Resolved Complaints",
    value: 8,
    description: "Resolved this period",
    icon: CircleCheck,
    color: "text-green-700",
    iconBg: "bg-emerald-50",
  },
];

const ComplaintStats = () => {
  return (
    <section className="w-full bg-slate-50/70 p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.iconBg} ${stat.color}`}
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-2xl font-bold leading-none tracking-tight ${stat.color}`}
                  >
                    {stat.value}
                  </p>

                  <h3 className="mt-2 text-xs font-semibold leading-snug text-slate-800">
                    {stat.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-snug text-slate-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComplaintStats;
