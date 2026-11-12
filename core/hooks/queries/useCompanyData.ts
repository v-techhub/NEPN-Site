import { useQuery } from "@tanstack/react-query";
import { companyDataService } from "@/core/api/services/company-data";
import { cmsKeys } from "@/core/api/query-keys";

export function useCompanyData() {
  return useQuery({
    queryKey: cmsKeys.companyData(),
    queryFn: () => companyDataService.getCompanyData(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

