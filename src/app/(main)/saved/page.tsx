// src/app/(main)/saved/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { createClient } from "@/lib/supabase/client";

interface SavedPost {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
  profiles?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

function Avatar({ url, name, size = 24 }: { url: string | null; name: string; size?: number }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-ink text-paper flex items-center justify-center text-xs font-sans overflow-hidden relative shrink-0 ring-1 ring-border/30"
    >
      {url ? <Image src={url} alt={name} fill className="object-cover" /> : initial}
    </div>
  );
}

export default function SavedPage() {
  const { user, loading } = useCurrentUser();
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("saved_posts")
      .select("post_id, posts(id, title, slug, cover_image, created_at, profiles(username, display_name, avatar_url))")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data?.map((d: any) => d.posts).filter(Boolean) as SavedPost[]) || []);
        setPostsLoaded(true);
      });
  }, [user, supabase]);

  if (loading || !postsLoaded) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10" dir="rtl">
        <p className="font-urdu text-secondary">لوڈ ہو رہا ہے...</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10" dir="rtl">
      <h1 className="text-2xl font-urdu font-bold mb-8 text-ink">محفوظ شدہ تحریریں</h1>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group relative flex items-start justify-between gap-5 p-5 rounded-2xl bg-paper border border-border/70 hover:border-red-800/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Accent indicator border on hover */}
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex-1 min-w-0">
                {/* Author Info */}
                {post.profiles && (
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Avatar
                      url={post.profiles.avatar_url}
                      name={post.profiles.display_name || post.profiles.username || "؟"}
                    />
                    <span className="text-xs font-urdu font-medium text-secondary group-hover:text-ink transition-colors leading-relaxed">
                      {post.profiles.display_name || post.profiles.username}
                    </span>
                  </div>
                )}

                {/* Post Title */}
                <h2 className="text-xl font-urdu font-bold text-ink group-hover:text-red-800 transition-colors leading-[1.8] mb-2">
                  {post.title}
                </h2>

                {/* Date */}
                <p className="text-[11px] font-sans text-secondary/60 dir-ltr text-right">
                  {new Date(post.created_at).toLocaleDateString("ur-PK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Thumbnail */}
              {post.cover_image && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-xl border border-border/80 group-hover:border-red-800/30 transition-colors">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center">
          <p className="font-urdu text-secondary">
            ابھی تک کوئی تحریر محفوظ نہیں کی گئی۔{" "}
            <Link href="/feed" className="text-red-800 font-semibold underline hover:opacity-80">
              تحریریں دیکھیں
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}