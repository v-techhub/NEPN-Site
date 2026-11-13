import { apiFetch } from "../client";
import { CapabilityItem } from "../types";

export type RawCapabilitiesResponse =
  | CapabilityItem[]
  | {
      capabilities?: CapabilityItem[];
      data?: CapabilityItem[];
    };

export const capabilitiesService = {
  getCapabilities: async (): Promise<CapabilityItem[]> => {
    const res = await apiFetch<RawCapabilitiesResponse>("capabilities");
    if (!res) return [];

    let items: CapabilityItem[] = [];

    if (Array.isArray(res)) {
      items = res;
    } else if (res.capabilities && Array.isArray(res.capabilities)) {
      items = res.capabilities;
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

