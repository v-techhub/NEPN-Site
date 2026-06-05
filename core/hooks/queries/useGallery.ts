import { useQuery } from "@tanstack/react-query";
import { galleryService } from "@/core/api/services/gallery";
import { cmsKeys } from "@/core/api/query-keys";

export function useGallery() {
  return useQuery({
    queryKey: cmsKeys.gallery(),
    queryFn: () => galleryService.getGalleryItems(),
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
