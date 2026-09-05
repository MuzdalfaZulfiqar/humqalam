// src/components/layout/ReadingNav.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { createClient } from "@/lib/supabase/client";
import { Search, PenSquare } from "lucide-react";

export default function ReadingNav() {
  const { user, profile, loading } = useCurrentUser();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/feed?q=${encodeURIComponent(query)}`);
  }

  function handleWriteClick() {
    if (user) router.push("/write");
    else router.push("/login?returnTo=/write");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/feed";
  }

  const initial = (profile?.display_name || profile?.username || "").charAt(0).toUpperCase();

  return (
    <nav className="border-b border-border px-8 py-4 flex justify-between items-center sticky top-0 bg-paper z-10">
  {/* Logo */}
  <Link
    href="/feed"
    className="text-2xl font-urdu font-bold shrink-0"
  >
    ہم قلم
  </Link>

  {/* Right side */}
  <div className="flex items-center gap-6">
    {/* Search */}
    <form onSubmit={handleSearch} className="w-72 relative">
      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="تحریریں تلاش کریں"
        className="w-full border border-border pr-9 pl-3 py-2 text-sm font-urdu focus:outline-none focus:border-ink"
      />
    </form>

    {/* All writings */}
    <Link
      href="/feed"
      className="text-sm font-urdu hidden sm:block"
    >
      تمام تحریریں
    </Link>

    {/* Write + auth */}
    <div className="flex items-center gap-3 shrink-0">
      <button
        onClick={handleWriteClick}
        className="flex items-center gap-2 text-sm font-urdu"
      >
        <PenSquare size={16} />
        لکھیں
      </button>

      {loading ? null : user ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans overflow-hidden relative"
          >
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              initial || "?"
            )}
          </button>

          {menuOpen && (
            <div className="absolute left-0 mt-2 w-48 border border-border bg-paper shadow-sm">
              <Link
                href="/dashboard"
                className="block px-4 py-3 text-sm font-urdu hover:bg-panel"
                onClick={() => setMenuOpen(false)}
              >
                ڈیش بورڈ
              </Link>

              <Link
                href={`/u/${profile?.username}`}
                className="block px-4 py-3 text-sm font-urdu hover:bg-panel"
                onClick={() => setMenuOpen(false)}
              >
                میرا پروفائل
              </Link>

              <Link
                href="/settings"
                className="block px-4 py-3 text-sm font-urdu hover:bg-panel"
                onClick={() => setMenuOpen(false)}
              >
                ترتیبات
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-right px-4 py-3 text-sm font-urdu hover:bg-panel border-t border-border"
              >
                لاگ آؤٹ
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="px-4 py-2 text-sm border border-ink font-urdu"
          >
            لاگ ان
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 text-sm bg-ink text-paper font-urdu"
          >
            اکاؤنٹ بنائیں
          </Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
}