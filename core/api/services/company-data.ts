import { apiFetch } from "../client";
import { CompanyData } from "../types";

export type RawCompanyDataResponse =
  | CompanyData
  | CompanyData[]
  | { "company-data"?: CompanyData | CompanyData[]; data?: CompanyData | CompanyData[] };

export const companyDataService = {
  getCompanyData: async (): Promise<CompanyData | null> => {
    const res = await apiFetch<RawCompanyDataResponse>("company-data");
    if (!res) return null;
    if (Array.isArray(res)) {
      return (res[0] as CompanyData) ?? null;
    }
    if (
      "history" in res ||
      "mission" in res ||
      "values" in res ||
      "vision" in res
    ) {
      return res as CompanyData;
    }
    if ("company-data" in res && res["company-data"]) {
      const inner = res["company-data"];
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }
    if ("data" in res && res.data) {
      const inner = res.data;
      return Array.isArray(inner) ? (inner[0] ?? null) : inner;
    }
    return null;
  },
};
