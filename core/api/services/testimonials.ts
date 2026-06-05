import { apiFetch } from "../client";
import { TestimonialItem } from "../types";

export const testimonialsService = {
  getTestimonials: () => apiFetch<TestimonialItem[]>("testimonial"),
};
