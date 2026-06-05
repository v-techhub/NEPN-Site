import { useQuery } from "@tanstack/react-query";
import { testimonialsService } from "@/core/api/services/testimonials";
import { cmsKeys } from "@/core/api/query-keys";

export function useTestimonials() {
  return useQuery({
    queryKey: cmsKeys.testimonials(),
    queryFn: () => testimonialsService.getTestimonials(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
