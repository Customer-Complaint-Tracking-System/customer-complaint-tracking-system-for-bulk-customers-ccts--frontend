"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const complaintsData = [
  { date: "4 Oct", new: 10, inProgress: 7.5, resolved: 2.5 },
  { date: "5 Oct", new: 8.8, inProgress: 10, resolved: 3.5 },
  { date: "6 Oct", new: 11.5, inProgress: 10, resolved: 4.5 },
  { date: "7 Oct", new: 10.2, inProgress: 11.2, resolved: 6 },
  { date: "8 Oct", new: 9, inProgress: 13.7, resolved: 7.5 },
  { date: "9 Oct", new: 7.5, inProgress: 12.5, resolved: 10 },
];

const complaintCategories = [
  { name: "Damaged Order", count: 8 },
  { name: "Missing Items", count: 6 },
  { name: "Wrong Product", count: 5 },
  { name: "Billing", count: 3 },
  { name: "Delivery", count: 2 },
];

const chartConfig = {
  new: {
    label: "New",
    color: "#2563ff",
  },
  inProgress: {
    label: "In Progress",
    color: "#7c2cff",
  },
  resolved: {
    label: "Resolved",
    color: "#167a3d",
  },
};

const ComplaintLegend = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
    {[
      { label: "New", color: "#2563ff" },
      { label: "In Progress", color: "#7c2cff" },
      { label: "Resolved", color: "#167a3d" },
    ].map((item) => (
      <div key={item.label} className="flex items-center gap-1">
        <span
          className="size-[5px] rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

const ComplaintsOverview = () => {
  const totalComplaints = 24;
  const snapshotDate = "9 Oct";

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Complaints Overview */}
      <section className="min-w-0 rounded-xl border bg-card p-4 lg:col-span-2">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Complaints Overview
            </h2>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Daily status trends of complaints
            </p>
          </div>

          <ComplaintLegend />
        </div>

        <ChartContainer config={chartConfig} className="h-[155px] w-full">
          <LineChart
            accessibilityLayer
            data={complaintsData}
            margin={{ top: 4, right: 8, left: -12, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#e7edf5"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fontSize: 9, fill: "#71829e" }}
            />

            <YAxis
              domain={[0, 15]}
              ticks={[0, 5, 10, 15]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={22}
              tick={{ fontSize: 9, fill: "#71829e" }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              dataKey="new"
              type="linear"
              stroke="var(--color-new)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3 }}
            />

            <Line
              dataKey="inProgress"
              type="linear"
              stroke="var(--color-inProgress)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3 }}
            />

            <Line
              dataKey="resolved"
              type="linear"
              stroke="var(--color-resolved)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ChartContainer>
      </section>

      {/* Complaint Categories */}
      <section className="min-w-0 rounded-xl border bg-card p-4">
        <div className="mb-3">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Complaint Categories
          </h2>

          <p className="mt-2 text-[11px] text-muted-foreground">
            {totalComplaints} total complaints · {snapshotDate} snapshot
          </p>
        </div>

        <div className="space-y-[11px]">
          {complaintCategories.map((category) => (
            <div key={category.name}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-[11px] text-foreground">
                  {category.name}
                </span>

                <span className="text-[11px] font-medium tabular-nums text-foreground">
                  {category.count}
                </span>
              </div>

              <div className="h-[4px] w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all"
                  style={{
                    width: `${(category.count / 8) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ComplaintsOverview;
