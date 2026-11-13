import { apiFetch } from "../client";
import { HistoryMilestoneItem } from "../types";

export type RawHistoryResponse =
  | HistoryMilestoneItem[]
  | {
      history?: HistoryMilestoneItem[];
      data?: HistoryMilestoneItem[];
    };

export const historyService = {
  getHistory: async (): Promise<HistoryMilestoneItem[]> => {
    const res = await apiFetch<RawHistoryResponse>("history");
    if (!res) return [];

    let items: HistoryMilestoneItem[] = [];

    if (Array.isArray(res)) {
      items = res;
    } else if (res.history && Array.isArray(res.history)) {
      items = res.history;
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

