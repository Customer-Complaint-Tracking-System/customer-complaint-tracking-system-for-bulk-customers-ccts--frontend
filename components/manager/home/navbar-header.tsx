"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const pageDetails = [
  {
    url: "/manager/complaints",
    parent: "Workplace",
    title: "Complaint Inbox",
  },
  {
    url: "/manager/team",
    parent: "Workplace",
    title: "Team Management",
  },
  {
    url: "/manager/escalations",
    parent: "Workplace",
    title: "Escalations",
  },
  {
    url: "/manager/approvals",
    parent: "Workplace",
    title: "Approvals",
  },
  {
    url: "/manager/reports",
    parent: "Workplace",
    title: "Reports & Analytics",
  },
  {
    url: "/manager/customer-history",
    parent: "Workplace",
    title: "Customer History",
  },
  {
    url: "/manager/settings",
    parent: "Workplace",
    title: "Settings",
  },
];

const ManagerNavbarHeader = () => {
  const pathname = usePathname();

  if (pathname === "/manager") {
    return (
      <div className="min-w-0 space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Manager Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Welcome, Ada. Here's your team complaint overview.
        </p>
      </div>
    );
  }

  const currentPage = pageDetails.find(
    (page) => pathname === page.url || pathname.startsWith(`${page.url}/`),
  );

  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the URL segments after the parent page
  const remainingSegments = currentPage
    ? pathSegments.slice(currentPage.url.split("/").filter(Boolean).length)
    : [];

  return (
    <div className="min-w-0 space-y-1">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          {currentPage?.parent ?? "Manager"}
        </span>

        <span className="text-muted-foreground">
          <ChevronRight className="size-3" />
        </span>

        <span className="text-muted-foreground">
          {currentPage?.title ?? "Page"}
        </span>

        {remainingSegments.map((segment) => (
          <React.Fragment key={segment}>
            <span className="text-muted-foreground">
              <ChevronRight className="size-3" />
            </span>

            <span className="font-medium text-foreground">
              {decodeURIComponent(segment)}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ManagerNavbarHeader;
