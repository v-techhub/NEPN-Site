import { apiFetch } from "../client";
import { CommunityDevelopmentData } from "../types";

export type RawCommunityDevelopmentResponse =
  | CommunityDevelopmentData
  | CommunityDevelopmentData[]
  | {
      "community-development"?:
        | CommunityDevelopmentData
        | CommunityDevelopmentData[];
      data?: CommunityDevelopmentData | CommunityDevelopmentData[];
    };

export const communityDevelopmentService = {
  getCommunityDevelopment:
    async (): Promise<CommunityDevelopmentData | null> => {
      const res = await apiFetch<RawCommunityDevelopmentResponse>(
        "community-development",
      );
      if (!res) return null;

      if (Array.isArray(res)) {
        return (res[0] as CommunityDevelopmentData) ?? null;
      }

      if (
        "title" in res ||
        "subtitle" in res ||
        "paragraph_1" in res ||
        "content" in res
      ) {
        return res as CommunityDevelopmentData;
      }

      if ("community-development" in res && res["community-development"]) {
        const inner = res["community-development"];
        return Array.isArray(inner) ? (inner[0] ?? null) : inner;
      }

      if ("data" in res && res.data) {
        const inner = res.data;
        return Array.isArray(inner) ? (inner[0] ?? null) : inner;
      }

      return null;
    },
};

