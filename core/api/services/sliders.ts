import { apiFetch } from "../client";
import { SliderItem } from "../types";

export const slidersService = {
  getSliders: () => apiFetch<SliderItem[]>("slider"),
};
