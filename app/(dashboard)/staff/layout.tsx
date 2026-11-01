import StaffDashbaordSidebar from "@/components/staff/home/dashboard-sidebar";
import StaffNavbar from "@/components/staff/home/staff-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren, Suspense } from "react";

const StaffRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <Suspense fallback={<div className="w-64 bg-primary" />}>
        <StaffDashbaordSidebar />
      </Suspense>
      <main className="flex flex-col gap-5 min-h-screen w-screen bg-muted">
        <StaffNavbar />
        <div className="px-5 flex-1 pb-10">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default StaffRootLayout;
