"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setInfo("اپنا اکاؤنٹ فعال کرنے کے لیے اپنا ای میل چیک کریں۔");
      setLoading(false);
      return;
    }

    if (data.user) {
      // src/app/signup/page.tsx — replace the insert
const cleanUsername = username.trim();

const { error: profileError } = await supabase.from("profiles").insert({
  id: data.user.id,
  username: cleanUsername,
});

      if (profileError) {
        setError(`پروفائل بنانے میں مسئلہ: ${profileError.message}`);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-border">
        <div className="border-b border-border px-8 py-8 text-center">
          <h1 className="text-3xl font-urdu font-bold mb-2">اکاؤنٹ بنائیں</h1>
          <p className="text-sm text-secondary font-urdu">اپنی کہانیاں اردو میں لکھنا شروع کریں</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4 px-8 py-8">
          <div>
            <label className="block text-sm font-urdu mb-1">صارف نام</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-border px-3 py-2.5 font-sans focus:outline-none focus:border-ink"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-urdu mb-1">ای میل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border px-3 py-2.5 font-sans focus:outline-none focus:border-ink"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-urdu mb-1">پاس ورڈ</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border px-3 py-2.5 font-sans focus:outline-none focus:border-ink"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 font-urdu">{error}</p>}
          {info && <p className="text-sm text-secondary font-urdu">{info}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-paper px-4 py-3 font-urdu text-lg mt-2"
          >
            {loading ? "..." : "اکاؤنٹ بنائیں"}
          </button>

          <p className="text-sm text-center font-urdu text-secondary mt-2">
            پہلے سے اکاؤنٹ ہے؟{" "}
            <Link href="/login" className="text-ink underline">
              لاگ ان کریں
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}