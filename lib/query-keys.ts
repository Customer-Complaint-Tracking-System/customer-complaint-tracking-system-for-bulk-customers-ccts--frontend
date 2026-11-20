export const queryKeys = {
  profile: {
    root: ["PROFILE"] as const,
    detail: () => ["PROFILE", "DETAIL"] as const,
  },

  staff: {
    root: ["STAFF"] as const,
    lists: () => ["STAFF", "LIST"] as const,
    list: (filters: object) => ["STAFF", "LIST", filters] as const,
    details: () => ["STAFF", "DETAIL"] as const,
    detail: (id: string) => ["STAFF", "DETAIL", id] as const,
  },

  complaints: {
    root: ["COMPLAINTS"] as const,
    lists: () => ["COMPLAINTS", "LIST"] as const,
    list: (filters: object) => ["COMPLAINTS", "LIST", filters] as const,
    detail: (id: string) => ["COMPLAINTS", "DETAIL", id] as const,
  },
};
