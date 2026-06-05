import { apiFetch } from "../client";
import { PartnerItem } from "../types";

export const partnersService = {
  getPartners: () => apiFetch<PartnerItem[]>("partners"),
};
