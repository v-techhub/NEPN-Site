import { useQuery } from "@tanstack/react-query";
import { contactInfoService } from "@/core/api/services/contact-info";
import { cmsKeys } from "@/core/api/query-keys";

export function useContactInfo() {
  return useQuery({
    queryKey: cmsKeys.contactInfo(),
    queryFn: () => contactInfoService.getContactInfo(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

