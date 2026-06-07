import { apiFetch } from "../client";
import { PaginatedFaqsResponse } from "../types";

export const faqsService = {
  getFaqs: () => apiFetch<PaginatedFaqsResponse>("faq"),
};
