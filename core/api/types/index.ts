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

export interface PaginatedFaqsResponse {
  faqs: FaqItem[];
  pagination: CmsPaginationMeta;
}

export interface PartnerItem {
  id: number;
  type: string;
  logo: string;
  title: string;
  description: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedPartnersResponse {
  partners: PartnerItem[];
  pagination: CmsPaginationMeta;
}

export interface LeadershipMember {
  id: number;
  type: string;
  name: string;
  position: string;
  description: string;
  content: string;
  image?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedLeadershipResponse {
  leadership: LeadershipMember[];
  pagination: CmsPaginationMeta;
}

export interface GalleryItem extends CmsBaseEntity {
  type?: string;
  title: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  job_title: string;
  description: string;
  company_name: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedTestimonialsResponse {
  testimonials: TestimonialItem[];
  pagination: CmsPaginationMeta;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}

export interface WhatWeDoItem extends CmsBaseEntity {
  number?: number | string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyData {
  history?: string;
  mission?: string;
  values?: string;
  vision?: string;
}

export interface AboutData {
  badge?: string;
  title?: string;
  highlight_title?: string;
  paragraph_1?: string;
  paragraph_2?: string;
  paragraph_3?: string;
  paragraph_4?: string;
  content?: string;
  founded?: string;
  headquarters?: string;
  field_office?: string;
  primary_asset?: string;
}

export interface HistoryMilestoneItem extends CmsBaseEntity {
  step?: string | number;
  year: string;
  title: string;
  description?: string;
  body?: string;
  badge_color?: "green" | "blue" | "red" | string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ValueItem extends CmsBaseEntity {
  title: string;
  description: string;
  icon?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInfoData {
  phone?: string;
  email?: string;
  head_office?: string;
  secondary_phone?: string;
  secondary_email?: string;
  working_hours?: string;
}

export interface CapabilityItem extends CmsBaseEntity {
  title: string;
  description: string;
  body?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CommitmentData {
  badge?: string;
  title?: string;
  highlight_title?: string;
  paragraph_1?: string;
  paragraph_2?: string;
  paragraph_3?: string;
  content?: string;
}

export interface CommunityDevelopmentData {
  title?: string;
  subtitle?: string;
  paragraph_1?: string;
  paragraph_2?: string;
  paragraph_3?: string;
  content?: string;
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
