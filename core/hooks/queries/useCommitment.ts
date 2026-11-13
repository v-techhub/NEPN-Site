import { useQuery } from "@tanstack/react-query";
import { commitmentService } from "@/core/api/services/commitment";
import { cmsKeys } from "@/core/api/query-keys";

export function useCommitment() {
  return useQuery({
    queryKey: cmsKeys.commitment(),
    queryFn: () => commitmentService.getCommitment(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

