import ManagerDashbaordSidebar from "@/components/manager/home/dashbaord-sidebar";
import ManagerNavbar from "@/components/manager/home/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren, Suspense } from "react";

const ManagerRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <Suspense fallback={<div className="w-64 bg-primary" />}>
        <ManagerDashbaordSidebar />
      </Suspense>
      <main className="flex flex-col gap-5 h-full w-screen">
        <Suspense>
          <ManagerNavbar />
        </Suspense>
        <div className="px-5 flex-1 pb-10">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default ManagerRootLayout;
