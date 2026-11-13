import type { GetPostsParams } from "@/core/api/services/posts";

export const cmsKeys = {
  all: ["cms"] as const,
  sliders: () => [...cmsKeys.all, "sliders"] as const,
  posts: (params?: GetPostsParams) => [...cmsKeys.all, "posts", params ?? {}] as const,
  partners: () => [...cmsKeys.all, "partners"] as const,
  testimonials: () => [...cmsKeys.all, "testimonials"] as const,
  faqs: () => [...cmsKeys.all, "faqs"] as const,
  whatWeDo: () => [...cmsKeys.all, "what-we-do"] as const,
  companyData: () => [...cmsKeys.all, "company-data"] as const,
  about: () => [...cmsKeys.all, "about"] as const,
  history: () => [...cmsKeys.all, "history"] as const,
  values: () => [...cmsKeys.all, "values"] as const,
  capabilities: () => [...cmsKeys.all, "capabilities"] as const,
  commitment: () => [...cmsKeys.all, "commitment"] as const,
  communityDevelopment: () => [...cmsKeys.all, "community-development"] as const,
  leadership: () => [...cmsKeys.all, "leadership"] as const,
  gallery: () => [...cmsKeys.all, "gallery"] as const,
  contact: () => [...cmsKeys.all, "contact"] as const,
  contactInfo: () => [...cmsKeys.all, "contact-info"] as const,
  newsletter: () => [...cmsKeys.all, "newsletter"] as const,
} as const;
