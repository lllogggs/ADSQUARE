import { create } from "zustand";
import { mockMediaAssets } from "@/lib/mock-media";
import type { MediaAsset, MediaFilters } from "@/types/media";

interface MediaState {
  filters: MediaFilters;
  selectedMediaId: string;
  assets: MediaAsset[];
  setFilters: (next: Partial<MediaFilters>) => void;
  selectMedia: (mediaId: string) => void;
}

const defaultFilters: MediaFilters = {
  regionCode: "전체",
  district: "전체",
  type: "전체",
  locationFeature: "전체"
};

export const useMediaStore = create<MediaState>((set) => ({
  filters: defaultFilters,
  selectedMediaId: mockMediaAssets[0]?.id ?? "",
  assets: mockMediaAssets,
  setFilters: (next) => set((state) => ({ filters: { ...state.filters, ...next } })),
  selectMedia: (mediaId) => set({ selectedMediaId: mediaId })
}));

export const filterAssets = (assets: MediaAsset[], filters: MediaFilters) => {
  return assets.filter((asset) => {
    const matchRegion = filters.regionCode === "전체" || asset.regionCode === filters.regionCode;
    const matchDistrict = filters.district === "전체" || asset.district === filters.district;
    const matchType = filters.type === "전체" || asset.type === filters.type;
    const matchFeature = filters.locationFeature === "전체" || asset.locationFeature === filters.locationFeature;

    return matchRegion && matchDistrict && matchType && matchFeature;
  });
};
