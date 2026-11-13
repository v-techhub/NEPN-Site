import { useQuery } from "@tanstack/react-query";
import { communityDevelopmentService } from "@/core/api/services/community-development";
import { cmsKeys } from "@/core/api/query-keys";

export function useCommunityDevelopment() {
  return useQuery({
    queryKey: cmsKeys.communityDevelopment(),
    queryFn: () => communityDevelopmentService.getCommunityDevelopment(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

