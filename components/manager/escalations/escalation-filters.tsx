"use client"
import { Button } from "@/components/ui/button";
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

  return (
    <div className="px-4 pb-4">
      <div className="p-4 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Escalation queue
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review urgent complaints and coordinate the next action.
          </p>
        </div>

        <p className="text-xs text-slate-500">48 escalations · Newest first</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.1fr_1.3fr_auto] gap-2 items-end">
        {/* Search */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500">
            Search escalations
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Escalation ID or complaint ID"
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              className="h-8 pl-9 text-xs border-slate-200 focus-visible:ring-teal-500"
            />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500">
            Status
          </label>
          <Select
            value={status}
            onValueChange={(v) => {
              if (v) {
                handleFilterChange(setStatus, v);
              }
            }}
          >
            <SelectTrigger className="h-8 text-xs border-slate-200">
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
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500">
            Priority
          </label>
          <Select
            value={priority}
            onValueChange={(v) => {
              if (v) {
                handleFilterChange(setPriority, v);
              }
            }}
          >
            <SelectTrigger className="h-8 text-xs border-slate-200">
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

        {/* Source */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500">
            Escalated By
          </label>
          <Select
            value={source}
            onValueChange={(v) => {
              if (v) {
                handleFilterChange(setSource, v);
              }
            }}
          >
            <SelectTrigger className="h-8 text-xs border-slate-200">
              <SelectValue placeholder="All sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date range */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-500">Date</label>
          <Select
            value={dateRange}
            onValueChange={(v) => {
              if (v) {
                handleFilterChange(setDateRange, v);
              }
            }}
          >
            <SelectTrigger className="h-8 text-xs border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="october">1–31 Oct 2026</SelectItem>
              <SelectItem value="september">1–30 Sep 2026</SelectItem>
              <SelectItem value="august">1–31 Aug 2026</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          onClick={resetFilters}
          className="h-8 text-xs text-slate-500 hover:text-teal-700"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EscalationFilters;
