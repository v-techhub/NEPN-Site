// Core Types for NEPN CMS API

export interface CmsBaseEntity {
  id: number;
}

export interface CmsImageAsset {
  url: string;
  alt?: string;
}

export interface CmsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SliderItem extends CmsBaseEntity {
  title: string;
  subtitle: string;
  image: string;
  link?: string;
  badge?: string;
}

export interface PostItem extends CmsBaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: "published" | "draft";
  author_id: number;
  created_at: string;
  published_at: string;
  author_name: string;
  author_email: string;
}

export interface PaginatedPostsResponse {
  posts: PostItem[];
  pagination: CmsPaginationMeta;
}

export interface PartnerItem extends CmsBaseEntity {
  name: string;
  logo: string;
  website_url: string;
  description?: string; // Optional field used in UI
}

export interface LeadershipMember extends CmsBaseEntity {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface GalleryItem extends CmsBaseEntity {
  title: string;
  description: string;
  image: string;
}

export interface TestimonialItem extends CmsBaseEntity {
  name: string;
  designation: string;
  company: string;
  feedback: string;
  image: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  message: string;
}

export interface EmailSubmissionPayload {
  email: string;
}

export interface EmailSubmissionResponse {
  message: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "author";
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface CmsErrorPayload {
  message?: string;
  error?: string;
  details?: string;
}
