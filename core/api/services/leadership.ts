import { apiFetch } from "../client";
import { PaginatedLeadershipResponse } from "../types";

export const leadershipService = {
  getLeadership: () => apiFetch<PaginatedLeadershipResponse>("leadership"),
};
