// src/lib/hooks/useCurrentUser.ts
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load(u: User | null) {
      setUser(u);
      if (u) {
        const { data } = await supabase
          .from("profiles")
          .select("username, display_name, avatar_url")
          .eq("id", u.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
      setLoading(false);
    }
    supabase.auth.getUser().then(({ data }) => load(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      load(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return { user, profile, loading };
}