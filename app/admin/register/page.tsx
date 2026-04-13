import Link from "next/link";
import { AdminRegisterForm } from "@/components/admin-register-form";

export default function AdminRegisterPage() {
  return (
    <main className="mx-auto max-w-[1800px] space-y-4 p-4">
      <header className="flex items-center justify-between rounded-lg border bg-white px-4 py-3">
        <div>
          <h1 className="text-lg font-bold">ADSQUARE 관리자 매체 등록</h1>
          <p className="text-sm text-slate-600">지도/거리뷰 기반으로 광고주가 신뢰할 수 있는 매체 정보를 등록하세요.</p>
        </div>
        <Link href="/" className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-slate-50">광고주 탐색 화면으로</Link>
      </header>

      <AdminRegisterForm />
    </main>
  );
}
