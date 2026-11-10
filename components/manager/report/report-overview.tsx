"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Download,
  Clock3,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// ---------------------------------------------
// TYPES
// ---------------------------------------------

type DateFilter = "Today" | "This Week" | "This Month" | "Custom Range";

type Metric = {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  positiveIsUp?: boolean;
};

type ComplaintTrend = {
  date: string;
  received: number;
  resolved: number;
};

type ComplaintCategory = {
  name: string;
  value: number;
  color: string;
};

type StaffMember = {
  id: string;
  name: string;
  initials: string;
  assigned: number;
  resolved: number;
  pending: number;
  overdue: number;
  resolutionTime: number;
};

// ---------------------------------------------
// MOCK DATA
// Replace these with your API responses.
// ---------------------------------------------

const metrics: Metric[] = [
  {
    title: "Total Complaints",
    value: "300",
    change: 11.1,
    trend: "up",
  },
  {
    title: "Resolved Complaints",
    value: "240",
    change: 20.0,
    trend: "up",
  },
  {
    title: "Pending Complaints",
    value: "60",
    change: 14.3,
    trend: "down",
    positiveIsUp: false,
  },
  {
    title: "Total Escalations",
    value: "24",
    change: 20.0,
    trend: "down",
    positiveIsUp: false,
  },
  {
    title: "Average Resolution Time",
    value: "18.3 hrs",
    change: 12.9,
    trend: "down",
  },
];

const complaintTrend: ComplaintTrend[] = [
  { date: "1 Nov", received: 28, resolved: 20 },
  { date: "2 Nov", received: 34, resolved: 24 },
  { date: "3 Nov", received: 30, resolved: 22 },
  { date: "4 Nov", received: 38, resolved: 30 },
  { date: "5 Nov", received: 32, resolved: 26 },
  { date: "6 Nov", received: 36, resolved: 28 },
  { date: "7 Nov", received: 34, resolved: 30 },
  { date: "8 Nov", received: 40, resolved: 34 },
  { date: "9 Nov", received: 27, resolved: 25 },
];

const categories: ComplaintCategory[] = [
  { name: "Delivery", value: 108, color: "#0D9488" },
  { name: "Product", value: 78, color: "#142D50" },
  { name: "Service", value: 54, color: "#65BDB4" },
  { name: "Billing", value: 36, color: "#94A3B8" },
  { name: "Others", value: 24, color: "#CBD5E1" },
];

const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Chinedu Eze",
    initials: "CE",
    assigned: 60,
    resolved: 48,
    pending: 12,
    overdue: 3,
    resolutionTime: 20,
  },
  {
    id: "2",
    name: "Fatima Bello",
    initials: "FB",
    assigned: 56,
    resolved: 44,
    pending: 12,
    overdue: 2,
    resolutionTime: 18,
  },
  {
    id: "3",
    name: "Maya Patel",
    initials: "MP",
    assigned: 54,
    resolved: 46,
    pending: 8,
    overdue: 1,
    resolutionTime: 14,
  },
  {
    id: "4",
    name: "Tunde Adeyemi",
    initials: "TA",
    assigned: 48,
    resolved: 38,
    pending: 10,
    overdue: 2,
    resolutionTime: 22,
  },
  {
    id: "5",
    name: "Amaka Nwosu",
    initials: "AN",
    assigned: 44,
    resolved: 34,
    pending: 10,
    overdue: 0,
    resolutionTime: 17,
  },
  {
    id: "6",
    name: "Sarah Ibrahim",
    initials: "SI",
    assigned: 38,
    resolved: 30,
    pending: 8,
    overdue: 0,
    resolutionTime: 19,
  },
];

// ---------------------------------------------
// HELPERS
// ---------------------------------------------

function getResolutionRate(member: StaffMember): number {
  if (member.assigned === 0) return 0;

  return Number(((member.resolved / member.assigned) * 100).toFixed(1));
}

