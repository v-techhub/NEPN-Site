import { apiFetch } from "../client";
import { LeadershipMember } from "../types";

export const leadershipService = {
  getLeadership: () => apiFetch<LeadershipMember[]>("leadership"),
};
