"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownWideNarrow,
  Mail,
  Phone,
  Search,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Customer {
  id: string;
  customerId: string;
  fullname: string;
  email: string;
  phone: string;
  totalComplaints: number;
  openComplaints: number;
  resolvedComplaints: number;
  lastComplaint: string;
  dateJoined: string;
}

interface CustomerHistoryTableProps {
  customers?: Customer[];
  onCustomerClick?: (customer: Customer) => void;
}

const defaultCustomers: Customer[] = [
  {
    id: "1",
    customerId: "CCTS-CUS-001",
    fullname: "Emuru Chioma",
    email: "chioma.emuru@example.com",
    phone: "+234 801 234 5678",
    totalComplaints: 12,
    openComplaints: 2,
    resolvedComplaints: 10,
    lastComplaint: "7 Oct 2026",
    dateJoined: "12 Jan 2026",
  },
  {
    id: "2",
    customerId: "CCTS-CUS-002",
    fullname: "Taylor Brooks",
    email: "taylor.brooks@example.com",
    phone: "+234 802 345 6789",
    totalComplaints: 8,
    openComplaints: 1,
    resolvedComplaints: 7,
    lastComplaint: "7 Oct 2026",
    dateJoined: "20 Feb 2026",
  },
  {
    id: "3",
    customerId: "CCTS-CUS-003",
    fullname: "Sam Rivera",
    email: "sam.rivera@example.com",
    phone: "+234 803 456 7890",
    totalComplaints: 15,
    openComplaints: 3,
    resolvedComplaints: 12,
    lastComplaint: "6 Oct 2026",
    dateJoined: "15 Mar 2026",
  },
  {
    id: "4",
    customerId: "CCTS-CUS-004",
    fullname: "Amoo Rachael",
    email: "rachael.amoo@example.com",
    phone: "+234 804 567 8901",
    totalComplaints: 5,
    openComplaints: 0,
    resolvedComplaints: 5,
    lastComplaint: "4 Oct 2026",
    dateJoined: "8 Apr 2026",
  },
  {
    id: "5",
    customerId: "CCTS-CUS-005",
    fullname: "Joseph Amaka",
    email: "joseph.amaka@example.com",
    phone: "+234 805 678 9012",
    totalComplaints: 9,
    openComplaints: 2,
    resolvedComplaints: 7,
    lastComplaint: "3 Oct 2026",
    dateJoined: "10 May 2026",
  },
  {
    id: "6",
    customerId: "CCTS-CUS-006",
    fullname: "Amiru Mohammed",
    email: "amiru.mohammed@example.com",
    phone: "+234 806 789 0123",
    totalComplaints: 6,
    openComplaints: 0,
    resolvedComplaints: 6,
    lastComplaint: "1 Oct 2026",
    dateJoined: "18 Jun 2026",
  },
  {
    id: "7",
    customerId: "CCTS-CUS-007",
    fullname: "Jamie Chen",
    email: "jamie.chen@example.com",
    phone: "+234 807 890 1234",
    totalComplaints: 3,
    openComplaints: 1,
    resolvedComplaints: 2,
    lastComplaint: "29 Sep 2026",
    dateJoined: "22 Jul 2026",
  },
  {
    id: "8",
    customerId: "CCTS-CUS-008",
    fullname: "Riley Morgan",
    email: "riley.morgan@example.com",
    phone: "+234 808 901 2345",
    totalComplaints: 11,
    openComplaints: 0,
    resolvedComplaints: 11,
    lastComplaint: "25 Sep 2026",
    dateJoined: "10 Aug 2026",
  },
];

const CustomerHistoryTable: React.FC<CustomerHistoryTableProps> = ({
  customers = defaultCustomers,
  onCustomerClick,
}) => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [pageSize, setPageSize] = useState("5");
  const [currentPage, setCurrentPage] = useState(1);

  // Search customers
  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase();

    return (
      customer.fullname.toLowerCase().includes(searchValue) ||
      customer.customerId.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue)
    );
  });

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortOrder) {
      case "oldest":
        return a.dateJoined.localeCompare(b.dateJoined);

      case "complaints":
        return b.totalComplaints - a.totalComplaints;

      case "name":
        return a.fullname.localeCompare(b.fullname);

      default:
        return b.dateJoined.localeCompare(a.dateJoined);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / Number(pageSize));

  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize),
  );

  const startItem =
    sortedCustomers.length === 0 ? 0 : (currentPage - 1) * Number(pageSize) + 1;

  const endItem = Math.min(
    currentPage * Number(pageSize),
    sortedCustomers.length,
  );

  const handleCustomerClick = (customer: Customer) => {
    if (onCustomerClick) {
      onCustomerClick(customer);
      return;
    }

    router.push(`/manager/customers/${customer.id}`);
  };

  return (
    <section className="w-full space-y-4">
      {/* Search and sorting */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search by name, customer ID, email or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 rounded-lg border-slate-200 pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowDownWideNarrow className="size-4 text-slate-500" />

          <Select
            value={sortOrder}
            onValueChange={(value) => {
              if (value) {
                setSortOrder(value);
                setCurrentPage(1);
              }
            }}
          >
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">Recently joined</SelectItem>
              <SelectItem value="oldest">Oldest customers</SelectItem>
              <SelectItem value="complaints">Most complaints</SelectItem>
              <SelectItem value="name">Name: A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Customers table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <Table className="min-w-[1050px]">
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
              {[
                "Customer ID",
                "Customer",
                "Total complaints",
                "Open",
                "Resolved",
                "Last complaint",
                "Customer since",
              ].map((heading) => (
                <TableHead
                  key={heading}
                  className="whitespace-nowrap px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                tabIndex={0}
                role="link"
                aria-label={`View ${customer.fullname}'s details`}
                onClick={() => handleCustomerClick(customer)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCustomerClick(customer);
                  }
                }}
                className="cursor-pointer border-slate-200 odd:bg-slate-50/60 transition-colors hover:bg-emerald-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
              >
                {/* Customer ID */}
                <TableCell className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-slate-800">
                  {customer.customerId}
                </TableCell>

                {/* Customer details */}
                <TableCell className="px-3 py-3">
                  <div className="space-y-1">
                    <p className="whitespace-nowrap text-xs font-semibold text-slate-800">
                      {customer.fullname}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Mail className="size-3" />
                      {customer.email}
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <Phone className="size-3" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>

                {/* Total complaints */}
                <TableCell className="px-3 py-3">
                  <span className="text-xs font-semibold text-slate-800">
                    {customer.totalComplaints}
                  </span>
                </TableCell>

                {/* Open complaints */}
                <TableCell className="px-3 py-3">
                  <span className="inline-flex min-w-7 justify-center rounded-full bg-orange-50 px-2 py-1 text-[10px] font-semibold text-orange-700">
                    {customer.openComplaints}
                  </span>
                </TableCell>

                {/* Resolved complaints */}
                <TableCell className="px-3 py-3">
                  <span className="inline-flex min-w-7 justify-center rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                    {customer.resolvedComplaints}
                  </span>
                </TableCell>

                {/* Last complaint */}
                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {customer.lastComplaint}
                </TableCell>

                {/* Date joined */}
                <TableCell className="whitespace-nowrap px-3 py-3 text-xs text-slate-700">
                  {customer.dateJoined}
                </TableCell>
              </TableRow>
            ))}

            {paginatedCustomers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-28 text-center text-sm text-slate-500"
                >
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          Showing {startItem}–{endItem} of {sortedCustomers.length} customers
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

export default CustomerHistoryTable;
