import { apiFetch } from "../client";
import { ValueItem } from "../types";

export type RawValuesResponse =
  | ValueItem[]
  | {
      values?: ValueItem[];
      data?: ValueItem[];
    };

export const valuesService = {
  getValues: async (): Promise<ValueItem[]> => {
    const res = await apiFetch<RawValuesResponse>("values");
    if (!res) return [];

    let items: ValueItem[] = [];

    if (Array.isArray(res)) {
      items = res;
    } else if (res.values && Array.isArray(res.values)) {
      items = res.values;
    } else if (res.data && Array.isArray(res.data)) {
      items = res.data;
    }

    if (items.length > 0) {
      return [...items].sort((a, b) => {
        if (a.order_index != null && b.order_index != null) {
          return a.order_index - b.order_index;
        }
        return a.id - b.id;
      });
    }

    return items;
  },
};

