// src/components/layout/TopBar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { createClient } from "@/lib/supabase/client";
import { Search, ChevronDown } from "lucide-react";

export default function TopBar() {
  const { profile } = useCurrentUser();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/feed?q=${encodeURIComponent(query)}`);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const name = profile?.display_name || profile?.username || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="h-[73px] border-b border-border px-6 flex items-center justify-between shrink-0">
      <form onSubmit={handleSearch} className="max-w-xs w-full relative">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="تحریریں تلاش کریں"
          className="w-full border border-border pr-9 pl-3 py-2 text-sm font-urdu focus:outline-none focus:border-ink"
        />
      </form>

      <div className="relative">
        <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans overflow-hidden relative">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              initial || "?"
            )}
          </div>
          <span className="text-sm font-urdu hidden sm:block">{name}</span>
          <ChevronDown size={14} className="text-secondary" />
        </button>

        {menuOpen && (
          <div className="absolute left-0 mt-2 w-44 border border-border bg-paper shadow-sm z-20">
            <Link href={`/u/${profile?.username}`} className="block px-4 py-3 text-sm font-urdu hover:bg-panel" onClick={() => setMenuOpen(false)}>
              میرا پروفائل
            </Link>
            <Link href="/settings" className="block px-4 py-3 text-sm font-urdu hover:bg-panel" onClick={() => setMenuOpen(false)}>
              پروفائل ترتیبات
            </Link>
            <button onClick={handleLogout} className="block w-full text-right px-4 py-3 text-sm font-urdu hover:bg-panel border-t border-border">
              لاگ آؤٹ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}