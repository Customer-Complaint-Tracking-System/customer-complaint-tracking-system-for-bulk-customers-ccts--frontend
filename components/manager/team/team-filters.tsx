"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CustomButton from "@/components/shared/custom-button";

export interface TeamFiltersValues {
  search: string;
  status: string;
  priority: string;
  category: string;
  assignedStaff: string;
  dateReceived?: Date;
}

interface TeamFilterssProps {
  staffMembers?: string[];
}

const TeamFilters: React.FC<TeamFilterssProps> = ({
  staffMembers = [
    "Jordan Ladipo",
    "Aanu Adeniyi",
    "Casey Patel",
    "Riley Davis",
  ],
}) => {
  const [filters, setFilters] = useState<TeamFiltersValues>({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
    assignedStaff: "all",
    dateReceived: undefined,
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const updateFilter = (
    key: keyof TeamFiltersValues,
    value: string | Date | undefined,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {};

  const handleResetFilters = () => {
    const defaultFilters: TeamFiltersValues = {
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 items-center">
          {/* Search */}
          <div className="space-y-1.5 col-span-3">
            <Label
              htmlFor="complaint-search"
              className="text-[11px] font-semibold text-slate-700"
            >
              Search Staff
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
                className="h-9 rounded-lg border-slate-200 pl-9 text-xs placeholder:text-slate-400 focus-visible:border-brand-accent focus-visible:ring-brand-accent/10"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Role
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
                <SelectItem value="all">Senior Officer</SelectItem>
                <SelectItem value="high">Support officer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="min-w-0 space-y-1.5">
            <Label className="text-[11px] font-semibold text-slate-700">
              Workload status
            </Label>

            <Select>
              <SelectTrigger className="h-9 w-full  border-slate-200 text-xs shadow-none">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apply filters */}
          <div className="mt-4">
            <CustomButton title="Apply filters" onClick={handleApplyFilters} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamFilters;
