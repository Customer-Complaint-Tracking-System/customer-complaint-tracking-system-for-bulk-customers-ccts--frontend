import { queryKeys } from "@/lib/query-keys";
import { getProfile } from "@/service/profile/profile.service";
import { ProfileResponse } from "@/service/profile/profile.type";
import { useQuery } from "@tanstack/react-query";

const useProfileHook = () => {
  return useQuery<ProfileResponse>({
    queryKey: queryKeys.profile.root,
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
  });
};

export default useProfileHook;
