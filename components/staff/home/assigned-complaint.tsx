"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
export type ComplaintPriority = "High" | "Medium" | "Low";

export type ComplaintStatus = "New" | "In Progress" | "Resolved" | "Rejected";

export interface Complaint {
  id: string;
  complaintId: string;
  customer: string;
  issue: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  deadline: string;
  overdue?: boolean;
}

export interface RecentActivity {
  id: string;
  time: string;
  action: string;
  details: string;
}

interface MyAssignedComplaintsProps {
  complaints?: Complaint[];
  activities?: RecentActivity[];
  onViewAllComplaints?: () => void;
  onViewAllActivity?: () => void;
}

// Sample data
const defaultComplaints: Complaint[] = [
  {
    id: "1",
    complaintId: "CCTS 2601",
    customer: "Emuru Chioma",
    issue: "Damaged Order",
    priority: "High",
    status: "In Progress",
    deadline: "8 Oct 2026",
    overdue: true,
  },
  {
    id: "2",
    complaintId: "CCTS 2602",
    customer: "Taylor Brooks",
    issue: "Missing Items",
    priority: "High",
    status: "New",
    deadline: "12 Oct 2026",
  },
  {
    id: "3",
    complaintId: "CCTS 2606",
    customer: "Amiru Mohammed",
    issue: "Wrong Product",
    priority: "Low",
    status: "Resolved",
    deadline: "7 Oct 2026",
  },
];

const defaultActivities: RecentActivity[] = [
  {
    id: "1",
    time: "Today, 09:40",
    action: "Resolution recorded - CCTS 2605",
    details: "Joseph Amaka · Missing Items · New",
  },
  {
    id: "2",
    time: "Today, 09:15",
    action: "Resolution recorded - CCTS 2604",
    details: "Amo Rachael · Damaged Order",
  },
  {
    id: "3",
    time: "Today, 08:50",
    action: "Resolution recorded - CCTS 2602",
    details: "Taylor Brooks · Missing Items · New",
  },
];

// Priority badge
function PriorityBadge({ priority }: { priority: ComplaintPriority }) {
  const styles: Record<ComplaintPriority, string> = {
    High: "bg-red-100 text-red-600 hover:bg-red-100",
    Medium: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    Low: "bg-green-100 text-green-700 hover:bg-green-100",
  };

  return (
    <Badge
      variant="secondary"
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[priority]}`}
    >
      {priority}
    </Badge>
  );
}

// Status badge
function StatusBadge({ status }: { status: ComplaintStatus }) {
  const styles: Record<ComplaintStatus, string> = {
    New: "bg-blue-100 text-blue-600 hover:bg-blue-100",
    "In Progress": "bg-purple-100 text-purple-600 hover:bg-purple-100",
    Resolved: "bg-green-100 text-green-700 hover:bg-green-100",
    Rejected: "bg-red-100 text-red-600 hover:bg-red-100",
  };

  return (
    <Badge
      variant="secondary"
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status]}`}
    >
      {status}
    </Badge>
  );
}

export default function MyAssignedComplaints({
  complaints = defaultComplaints,
  activities = defaultActivities,
  onViewAllComplaints,
  onViewAllActivity,
}: MyAssignedComplaintsProps) {
  const router = useRouter();

  const handleComplaintClick = (id: string) => {
    router.push(`/staff/complaints/${id}`);
  };

  return (
    <section className="w-full space-y-5">
      {/* Assigned Complaints */}
      <div className="space-y-3">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-800">
              My Assigned Complaints
            </h2>

            <span className="text-[11px] text-slate-500">
              {complaints.length} complaints
            </span>
          </div>

          <Button
            size="sm"
            onClick={
              onViewAllComplaints ?? (() => router.push("/staff/complaints"))
            }
            className="h-6 rounded-md bg-teal-600 px-3 text-[10px] font-medium text-white hover:bg-teal-700"
          >
            View All Complaints
          </Button>
        </div>

        {/* Complaints Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Complaint ID
                </TableHead>

                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Customer
                </TableHead>

                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Issue
                </TableHead>

                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Priority
                </TableHead>

                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Status
                </TableHead>

                <TableHead className="h-9 px-3 text-[10px] font-medium text-slate-500">
                  Deadline
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <TableRow
                    key={complaint.id}
                    tabIndex={0}
                    role="link"
                    aria-label={`View complaint ${complaint.complaintId}`}
                    onClick={() => handleComplaintClick(complaint.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleComplaintClick(complaint.id);
                      }
                    }}
                    className="h-9 cursor-pointer border-slate-100 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
                  >
                    <TableCell className="px-3 py-2 text-[11px] font-semibold text-slate-800">
                      {complaint.complaintId}
                    </TableCell>

                    <TableCell className="px-3 py-2 text-[11px] text-slate-700">
                      {complaint.customer}
                    </TableCell>

                    <TableCell className="px-3 py-2 text-[11px] text-slate-700">
                      {complaint.issue}
                    </TableCell>

                    <TableCell className="px-3 py-2">
                      <PriorityBadge priority={complaint.priority} />
                    </TableCell>

                    <TableCell className="px-3 py-2">
                      <StatusBadge status={complaint.status} />
                    </TableCell>

                    <TableCell className="px-3 py-2 text-[11px]">
                      {complaint.overdue ? (
                        <span className="font-medium text-orange-700">
                          {complaint.deadline} · Overdue
                        </span>
                      ) : (
                        <span className="text-slate-700">
                          {complaint.deadline}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-xs text-slate-500"
                  >
                    No assigned complaints found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Recent Activity
          </h2>

          <button
            type="button"
            onClick={
              onViewAllActivity ?? (() => router.push("/staff/activity"))
            }
            className="flex items-center gap-1 text-[11px] font-medium text-teal-600 hover:text-teal-700"
          >
            View all activity
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Table>
            <TableBody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <TableRow
                    key={activity.id}
                    className="h-8 border-slate-100 last:border-0"
                  >
                    <TableCell className="w-[33%] px-3 py-2 text-[10px] text-slate-500">
                      {activity.time}
                    </TableCell>

                    <TableCell className="w-[33%] px-3 py-2 text-[10px] font-medium text-slate-800">
                      {activity.action}
                    </TableCell>

                    <TableCell className="px-3 py-2 text-[10px] text-slate-500">
                      {activity.details}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-20 text-center text-xs text-slate-500"
                  >
                    No recent activity.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
