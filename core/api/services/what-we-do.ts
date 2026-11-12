import { apiFetch } from "../client";
import { WhatWeDoItem } from "../types";

export type WhatWeDoResponse =
  | WhatWeDoItem[]
  | { "what-we-do"?: WhatWeDoItem[]; data?: WhatWeDoItem[] };

export const whatWeDoService = {
  getWhatWeDo: async (): Promise<WhatWeDoItem[]> => {
    const res = await apiFetch<WhatWeDoResponse>("what-we-do");
    if (Array.isArray(res)) {
      return res;
    }
    if (res && Array.isArray(res["what-we-do"])) {
      return res["what-we-do"];
    }
    if (res && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  },
};

