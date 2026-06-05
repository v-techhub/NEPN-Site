import { useQuery } from "@tanstack/react-query";
import { slidersService } from "@/core/api/services/sliders";
import { cmsKeys } from "@/core/api/query-keys";

export function useSliders() {
  return useQuery({
    queryKey: cmsKeys.sliders(),
    queryFn: () => slidersService.getSliders(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
