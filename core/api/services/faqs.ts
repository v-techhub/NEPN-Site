import { apiFetch } from "../client";
import { FaqItem } from "../types";

export const faqsService = {
  getFaqs: () => apiFetch<FaqItem[]>("faq"),
};
