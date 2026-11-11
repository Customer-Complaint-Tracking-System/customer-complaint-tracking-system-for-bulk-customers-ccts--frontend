"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronDown, Search } from "lucide-react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import CustomButton from "../custom-button";

export interface ComplaintFilterValues {
  search: string;
  status: string;
  priority: string;
  category: string;
  assignedStaff: string;
  dateReceived?: Date;
}

interface ComplaintFiltersProps {
  staffMembers?: string[];
}

const ComplaintFilters: React.FC<ComplaintFiltersProps> = ({
  staffMembers = [
    "Jordan Ladipo",
    "Aanu Adeniyi",
    "Casey Patel",
    "Riley Davis",
  ],
}) => {
  const [filters, setFilters] = useState<ComplaintFilterValues>({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
    assignedStaff: "all",
    dateReceived: undefined,
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const updateFilter = (
    key: keyof ComplaintFilterValues,
    value: string | Date | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {};

  const handleResetFilters = () => {
    const defaultFilters: ComplaintFilterValues = {
      search: "",
      status: "all",
      priority: "all",
      category: "all",
      assignedStaff: "all",
      dateReceived: undefined,
    };

    setFilters(defaultFilters);
    setSelectedDate(undefined);
  };

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-4">
      <div className="space-y-4">
        {/* Search */}
        <div className="space-y-1.5">
          <Label
            htmlFor="complaint-search"
            className="text-[11px] font-semibold text-slate-700"
          >
            Search complaints
          </Label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />

            <Input
              id="complaint-search"
              placeholder="Search by complaint ID, customer name, phone number or order ID"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilters();
                }
              }}
              className="h-9 rounded-lg border-slate-200 pl-9 text-xs placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/10"
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 items-center">
          {/* Status */}
          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Status
            </Label>

            <Select
              value={filters.status}
              onValueChange={(value) => {
                if (value) updateFilter("status", value);
              }}
            >
              <SelectTrigger className="h-9 w-full border-slate-200 text-xs shadow-none">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Priority
            </Label>

            <Select
              value={filters.priority}
              onValueChange={(value) => {
                if (value) updateFilter("priority", value);
              }}
            >
              <SelectTrigger className="h-9 w-full  border-slate-200 text-xs shadow-none">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Category
            </Label>

            <Select
              value={filters.category}
              onValueChange={(value) => {
                if (value) updateFilter("category", value);
              }}
            >
              <SelectTrigger className="h-9 w-full  border-slate-200 text-xs shadow-none">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="damaged-order">Damaged Order</SelectItem>
                <SelectItem value="missing-items">Missing Items</SelectItem>
                <SelectItem value="wrong-product">Wrong Product</SelectItem>
                <SelectItem value="late-delivery">Late Delivery</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assigned staff */}
          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Assigned staff
            </Label>

            <Select
              value={filters.assignedStaff}
              onValueChange={(value) => {
                if (value) updateFilter("assignedStaff", value);
              }}
            >
              <SelectTrigger className="h-9 w-full  border-slate-200 text-xs shadow-none">
                <SelectValue placeholder="All staff" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All staff</SelectItem>

                {staffMembers.map((staff) => (
                  <SelectItem key={staff} value={staff}>
                    {staff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date received */}
          <div className="w-full space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Date received
            </Label>

            <Popover>
              <PopoverTrigger>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 w-full justify-between border-slate-200 px-2.5 text-xs font-normal text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <CalendarDays className="size-3.5 shrink-0 text-slate-500" />

                    <span className="truncate">
                      {selectedDate
                        ? format(selectedDate, "dd MMM yyyy")
                        : "All dates"}
                    </span>
                  </span>

                  <ChevronDown className="size-3.5 shrink-0 text-slate-500" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    updateFilter("dateReceived", date);
                  }}
                  disabled={(date) => date > new Date()}
                />

                <div className="border-t border-slate-100 p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-full text-xs"
                    onClick={() => {
                      setSelectedDate(undefined);
                      updateFilter("dateReceived", undefined);
                    }}
                  >
                    Clear date
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Apply filters */}
          <div className="flex items-end gap-2">
            <CustomButton title="Apply filters" onClick={handleApplyFilters} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintFilters;
