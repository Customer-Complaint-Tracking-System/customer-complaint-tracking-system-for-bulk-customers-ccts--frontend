"use client";

import CustomButton from "@/components/shared/custom-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useState } from "react";

const EscalationFilters = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [source, setSource] = useState("all");
  const [dateRange, setDateRange] = useState("october");
  const [currentPage, setCurrentPage] = useState(1);

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setPriority("all");
    setSource("all");
    setDateRange("october");
    setCurrentPage(1);
  };

  const handleFilterChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  const filterLabelClass = "text-[11px] font-medium text-slate-500";

  const selectTriggerClass =
    "h-9 w-full min-w-0 border-slate-200 text-xs focus:ring-teal-500";

  return (
    <div className="pb-2 px-1">
      {/* Header */}
      <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Escalation queue
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Review urgent complaints and coordinate the next action.
          </p>
        </div>

        <p className="text-xs text-slate-500">48 escalations · Newest first</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]">
        {/* Search */}
        <div className="min-w-0 space-y-1.5 mb-2">
          <label className={filterLabelClass}>Search escalations</label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Escalation ID or complaint ID"
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              className="h-10 w-full min-w-0 border-slate-200 pl-9 text-xs focus-visible:ring-brand-accent/20"
            />
          </div>
        </div>

        {/* Status */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Status</label>

          <Select
            value={status}
            onValueChange={(v) => {
              if (v) handleFilterChange(setStatus, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Priority</label>

          <Select
            value={priority}
            onValueChange={(v) => {
              if (v) handleFilterChange(setPriority, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Escalated By */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Escalated By</label>

          <Select
            value={source}
            onValueChange={(v) => {
              if (v) handleFilterChange(setSource, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All sources" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Date</label>

          <Select
            value={dateRange}
            onValueChange={(v) => {
              if (v) handleFilterChange(setDateRange, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="october">1–31 Oct 2026</SelectItem>
              <SelectItem value="september">1–30 Sep 2026</SelectItem>
              <SelectItem value="august">1–31 Aug 2026</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>&nbsp;</label>

          <CustomButton
            title="Reset filters"
            onClick={resetFilters}
            className="w-full px-2 text-xs mb-2"
          />
        </div>
      </div>
    </div>
  );
};

export default EscalationFilters;