function exportCSV(data: StaffMember[]) {
  const headers = [
    "Team Member",
    "Assigned",
    "Resolved",
    "Pending",
    "Overdue",
    "Resolution Rate",
    "Average Resolution Time (hrs)",
  ];

  const rows = data.map((member) => [
    member.name,
    member.assigned,
    member.resolved,
    member.pending,
    member.overdue,
    `${getResolutionRate(member)}%`,
    member.resolutionTime,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "complaints-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}

// ---------------------------------------------
// REUSABLE COMPONENTS
// ---------------------------------------------

function MetricCard({ metric }: { metric: Metric }) {
  const isPositive =
    metric.positiveIsUp === false
      ? metric.trend === "down"
      : metric.trend === "up";

  const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown;

  return (
    <Card className="rounded-lg border-slate-200 shadow-none">
      <CardContent className="p-4">
        <p className="text-2xl font-bold tracking-tight text-[#172F52]">
          {metric.value}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">{metric.title}</p>

        <div
          className={`mt-2 flex items-center gap-1 text-[10px] ${
            isPositive ? "text-teal-600" : "text-rose-500"
          }`}
        >
          <TrendIcon className="h-3 w-3" />
          <span>{Math.abs(metric.change)}% vs previous period</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------

export default function ReportsOverview() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("This Month");

  const [customStart, setCustomStart] = useState("2026-11-01");
  const [customEnd, setCustomEnd] = useState("2026-11-09");

  const totalComplaints = useMemo(
    () => categories.reduce((sum, item) => sum + item.value, 0),
    [],
  );

  const totalResolved = useMemo(
    () => staffMembers.reduce((sum, member) => sum + member.resolved, 0),
    [],
  );

  const totalReceived = useMemo(
    () => staffMembers.reduce((sum, member) => sum + member.assigned, 0),
    [],
  );

  const averageResolutionTime = useMemo(() => {
    const total = staffMembers.reduce(
      (sum, member) => sum + member.resolutionTime * member.resolved,
      0,
    );

    return totalResolved > 0 ? (total / totalResolved).toFixed(1) : "0.0";
  }, [totalResolved]);

  const averageStaffResolutionTime = useMemo(
    () =>
      staffMembers.reduce((sum, member) => sum + member.resolutionTime, 0) /
      staffMembers.length,
    [],
  );

  const dateLabel =
    dateFilter === "Custom Range"
      ? `${customStart} – ${customEnd}`
      : dateFilter === "Today"
        ? "9 Nov 2026"
        : dateFilter === "This Week"
          ? "3–9 Nov 2026"
          : "1–9 Nov 2026";

  const filteredMetrics = metrics.map((metric) => {
    if (dateFilter === "This Month") return metric;

    // Demo presentation: real applications should use
    // metrics returned by the backend for each date range.
    return metric;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#172F52]">
              Reports &amp; Analytics
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Monitor complaint performance and track operational efficiency.
            </p>
          </div>

          <Button
            onClick={() => exportCSV(staffMembers)}
            className="h-9 gap-2 bg-teal-600 text-xs hover:bg-teal-700"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* DATE FILTERS */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-1 rounded-md border border-slate-200 bg-white p-1">
            {(
              [
                "Today",
                "This Week",
                "This Month",
                "Custom Range",
              ] as DateFilter[]
            ).map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant="ghost"
                onClick={() => setDateFilter(filter)}
                className={`h-7 rounded-sm px-3 text-[10px] font-medium ${
                  dateFilter === filter
                    ? "bg-teal-50 text-teal-700 hover:bg-teal-50"
                    : "text-slate-500"
                }`}
              >
                {filter}
                {filter === "Custom Range" && (
                  <CalendarDays className="ml-1 h-3 w-3" />
                )}
              </Button>
            ))}
          </div>

          {dateFilter === "Custom Range" ? (
            <div className="flex flex-wrap items-center gap-2">
              <input
                aria-label="Start date"
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600"
              />
              <span className="text-xs text-slate-400">to</span>
              <input
                aria-label="End date"
                type="date"
                min={customStart}
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600"
              />
            </div>
          ) : (
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-semibold text-[#172F52]">
                {dateLabel}
              </p>
              <p className="text-[10px] text-slate-400">
                Compared with previous period
              </p>
            </div>
          )}
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {filteredMetrics.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          {/* COMPLAINTS OVER TIME */}
          <Card className="rounded-lg border-slate-200 shadow-none lg:col-span-3">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-sm font-semibold text-[#172F52]">
                  Complaints over time
                </CardTitle>
                <CardDescription className="mt-1 text-[10px]">
                  Daily complaints received and resolved
                </CardDescription>
              </div>

              <div className="flex gap-3 pt-1">
                <span className="flex items-center gap-1 text-[9px] text-slate-500">
                  <span className="h-0.5 w-3 bg-[#172F52]" />
                  Received
                </span>
                <span className="flex items-center gap-1 text-[9px] text-slate-500">
                  <span className="h-0.5 w-3 bg-teal-500" />
                  Resolved
                </span>
              </div>
            </CardHeader>

            <CardContent className="px-3 pb-3">
              <div className="h-[155px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={complaintTrend}
                    margin={{
                      top: 8,
                      right: 8,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      stroke="#E8EDF4"
                      strokeDasharray="0"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 9, fill: "#64748B" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      domain={[0, 50]}
                      ticks={[0, 10, 20, 30, 40, 50]}
                      tick={{ fontSize: 9, fill: "#64748B" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 8,
                        border: "1px solid #E2E8F0",
                        fontSize: 11,
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="received"
                      stroke="#172F52"
                      strokeWidth={1.8}
                      dot={{ r: 2, fill: "#172F52" }}
                      activeDot={{ r: 4 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#0D9488"
                      strokeWidth={1.8}
                      dot={{ r: 2, fill: "#0D9488" }}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-2 text-[9px] text-slate-500">
                300 received · 240 resolved · 80.0% resolution rate
              </p>
            </CardContent>
          </Card>

          {/* COMPLAINTS BY CATEGORY */}
          <Card className="rounded-lg border-slate-200 shadow-none lg:col-span-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-[#172F52]">
                Complaints by category
              </CardTitle>
              <CardDescription className="mt-1 text-[10px]">
                Share of complaints received this month
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-3">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <div className="relative h-[150px] w-full max-w-[145px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={67}
                        paddingAngle={2}
                        stroke="white"
                        strokeWidth={1}
                      >
                        {categories.map((category) => (
                          <Cell key={category.name} fill={category.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} complaints`, "Total"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#172F52]">
                      {totalComplaints}
                    </span>
                    <span className="text-[9px] text-slate-400">
                      Complaints
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between gap-2 text-[10px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: category.color,
                          }}
                        />
                        <span className="text-slate-500">{category.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[#172F52]">
                          {category.value}
                        </span>
                        <span className="w-7 text-right text-slate-400">
                          {Math.round((category.value / totalComplaints) * 100)}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-1 text-[9px] text-slate-500">
                Delivery accounts for the largest share at 36%.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* STAFF PERFORMANCE + RESOLUTION TIME */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          {/* STAFF TABLE */}
          <Card className="overflow-hidden rounded-lg border-slate-200 shadow-none lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-sm font-semibold text-[#172F52]">
                  Staff Performance
                </CardTitle>
                <CardDescription className="mt-1 text-[10px]">
                  Complaint outcomes by assigned team member
                </CardDescription>
              </div>

              <span className="text-[9px] text-slate-500">
                {staffMembers.length} team members
              </span>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="min-w-[135px] pl-4 text-[9px] font-semibold text-[#172F52]">
                        Team Member
                      </TableHead>
                      <TableHead className="text-center text-[9px] font-semibold text-[#172F52]">
                        Assigned
                      </TableHead>
                      <TableHead className="text-center text-[9px] font-semibold text-[#172F52]">
                        Resolved
                      </TableHead>
                      <TableHead className="text-center text-[9px] font-semibold text-[#172F52]">
                        Pending
                      </TableHead>
                      <TableHead className="text-center text-[9px] font-semibold text-[#172F52]">
                        Overdue
                      </TableHead>
                      <TableHead className="min-w-[110px] pr-4 text-right text-[9px] font-semibold text-[#172F52]">
                        Resolution Rate
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {staffMembers.map((member) => {
                      const rate = getResolutionRate(member);

                      return (
                        <TableRow key={member.id}>
                          <TableCell className="py-2 pl-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[8px] font-semibold text-teal-700">
                                {member.initials}
                              </div>

                              <span className="whitespace-nowrap text-[10px] font-medium text-[#172F52]">
                                {member.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-center text-[10px] text-[#172F52]">
                            {member.assigned}
                          </TableCell>

                          <TableCell className="text-center text-[10px] text-[#172F52]">
                            {member.resolved}
                          </TableCell>

                          <TableCell className="text-center text-[10px] text-[#172F52]">
                            {member.pending}
                          </TableCell>

                          <TableCell className="text-center text-[10px] text-slate-500">
                            {member.overdue}
                          </TableCell>

                          <TableCell className="pr-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="h-1 w-12 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-teal-600"
                                  style={{ width: `${rate}%` }}
                                />
                              </div>

                              <span className="w-10 text-right text-[9px] font-medium text-teal-700">
                                {rate.toFixed(1)}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              <div className="px-3 py-3">
                <p className="text-[9px] text-slate-400">
                  Assigned = received this period · Pending includes overdue ·
                  Rate = resolved ÷ assigned
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AVERAGE RESOLUTION TIME */}
          <Card className="rounded-lg border-slate-200 shadow-none lg:col-span-2">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-[#172F52]">
                Average resolution time
              </CardTitle>
              <CardDescription className="mt-1 text-[10px]">
                By team member · Hours · Lower is better
              </CardDescription>
            </CardHeader>

            <CardContent className="px-3 pb-3">
              <div className="h-[195px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={staffMembers}
                    layout="vertical"
                    margin={{
                      top: 0,
                      right: 25,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      stroke="#E8EDF4"
                      vertical
                      horizontal={false}
                    />

                    <XAxis
                      type="number"
                      domain={[0, 24]}
                      ticks={[0, 6, 12, 18, 24]}
                      tick={{ fontSize: 9, fill: "#94A3B8" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="name"
                      width={85}
                      tick={{ fontSize: 9, fill: "#334155" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      formatter={(value) => [`${value} hrs`, "Resolution time"]}
                    />

                    <Bar
                      dataKey="resolutionTime"
                      fill="#0D9488"
                      radius={[0, 2, 2, 0]}
                      barSize={9}
                      label={{
                        position: "right",
                        formatter: (value: unknown) => `${value} h`,
                        fontSize: 9,
                        fill: "#172F52",
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[9px] text-slate-500">
                  Team average · {totalResolved} resolved complaints
                </span>

                <span className="text-[10px] font-bold text-[#172F52]">
                  {averageStaffResolutionTime.toFixed(1)} hrs
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col justify-between gap-1 text-[9px] text-slate-400 sm:flex-row">
          <span>Last updated: 9 Nov 2026, 09:30</span>
          <span>Customer Complaint Management System</span>
        </div>
      </div>
    </div>
  );
}
