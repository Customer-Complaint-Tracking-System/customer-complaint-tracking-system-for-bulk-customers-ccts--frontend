"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  X,
  Check,
  Clock,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AcceptRequestModal from "./accept-request-modal";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type RequestStatus = "Pending" | "Approved" | "Rejected";

type RequestType = "Refund" | "Compensation" | "Discount";

type ApprovalRequest = {
  id: string;
  complaintId: string;
  type: RequestType;
  requestedBy: string;
  amount: number;
  reason: string;
  requestedOn: string;
  requestedAt: string;
  status: RequestStatus;
};

// --------------------------------------------------
// MOCK DATA
// Replace with API data when connecting your backend.
// --------------------------------------------------

const initialRequests: ApprovalRequest[] = [
  {
    id: "APR-0136",
    complaintId: "CMP-1086",
    type: "Refund",
    requestedBy: "Chinedu Eze",
    amount: 45000,
    reason: "Damaged item; return verified",
    requestedOn: "2026-11-03",
    requestedAt: "09:15",
    status: "Pending",
  },
  {
    id: "APR-0135",
    complaintId: "CMP-1082",
    type: "Compensation",
    requestedBy: "Fatima Bello",
    amount: 15000,
    reason: "Delivery delayed by seven days",
    requestedOn: "2026-11-02",
    requestedAt: "16:40",
    status: "Pending",
  },
  {
    id: "APR-0134",
    complaintId: "CMP-1079",
    type: "Discount",
    requestedBy: "Maya Patel",
    amount: 10000,
    reason: "Incorrect promotional price",
    requestedOn: "2026-11-02",
    requestedAt: "14:20",
    status: "Pending",
  },
  {
    id: "APR-0133",
    complaintId: "CMP-1075",
    type: "Refund",
    requestedBy: "Tunde Adeyemi",
    amount: 60000,
    reason: "Duplicate payment confirmed",
    requestedOn: "2026-11-01",
    requestedAt: "11:05",
    status: "Pending",
  },
  {
    id: "APR-0132",
    complaintId: "CMP-1071",
    type: "Compensation",
    requestedBy: "Amaka Nwosu",
    amount: 25000,
    reason: "Repeated service interruption",
    requestedOn: "2026-10-31",
    requestedAt: "15:30",
    status: "Pending",
  },
  {
    id: "APR-0131",
    complaintId: "CMP-1069",
    type: "Refund",
    requestedBy: "Sarah Ibrahim",
    amount: 30000,
    reason: "Cancelled order not fulfilled",
    requestedOn: "2026-10-30",
    requestedAt: "10:45",
    status: "Pending",
  },
  {
    id: "APR-0130",
    complaintId: "CMP-1065",
    type: "Discount",
    requestedBy: "Chinedu Eze",
    amount: 12000,
    reason: "Customer loyalty adjustment",
    requestedOn: "2026-10-28",
    requestedAt: "13:20",
    status: "Approved",
  },
  {
    id: "APR-0129",
    complaintId: "CMP-1062",
    type: "Refund",
    requestedBy: "Fatima Bello",
    amount: 20000,
    reason: "Incorrect item delivered",
    requestedOn: "2026-10-27",
    requestedAt: "12:10",
    status: "Approved",
  },
  {
    id: "APR-0128",
    complaintId: "CMP-1058",
    type: "Compensation",
    requestedBy: "Maya Patel",
    amount: 18000,
    reason: "Service outage compensation",
    requestedOn: "2026-10-25",
    requestedAt: "09:30",
    status: "Approved",
  },
  {
    id: "APR-0127",
    complaintId: "CMP-1054",
    type: "Refund",
    requestedBy: "Tunde Adeyemi",
    amount: 35000,
    reason: "Duplicate transaction",
    requestedOn: "2026-10-22",
    requestedAt: "15:00",
    status: "Approved",
  },
  {
    id: "APR-0126",
    complaintId: "CMP-1051",
    type: "Discount",
    requestedBy: "Amaka Nwosu",
    amount: 8000,
    reason: "Pricing adjustment",
    requestedOn: "2026-10-20",
    requestedAt: "11:45",
    status: "Rejected",
  },
  {
    id: "APR-0125",
    complaintId: "CMP-1048",
    type: "Refund",
    requestedBy: "Sarah Ibrahim",
    amount: 27000,
    reason: "Refund request outside policy",
    requestedOn: "2026-10-18",
    requestedAt: "14:15",
    status: "Rejected",
  },
  {
    id: "APR-0124",
    complaintId: "CMP-1043",
    type: "Compensation",
    requestedBy: "Chinedu Eze",
    amount: 22000,
    reason: "Insufficient supporting evidence",
    requestedOn: "2026-10-15",
    requestedAt: "10:00",
    status: "Rejected",
  },
];

