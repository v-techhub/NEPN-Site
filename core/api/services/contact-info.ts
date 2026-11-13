import { apiFetch } from "../client";
import { ContactInfoData } from "../types";

export type RawContactInfoResponse =
  | ContactInfoData
  | ContactInfoData[]
  | {
      "contact-info"?: ContactInfoData | ContactInfoData[];
      data?: ContactInfoData | ContactInfoData[];
    };

export const contactInfoService = {
  getContactInfo: async (): Promise<ContactInfoData | null> => {
    const res = await apiFetch<RawContactInfoResponse>("contact-info");
    if (!res) return null;

    if (Array.isArray(res)) {
      return (res[0] as ContactInfoData) ?? null;
    }

    if (
      "phone" in res ||
      "email" in res ||
      "head_office" in res ||
      "secondary_phone" in res
    ) {
      return res as ContactInfoData;
    }

    if ("contact-info" in res && res["contact-info"]) {
      const inner = res["contact-info"];
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    if ("data" in res && res.data) {
      const inner = res.data;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }

    return null;
  },
};

