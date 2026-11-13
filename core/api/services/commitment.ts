import { apiFetch } from "../client";
import { CommitmentData } from "../types";

export type RawCommitmentResponse =
  | CommitmentData
  | CommitmentData[]
  | {
      commitment?: CommitmentData | CommitmentData[];
      data?: CommitmentData | CommitmentData[];
    };

export const commitmentService = {
  getCommitment: async (): Promise<CommitmentData | null> => {
    const res = await apiFetch<RawCommitmentResponse>("commitment");
    if (!res) return null;

    if (Array.isArray(res)) {
      return (res[0] as CommitmentData) ?? null;
    }

    if (
      "title" in res ||
      "badge" in res ||
      "highlight_title" in res ||
      "paragraph_1" in res ||
      "content" in res
    ) {
      return res as CommitmentData;
    }

    if ("commitment" in res && res.commitment) {
      const inner = res.commitment;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    if ("data" in res && res.data) {
      const inner = res.data;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    return null;
  },
};

