"use client";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

type EscalationStatus = "New" | "In Progress" | "Resolved";
type Priority = "High" | "Medium" | "Low";
type EscalationSource = "Customer" | "Staff";

interface Escalation {
  id: string;
  complaintId: string;
  customer: string;
  escalatedBy: EscalationSource;
  escalatedByName: string;
  reason: string;
  priority: Priority;
  status: EscalationStatus;
  date: string;
  time: string;
}

const escalations: Escalation[] = [
  {
    id: "ESC-0248",
    complaintId: "CMP-1086",
    customer: "Ngozi Johnson",
    escalatedBy: "Customer",
    escalatedByName: "Ngozi Johnson",
    reason: "Refund delayed beyond SLA",
    priority: "High",
    status: "New",
    date: "31 Oct 2026",
    time: "09:15 WAT",
  },
  {
    id: "ESC-0247",
    complaintId: "CMP-1074",
    customer: "Ibrahim Musa",
    escalatedBy: "Staff",
    escalatedByName: "Fatima Bello",
    reason: "Repeated service disruption",
    priority: "High",
    status: "In Progress",
    date: "30 Oct 2026",
    time: "14:30 WAT",
  },
  {
    id: "ESC-0246",
    complaintId: "CMP-1068",
    customer: "Amina Yusuf",
    escalatedBy: "Customer",
    escalatedByName: "Amina Yusuf",
    reason: "Incorrect billing unresolved",
    priority: "Medium",
    status: "In Progress",
    date: "29 Oct 2026",
    time: "11:20 WAT",
  },
  {
    id: "ESC-0245",
    complaintId: "CMP-1059",
    customer: "David Okeke",
    escalatedBy: "Staff",
    escalatedByName: "Maya Patel",
    reason: "Awaiting technical response",
    priority: "Medium",
    status: "New",
    date: "28 Oct 2026",
    time: "16:05 WAT",
  },
  {
    id: "ESC-0244",
    complaintId: "CMP-1042",
    customer: "Grace Adebayo",
    escalatedBy: "Customer",
    escalatedByName: "Grace Adebayo",
    reason: "Delayed account update",
    priority: "Low",
    status: "Resolved",
    date: "27 Oct 2026",
    time: "10:45 WAT",
  },
  {
    id: "ESC-0243",
    complaintId: "CMP-1037",
    customer: "Emeka Obi",
    escalatedBy: "Staff",
    escalatedByName: "Chinedu Eze",
    reason: "Failed transaction reversal",
    priority: "High",
    status: "Resolved",
    date: "26 Oct 2026",
    time: "13:10 WAT",
  },
];

function PriorityBadge({ priority }: { priority: Priority }) {
  const styles = {
    High: "bg-red-100 text-red-600 hover:bg-red-100",
    Medium: "bg-orange-50 text-orange-600 hover:bg-orange-50",
    Low: "bg-teal-50 text-teal-700 hover:bg-teal-50",
  };

  return (
    <Badge
      className={`${styles[priority]} border-0 rounded-full px-2 py-1 text-[10px] font-semibold`}
    >
      <span className="mr-1">●</span>
      {priority}
    </Badge>
  );
}

function StatusBadge({ status }: { status: EscalationStatus }) {
  const styles = {
    New: "bg-slate-100 text-slate-700 hover:bg-slate-100",
    "In Progress": "bg-purple-100 text-purple-700 hover:bg-purple-100",
    Resolved: "bg-teal-50 text-teal-700 hover:bg-teal-50",
  };

  return (
    <Badge
      className={`${styles[status]} border-0 rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap`}
    >
      <span className="mr-1">●</span>
      {status}
    </Badge>
  );
}

const EscalationTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [source, setSource] = useState("all");
  const [dateRange, setDateRange] = useState("october");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredEscalations = useMemo(() => {
    return escalations.filter((item) => {
      const searchMatch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.complaintId.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase());

      const statusMatch = status === "all" || item.status === status;

      const priorityMatch = priority === "all" || item.priority === priority;

      const sourceMatch = source === "all" || item.escalatedBy === source;

      return searchMatch && statusMatch && priorityMatch && sourceMatch;
    });
  }, [search, status, priority, source]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEscalations.length / itemsPerPage),
  );

  const paginatedEscalations = filteredEscalations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div>
      {/* Table */}
      <div className="border-t border-slate-200 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Escalation ID
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Complaint ID
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Customer
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Escalated By
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Reason
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Priority
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Status
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Escalated On
              </TableHead>
              <TableHead className="text-[10px] font-semibold text-slate-700 whitespace-nowrap">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedEscalations.length > 0 ? (
              paginatedEscalations.map((item) => (
                <TableRow
                  key={item.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`View escalation ${item.id}`}
                  className="cursor-pointer hover:bg-slate-50/80 transition-colors"
                  onClick={() => router.push(`/manager/escalations/${item.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/manager/escalations/${item.id}`);
                    }
                  }}
                >
                  <TableCell className="text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                    {item.id}
                  </TableCell>

                  <TableCell className="text-[11px] text-teal-700 font-medium whitespace-nowrap">
                    {item.complaintId}
                  </TableCell>

                  <TableCell className="text-[11px] text-slate-800 whitespace-nowrap">
                    {item.customer}
                  </TableCell>

                  <TableCell>
                    <div className="text-[11px] text-slate-700">
                      {item.escalatedBy}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.escalatedByName}
                    </p>
                  </TableCell>

                  <TableCell className="text-[11px] text-slate-700 min-w-[150px]">
                    {item.reason}
                  </TableCell>

                  <TableCell>
                    <PriorityBadge priority={item.priority} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <p className="text-[11px] text-slate-700">{item.date}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.time}
                    </p>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-1 text-[11px] font-semibold text-teal-700 hover:text-teal-800 hover:bg-teal-50 whitespace-nowrap"
                      onClick={() =>
                        (window.location.href = `/dashboard/escalations/${item.id}`)
                      }
                    >
                      View Details
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-28 text-center text-sm text-slate-500"
                >
                  No escalations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-slate-500">
          Showing{" "}
          {filteredEscalations.length === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}
          –{Math.min(currentPage * itemsPerPage, filteredEscalations.length)} of{" "}
          {filteredEscalations.length} escalations
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="h-7 text-[10px] text-slate-500"
          >
            <ChevronLeft className="w-3 h-3 mr-1" />
            Previous
          </Button>

          <span className="text-[10px] text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className="h-7 text-[10px] text-teal-700"
          >
            Next
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EscalationTable;
