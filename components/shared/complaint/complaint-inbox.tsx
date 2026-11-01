"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownWideNarrow, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Priority = "High" | "Medium" | "Low";

type ComplaintStatus =
  | "New"
  | "In Progress"
  | "Pending"
  | "Resolved"
  | "Closed";

interface Complaint {
  id: string;
  customer: string;
  category: string;
  description: string;
  orderId: string;
  priority: Priority;
  status: ComplaintStatus;
  assignedStaff: string;
  dateReceived: string;
  timeReceived: string;
  deadline: string;
  overdue?: boolean;
}

interface ComplaintInboxProps {
  complaints?: Complaint[];
  onComplaintClick?: (complaint: Complaint) => void;
  role: "manager" | "staff";
}

const defaultComplaints: Complaint[] = [
  {
    id: "2601",
    customer: "Emuru Chioma",
    category: "Damaged Order",
    description: "Cracked screen",
    orderId: "ORD-8731",
    priority: "High",
    status: "In Progress",
    assignedStaff: "Jordan Ladipo",
    dateReceived: "7 Oct 2026",
    timeReceived: "10:42",
    deadline: "8 Oct 2026",
    overdue: true,
  },
  {
    id: "2602",
    customer: "Taylor Brooks",
    category: "Missing Items",
    description: "Charger not included",
    orderId: "ORD-8728",
    priority: "High",
    status: "New",
    assignedStaff: "Aanu Adeniyi",
    dateReceived: "7 Oct 2026",
    timeReceived: "10:18",
    deadline: "12 Oct 2026",
  },
  {
    id: "2603",
    customer: "Sam Rivera",
    category: "Wrong Product",
    description: "Wrong size received",
    orderId: "ORD-8719",
    priority: "Medium",
    status: "In Progress",
    assignedStaff: "Casey Patel",
    dateReceived: "7 Oct 2026",
    timeReceived: "09:56",
    deadline: "13 Oct 2026",
  },
  {
    id: "2604",
    customer: "Amoo Rachael",
    category: "Damaged Order",
    description: "Broken packaging",
    orderId: "ORD-8694",
    priority: "Medium",
    status: "In Progress",
    assignedStaff: "Jordan Ladipo",
    dateReceived: "6 Oct 2026",
    timeReceived: "16:20",
    deadline: "14 Oct 2026",
  },
  {
    id: "2605",
    customer: "Joseph Amaka",
    category: "Missing Items",
    description: "One item missing",
    orderId: "ORD-8688",
    priority: "Low",
    status: "New",
    assignedStaff: "Casey Patel",
    dateReceived: "6 Oct 2026",
    timeReceived: "14:08",
    deadline: "15 Oct 2026",
  },
  {
    id: "2606",
    customer: "Amiru Mohammed",
    category: "Wrong Product",
    description: "Wrong colour received",
    orderId: "ORD-8665",
    priority: "Low",
    status: "Resolved",
    assignedStaff: "Riley Davis",
    dateReceived: "5 Oct 2026",
    timeReceived: "13:10",
    deadline: "7 Oct 2026",
  },
  {
    id: "2607",
    customer: "Jamie Chen",
    category: "Missing Items",
    description: "Accessory missing",
    orderId: "ORD-8650",
    priority: "Medium",
    status: "Pending",
    assignedStaff: "Jordan Ladipo",
    dateReceived: "5 Oct 2026",
    timeReceived: "11:45",
    deadline: "13 Oct 2026",
  },
  {
    id: "2608",
    customer: "Riley Morgan",
    category: "Damaged Order",
    description: "Dented casing",
    orderId: "ORD-8618",
    priority: "Low",
    status: "Closed",
    assignedStaff: "Riley Davis",
    dateReceived: "4 Oct 2026",
    timeReceived: "10:06",
    deadline: "6 Oct 2026",
  },
];

const priorityStyles: Record<Priority, string> = {
  High: "border-red-200 bg-red-100 text-red-700",
  Medium: "border-orange-200 bg-orange-50 text-orange-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const statusStyles: Record<ComplaintStatus, string> = {
  New: "border border-blue-200 bg-blue-50 text-blue-600",
  "In Progress": "bg-purple-100 text-purple-700",
  Pending: "bg-orange-50 text-orange-700",
  Resolved: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  Closed: "border border-slate-200 bg-slate-100 text-slate-600",
};

