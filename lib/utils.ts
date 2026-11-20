import { StaffRole } from "@/service/profile/profile.type";
export { cn } from "cn"

export const formatStaffRole = (role: StaffRole): string => {
  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};