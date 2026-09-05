import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function AuthorPage({ params }: PageProps) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername).trim();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", username)
    .maybeSingle();

  if (!profile) notFound();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("author_id", profile.id)
    .eq("published", true)
    .order("created_at", { ascending: false });

  const displayName = profile.display_name || profile.username;
  const postCount = posts?.length || 0;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Sidebar: Author Profile Card (Substack / Medium Style Sticky) */}
        <aside className="md:col-span-4 order-first md:order-last">
          <div className="md:sticky md:top-8 p-6 rounded-2xl bg-paper-muted/60 border border-border/80 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-ink text-paper flex items-center justify-center text-3xl font-sans overflow-hidden relative ring-4 ring-border/40 shadow-sm mb-4">
              {profile.avatar_url ? (
                <Image src={profile.avatar_url} alt={displayName} fill className="object-cover" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>

            {/* Identity */}
            <h1 className="text-2xl font-urdu font-bold text-ink leading-relaxed mb-0.5">
              {displayName}
            </h1>
            <p className="text-xs font-sans text-secondary dir-ltr mb-4">
              @{profile.username}
            </p>

            {/* Bio */}
            {profile.bio ? (
              <p className="text-xs font-urdu text-secondary leading-[2] mb-6">
                {profile.bio}
              </p>
            ) : (
              <p className="text-xs font-urdu text-secondary/60 italic leading-[2] mb-6">
                کوئی تعارف موجود نہیں ہے
              </p>
            )}

            {/* Quick Stats Pill */}
            <div className="w-full pt-4 border-t border-border/60 flex items-center justify-between text-xs font-urdu text-secondary px-2">
              <span>کل تحریریں:</span>
              <span className="font-bold font-sans text-ink bg-paper px-3 py-1 rounded-full border border-border/60">
                {postCount}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Feed: Articles Column */}
        <section className="md:col-span-8">
          <div className="border-b border-border/60 pb-3 mb-6 flex items-center justify-between">
            <h2 className="text-xl font-urdu font-bold text-ink leading-relaxed">
              تحریریں ({postCount})
            </h2>
          </div>

          {posts && posts.length > 0 ? (
            <div className="flex flex-col gap-5">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/post/${post.slug}`} 
                  className="group flex flex-col sm:flex-row items-start justify-between gap-5 p-5 rounded-2xl bg-paper border border-border/80 hover:border-red-800/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-urdu font-bold text-ink group-hover:text-red-800 transition-colors leading-[1.8] mb-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-xs font-urdu text-secondary line-clamp-2 leading-[2] mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    <span className="text-[11px] font-sans text-secondary/80 dir-ltr text-right block">
                      {new Date(post.created_at).toLocaleDateString("ur-PK", { 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </span>
                  </div>

                  {post.cover_image && (
                    <div className="w-full sm:w-28 sm:h-28 h-40 relative shrink-0 rounded-xl overflow-hidden border border-border/80 group-hover:border-red-800/40 transition-colors">
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
            <div className="py-16 text-center border border-dashed border-border/60 rounded-2xl bg-paper-muted/30">
              <p className="font-urdu text-secondary text-base leading-relaxed">
                ابھی تک کوئی تحریر شائع نہیں ہوئی
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}