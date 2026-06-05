import { useQuery } from "@tanstack/react-query";
import { partnersService } from "@/core/api/services/partners";
import { cmsKeys } from "@/core/api/query-keys";

export function usePartners() {
  return useQuery({
    queryKey: cmsKeys.partners(),
    queryFn: () => partnersService.getPartners(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
