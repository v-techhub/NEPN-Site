import { useQuery } from "@tanstack/react-query";
import { valuesService } from "@/core/api/services/values";
import { cmsKeys } from "@/core/api/query-keys";

export function useValues() {
  return useQuery({
    queryKey: cmsKeys.values(),
    queryFn: () => valuesService.getValues(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

