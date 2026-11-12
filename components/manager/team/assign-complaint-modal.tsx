"use client";

import { Check, CircleDot, Info, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import CustomButton from "@/components/shared/custom-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type AssignmentMode = "unassigned" | "redistribute";

type Complaint = {
  id: string;
  reference: string;
  subject: string;
  customer: string;
  status: "unassigned" | "assigned";
  assignedTo?: string;
};

type StaffMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  availability: string;
  assignedCount: number;
  workload: "Low" | "Medium" | "High";
};

type AssignComplaintsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmAssignment?: (data: {
    complaintIds: string[];
    staffId: string;
    mode: AssignmentMode;
  }) => void;
};

const initialComplaints: Complaint[] = [
  {
    id: "1",
    reference: "CCTS-2026-0191",
    subject: "Damaged product",
    customer: "Adeola Stores",
    status: "unassigned",
  },
  {
    id: "2",
    reference: "CCTS-2026-0192",
    subject: "Late delivery",
    customer: "Sunrise Foods",
    status: "unassigned",
  },
  {
    id: "3",
    reference: "CCTS-2026-0193",
    subject: "Missing items",
    customer: "Greenfield Café",
    status: "unassigned",
  },
  {
    id: "4",
    reference: "CCTS-2026-0194",
    subject: "Incorrect order",
    customer: "Prime Mart",
    status: "unassigned",
  },
  {
    id: "5",
    reference: "CCTS-2026-0195",
    subject: "Payment issue",
    customer: "Fresh Farms",
    status: "unassigned",
  },
  {
    id: "6",
    reference: "CCTS-2026-0196",
    subject: "Poor customer service",
    customer: "City Stores",
    status: "unassigned",
  },
  {
    id: "7",
    reference: "CCTS-2026-0197",
    subject: "Damaged packaging",
    customer: "Royal Foods",
    status: "assigned",
    assignedTo: "sarah",
  },
  {
    id: "8",
    reference: "CCTS-2026-0198",
    subject: "Delayed refund",
    customer: "Market Hub",
    status: "assigned",
    assignedTo: "sarah",
  },
  {
    id: "9",
    reference: "CCTS-2026-0199",
    subject: "Wrong delivery address",
    customer: "Green Basket",
    status: "assigned",
    assignedTo: "john",
  },
  {
    id: "10",
    reference: "CCTS-2026-0200",
    subject: "Missing order",
    customer: "Daily Needs",
    status: "assigned",
    assignedTo: "john",
  },
  {
    id: "11",
    reference: "CCTS-2026-0201",
    subject: "Product quality",
    customer: "Food Central",
    status: "assigned",
    assignedTo: "sarah",
  },
  {
    id: "12",
    reference: "CCTS-2026-0202",
    subject: "Billing complaint",
    customer: "Mega Stores",
    status: "assigned",
    assignedTo: "sarah",
  },
];

const staffMembers: StaffMember[] = [
  {
    id: "sarah",
    name: "Sarah Ibrahim",
    initials: "SI",
    role: "Support officer",
    availability: "Available",
    assignedCount: 6,
    workload: "Low",
  },
  {
    id: "john",
    name: "John Okafor",
    initials: "JO",
    role: "Support officer",
    availability: "Available",
    assignedCount: 9,
    workload: "Medium",
  },
  {
    id: "grace",
    name: "Grace Williams",
    initials: "GW",
    role: "Support officer",
    availability: "Available",
    assignedCount: 12,
    workload: "High",
  },
];

