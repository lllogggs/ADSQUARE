import Link from "next/link";
import { FilterBar } from "@/components/filter-bar";
import { MediaDetailPanel } from "@/components/media-detail-panel";
import { MediaList } from "@/components/media-list";
import { MediaMap } from "@/components/media-map";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1800px] space-y-3 p-4">
      <header className="flex items-center justify-between rounded-lg border bg-white px-4 py-3">
        <div>
          <h1 className="text-lg font-bold">ADSQUARE 매체 찾기</h1>
          <p className="text-sm text-slate-600">지도에서 위치를 확인하고, 노출 맥락을 비교해 바로 문의하세요.</p>
        </div>
        <Link href="/admin/register" className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-slate-50">운영자 등록 페이지</Link>
      </header>

      <FilterBar />

      <div className="grid gap-3 xl:grid-cols-[360px_1fr_380px]">
        <MediaList />
        <MediaMap />
        <MediaDetailPanel />
      </div>
    </main>
  );
}
