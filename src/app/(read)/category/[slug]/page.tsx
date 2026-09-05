import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // ----------------------------------------
  // Find category
  // ----------------------------------------

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (!category) {
    notFound();
  }

  // ----------------------------------------
  // Get posts
  // ----------------------------------------

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image,
      created_at,
      profiles(
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("category_id", category.id)
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    });

  return (
    <main
      className="max-w-5xl mx-auto px-6 py-12"
      dir="rtl"
    >
      {/* -------------------------------- */}
      {/* Back */}
      {/* -------------------------------- */}

      <Link
        href="/feed"
        className="inline-flex items-center gap-2 font-urdu text-xs text-secondary hover:text-red-800 transition-colors mb-10"
      >
        <span>←</span>
        <span>تمام تحریریں</span>
      </Link>

      {/* -------------------------------- */}
      {/* Category Header */}
      {/* -------------------------------- */}
{/* -------------------------------- */}
{/* Category Header */}
{/* -------------------------------- */}

<header className="relative mb-10 rounded-2xl border border-border bg-paper px-6 py-6 sm:px-8 sm:py-7 overflow-hidden">
  {/* Decorative quote */}

  <div className="absolute -top-5 left-4 font-serif text-[90px] leading-none text-red-800/5 select-none pointer-events-none">
    ”
  </div>

  <div className="relative">
    <div className="flex items-center gap-3 mb-2">
      <span className="font-urdu text-xs text-red-800">
        زمرہ
      </span>

      <span className="h-px w-6 bg-red-800/30" />
    </div>

    <h1 className="font-urdu font-bold text-3xl sm:text-4xl text-ink leading-[1.7]">
      <span className="text-red-800/70 font-serif ml-1">
        “
      </span>

      {category.name}

      <span className="text-red-800/70 font-serif mr-1">
        ”
      </span>
    </h1>

    <div className="flex items-center gap-3 mt-3">
      <span className="font-urdu text-xs text-secondary">
        {posts?.length || 0} تحریریں
      </span>

      <span className="w-1 h-1 rounded-full bg-border" />

      <span className="font-urdu text-xs text-secondary">
        تازہ ترین تحریریں
      </span>
    </div>
  </div>
</header>
      {/* -------------------------------- */}
      {/* Posts Heading */}
      {/* -------------------------------- */}

      {posts && posts.length > 0 && (
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-urdu font-bold text-2xl text-ink">
              تازہ تحریریں
            </h2>

            <p className="font-urdu text-xs text-secondary mt-1">
              اس زمرے میں حال ہی میں شائع ہونے والی تحریریں
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------- */}
      {/* Posts */}
      {/* -------------------------------- */}

      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-5">
          {posts.map((post: any, index: number) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group relative flex items-start justify-between gap-5 sm:gap-7 p-5 sm:p-6 rounded-2xl border border-border bg-paper hover:border-red-800/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Hover accent */}

              <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Post content */}

              <div className="flex-1 min-w-0">
                {/* Number + Author */}

                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[10px] text-secondary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-5 bg-border" />

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center text-xs font-sans overflow-hidden relative shrink-0 ring-1 ring-border/30">
                      {post.profiles?.avatar_url ? (
                        <Image
                          src={post.profiles.avatar_url}
                          alt={
                            post.profiles
                              ?.display_name ||
                            post.profiles?.username ||
                            ""
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        (
                          post.profiles
                            ?.display_name ||
                          post.profiles
                            ?.username ||
                          "؟"
                        )
                          .charAt(0)
                          .toUpperCase()
                      )}
                    </div>

                    <span className="font-urdu text-xs text-secondary">
                      {post.profiles?.display_name ||
                        post.profiles?.username ||
                        "نامعلوم لکھاری"}
                    </span>
                  </div>
                </div>

                {/* Title */}

                <h2 className="font-urdu font-bold text-xl sm:text-2xl text-ink leading-[1.8] group-hover:text-red-800 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}

                {post.excerpt && (
                  <p className="font-urdu text-xs sm:text-sm text-secondary line-clamp-2 leading-[2] mt-3 max-w-2xl">
                    {post.excerpt}
                  </p>
                )}

                {/* Date */}

                <div className="flex items-center gap-2 mt-5">
                  <span className="h-px w-4 bg-border" />

                  <p className="text-[10px] text-secondary/60 font-sans">
                    {new Date(
                      post.created_at
                    ).toLocaleDateString(
                      "ur-PK",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              {/* Cover */}

              {post.cover_image && (
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative shrink-0 rounded-xl overflow-hidden border border-border">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        /* -------------------------------- */
        /* Empty State */
        /* -------------------------------- */

        <div className="rounded-3xl border border-dashed border-border bg-paper p-14 text-center">
          <div className="font-serif text-5xl text-red-800/20 mb-3">
            “
          </div>

          <h2 className="font-urdu text-xl font-bold text-ink">
            ابھی کوئی تحریر موجود نہیں
          </h2>

          <p className="font-urdu text-xs text-secondary mt-2">
            اس زمرے میں ابھی تک کوئی تحریر شائع نہیں ہوئی۔
          </p>

          <Link
            href="/write"
            className="inline-flex mt-6 bg-ink text-paper px-5 py-2.5 rounded-xl font-urdu text-sm hover:bg-red-800 transition-colors"
          >
            پہلی تحریر لکھیں
          </Link>
        </div>
      )}

      {/* -------------------------------- */}
      {/* Bottom Navigation */}
      {/* -------------------------------- */}

      {posts && posts.length > 0 && (
        <div className="border-t border-border mt-14 pt-8 flex items-center justify-between">
          <Link
            href="/categories"
            className="font-urdu text-xs text-secondary hover:text-red-800 transition-colors"
          >
            ← تمام زمرے
          </Link>

          <Link
            href="/feed"
            className="font-urdu text-xs text-red-800 hover:underline"
          >
            تمام تحریریں دیکھیں
          </Link>
        </div>
      )}
    </main>
  );
}