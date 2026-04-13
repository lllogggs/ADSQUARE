export type MediaType = "전광판" | "빌보드" | "버스쉘터" | "지하철";
export type LocationFeature = "대로변" | "교차로" | "상권중심" | "역세권";

export interface MediaAsset {
  id: string;
  name: string;
  type: MediaType;
  lat: number;
  lng: number;
  address: string;
  dimensions: string;
  priceEstimate: string;
  mainImageUrl: string;
  povImageUrl: string;
  description: string;
  regionCode: string;
  district: string;
  locationFeature: LocationFeature;
  trafficInfo: string;
  exposurePoint: string;
}

export interface MediaFilters {
  regionCode: string;
  district: string;
  type: "전체" | MediaType;
  locationFeature: "전체" | LocationFeature;
}

export interface PovConfig {
  heading: number;
  pitch: number;
  fov: number;
}
