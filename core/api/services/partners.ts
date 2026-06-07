import { apiFetch } from "../client";
import { PaginatedPartnersResponse } from "../types";

export const partnersService = {
  getPartners: () => apiFetch<PaginatedPartnersResponse>("partners"),
};
