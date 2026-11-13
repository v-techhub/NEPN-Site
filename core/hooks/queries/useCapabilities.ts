import { useQuery } from "@tanstack/react-query";
import { capabilitiesService } from "@/core/api/services/capabilities";
import { cmsKeys } from "@/core/api/query-keys";

export function useCapabilities() {
  return useQuery({
    queryKey: cmsKeys.capabilities(),
    queryFn: () => capabilitiesService.getCapabilities(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

