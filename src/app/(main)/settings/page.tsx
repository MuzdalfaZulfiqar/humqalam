// src/app/(main)/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { Camera } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useCurrentUser();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
      if (data) {
        setDisplayName(data.display_name || "");
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatarUrl(data.avatar_url);
      }
      setProfileLoaded(true);
    });
  }, [user, supabase]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError) {
      setMessage(`اپ لوڈ ناکام: ${uploadError.message}`);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);
    setAvatarUrl(publicUrl);
    setUploading(false);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    const { error } = await supabase.from("profiles").update({ display_name: displayName, username, bio }).eq("id", user.id);
    setSaving(false);
    setMessage(error ? error.message : "پروفائل محفوظ ہو گئی");
  }

  if (loading || !profileLoaded) return <main className="p-6 font-urdu">لوڈ ہو رہا ہے...</main>;

  const initial = (displayName || username).charAt(0).toUpperCase();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-urdu font-bold mb-1">پروفائل ترتیبات</h1>
      <p className="text-secondary font-urdu mb-10">اپنی عوامی پروفائل کو ذاتی بنائیں</p>

      <div className="border border-border">
        {/* avatar banner */}
        <div className="bg-panel px-8 py-10 flex flex-col items-center border-b border-border">
          <label className="cursor-pointer group relative">
            <div className="w-28 h-28 rounded-full bg-ink text-paper flex items-center justify-center text-4xl font-sans overflow-hidden relative">
              {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : initial || "?"}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Camera size={22} className="text-white" />
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
          <p className="text-xs text-secondary font-urdu mt-3">
            {uploading ? "اپ لوڈ ہو رہا ہے..." : "تصویر تبدیل کرنے کے لیے کلک کریں"}
          </p>
        </div>

        {/* fields */}
        <div className="px-8 py-8 flex flex-col gap-6">
          <div>
            <label className="block text-sm font-urdu text-secondary mb-2">ظاہری نام</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full border border-border px-3 py-2.5 font-urdu focus:outline-none focus:border-ink" />
          </div>
          <div>
            <label className="block text-sm font-urdu text-secondary mb-2">صارف نام</label>
            <div className="flex items-center border border-border focus-within:border-ink">
              <span className="px-3 text-secondary font-sans text-sm border-l border-border">@</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2.5 font-sans focus:outline-none" />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-urdu text-secondary">تعارف</label>
              <span className="text-xs text-secondary font-sans">{bio.length}/160</span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              rows={4}
              placeholder="اپنے بارے میں کچھ لکھیں..."
              className="w-full border border-border px-3 py-2.5 font-urdu focus:outline-none focus:border-ink resize-none"
            />
          </div>

          <button onClick={handleSave} disabled={saving} className="bg-ink text-paper px-6 py-3 font-urdu w-fit hover:bg-amber-600 transition">
            {saving ? "..." : "تبدیلیاں محفوظ کریں"}
          </button>

          {message && <p className="text-sm font-urdu text-secondary">{message}</p>}
        </div>
      </div>
    </main>
  );
}