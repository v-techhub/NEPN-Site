import { apiFetch } from "../client";
import { PaginatedTestimonialsResponse } from "../types";

export const testimonialsService = {
  getTestimonials: () => apiFetch<PaginatedTestimonialsResponse>("testimonial"),
};
