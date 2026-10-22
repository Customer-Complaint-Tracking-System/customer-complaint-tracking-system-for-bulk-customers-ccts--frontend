import React from "react";
import { ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ActivityType =
  | "Approval"
  | "Escalation"
  | "Complaint Update"
  | "Status Change"
  | "Staff Reassignment";

interface Activity {
  id: string;
  type: ActivityType;
  complaintId: string;
  customer: string;
  orderId: string;
  staff: string;
  details: string;
  date: string;
}

interface RecentActivitiesProps {
  activities?: Activity[];
  onViewAll?: () => void;
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "Approval",
    complaintId: "CCTS 2601",
    customer: "Emuru Chioma",
    orderId: "ORD-10482",
    staff: "Jordan Ladipo",
    details: "Approved refund request for damaged order",
    date: "9 Oct 2026",
  },
  {
    id: "2",
    type: "Escalation",
    complaintId: "CCTS 2602",
    customer: "Taylor Brooks",
    orderId: "ORD-10491",
    staff: "Aanu Adeniyi",
    details: "Escalated to manager for missing items review",
    date: "9 Oct 2026",
  },
  {
    id: "3",
    type: "Complaint Update",
    complaintId: "CCTS 2603",
    customer: "Sam Rivera",
    orderId: "ORD-10503",
    staff: "Kabir Ahmed",
    details: "Customer added photo evidence of wrong product",
    date: "8 Oct 2026",
  },
  {
    id: "4",
    type: "Status Change",
    complaintId: "CCTS 2604",
    customer: "Amoo Rachael",
    orderId: "ORD-10512",
    staff: "Chioma Anita",
    details: "Status changed from New to In Progress",
    date: "7 Oct 2026",
  },
  {
    id: "5",
    type: "Staff Reassignment",
    complaintId: "CCTS 2605",
    customer: "Nneoma Okoro",
    orderId: "ORD-10518",
    staff: "Jordan Ladipo → Aanu Adeniyi",
    details: "Reassigned from Jordan Ladipo to Aanu Adeniyi",
    date: "7 Oct 2026",
  },
];

const activityStyles: Record<ActivityType, string> = {
  Approval: "bg-blue-50 text-blue-700",
  Escalation: "bg-orange-50 text-orange-700",
  "Complaint Update": "bg-purple-100 text-purple-700",
  "Status Change": "bg-emerald-50 text-emerald-700",
  "Staff Reassignment": "bg-green-50 text-green-700",
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities = defaultActivities,
  onViewAll,
}) => {
  return (
    <section className="w-full space-y-3">
      {/* Section heading */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-slate-800">
          Recents
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 transition-colors hover:text-teal-700"
        >
          View all activity
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Activities table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Activity Type
              </TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Complaint ID
              </TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Customer
              </TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Order ID
              </TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Assigned Staff
              </TableHead>
              <TableHead className="min-w-[270px] px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Activity Details / Status
              </TableHead>
              <TableHead className="whitespace-nowrap px-3 py-2.5 text-[11px] font-medium text-slate-500">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {activities.map((activity) => (
              <TableRow
                key={activity.id}
                className="border-slate-200 odd:bg-slate-50/60 hover:bg-slate-50"
              >
                <TableCell className="px-3 py-3">
                  <span
                    className={`inline-flex max-w-[120px] rounded-full px-2 py-1 text-[10px] font-medium leading-tight ${
                      activityStyles[activity.type]
                    }`}
                  >
                    {activity.type}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-slate-800">
                  {activity.complaintId}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {activity.customer}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {activity.orderId}
                </TableCell>

                <TableCell className="min-w-[130px] px-3 py-3 text-xs text-slate-700">
                  {activity.staff}
                </TableCell>

                <TableCell className="min-w-[270px] px-3 py-3 text-xs text-slate-700">
                  {activity.details}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {activity.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default RecentActivities;
