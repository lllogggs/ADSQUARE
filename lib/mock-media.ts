import type { MediaAsset } from "@/types/media";

export const mockMediaAssets: MediaAsset[] = [
  {
    id: "media-1",
    name: "강남역 G-라이트 전광판",
    type: "전광판",
    lat: 37.497942,
    lng: 127.027621,
    address: "서울 강남구 테헤란로 110",
    dimensions: "14m x 8m",
    priceEstimate: "월 1,200만원~",
    mainImageUrl: "https://images.unsplash.com/photo-1515432085503-cabf2dff6e9f?auto=format&fit=crop&w=1200&q=80",
    povImageUrl: "https://images.unsplash.com/photo-1520387846536-dcdf8a8f42f6?auto=format&fit=crop&w=1200&q=80",
    description: "강남역 11번 출구 동선 정면 노출. 출퇴근/심야 상권 동시 커버 가능",
    regionCode: "서울",
    district: "강남구",
    locationFeature: "교차로",
    trafficInfo: "일평균 유동인구 18만명(추정)",
    exposurePoint: "신호대기 차량 + 횡단보도 대기 인구에 반복 노출"
  },
  {
    id: "media-2",
    name: "홍대입구역 문화광장 빌보드",
    type: "빌보드",
    lat: 37.556363,
    lng: 126.923751,
    address: "서울 마포구 양화로 157",
    dimensions: "10m x 5m",
    priceEstimate: "월 850만원~",
    mainImageUrl: "https://images.unsplash.com/photo-1612969308146-d2994f6f3393?auto=format&fit=crop&w=1200&q=80",
    povImageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    description: "홍대 상권 핵심 밀집 구역. 20-30대 타겟 캠페인에 적합",
    regionCode: "서울",
    district: "마포구",
    locationFeature: "상권중심",
    trafficInfo: "주말 피크 기준 시간당 체류 인구 1.4만명(추정)",
    exposurePoint: "광장 체류형 인구 대상 장시간 시야 점유"
  },
  {
    id: "media-3",
    name: "수원역 환승센터 버스쉘터",
    type: "버스쉘터",
    lat: 37.265882,
    lng: 127.000456,
    address: "경기 수원시 팔달구 덕영대로 924",
    dimensions: "3m x 2m",
    priceEstimate: "월 280만원~",
    mainImageUrl: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1200&q=80",
    povImageUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80",
    description: "수원역 환승 대기 동선 중심. 생활밀착형 도달 효율 우수",
    regionCode: "경기",
    district: "수원시",
    locationFeature: "역세권",
    trafficInfo: "환승 이용객 일평균 8.2만명(추정)",
    exposurePoint: "대기시간 중 반복접촉으로 메시지 인지율 강화"
  }
];
