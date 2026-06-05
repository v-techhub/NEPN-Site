import { apiFetch } from "../client";
import { PaginatedPostsResponse } from "../types";

export interface GetPostsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export const postsService = {
  getPosts: (params?: GetPostsParams) => {
    return apiFetch<PaginatedPostsResponse>("posts", {
      query: {
        page: params?.page,
        limit: params?.limit,
        status: params?.status,
      },
    });
  },
};
