import { apiFetch } from "../client";
import { AboutData } from "../types";

export type RawAboutResponse =
  | AboutData
  | AboutData[]
  | { about?: AboutData | AboutData[]; data?: AboutData | AboutData[] };

export const aboutService = {
  getAbout: async (): Promise<AboutData | null> => {
    const res = await apiFetch<RawAboutResponse>("about");
    if (!res) return null;

    if (Array.isArray(res)) {
      return (res[0] as AboutData) ?? null;
    }

    if (
      "title" in res ||
      "badge" in res ||
      "highlight_title" in res ||
      "paragraph_1" in res ||
      "content" in res ||
      "founded" in res
    ) {
      return res as AboutData;
    }

    if ("about" in res && res.about) {
      const inner = res.about;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    if ("data" in res && res.data) {
      const inner = res.data;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    return null;
  },
};

