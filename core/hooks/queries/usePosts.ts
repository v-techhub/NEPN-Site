import { useQuery } from "@tanstack/react-query";
import { postsService, GetPostsParams } from "@/core/api/services/posts";
import { cmsKeys } from "@/core/api/query-keys";

export function usePosts(params?: GetPostsParams) {
  return useQuery({
    queryKey: cmsKeys.posts(params),
    queryFn: () => postsService.getPosts(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
