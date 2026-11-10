import { apiFetch } from "../client";
import { GalleryItem } from "../types";

type GalleryRecord = Omit<GalleryItem, "title" | "description"> & {
  title?: string | null;
  description?: string | null;
};
type GalleryResponse = { gallery: GalleryRecord[] } | GalleryRecord[];

export const galleryService = {
  getGalleryItems: async (): Promise<GalleryItem[]> => {
    const response = await apiFetch<GalleryResponse>("gallery");
    const records = Array.isArray(response) ? response : response?.gallery;
    if (!Array.isArray(records)) {
      throw new Error("Unable to load gallery images. Please try again.");
    }
    return records
      .filter((item) => typeof item.image === "string" && item.image.trim())
      .map((item) => ({
        ...item,
        title: item.title?.trim() || "NEPN gallery image",
        description: item.description || "",
      }));
  },
};