const ComplaintInbox: React.FC<ComplaintInboxProps> = ({
  complaints = defaultComplaints,
  onComplaintClick,
  role,
}) => {
  const router = useRouter();

  const roleMatchRoute = role === "manager" ? "manager" : "staff";

  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("8");

  const sortedComplaints = useMemo(() => {
    return [...complaints].sort((a, b) => {
      const dateA = new Date(`${a.dateReceived} ${a.timeReceived}`).getTime();

      const dateB = new Date(`${b.dateReceived} ${b.timeReceived}`).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [complaints, sortOrder]);

  const totalPages = Math.ceil(sortedComplaints.length / Number(pageSize));

  const paginatedComplaints = sortedComplaints.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize),
  );

  const startItem =
    sortedComplaints.length === 0
      ? 0
      : (currentPage - 1) * Number(pageSize) + 1;

  const endItem = Math.min(
    currentPage * Number(pageSize),
    sortedComplaints.length,
  );

  const handleComplaintClick = (complaint: Complaint) => {
    if (onComplaintClick) {
      onComplaintClick(complaint);
      return;
    }

    router.push(`/${roleMatchRoute}/complaints/${complaint.id}`);
  };

  return (
    <section className="w-full space-y-3">
      {/* Section heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-base font-semibold tracking-tight text-slate-800">
          All complaints
        </h2>

        <div className="flex items-center gap-2">
          <ArrowDownWideNarrow size={16} className="text-slate-500" />

          <Select
            value={sortOrder}
            onValueChange={(value) => {
              if (value) {
                setSortOrder(value);
              }
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[175px] border-0 bg-transparent px-1 text-xs text-slate-500 shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">
                Date received: newest first
              </SelectItem>
              <SelectItem value="oldest">
                Date received: oldest first
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Complaints table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table className="min-w-[1100px]">
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
              {[
                "Complaint ID",
                "Customer",
                "Issue / Category",
                "Order ID",
                "Priority",
                "Status",
                "Assigned Staff",
                "Date Received",
                "Deadline",
              ].map((heading) => (
                <TableHead
                  key={heading}
                  className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-slate-500 first:pl-4"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedComplaints.map((complaint) => (
              <TableRow
                key={complaint.id}
                tabIndex={0}
                role="link"
                aria-label={`View complaint ${complaint.id}`}
                onClick={() => handleComplaintClick(complaint)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleComplaintClick(complaint);
                  }
                }}
                className={`cursor-pointer border-slate-200 transition-colors odd:bg-slate-50/60 hover:bg-emerald-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 ${
                  complaint.overdue ? "bg-red-50/50" : ""
                }`}
              >
                {/* Complaint ID */}
                <TableCell className="whitespace-nowrap px-3 py-3 pl-4 text-xs font-semibold text-slate-800">
                  CCTS {complaint.id}
                </TableCell>

                {/* Customer */}
                <TableCell className="px-3 py-3 text-xs text-slate-800">
                  <div className="max-w-[100px]">{complaint.customer}</div>
                </TableCell>

                {/* Issue */}
                <TableCell className="px-3 py-3">
                  <p className="max-w-[110px] text-xs font-medium text-slate-800">
                    {complaint.category}
                  </p>
                  <p className="mt-1 max-w-[110px] text-[10px] leading-4 text-slate-500">
                    {complaint.description}
                  </p>
                </TableCell>

                {/* Order ID */}
                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {complaint.orderId}
                </TableCell>

                {/* Priority */}
                <TableCell className="px-3 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold ${priorityStyles[complaint.priority]}`}
                  >
                    {complaint.priority}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="px-3 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${statusStyles[complaint.status]}`}
                  >
                    {complaint.status}
                  </span>
                </TableCell>

                {/* Assigned staff */}
                <TableCell className="px-3 py-3 text-xs text-slate-700">
                  <div className="max-w-[100px]">{complaint.assignedStaff}</div>
                </TableCell>

                {/* Date received */}
                <TableCell className="whitespace-nowrap px-3 py-3">
                  <p className="text-xs text-slate-800">
                    {complaint.dateReceived}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {complaint.timeReceived}
                  </p>
                </TableCell>

                {/* Deadline */}
                <TableCell className="whitespace-nowrap px-3 py-3">
                  <p
                    className={`text-xs font-semibold ${
                      complaint.overdue ? "text-red-600" : "text-slate-800"
                    }`}
                  >
                    {complaint.deadline}
                  </p>

                  {complaint.overdue && (
                    <span className="mt-1 inline-flex rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-700">
                      OVERDUE
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {paginatedComplaints.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-28 text-center text-sm text-slate-500"
                >
                  No complaints found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>
            Showing {startItem}–{endItem} of {sortedComplaints.length}{" "}
            complaints
          </span>

          <Select
            value={pageSize}
            onValueChange={(value) => {
              if (value) {
                setSortOrder(value);
              }
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-7 w-[65px] text-xs">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="h-8 gap-1 text-xs text-slate-500"
          >
            <ChevronLeft size={14} />
            Previous
          </Button>

          <span className="whitespace-nowrap text-[10px] font-semibold text-slate-700">
            Page {currentPage} of {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="h-8 gap-1 text-xs text-slate-500"
          >
            Next
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComplaintInbox;
