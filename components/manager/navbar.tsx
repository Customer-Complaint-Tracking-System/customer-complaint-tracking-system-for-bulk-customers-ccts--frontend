"use client";

import Notification from "./notification";
import UserProfile from "../shared/user-profile";
import ComplaintDateSelector from "./complaint-date-selector";

const ManagerNavbar = () => {
  return (
    <header className="flex w-full flex-col gap-5 border-b border-border/60 bg-background px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      {/* Page heading */}
      <div className="min-w-0 space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Manager Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Welcome, Ada. Here's your team complaint overview.
        </p>
      </div>

      {/* Navbar actions */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 sm:flex-none">
          <ComplaintDateSelector />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Notification />

          <div className="ml-1 border-l border-border pl-3 sm:pl-4">
            <UserProfile
              role="manager"
              fullname="Chukwu Sabastine"
              side="bottom"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManagerNavbar;
