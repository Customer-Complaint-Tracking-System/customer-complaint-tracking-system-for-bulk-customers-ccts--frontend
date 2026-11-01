"use client";

import {
  History,
  Inbox,
  LayoutDashboard,
  Settings,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CCTSLogo from "@/components/shared/ccts-logo";
import UserProfile from "@/components/shared/user-profile";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/staff",
    icon: LayoutDashboard,
  },
  {
    title: "Complaint Inbox",
    url: "/staff/complaints",
    icon: Inbox,
  },
//   {
//     title: "Team Management",
//     url: "/staff/team",
//     icon: Users,
//   },
  // {
  //   title: "Escalations",
  //   url: "/staff/escalations",
  //   icon: ArrowUpRight,
  // },
  // {
  //   title: "Approvals",
  //   url: "/staff/approvals",
  //   icon: ClipboardCheck,
  // },
  // {
  //   title: "Reports & Analytics",
  //   url: "/staff/reports",
  //   icon: ChartNoAxesCombined,
  // },
//   {
//     title: "Customer History",
//     url: "/staff/customer-history",
//     icon: History,
//   },
  {
    title: "Settings",
    url: "/staff/settings",
    icon: Settings,
  },
];

const StaffDashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-primary [&_[data-sidebar=sidebar]]:bg-primary">
      <SidebarHeader>
        <CCTSLogo />
      </SidebarHeader>

      <div className="px-4 py-2">
        <SidebarSeparator className="text-[#5D6B68] opacity-10" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/staff" &&
                    pathname.startsWith(`${item.url}/`));

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "py-4 min-h-10 transition-colors duration-200 hover:bg-brand-accent",
                        "hover:[&>a>svg]:text-white [&>a>svg]:text-[#94A3B8] hover:text-white",
                        isActive
                          ? "bg-brand-accent! text-white! [&>a>svg]:text-white"
                          : "text-brand-text-gray",
                      )}
                    >
                      <Link href={item.url} className="flex gap-2 items-center">
                        <item.icon className="size-5! shrink-0 transition-colors duration-200" />

                        <span className="text-sm font-medium tracking-tight">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserProfile
          fullname="Lady Precious"
          role="staff"
          side="right"
          sidebar
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default StaffDashboardSidebar;
