import { useQuery } from "@tanstack/react-query";
import { aboutService } from "@/core/api/services/about";
import { cmsKeys } from "@/core/api/query-keys";

export function useAbout() {
  return useQuery({
    queryKey: cmsKeys.about(),
    queryFn: () => aboutService.getAbout(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

