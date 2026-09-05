// src/components/post/SaveButton.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function SaveButton({ postId }: { postId: string }) {
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setReady(true);
        return;
      }
      setUserId(data.user.id);
      const { data: existing } = await supabase
        .from("saved_posts")
        .select("id")
        .eq("user_id", data.user.id)
        .eq("post_id", postId)
        .maybeSingle();
      setSaved(!!existing);
      setReady(true);
    });
  }, [postId, supabase]);

  // async function toggle() {
  //   if (!userId) {
  //     router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
  //     return;
  //   }
  //   if (saved) {
  //     await supabase.from("saved_posts").delete().eq("user_id", userId).eq("post_id", postId);
  //     setSaved(false);
  //   } else {
  //     await supabase.from("saved_posts").insert({ user_id: userId, post_id: postId });
  //     setSaved(true);
  //   }
  // }

  async function toggle() {
  if (!userId) {
    router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
    return;
  }
  if (saved) {
    const { error } = await supabase.from("saved_posts").delete().eq("user_id", userId).eq("post_id", postId);
    if (error) { console.error(error); return; }
    setSaved(false);
  } else {
    const { error } = await supabase.from("saved_posts").insert({ user_id: userId, post_id: postId });
    if (error) { console.error(error); return; }
    setSaved(true);
  }
}

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 border px-4 py-2 text-sm font-urdu ${
        saved ? "bg-ink text-paper border-ink" : "border-ink"
      }`}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {saved ? "محفوظ شدہ" : "محفوظ کریں"}
    </button>
  );
}