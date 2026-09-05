// src/components/layout/MarketingNav.tsx
"use client";
import Link from "next/link";

export default function MarketingNav() {
  return (
    <nav className="border-b border-border px-8 py-5 flex justify-between items-center sticky top-0 bg-paper z-10">
      <Link href="/" className="text-2xl font-urdu font-bold">ہم قلم</Link>
      <div className="flex gap-3 font-urdu items-center">
<Link href="/about" className="px-4 py-2 text-sm hover:text-amber-600 transition">ہمارے بارے میں</Link>
        <Link href="/feed" className="px-4 py-2 text-sm">پڑھیں</Link>
        <Link href="/login" className="px-4 py-2 text-sm border border-ink">لاگ ان</Link>
        <Link href="/signup" className="px-4 py-2 text-sm bg-ink text-paper">اکاؤنٹ بنائیں</Link>
      </div>
    </nav>
  );
}