"use client";

import Script from "next/script";

interface Props {
  onReady: () => void;
}

export function NaverMapScript({ onReady }: Props) {
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-700">
        NEXT_PUBLIC_NAVER_CLIENT_ID가 설정되지 않아 지도 API를 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <Script
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`}
      strategy="afterInteractive"
      onReady={onReady}
    />
  );
}
