import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryPost {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  category_id: string;
}

const accents = [
  {
    quote: "❝",
    className: "text-red-800/15",
    line: "bg-red-800/40",
  },
  {
    quote: "❞",
    className: "text-amber-700/15",
    line: "bg-amber-700/40",
  },
  {
    quote: "❝",
    className: "text-emerald-800/15",
    line: "bg-emerald-800/40",
  },
  {
    quote: "❞",
    className: "text-blue-800/15",
    line: "bg-blue-800/40",
  },
];

export default async function CategoriesPage() {
  const supabase = await createClient();

  // ----------------------------------------
  // Categories
  // ----------------------------------------

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  // ----------------------------------------
  // Published posts
  // ----------------------------------------

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      created_at,
      category_id
    `)
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    });

  const allCategories = categories || [];
  const allPosts = (posts || []) as CategoryPost[];

  return (
    <main
      className="max-w-5xl mx-auto px-6 py-12 sm:py-16"
      dir="rtl"
    >
      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <header className="max-w-2xl mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-red-800" />

          <span className="font-urdu text-sm text-red-800">
            دریافت کریں
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-urdu font-bold text-ink leading-[1.7]">
          تمام زمرے
        </h1>

        <p className="font-urdu text-sm sm:text-base text-secondary mt-3 leading-[2]">
          اپنی پسند کی صنف منتخب کریں اور اپنے پسندیدہ موضوعات
          پر لکھی گئی تحریریں دریافت کریں۔
        </p>
      </header>

      {/* -------------------------------- */}
      {/* Categories */}
      {/* -------------------------------- */}

      {allCategories.length > 0 ? (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category, index) => {
              const categoryPosts = allPosts.filter(
                (post) => post.category_id === category.id
              );

              const latestPosts = categoryPosts.slice(0, 3);

              const accent =
                accents[index % accents.length];

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative block min-h-[340px] rounded-2xl border border-border bg-paper overflow-hidden hover:border-red-800/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* -------------------------------- */}
                  {/* Decorative quote */}
                  {/* -------------------------------- */}

                  <span
                    className={`absolute -top-5 -right-1 font-serif text-[120px] leading-none select-none transition-transform duration-500 group-hover:scale-110 ${accent.className}`}
                  >
                    {accent.quote}
                  </span>

                  {/* Second decorative quote */}

                  <span
                    className={`absolute -bottom-10 -left-2 font-serif text-[110px] leading-none select-none transition-transform duration-500 group-hover:scale-110 ${accent.className}`}
                  >
                    {accent.quote === "❝"
                      ? "❞"
                      : "❝"}
                  </span>

                  {/* -------------------------------- */}
                  {/* Main content */}
                  {/* -------------------------------- */}

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Category label */}

                    <div className="flex items-center justify-between">
                      <span
                        className={`w-10 h-px ${accent.line}`}
                      />

                      <span className="font-sans text-[11px] text-secondary/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category title */}

                    <div className="py-10 text-center">
                      <h2 className="text-3xl sm:text-4xl font-urdu font-bold text-ink group-hover:text-red-800 transition-colors leading-[1.8]">
                        {category.name}
                      </h2>

                      <div
                        className={`w-12 h-px mx-auto mt-4 ${accent.line}`}
                      />

                      <p className="font-urdu text-xs text-secondary mt-3">
                        {categoryPosts.length === 0
                          ? "ابھی کوئی تحریر نہیں"
                          : `${categoryPosts.length} تحریریں`}
                      </p>
                    </div>

                    {/* -------------------------------- */}
                    {/* Latest posts */}
                    {/* -------------------------------- */}

                    {latestPosts.length > 0 && (
                      <div className="mt-auto pt-5 border-t border-border">
                        <p className="font-urdu text-[11px] text-secondary mb-3">
                          تازہ تحریریں
                        </p>

                        <div className="space-y-2.5">
                          {latestPosts.map(
                            (post, postIndex) => (
                              <div
                                key={post.id}
                                className="flex items-start gap-3"
                              >
                                <span className="text-[9px] font-sans text-secondary/40 pt-1">
                                  {postIndex + 1}
                                </span>

                                <p className="font-urdu text-xs text-ink/75 line-clamp-1 leading-[1.8] group-hover:text-ink transition-colors">
                                  {post.title}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Empty category */}

                    {latestPosts.length === 0 && (
                      <div className="mt-auto pt-5 border-t border-border">
                        <p className="font-urdu text-xs text-secondary">
                          اس زمرے میں ابھی کوئی تحریر موجود نہیں۔
                        </p>
                      </div>
                    )}
                  </div>

                  {/* -------------------------------- */}
                  {/* Hover accent */}
                  {/* -------------------------------- */}

                  <div className="absolute bottom-0 right-0 left-0 h-0.5 bg-red-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
                </Link>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="font-urdu text-secondary">
            ابھی کوئی زمرہ موجود نہیں۔
          </p>
        </div>
      )}
    </main>
  );
}