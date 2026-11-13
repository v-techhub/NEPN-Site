import { useQuery } from "@tanstack/react-query";
import { historyService } from "@/core/api/services/history";
import { cmsKeys } from "@/core/api/query-keys";

export function useHistory() {
  return useQuery({
    queryKey: cmsKeys.history(),
    queryFn: () => historyService.getHistory(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

