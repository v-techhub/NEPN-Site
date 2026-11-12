import { useQuery } from "@tanstack/react-query";
import { whatWeDoService } from "@/core/api/services/what-we-do";
import { cmsKeys } from "@/core/api/query-keys";

export function useWhatWeDo() {
  return useQuery({
    queryKey: cmsKeys.whatWeDo(),
    queryFn: () => whatWeDoService.getWhatWeDo(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

