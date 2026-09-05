"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    // in login/page.tsx handleLogin, replace router.push("/"):
const params = new URLSearchParams(window.location.search);
const returnTo = params.get("returnTo") || "/feed";
router.push(returnTo);

    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-border">
        <div className="border-b border-border px-8 py-8 text-center">
          <h1 className="text-3xl font-urdu font-bold mb-2">لاگ ان کریں</h1>
          <p className="text-sm text-secondary font-urdu">اپنی تحریروں تک واپس جائیں</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 px-8 py-8">
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

          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-paper px-4 py-3 font-urdu text-lg mt-2"
          >
            {loading ? "..." : "لاگ ان کریں"}
          </button>

          <p className="text-sm text-center font-urdu text-secondary mt-2">
            اکاؤنٹ نہیں ہے؟{" "}
            <Link href="/signup" className="text-ink underline">
              اکاؤنٹ بنائیں
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}