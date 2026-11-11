import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle2, Clock3, Inbox, NotepadText, UserRoundCheck, UsersRound } from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total Team Members",
    value: "48",
    description: "5 available · 1 on leave",
    icon: UsersRound,
  },
  {
    title: "Total Assigned Complaints",
    value: "12",
    description: "Active complaints across the team",
    icon: NotepadText,
  },
  {
    title: "Average Complaints per Member",
    value: "18",
    description: "Based on 6 team members",
    icon: UserRoundCheck,
  },
  {
    title: "Unassigned Complaints",
    value: "18",
    description: "Ready to assign to available staff",
    icon: Inbox,
  },
];

const TeamStats = () => {
  return (
    <div>
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

export default TeamStats;
