import type { GetPostsParams } from "@/core/api/services/posts";

export const cmsKeys = {
  all: ["cms"] as const,
  sliders: () => [...cmsKeys.all, "sliders"] as const,
  posts: (params?: GetPostsParams) => [...cmsKeys.all, "posts", params ?? {}] as const,
  partners: () => [...cmsKeys.all, "partners"] as const,
  testimonials: () => [...cmsKeys.all, "testimonials"] as const,
  faqs: () => [...cmsKeys.all, "faqs"] as const,
  leadership: () => [...cmsKeys.all, "leadership"] as const,
  gallery: () => [...cmsKeys.all, "gallery"] as const,
  contact: () => [...cmsKeys.all, "contact"] as const,
  newsletter: () => [...cmsKeys.all, "newsletter"] as const,
} as const;