export function AssignComplaintsDialog({
  open,
  onOpenChange,
  onConfirmAssignment,
}: AssignComplaintsDialogProps) {
  const [mode, setMode] = useState<AssignmentMode>("unassigned");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2", "3"]);
  const [selectedStaff, setSelectedStaff] = useState("sarah");

  const selectedStaffMember = staffMembers.find(
    (staff) => staff.id === selectedStaff,
  )!;

  // Filter complaints based on the selected assignment mode.
  const availableComplaints = useMemo(() => {
    return initialComplaints.filter((complaint) =>
      mode === "unassigned"
        ? complaint.status === "unassigned"
        : complaint.status === "assigned",
    );
  }, [mode]);

  // Search complaints by reference, subject, or customer.
  const filteredComplaints = useMemo(() => {
    const query = search.toLowerCase().trim();

    return availableComplaints.filter((complaint) =>
      [complaint.reference, complaint.subject, complaint.customer].some(
        (value) => value.toLowerCase().includes(query),
      ),
    );
  }, [availableComplaints, search]);

  // Only count selected complaints that are in the current mode.
  const selectedComplaints = availableComplaints.filter((complaint) =>
    selectedIds.includes(complaint.id),
  );

  const selectedCount = selectedComplaints.length;

  const projectedWorkload =
    selectedStaffMember.assignedCount +
    (mode === "unassigned"
      ? selectedCount
      : selectedComplaints.filter(
          (complaint) => complaint.assignedTo !== selectedStaff,
        ).length);

  const projectedWorkloadLevel: StaffMember["workload"] =
    projectedWorkload <= 8
      ? "Low"
      : projectedWorkload <= 12
        ? "Medium"
        : "High";

  const remainingUnassigned = Math.max(0, 6 - selectedCount);

  useEffect(() => {
    if (!open) return;

    setMode("unassigned");
    setSearch("");
    setSelectedIds(["1", "2", "3"]);
    setSelectedStaff("sarah");
  }, [open]);

  const handleModeChange = (value: string) => {
    const nextMode = value as AssignmentMode;

    setMode(nextMode);
    setSelectedIds([]);
    setSearch("");
  };

  const toggleComplaint = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds((previous) => [
        ...new Set([
          ...previous,
          ...filteredComplaints.map((complaint) => complaint.id),
        ]),
      ]);
    } else {
      const visibleIds = filteredComplaints.map((complaint) => complaint.id);

      setSelectedIds((previous) =>
        previous.filter((id) => !visibleIds.includes(id)),
      );
    }
  };

  const handleConfirm = () => {
    if (!selectedCount || !selectedStaff) return;

    onConfirmAssignment?.({
      complaintIds: selectedComplaints.map((complaint) => complaint.id),
      staffId: selectedStaff,
      mode,
    });

    onOpenChange(false);
  };

  const allVisibleSelected =
    filteredComplaints.length > 0 &&
    filteredComplaints.every((complaint) => selectedIds.includes(complaint.id));

  const getWorkloadColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-slate-500 bg-slate-50 border-slate-200";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" max-w-3xl sm:max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="border-b px-5 py-5 text-left">
          <DialogTitle className="text-lg font-semibold text-[#172B4D]">
            Assign Complaints
          </DialogTitle>

          <DialogDescription className="text-xs leading-5 text-slate-500">
            Select complaints and an available staff member to balance the
            team's workload.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-5 py-5">
          {/* Assignment modes */}
          <div className="space-y-2">
            <Tabs
              value={mode}
              onValueChange={handleModeChange}
              className="w-full"
            >
              <TabsList className="grid h-10 w-full grid-cols-2 rounded-md border bg-slate-50 p-0.5">
                <TabsTrigger
                  value="unassigned"
                  className="rounded-sm text-xs data-[state=active]:bg-[#11998E] data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Assign unassigned
                </TabsTrigger>

                <TabsTrigger
                  value="redistribute"
                  className="rounded-sm text-xs data-[state=active]:bg-[#11998E] data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  Redistribute assigned
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <p className="text-[11px] text-slate-500">
              {mode === "unassigned"
                ? "Select unassigned complaints to distribute to a staff member."
                : "Select existing complaints to reassign to another staff member."}
            </p>
          </div>

          {/* Complaints section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-900">
                Select complaints
              </h3>

              <span className="text-xs font-medium text-[#11998E]">
                {selectedCount} of {availableComplaints.length} selected
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by complaint ID or customer"
                className="h-9 pl-9 text-xs placeholder:text-slate-400 focus-visible:ring-[#11998E]"
              />
            </div>

            {/* Select all */}
            {filteredComplaints.length > 0 && (
              <div className="flex items-center gap-2 px-2">
                <Checkbox
                  checked={allVisibleSelected}
                  onCheckedChange={(checked) => toggleAll(checked === true)}
                  className="data-[state=checked]:border-[#11998E] data-[state=checked]:bg-[#11998E]"
                />
                <span className="text-[11px] text-slate-500">
                  Select all visible
                </span>
              </div>
            )}

            {/* Complaint list */}
            <div className="overflow-hidden rounded-md border border-slate-200">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint, index) => (
                  <label
                    key={complaint.id}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-slate-50 ${
                      index !== filteredComplaints.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }`}
                  >
                    <Checkbox
                      checked={selectedIds.includes(complaint.id)}
                      onCheckedChange={() => toggleComplaint(complaint.id)}
                      className="data-[state=checked]:border-[#11998E] data-[state=checked]:bg-[#11998E]"
                    />

                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="truncate text-xs font-semibold text-slate-900">
                        {complaint.reference}
                      </p>

                      <p className="truncate text-[11px] text-slate-500">
                        {complaint.subject} · {complaint.customer}
                      </p>
                    </div>

                    <span className="shrink-0 text-[10px] text-slate-500">
                      {complaint.status === "unassigned"
                        ? "Unassigned"
                        : `Assigned: ${
                            staffMembers.find(
                              (staff) => staff.id === complaint.assignedTo,
                            )?.name ?? "Staff"
                          }`}
                    </span>
                  </label>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-xs text-slate-500">
                  No complaints found.
                </div>
              )}
            </div>
          </section>

          {/* Staff selection */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900">
              Assign to staff member
            </h3>

            <Select
              value={selectedStaff}
              onValueChange={(value) => {
                if (value !== null) {
                  setSelectedStaff(value);
                }
              }}
            >
              <SelectTrigger className="w-full rounded-md border-[#11998E] px-3 focus:ring-[#11998E]">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>

              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>
                    {staff.name} ({staff.assignedCount} assigned)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected staff details */}
            <div className="flex items-center justify-between rounded-md border border-[#11998E] px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EAF8F6] text-[11px] font-semibold text-[#11998E]">
                  {selectedStaffMember.initials}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900">
                    {selectedStaffMember.name}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {selectedStaffMember.role} ·{" "}
                    {selectedStaffMember.availability} ·{" "}
                    {selectedStaffMember.assignedCount} assigned
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`shrink-0 rounded-full text-[10px] font-medium ${getWorkloadColor(
                  selectedStaffMember.workload,
                )}`}
              >
                <CircleDot className="mr-1 size-2" />
                {selectedStaffMember.workload}
              </Badge>
            </div>
          </section>

          {/* Workload summary */}
          <div className="space-y-2 rounded-md border border-[#D5EFEB] bg-[#F0FAF8] p-3">
            <div className="flex items-center gap-2">
              <Info className="size-4 shrink-0 text-[#11998E]" />

              <p className="text-[11px] font-semibold text-[#11998E]">
                {selectedStaffMember.name.split(" ")[0]}'s workload:{" "}
                {selectedStaffMember.assignedCount} → {projectedWorkload}{" "}
                assigned · {projectedWorkloadLevel}
              </p>
            </div>

            <p className="pl-6 text-[10px] leading-4 text-slate-500">
              {selectedCount} complaint
              {selectedCount !== 1 ? "s" : ""} will be{" "}
              {mode === "unassigned" ? "assigned" : "reassigned"}.
              {mode === "unassigned" &&
                ` ${remainingUnassigned} complaints will remain unassigned.`}{" "}
              This action will be recorded in Activity History.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
          <CustomButton
            variant="outline"
            onClick={() => onOpenChange(false)}
            title="Cancel"
          />
          <CustomButton
            onClick={handleConfirm}
            icon={<Check />}
            disabled={!selectedCount || !selectedStaff}
            title="Confirm Assignment"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
