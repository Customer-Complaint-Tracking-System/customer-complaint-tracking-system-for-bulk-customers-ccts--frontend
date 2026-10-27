import ManagerDashbaordSidebar from "@/components/manager/home/dashbaord-sidebar";
import ManagerNavbar from "@/components/manager/home/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

const ManagerRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <ManagerDashbaordSidebar />
      <main className="flex flex-col gap-5 min-h-screen w-screen bg-muted">
        <ManagerNavbar />
        <div className="px-5 flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ManagerRootLayout;
