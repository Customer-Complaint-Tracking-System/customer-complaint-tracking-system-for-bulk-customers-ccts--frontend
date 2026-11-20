import { StaffRole } from "@/service/profile/profile.type";

export const getDashboardRoute = (role: StaffRole): string => {
  const routes: Record<StaffRole, string> = {
    STAFF: "/staff",
    SENIOR_STAFF: "/staff",
    MANAGER: "/manager",
    ADMIN: "/manager",
  };

  return routes[role];
};
