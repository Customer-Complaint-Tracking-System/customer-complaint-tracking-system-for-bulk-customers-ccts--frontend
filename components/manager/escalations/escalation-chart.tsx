"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Card } from "@/components/ui/card";

const trendData = [
  { period: "1–7 Oct", escalations: 8 },
  { period: "8–14 Oct", escalations: 11 },
  { period: "15–21 Oct", escalations: 9 },
  { period: "22–28 Oct", escalations: 12 },
  { period: "29–31 Oct", escalations: 8 },
];

const priorityData = [
  { priority: "High", count: 20, fill: "#172F50", percentage: "42%" },
  { priority: "Medium", count: 18, fill: "#119D90", percentage: "37%" },
  { priority: "Low", count: 10, fill: "#94A3B8", percentage: "21%" },
];

const trendConfig = {
  escalations: {
    label: "Escalations",
    color: "#079E91",
  },
} satisfies ChartConfig;

const priorityConfig = {
  high: {
    label: "High",
    color: "#172F50",
  },
  medium: {
    label: "Medium",
    color: "#119D90",
  },
  low: {
    label: "Low",
    color: "#94A3B8",
  },
} satisfies ChartConfig;

export default function EscalationCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4">
      {/* Escalations Over Time */}
      <Card className="border-slate-200 shadow-none rounded-xl p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-slate-800">
            Escalations over time
          </h3>

          <p className="text-[10px] text-slate-500 whitespace-nowrap">
            October 2026 · 48 total
          </p>
        </div>

        <ChartContainer config={trendConfig} className="w-full h-[105px]">
          <LineChart
            data={trendData}
            margin={{
              top: 16,
              right: 8,
              left: -16,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E8EDF3"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: "#718096" }}
              tickMargin={10}
              interval={0}
            />

            <YAxis
              domain={[0, 12]}
              ticks={[0, 2, 4, 6, 8, 10, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: "#94A3B8" }}
              width={20}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              type="linear"
              dataKey="escalations"
              stroke="#079E91"
              strokeWidth={1.8}
              dot={{
                r: 2.5,
                fill: "#079E91",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 4,
                fill: "#079E91",
              }}
            >
              <LabelList
                dataKey="escalations"
                position="top"
                offset={5}
                className="fill-teal-700"
                fontSize={9}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </Card>

      {/* Escalations by Priority */}
      <Card className="border-slate-200 shadow-none rounded-xl p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-slate-800">
            Escalations by priority
          </h3>

          <p className="text-[10px] text-slate-500 whitespace-nowrap">
            October 2026
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Donut chart */}
          <div className="relative w-[100px] h-[100px] shrink-0">
            <ChartContainer
              config={priorityConfig}
              className="w-full h-full aspect-square"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />

                <Pie
                  data={priorityData}
                  dataKey="count"
                  nameKey="priority"
                  innerRadius={34}
                  outerRadius={49}
                  paddingAngle={1}
                  stroke="none"
                />
              </PieChart>
            </ChartContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[22px] font-bold text-slate-800 leading-none">
                48
              </span>
              <span className="text-[9px] text-slate-500 mt-1">Total</span>
            </div>
          </div>

          {/* Priority legend */}
          <div className="flex-1 space-y-3 min-w-0">
            {priorityData.map((item) => (
              <div
                key={item.priority}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />

                  <span className="text-[10px] text-slate-500">
                    {item.priority}
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-slate-700 tabular-nums">
                  {item.count}
                </span>

                <span className="text-[10px] text-slate-400 w-7 text-right">
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
