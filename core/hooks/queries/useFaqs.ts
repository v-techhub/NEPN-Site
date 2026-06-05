import { useQuery } from "@tanstack/react-query";
import { faqsService } from "@/core/api/services/faqs";
import { cmsKeys } from "@/core/api/query-keys";

export function useFaqs() {
  return useQuery({
    queryKey: cmsKeys.faqs(),
    queryFn: () => faqsService.getFaqs(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
