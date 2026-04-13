"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { NaverMapScript } from "@/components/naver-map-script";
import { supabase } from "@/lib/supabase-client";
import type { PovConfig } from "@/types/media";

interface FormState {
  name: string;
  type: string;
  address: string;
  dimensions: string;
  priceEstimate: string;
  description: string;
  regionCode: string;
  district: string;
  locationFeature: string;
  lat: number;
  lng: number;
  mainImageUrl: string;
}

const initialPov: PovConfig = { heading: 0, pitch: 0, fov: 90 };

export function AdminRegisterForm() {
  const mapRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const streetRef = useRef<any>(null);

  const [ready, setReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    type: "전광판",
    address: "",
    dimensions: "",
    priceEstimate: "",
    description: "",
    regionCode: "서울",
    district: "",
    locationFeature: "대로변",
    lat: 37.497942,
    lng: 127.027621,
    mainImageUrl: ""
  });
  const [pov, setPov] = useState<PovConfig>(initialPov);

  useEffect(() => {
    if (!ready || !window.naver || !mapRef.current || !panoRef.current || mapObjRef.current) return;

    const position = new window.naver.maps.LatLng(form.lat, form.lng);
    const map = new window.naver.maps.Map(mapRef.current, { center: position, zoom: 15 });
    const marker = new window.naver.maps.Marker({ position, map, draggable: true });
    const street = new window.naver.maps.StreetView(panoRef.current);

    street.setPosition(position);

    window.naver.maps.Event.addListener(marker, "dragend", () => {
      const nextPosition = marker.getPosition();
      const lat = nextPosition.y;
      const lng = nextPosition.x;
      setForm((prev) => ({ ...prev, lat, lng }));
      map.panTo(nextPosition);
      street.setPosition(nextPosition);
    });

    window.naver.maps.Event.addListener(street, "pov_changed", () => {
      const current = street.getPov();
      setPov({
        heading: Number(current.pan.toFixed(2)),
        pitch: Number(current.tilt.toFixed(2)),
        fov: Number(current.fov.toFixed(2))
      });
    });

    mapObjRef.current = map;
    markerRef.current = marker;
    streetRef.current = street;
  }, [ready, form.lat, form.lng]);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!supabase) {
      alert("Supabase 환경변수가 설정되지 않아 업로드를 진행할 수 없습니다.");
      return;
    }

    try {
      setUploading(true);
      const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "media-assets";
      const filePath = `media/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      setForm((prev) => ({ ...prev, mainImageUrl: data.publicUrl }));
    } catch (error) {
      console.error(error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const preview = useMemo(() => ({ ...form, pov }), [form, pov]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
      <NaverMapScript onReady={() => setReady(true)} />

      <section className="space-y-3 rounded-lg border bg-white p-4">
        <h2 className="text-base font-semibold">매체 등록 정보 입력</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <input placeholder="매체명" className="rounded border px-2 py-2" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <select className="rounded border px-2 py-2" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
            {["전광판", "빌보드", "버스쉘터", "지하철"].map((type) => <option key={type}>{type}</option>)}
          </select>
          <input placeholder="시/도" className="rounded border px-2 py-2" value={form.regionCode} onChange={(e) => setForm((p) => ({ ...p, regionCode: e.target.value }))} />
          <input placeholder="구/군" className="rounded border px-2 py-2" value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} />
          <input placeholder="주소" className="col-span-2 rounded border px-2 py-2" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
          <input placeholder="규격 (예: 10m x 5m)" className="rounded border px-2 py-2" value={form.dimensions} onChange={(e) => setForm((p) => ({ ...p, dimensions: e.target.value }))} />
          <input placeholder="예상 집행가" className="rounded border px-2 py-2" value={form.priceEstimate} onChange={(e) => setForm((p) => ({ ...p, priceEstimate: e.target.value }))} />
          <select className="rounded border px-2 py-2" value={form.locationFeature} onChange={(e) => setForm((p) => ({ ...p, locationFeature: e.target.value }))}>
            {["대로변", "교차로", "상권중심", "역세권"].map((feature) => <option key={feature}>{feature}</option>)}
          </select>
          <input type="file" accept="image/*" className="rounded border px-2 py-2" onChange={handleImageUpload} />
          <textarea placeholder="노출 포인트/세일즈 포인트" className="col-span-2 min-h-24 rounded border px-2 py-2" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
        </div>
        <p className="text-xs text-slate-500">지도에서 마커를 이동하면 거리뷰 위치가 함께 이동합니다. 업로드 후 public URL이 main_image_url로 저장됩니다.</p>
        <button type="button" disabled={uploading} className="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">{uploading ? "이미지 업로드 중..." : "등록 저장(데모)"}</button>
      </section>

      <section className="space-y-3">
        <div className="rounded-lg border bg-white p-3">
          <h3 className="mb-2 text-sm font-semibold">위치/시야 설정</h3>
          <div ref={mapRef} className="h-64 rounded border" />
          <div ref={panoRef} className="mt-2 h-64 rounded border" />
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded border p-2">heading: {pov.heading}</div>
            <div className="rounded border p-2">pitch: {pov.pitch}</div>
            <div className="rounded border p-2">fov: {pov.fov}</div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-3">
          <h3 className="mb-2 text-sm font-semibold">등록 전 미리보기 (광고주 화면)</h3>
          <p className="text-sm font-semibold">{preview.name || "매체명을 입력하세요"}</p>
          <p className="text-xs text-slate-600">{preview.address || "주소 정보 없음"}</p>
          <p className="mt-1 text-xs text-slate-600">유형: {preview.type} · 입지: {preview.locationFeature}</p>
          <p className="text-xs text-slate-600">좌표: {preview.lat.toFixed(6)}, {preview.lng.toFixed(6)}</p>
          <p className="text-xs text-slate-600">POV: h {preview.pov.heading} / p {preview.pov.pitch} / fov {preview.pov.fov}</p>
          {preview.mainImageUrl ? (
            <Image src={preview.mainImageUrl} alt="업로드 미리보기" width={700} height={360} className="mt-2 h-36 w-full rounded object-cover" />
          ) : (
            <div className="mt-2 rounded border border-dashed p-4 text-center text-xs text-slate-500">업로드된 현장 사진이 이 영역에 표시됩니다.</div>
          )}
          <p className="mt-2 text-xs text-slate-700">{preview.description || "노출 포인트를 입력하면 광고주에게 보이는 핵심 문구가 됩니다."}</p>
        </div>
      </section>
    </div>
  );
}
