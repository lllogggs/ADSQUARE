# ADSQUARE MVP (Phase 1)

한국 광고주를 위한 지도 기반 옥외광고 매체 탐색/검토/문의 서비스의 첫 번째 MVP입니다.

## 핵심 구현 범위

- 광고주 화면(`/`)
  - 지도 중심 List + Map 탐색 UI
  - 지역/유형/입지 특성 필터
  - 매체 선택 시 지도 하이라이트 + 상세 정보 패널
- 운영자 화면(`/admin/register`)
  - 지도 마커 드래그로 좌표 설정
  - Naver StreetView 연동 + `pov_changed`(heading/pitch/fov) 실시간 반영
  - 현장 사진 Supabase Storage 업로드
  - 등록 전 미리보기

## 실행 방법

```bash
npm install
cp .env.example .env
npm run dev
```

## 환경변수

- `NEXT_PUBLIC_NAVER_CLIENT_ID`: 네이버 지도 API 클라이언트 ID
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`: 업로드 버킷명(기본: `media-assets`)

## Supabase 스키마 초안

```sql
create table if not exists "Media_Assets" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  lat double precision not null,
  lng double precision not null,
  address text not null,
  dimensions text,
  price_estimate text,
  main_image_url text,
  pov_image_url text,
  description text,
  region_code text,
  created_at timestamptz default now()
);
```
