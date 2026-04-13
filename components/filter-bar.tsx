"use client";

import { useMemo } from "react";
import { useMediaStore } from "@/store/media-store";

export function FilterBar() {
  const { assets, filters, setFilters } = useMediaStore();

  const regions = useMemo(() => ["전체", ...Array.from(new Set(assets.map((a) => a.regionCode)))], [assets]);
  const districts = useMemo(() => {
    const filtered = filters.regionCode === "전체" ? assets : assets.filter((a) => a.regionCode === filters.regionCode);
    return ["전체", ...Array.from(new Set(filtered.map((a) => a.district)))];
  }, [assets, filters.regionCode]);

  return (
    <section className="grid grid-cols-2 gap-2 rounded-lg border bg-white p-3 lg:grid-cols-4">
      <select className="rounded border px-2 py-2 text-sm" value={filters.regionCode} onChange={(e) => setFilters({ regionCode: e.target.value, district: "전체" })}>
        {regions.map((region) => <option key={region}>{region}</option>)}
      </select>
      <select className="rounded border px-2 py-2 text-sm" value={filters.district} onChange={(e) => setFilters({ district: e.target.value })}>
        {districts.map((district) => <option key={district}>{district}</option>)}
      </select>
      <select className="rounded border px-2 py-2 text-sm" value={filters.type} onChange={(e) => setFilters({ type: e.target.value as any })}>
        {["전체", "전광판", "빌보드", "버스쉘터", "지하철"].map((type) => <option key={type}>{type}</option>)}
      </select>
      <select className="rounded border px-2 py-2 text-sm" value={filters.locationFeature} onChange={(e) => setFilters({ locationFeature: e.target.value as any })}>
        {["전체", "대로변", "교차로", "상권중심", "역세권"].map((feature) => <option key={feature}>{feature}</option>)}
      </select>
    </section>
  );
}