// --------------------------------------------------
// CONSTANTS
// --------------------------------------------------

type StatusTab = RequestStatus;

type DateFilter = "all" | "7days" | "30days" | "thisMonth";

const STATUS_TABS: StatusTab[] = ["Pending", "Approved", "Rejected"];

const PAGE_SIZE = 6;

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )} ${period} WAT`;
}

function getDateThreshold(filter: DateFilter): Date | null {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case "7days":
      start.setDate(start.getDate() - 7);
      return start;

    case "30days":
      start.setDate(start.getDate() - 30);
      return start;

    case "thisMonth":
      return new Date(now.getFullYear(), now.getMonth(), 1);

    default:
      return null;
  }
}

// --------------------------------------------------
// STATUS TAB
// --------------------------------------------------

function StatusTabButton({
  status,
  active,
  count,
  onClick,
}: {
  status: StatusTab;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-1 pb-3 pt-2 text-xs transition-colors ${
        active
          ? "font-semibold text-teal-700"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      {status}

      <span
        className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${
          active ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>

      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-teal-500" />
      )}
    </button>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export default function ApprovalTable() {
  const router = useRouter();
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);

  const [activeTab, setActiveTab] = useState<StatusTab>("Pending");

  const [search, setSearch] = useState("");

  const [requestType, setRequestType] = useState<string>("all");

  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "Pending",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRequest, setSelectedRequest] =
    useState<ApprovalRequest | null>(null);

  // -----------------------------------------------
  // STATUS COUNTS
  // -----------------------------------------------

  const statusCounts = useMemo(() => {
    return {
      Pending: requests.filter((request) => request.status === "Pending")
        .length,

      Approved: requests.filter((request) => request.status === "Approved")
        .length,

      Rejected: requests.filter((request) => request.status === "Rejected")
        .length,
    };
  }, [requests]);

  // -----------------------------------------------
  // FILTERING
  // -----------------------------------------------

  const filteredRequests = useMemo(() => {
    const threshold = getDateThreshold(dateFilter);

    return requests.filter((request) => {
      const matchesSearch =
        request.id.toLowerCase().includes(search.toLowerCase()) ||
        request.complaintId.toLowerCase().includes(search.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(search.toLowerCase());

      const matchesType = requestType === "all" || request.type === requestType;

      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      const requestDate = new Date(`${request.requestedOn}T12:00:00`);

      const matchesDate = !threshold || requestDate >= threshold;

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }, [requests, search, requestType, dateFilter, statusFilter]);

  // -----------------------------------------------
  // PAGINATION
  // -----------------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / PAGE_SIZE),
  );

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredRequests.slice(start, start + PAGE_SIZE);
  }, [filteredRequests, currentPage]);

  const firstItem =
    filteredRequests.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const lastItem = Math.min(currentPage * PAGE_SIZE, filteredRequests.length);

  // -----------------------------------------------
  // HANDLERS
  // -----------------------------------------------

  function handleTabChange(status: StatusTab) {
    setActiveTab(status);
    setStatusFilter(status);
    setCurrentPage(1);
  }

  function handleApprove(id: string) {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request,
      ),
    );

    setSelectedRequest(null);
  }

  function handleReject(id: string) {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request,
      ),
    );

    setSelectedRequest(null);
  }

  function resetFilters() {
    setSearch("");
    setRequestType("all");
    setDateFilter("all");
    setStatusFilter("Pending");
    setActiveTab("Pending");
    setCurrentPage(1);
  }

  function updateFilter(callback: () => void) {
    callback();
    setCurrentPage(1);
  }

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4 md:p-6">
      <div className="mx-auto max-w-[1600px]">
        <Card className="overflow-hidden rounded-lg border-slate-200 shadow-none">
          {/* HEADER */}
          <CardHeader className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-[#172F52]">
                Approval requests
              </CardTitle>

              <CardDescription className="mt-1 text-[11px]">
                Review the evidence before authorising a staff request.
              </CardDescription>
            </div>

            <p className="text-[10px] text-slate-500">
              {statusCounts.Pending} pending requests · Newest request first
            </p>
          </CardHeader>

          {/* STATUS TABS */}
          <div className="border-b border-slate-200 px-4">
            <div className="flex items-center gap-6">
              {STATUS_TABS.map((status) => (
                <StatusTabButton
                  key={status}
                  status={status}
                  active={activeTab === status}
                  count={statusCounts[status]}
                  onClick={() => handleTabChange(status)}
                />
              ))}
            </div>
          </div>

          {/* FILTER SECTION */}
          <div className="border-b border-slate-200 p-3">
            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.15fr_auto]">
              {/* SEARCH */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-slate-600">
                  Search requests
                </label>

                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />

                  <Input
                    placeholder="Request ID, Complaint ID or staff name"
                    value={search}
                    onChange={(event) =>
                      updateFilter(() => setSearch(event.target.value))
                    }
                    className="h-8 pl-8 text-[11px] shadow-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* REQUEST TYPE */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-slate-600">
                  Request Type
                </label>

                <Select
                  value={requestType}
                  onValueChange={(value) => {
                    if (value !== null) {
                      updateFilter(() => setRequestType(value));
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-[11px] shadow-none">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="Refund">Refund</SelectItem>
                    <SelectItem value="Compensation">Compensation</SelectItem>
                    <SelectItem value="Discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* DATE REQUESTED */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-slate-600">
                  Date requested
                </label>

                <Select
                  value={dateFilter}
                  onValueChange={(value) =>
                    updateFilter(() => setDateFilter(value as DateFilter))
                  }
                >
                  <SelectTrigger className="h-8 text-[11px] shadow-none">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="thisMonth">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* STATUS */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium text-slate-600">
                  Status
                </label>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value as RequestStatus | "all");
                    setCurrentPage(1);

                    if (value !== "all") {
                      setActiveTab(value as StatusTab);
                    } else {
                      setActiveTab("Pending");
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-[11px] shadow-none">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* RESET */}
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="h-8 px-2 text-[10px] font-normal text-slate-500 hover:text-teal-700"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* TABLE */}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="whitespace-nowrap pl-4 text-[9px] font-semibold text-[#172F52]">
                      Request ID
                    </TableHead>

                    <TableHead className="whitespace-nowrap text-[9px] font-semibold text-[#172F52]">
                      Complaint ID
                    </TableHead>

                    <TableHead className="whitespace-nowrap text-[9px] font-semibold text-[#172F52]">
                      Request Type
                    </TableHead>

                    <TableHead className="whitespace-nowrap text-[9px] font-semibold text-[#172F52]">
                      Requested By
                    </TableHead>

                    <TableHead className="whitespace-nowrap text-[9px] font-semibold text-[#172F52]">
                      Amount (₦)
                    </TableHead>

                    <TableHead className="min-w-[180px] text-[9px] font-semibold text-[#172F52]">
                      Reason
                    </TableHead>

                    <TableHead className="whitespace-nowrap text-[9px] font-semibold text-[#172F52]">
                      Requested On
                    </TableHead>

                    <TableHead className="whitespace-nowrap pr-4 text-[9px] font-semibold text-[#172F52]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((request) => (
                      <TableRow
                        key={request.id}
                        className="transition-colors hover:bg-slate-50/70"
                      >
                        <TableCell className="whitespace-nowrap py-4 pl-4 text-[10px] font-semibold text-[#172F52]">
                          {request.id}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-4 text-[10px] font-medium text-teal-700">
                          {request.complaintId}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-4 text-[10px] text-slate-700">
                          {request.type}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-4 text-[10px] text-slate-700">
                          {request.requestedBy}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-4 text-[10px] font-semibold text-[#172F52]">
                          {nairaFormatter.format(request.amount)}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-4 text-[10px] text-slate-700">
                          {request.reason}
                        </TableCell>

                        <TableCell className="whitespace-nowrap py-3 text-[10px] text-[#172F52]">
                          <div>{formatDate(request.requestedOn)}</div>

                          <div className="mt-0.5 text-[9px] text-slate-400">
                            {formatTime(request.requestedAt)}
                          </div>
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell className="whitespace-nowrap py-4 pr-4">
                          <div className="flex items-center gap-2 text-[10px] font-semibold">
                            <button
                              onClick={() =>
                                router.push(`/manager/approvals/${request.id}`)
                              }
                              className="text-teal-700 hover:text-teal-900"
                            >
                              View
                            </button>

                            {request.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => setSelectedRequest(request)}
                                  className="text-teal-700 hover:text-teal-900"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() => handleReject(request.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {request.status !== "Pending" && (
                              <span
                                className={
                                  request.status === "Approved"
                                    ? "text-teal-700"
                                    : "text-red-600"
                                }
                              >
                                {request.status}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-40 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="h-6 w-6 text-slate-300" />

                          <p className="text-xs font-medium text-slate-600">
                            No requests found
                          </p>

                          <p className="text-[10px] text-slate-400">
                            Try changing your search or filters.
                          </p>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetFilters}
                            className="mt-1 h-7 text-[10px]"
                          >
                            Reset filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row">
              <p className="text-[9px] text-slate-500">
                Showing {firstItem}–{lastItem} of {filteredRequests.length}{" "}
                {statusFilter === "all"
                  ? "requests"
                  : `${statusFilter.toLowerCase()} requests`}
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="h-7 px-1 text-[9px] text-slate-500"
                >
                  <ChevronLeft className="mr-1 h-3 w-3" />
                  Previous
                </Button>

                <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-teal-50 px-2 text-[10px] font-semibold text-teal-700">
                  {currentPage}
                </span>

                <span className="text-[9px] text-slate-500">
                  of {totalPages}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="h-7 px-1 text-[9px] text-slate-500"
                >
                  Next
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REQUEST DETAILS DIALOG */}
      <Dialog
        open={selectedRequest !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRequest(null);
        }}
      >
        <DialogContent className=" max-w-3xl sm:max-w-xl">
          {selectedRequest && (
            <>
              <AcceptRequestModal
                id="CMP-1086"
                approvalId="APR-0136"
                amount="₦45,000"
                customerName="Ngozi Johnson"
                orderId="ORD-20874"
                requestType="Refund"
                requestedBy="Chinedu Eze"
                requestedAt="03 Nov 2026, 09:15 WAT"
                reviewerName="Ada Okafor"
                isSubmitting={false}
                onCancel={() => setSelectedRequest(null)}
                onConfirm={async () => {
                  try {
                  } finally {
                    setSelectedRequest(null);
                  }
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --------------------------------------------------
// REUSABLE DETAIL COMPONENT
// --------------------------------------------------

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="text-xs font-medium text-[#172F52]">{value}</p>
    </div>
  );
}
