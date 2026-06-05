import { apiFetch } from "../client";
import { GalleryItem } from "../types";

export const galleryService = {
  getGalleryItems: () => apiFetch<GalleryItem[]>("gallery"),
};
