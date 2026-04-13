"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { filterAssets, useMediaStore } from "@/store/media-store";
import { NaverMapScript } from "@/components/naver-map-script";

export function MediaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const naverMapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [ready, setReady] = useState(false);
  const { assets, filters, selectedMediaId, selectMedia } = useMediaStore();
  const filtered = useMemo(() => filterAssets(assets, filters), [assets, filters]);

  useEffect(() => {
    if (!ready || !mapRef.current || !window.naver || naverMapRef.current) return;

    naverMapRef.current = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.497942, 127.027621),
      zoom: 12
    });
  }, [ready]);

  useEffect(() => {
    if (!naverMapRef.current || !window.naver) return;

    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    markersRef.current = {};

    filtered.forEach((asset) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(asset.lat, asset.lng),
        map: naverMapRef.current,
        title: asset.name
      });

      window.naver.maps.Event.addListener(marker, "click", () => selectMedia(asset.id));
      markersRef.current[asset.id] = marker;
    });
  }, [filtered, selectMedia]);

  useEffect(() => {
    if (!naverMapRef.current || !selectedMediaId || !window.naver) return;
    const selected = assets.find((item) => item.id === selectedMediaId);
    if (!selected) return;

    naverMapRef.current.panTo(new window.naver.maps.LatLng(selected.lat, selected.lng));

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      marker.setAnimation(id === selectedMediaId ? window.naver.maps.Animation.BOUNCE : null);
    });
  }, [assets, selectedMediaId]);

  return (
    <section className="relative h-[calc(100vh-210px)] overflow-hidden rounded-lg border bg-slate-100">
      <NaverMapScript onReady={() => setReady(true)} />
      <div ref={mapRef} className="h-full w-full" />
    </section>
  );
}
