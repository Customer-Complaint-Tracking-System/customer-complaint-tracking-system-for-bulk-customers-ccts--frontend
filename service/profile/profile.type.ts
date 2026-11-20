export type StaffRole = "STAFF" | "SENIOR_STAFF" | "MANAGER" | "ADMIN";
export type StaffAvailability = "AVAILABLE" | "BUSY" | "OFFLINE";

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  categoriesHandled: string[];
  availability: StaffAvailability;
  accountActive: boolean;
}

export interface ProfileResponse {
  data: Staff;
}
