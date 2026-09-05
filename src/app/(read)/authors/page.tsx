// // src/app/(read)/authors/page.tsx
// import Link from "next/link";
// import { createClient } from "@/lib/supabase/server";

// export default async function AuthorsPage() {
//   const supabase = await createClient();
//   const { data: posts } = await supabase
//     .from("posts")
//     .select("profiles(username, display_name, avatar_url, bio)")
//     .eq("published", true);

//   const map = new Map<string, any>();
//   posts?.forEach((p: any) => {
//     if (p.profiles && !map.has(p.profiles.username)) map.set(p.profiles.username, p.profiles);
//   });
//   const authors = Array.from(map.values());

//   return (
//     <main className="max-w-3xl mx-auto px-6 py-12">
//       <h1 className="text-2xl font-urdu font-bold mb-8">تمام لکھاری</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {authors.map((a) => (
//           <Link key={a.username} href={`/u/${a.username}`} className="border border-border p-4 flex items-center gap-3 hover:border-amber-500 transition">
//             <div className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center font-sans shrink-0 overflow-hidden relative">
//               {a.avatar_url ? <img src={a.avatar_url} className="w-full h-full object-cover" alt="" /> : (a.display_name || a.username).charAt(0).toUpperCase()}
//             </div>
//             <div className="min-w-0">
//               <p className="font-urdu font-bold truncate">{a.display_name || a.username}</p>
//               {a.bio && <p className="text-xs text-secondary font-urdu truncate">{a.bio}</p>}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }


import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

function Avatar({ url, name, size = 48 }: { url: string | null; name: string; size?: number }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-ink text-paper flex items-center justify-center text-sm font-sans overflow-hidden relative shrink-0"
    >
      {url ? <Image src={url} alt={name} fill className="object-cover" /> : initial}
    </div>
  );
}

export default async function AuthorsPage() {
  const supabase = await createClient();
  
  // Retrieve posts along with author profiles and latest post data
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, profiles(username, display_name, avatar_url, bio)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  // Map unique authors along with post count and latest article title
  const authorsMap = new Map<string, {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
    post_count: number;
    latest_title?: string;
  }>();

  posts?.forEach((p: any) => {
    if (p.profiles) {
      const username = p.profiles.username;
      if (!authorsMap.has(username)) {
        authorsMap.set(username, {
          ...p.profiles,
          post_count: 1,
          latest_title: p.title,
        });
      } else {
        const existing = authorsMap.get(username)!;
        existing.post_count += 1;
      }
    }
  });

  const authors = Array.from(authorsMap.values());

  return (
    <main className="max-w-4xl mx-auto px-6 py-12" dir="rtl">
      {/* Page Header */}
      <div className="border-b border-border/60 pb-8 mb-10">
        <h1 className="text-3xl font-urdu font-bold text-ink leading-relaxed mb-2">
          تمام لکھاری
        </h1>
        <p className="font-urdu text-sm text-secondary leading-relaxed">
          ہمارے پلیٹ فارم کے تمام رجسٹرڈ مصنفین اور ان کی تازہ ترین تحریریں
        </p>
      </div>

      {/* Authors Card Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((a) => (
            <Link
              key={a.username}
              href={`/u/${a.username}`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-paper border border-border/80 hover:border-red-800/40 hover:shadow-md transition-all duration-300 min-h-[240px]"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative shrink-0 ring-2 ring-border/40 group-hover:ring-red-800/50 rounded-full transition-all">
                    <Avatar url={a.avatar_url} name={a.display_name || a.username} size={52} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-lg font-urdu font-bold text-ink group-hover:text-red-800 transition-colors truncate leading-relaxed">
                      {a.display_name || a.username}
                    </span>
                    <span className="text-xs font-sans text-secondary dir-ltr text-right truncate">
                      @{a.username}
                    </span>
                  </div>
                </div>

                {/* Bio Section */}
                {a.bio ? (
                  <p className="text-xs font-urdu text-secondary line-clamp-2 leading-[2] mb-4">
                    {a.bio}
                  </p>
                ) : (
                  <p className="text-xs font-urdu text-secondary/60 italic leading-[2] mb-4">
                    کوئی تعارف موجود نہیں ہے
                  </p>
                )}
              </div>

              {/* Card Footer: Article Count & Latest Title */}
              <div className="pt-3.5 border-t border-border/40 mt-2">
                <div className="flex items-center justify-between text-[11px] font-urdu text-secondary mb-1">
                  <span>تازہ ترین تحریر:</span>
                  <span className="bg-paper-muted px-2 py-0.5 rounded-full text-[10px] font-sans">
                    {a.post_count} {a.post_count === 1 ? "تحریر" : "تحریریں"}
                  </span>
                </div>
                {a.latest_title && (
                  <p className="text-xs font-urdu font-medium text-ink group-hover:text-red-800 line-clamp-1 leading-[2] transition-colors">
                    {a.latest_title}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-urdu text-secondary py-20 text-center text-lg">
          کوئی لکھاری نہیں ملا
        </p>
      )}
    </main>
  );
}