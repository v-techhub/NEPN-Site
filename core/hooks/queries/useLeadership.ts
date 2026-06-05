import { useQuery } from "@tanstack/react-query";
import { leadershipService } from "@/core/api/services/leadership";
import { cmsKeys } from "@/core/api/query-keys";

export function useLeadership() {
  return useQuery({
    queryKey: cmsKeys.leadership(),
    queryFn: () => leadershipService.getLeadership(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
