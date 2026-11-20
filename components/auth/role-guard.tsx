"use client";

import { Suspense, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useProfileHook from "@/hooks/use-profile.hook";
import { getDashboardRoute } from "@/lib/dashboard-route";
import DashboardLoader from "@/components/shared/dashboard-loader";

interface RoleGuardProps {
  children: ReactNode;
}

const RoleGuardContent = ({ children }: RoleGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isError } = useProfileHook();

  const dashboardRoute = data ? getDashboardRoute(data.data.role) : null;

  const isAuthorized = dashboardRoute
    ? pathname === dashboardRoute || pathname.startsWith(`${dashboardRoute}/`)
    : false;

  useEffect(() => {
    if (isLoading) return;

    if (isError || !data) {
      router.replace("/auth/login");
      return;
    }

    if (!isAuthorized && dashboardRoute) {
      router.replace(dashboardRoute);
    }
  }, [isLoading, isError, data, isAuthorized, dashboardRoute, router]);

  if (isLoading || isError || !data || !isAuthorized) {
    return <DashboardLoader />;
  }

  return <>{children}</>;
};

const RoleGuard = ({ children }: RoleGuardProps) => {
  return (
    <Suspense fallback={<DashboardLoader />}>
      <RoleGuardContent>{children}</RoleGuardContent>
    </Suspense>
  );
};

export default RoleGuard;
