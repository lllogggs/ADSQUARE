"use client";

import { useMemo } from "react";
import { filterAssets, useMediaStore } from "@/store/media-store";

export function MediaList() {
  const { assets, filters, selectedMediaId, selectMedia } = useMediaStore();
  const filtered = useMemo(() => filterAssets(assets, filters), [assets, filters]);

  return (
    <aside className="h-[calc(100vh-210px)] overflow-y-auto rounded-lg border bg-white">
      <div className="border-b px-4 py-3 text-sm text-slate-600">검색 결과 {filtered.length}개</div>
      <ul className="space-y-2 p-3">
        {filtered.map((asset) => (
          <li key={asset.id}>
            <button
              type="button"
              onClick={() => selectMedia(asset.id)}
              className={`w-full rounded-lg border p-3 text-left transition ${selectedMediaId === asset.id ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-500"}`}
            >
              <p className="text-sm font-semibold">{asset.name}</p>
              <p className="mt-1 text-xs text-slate-500">{asset.address}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="rounded bg-slate-100 px-2 py-1">{asset.type}</span>
                <span className="font-medium text-brand-700">{asset.priceEstimate}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
