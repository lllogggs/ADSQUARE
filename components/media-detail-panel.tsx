"use client";

import Image from "next/image";
import { useMediaStore } from "@/store/media-store";

export function MediaDetailPanel() {
  const { assets, selectedMediaId } = useMediaStore();
  const selected = assets.find((asset) => asset.id === selectedMediaId);

  if (!selected) {
    return <section className="rounded-lg border bg-white p-4 text-sm text-slate-500">매체를 선택하면 상세 정보가 표시됩니다.</section>;
  }

  return (
    <section className="space-y-3 rounded-lg border bg-white p-4">
      <h2 className="text-base font-semibold">{selected.name}</h2>
      <p className="text-sm text-slate-600">{selected.address}</p>
      <div className="grid grid-cols-2 gap-2">
        <Image src={selected.mainImageUrl} alt="매체 대표 이미지" width={600} height={380} className="h-32 w-full rounded-md object-cover" />
        <Image src={selected.povImageUrl} alt="POV 이미지" width={600} height={380} className="h-32 w-full rounded-md object-cover" />
      </div>
      <div className="rounded bg-slate-50 p-3 text-sm">
        <p className="font-semibold">노출 포인트</p>
        <p className="mt-1 text-slate-600">{selected.exposurePoint}</p>
        <p className="mt-2 text-slate-600">{selected.trafficInfo}</p>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded border p-2"><dt className="text-xs text-slate-500">규격</dt><dd className="font-medium">{selected.dimensions}</dd></div>
        <div className="rounded border p-2"><dt className="text-xs text-slate-500">예상 집행가</dt><dd className="font-medium">{selected.priceEstimate}</dd></div>
      </dl>
      <button type="button" className="w-full rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900">이 매체 문의하기</button>
    </section>
  );
}
