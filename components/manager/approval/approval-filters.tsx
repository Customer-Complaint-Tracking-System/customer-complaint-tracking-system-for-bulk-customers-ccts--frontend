"use client";

import React, { useState } from "react";
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

const ApprovalFilters = () => {
  const [search, setSearch] = useState("");
  const [requestType, setRequestType] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);

  const resetFilters = () => {
    setSearch("");
    setRequestType("all");
    setDateFilter("all");
    setStatusFilter("Pending");
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
            Approval requests
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Review and manage pending refund, compensation, and discount
            requests.
          </p>
        </div>

        <p className="text-xs text-slate-500">Manage approval requests</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        {/* Search */}
        <div className="min-w-0 space-y-1.5 mb-2">
          <label className={filterLabelClass}>Search requests</label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Request ID or customer name"
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              className="h-10 w-full min-w-0 border-slate-200 pl-9 text-xs focus-visible:ring-brand-accent/20"
            />
          </div>
        </div>

        {/* Request Type */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Request Type</label>

          <Select
            value={requestType}
            onValueChange={(v) => {
              if (v) handleFilterChange(setRequestType, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All request types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All request types</SelectItem>
              <SelectItem value="Refund">Refund</SelectItem>
              <SelectItem value="Compensation">Compensation</SelectItem>
              <SelectItem value="Discount">Discount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Status</label>

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              if (v) handleFilterChange(setStatusFilter, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Requested */}
        <div className="min-w-0 space-y-1.5">
          <label className={filterLabelClass}>Date requested</label>

          <Select
            value={dateFilter}
            onValueChange={(v) => {
              if (v) handleFilterChange(setDateFilter, v);
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
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

export default ApprovalFilters;
