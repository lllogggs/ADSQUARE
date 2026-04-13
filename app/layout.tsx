import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADSQUARE | 옥외광고 매체 탐색",
  description: "지도 기반 OOH 매체 탐색/검토/문의 플랫폼"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
