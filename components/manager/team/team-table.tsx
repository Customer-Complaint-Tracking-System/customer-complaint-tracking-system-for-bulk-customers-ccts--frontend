"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

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

type StaffStatus = "Active" | "Inactive" | "On Leave";

type StaffRole = "Complaint Officer" | "Senior Officer" | "Team Lead";

interface Staff {
  id: string;
  staffId: string;
  fullname: string;
  email: string;
  phone: string;
  role: StaffRole;
  assignedComplaints: number;
  resolvedComplaints: number;
  status: StaffStatus;
  dateJoined: string;
}

interface TeamTableProps {
  staff?: Staff[];
  onStaffClick?: (staff: Staff) => void;
}

const defaultStaff: Staff[] = [
  {
    id: "1",
    staffId: "CCTS-STF-001",
    fullname: "Jordan Ladipo",
    email: "jordan.ladipo@example.com",
    phone: "+234 801 234 5678",
    role: "Team Lead",
    assignedComplaints: 18,
    resolvedComplaints: 42,
    status: "Active",
    dateJoined: "12 Jan 2025",
  },
  {
    id: "2",
    staffId: "CCTS-STF-002",
    fullname: "Aanu Adeniyi",
    email: "aanu.adeniyi@example.com",
    phone: "+234 802 345 6789",
    role: "Senior Officer",
    assignedComplaints: 12,
    resolvedComplaints: 35,
    status: "Active",
    dateJoined: "20 Feb 2025",
  },
  {
    id: "3",
    staffId: "CCTS-STF-003",
    fullname: "Casey Patel",
    email: "casey.patel@example.com",
    phone: "+234 803 456 7890",
    role: "Complaint Officer",
    assignedComplaints: 15,
    resolvedComplaints: 28,
    status: "Active",
    dateJoined: "15 Mar 2025",
  },
  {
    id: "4",
    staffId: "CCTS-STF-004",
    fullname: "Riley Davis",
    email: "riley.davis@example.com",
    phone: "+234 804 567 8901",
    role: "Complaint Officer",
    assignedComplaints: 0,
    resolvedComplaints: 21,
    status: "On Leave",
    dateJoined: "08 Apr 2025",
  },
  {
    id: "5",
    staffId: "CCTS-STF-005",
    fullname: "Chioma Anita",
    email: "chioma.anita@example.com",
    phone: "+234 805 678 9012",
    role: "Senior Officer",
    assignedComplaints: 9,
    resolvedComplaints: 31,
    status: "Active",
    dateJoined: "10 May 2025",
  },
  {
    id: "6",
    staffId: "CCTS-STF-006",
    fullname: "Kabir Ahmed",
    email: "kabir.ahmed@example.com",
    phone: "+234 806 789 0123",
    role: "Complaint Officer",
    assignedComplaints: 0,
    resolvedComplaints: 16,
    status: "Inactive",
    dateJoined: "18 Jun 2025",
  },
];

const statusStyles: Record<StaffStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Inactive: "bg-slate-100 text-slate-600 border border-slate-200",
  "On Leave": "bg-orange-50 text-orange-700 border border-orange-200",
};

const roleStyles: Record<StaffRole, string> = {
  "Team Lead": "bg-purple-50 text-purple-700",
  "Senior Officer": "bg-blue-50 text-blue-700",
  "Complaint Officer": "bg-slate-100 text-slate-600",
};

const TeamTable: React.FC<TeamTableProps> = ({
  staff = defaultStaff,
  onStaffClick,
}) => {
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState("5");

  const sortedStaff = [...staff].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return (
          new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime()
        );
      case "oldest":
        return (
          new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime()
        );
      case "workload":
        return b.assignedComplaints - a.assignedComplaints;
      default:
        return a.fullname.localeCompare(b.fullname);
    }
  });

  const totalPages = Math.ceil(sortedStaff.length / Number(pageSize));

  const paginatedStaff = sortedStaff.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize),
  );

  const startItem =
    sortedStaff.length === 0 ? 0 : (currentPage - 1) * Number(pageSize) + 1;

  const endItem = Math.min(currentPage * Number(pageSize), sortedStaff.length);

  const handleStaffClick = (member: Staff) => {
    if (onStaffClick) {
      onStaffClick(member);
      return;
    }

    router.push(`/manager/team/${member.id}`);
  };

  return (
    <section className="w-full space-y-3">
      {/* Section heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 ml-auto">
          <ArrowDownWideNarrow size={15} className="text-slate-500" />

          <Select
            value={sortOrder}
            onValueChange={(value) => {
              if (value) {
                setSortOrder(value);
                setCurrentPage(1);
              }
            }}
          >
            <SelectTrigger className="h-8 w-[155px] border-0 bg-transparent text-xs text-slate-500 shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="name">Name: A–Z</SelectItem>
              <SelectItem value="newest">Recently joined</SelectItem>
              <SelectItem value="oldest">Oldest joined</SelectItem>
              <SelectItem value="workload">Highest workload</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table className="min-w-[1050px]">
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
              {[
                "Staff ID",
                "Staff member",
                "Role",
                "Assigned complaints",
                "Resolved",
                "Status",
                "Date joined",
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
            {paginatedStaff.map((member) => (
              <TableRow
                key={member.id}
                tabIndex={0}
                role="link"
                aria-label={`View ${member.fullname}'s details`}
                onClick={() => handleStaffClick(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStaffClick(member);
                  }
                }}
                className="cursor-pointer border-slate-200 transition-colors odd:bg-slate-50/60 hover:bg-emerald-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
              >
                {/* Staff ID */}
                <TableCell className="whitespace-nowrap px-3 py-3 pl-4 text-xs font-semibold text-slate-800">
                  {member.staffId}
                </TableCell>

                {/* Staff information */}
                <TableCell className="px-3 py-3">
                  <div className="space-y-1">
                    <p className="whitespace-nowrap text-xs font-semibold text-slate-800">
                      {member.fullname}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Mail size={11} />
                      {member.email}
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Phone size={11} />
                      {member.phone}
                    </div>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell className="px-3 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${roleStyles[member.role]}`}
                  >
                    {member.role}
                  </span>
                </TableCell>

                {/* Assigned complaints */}
                <TableCell className="px-3 py-3">
                  <span className="text-xs font-semibold text-slate-800">
                    {member.assignedComplaints}
                  </span>
                </TableCell>

                {/* Resolved complaints */}
                <TableCell className="px-3 py-3">
                  <span className="text-xs font-semibold text-emerald-700">
                    {member.resolvedComplaints}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="px-3 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-medium ${statusStyles[member.status]}`}
                  >
                    {member.status}
                  </span>
                </TableCell>

                {/* Date joined */}
                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {member.dateJoined}
                </TableCell>
              </TableRow>
            ))}

            {paginatedStaff.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-28 text-center text-sm text-slate-500"
                >
                  No team members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          Showing {startItem}–{endItem} of {sortedStaff.length} team members
          <Select
            value={pageSize}
            onValueChange={(value) => {
              if (value) {
                setPageSize(value);
                setCurrentPage(1);
              }
            }}
          >
            <SelectTrigger className="h-7 w-[65px] text-xs">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
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

export default TeamTable;
