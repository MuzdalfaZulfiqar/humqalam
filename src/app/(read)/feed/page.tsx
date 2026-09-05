// import Link from "next/link";
// import Image from "next/image";
// import { createClient } from "@/lib/supabase/server";

// function Avatar({
//   url,
//   name,
//   size = 24,
// }: {
//   url: string | null;
//   name: string;
//   size?: number;
// }) {
//   const initial = name.charAt(0).toUpperCase();

//   return (
//     <div
//       style={{
//         width: size,
//         height: size,
//       }}
//       className="rounded-full bg-ink text-paper flex items-center justify-center text-xs font-sans overflow-hidden relative shrink-0 ring-1 ring-border/30"
//     >
//       {url ? (
//         <Image
//           src={url}
//           alt={name}
//           fill
//           className="object-cover"
//         />
//       ) : (
//         initial
//       )}
//     </div>
//   );
// }

// interface FeedPageProps {
//   searchParams: Promise<{
//     q?: string;
//   }>;
// }

// export default async function FeedPage({
//   searchParams,
// }: FeedPageProps) {
//   const { q } = await searchParams;

//   const supabase = await createClient();

//   // ----------------------------------------
//   // Categories
//   // ----------------------------------------

//   const { data: categories } = await supabase
//     .from("categories")
//     .select("id, name, slug")
//     .order("name");

//   // ----------------------------------------
//   // Posts
//   // ----------------------------------------

//   let query = supabase
//     .from("posts")
//     .select(`
//       id,
//       title,
//       slug,
//       excerpt,
//       cover_image,
//       created_at,
//       profiles(
//         username,
//         display_name,
//         avatar_url,
//         bio
//       ),
//       category:categories(
//         id,
//         name,
//         slug
//       )
//     `)
//     .eq("published", true)
//     .order("created_at", {
//       ascending: false,
//     });

//   const { data: posts } = await query;

//   // ----------------------------------------
//   // Search
//   // ----------------------------------------

//   const filteredPosts = q
//     ? posts?.filter((post: any) =>
//         post.title
//           ?.toLowerCase()
//           .includes(q.toLowerCase())
//       )
//     : posts;

//   // ----------------------------------------
//   // Writers
//   // ----------------------------------------

//   const writersMap = new Map<
//     string,
//     {
//       username: string;
//       display_name: string | null;
//       avatar_url: string | null;
//       bio?: string | null;
//       latest_title?: string;
//     }
//   >();

//   posts?.forEach((p: any) => {
//     if (
//       p.profiles &&
//       !writersMap.has(p.profiles.username)
//     ) {
//       writersMap.set(
//         p.profiles.username,
//         {
//           ...p.profiles,
//           latest_title: p.title,
//         }
//       );
//     }
//   });

//   const writers = Array.from(
//     writersMap.values()
//   ).slice(0, 3);

//   return (
//     <main
//       className="max-w-4xl mx-auto px-6 py-10"
//       dir="rtl"
//     >
//       {/* -------------------------------- */}
//       {/* Header */}
//       {/* -------------------------------- */}

//       <div className="mb-8">
//         <h1 className="text-3xl font-urdu font-bold text-ink">
//           {q
//             ? `"${q}" کے نتائج`
//             : "تازہ ترین تحریریں"}
//         </h1>

//         <p className="font-urdu text-sm text-secondary mt-2">
//           اردو میں لکھی گئی تازہ تحریریں
//         </p>
//       </div>

//       {/* -------------------------------- */}
//       {/* Categories */}
//       {/* -------------------------------- */}
// {categories && categories.length > 0 && (
//   <section className="mb-10">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="font-urdu font-bold text-lg">
//         زمرے
//       </h2>

//       <Link
//         href="/categories"
//         className="font-urdu text-xs text-red-800 hover:underline"
//       >
//         تمام زمرے
//       </Link>
//     </div>

//     <div className="flex flex-wrap gap-2">
//       <Link
//         href="/feed"
//         className="px-4 py-2 rounded-full border border-ink bg-ink text-paper text-sm font-urdu"
//       >
//         تمام تحریریں
//       </Link>

//       {categories.map((category) => (
//         <Link
//           key={category.id}
//           href={`/category/${category.slug}`}
//           className="px-4 py-2 rounded-full border border-border bg-paper hover:border-red-800 hover:text-red-800 transition text-sm font-urdu"
//         >
//           {category.name}
//         </Link>
//       ))}
//     </div>
//   </section>
// )}

//       {/* -------------------------------- */}
//       {/* Posts */}
//       {/* -------------------------------- */}

//       {filteredPosts &&
//       filteredPosts.length > 0 ? (
//         <div className="flex flex-col gap-4">
//           {filteredPosts.map((post: any) => (
//             <Link
//               key={post.id}
//               href={`/post/${post.slug}`}
//               className="group relative flex items-start justify-between gap-5 p-5 rounded-2xl bg-paper border border-border/70 hover:border-red-800/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />

//               <div className="flex-1 min-w-0">
//                 {/* Author */}

//                 <div className="flex items-center gap-2.5 mb-2.5">
//                   <Avatar
//                     url={
//                       post.profiles?.avatar_url
//                     }
//                     name={
//                       post.profiles?.display_name ||
//                       post.profiles?.username ||
//                       "؟"
//                     }
//                   />

//                   <span className="text-xs font-urdu font-medium text-secondary">
//                     {post.profiles?.display_name ||
//                       post.profiles?.username}
//                   </span>
//                 </div>

//                 {/* Title */}

//                 <h2 className="text-xl font-urdu font-bold text-ink group-hover:text-red-800 transition-colors leading-[1.8] mb-2">
//                   {post.title}
//                 </h2>

//                 {/* Category */}

//                 {post.category && (
//                   <span className="inline-block bg-paper-muted px-2.5 py-1 rounded-full text-[11px] font-urdu text-secondary mb-3">
//                     {post.category.name}
//                   </span>
//                 )}

//                 {/* Excerpt */}

//                 {post.excerpt && (
//                   <p className="text-xs font-urdu text-secondary/90 line-clamp-2 leading-[2] mb-3">
//                     {post.excerpt}
//                   </p>
//                 )}

//                 {/* Date */}

//                 <p className="text-[11px] font-sans text-secondary/60">
//                   {new Date(
//                     post.created_at
//                   ).toLocaleDateString(
//                     "ur-PK",
//                     {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     }
//                   )}
//                 </p>
//               </div>

//               {/* Cover */}

//               {post.cover_image && (
//                 <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-xl border border-border/80">
//                   <Image
//                     src={post.cover_image}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               )}
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-dashed border-border p-12 text-center">
//           <p className="font-urdu text-secondary">
//             کوئی تحریر نہیں ملی
//           </p>
//         </div>
//       )}

//       {/* -------------------------------- */}
//       {/* Writers */}
//       {/* -------------------------------- */}

//       {writers.length > 0 && (
//         <section className="border-t border-border mt-16 pt-12">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h3 className="font-urdu font-bold text-2xl text-ink">
//                 نمایاں لکھاری
//               </h3>

//               <p className="font-urdu text-xs text-secondary mt-1">
//                 ہمارے سرگرم قلمکار
//               </p>
//             </div>

//             <Link
//               href="/authors"
//               className="text-xs font-urdu text-red-800 font-semibold hover:underline"
//             >
//               تمام لکھاری ←
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//             {writers.map((w) => (
//               <Link
//                 key={w.username}
//                 href={`/u/${w.username}`}
//                 className="group p-5 rounded-2xl bg-paper border border-border hover:border-red-800/40 hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <Avatar
//                     url={w.avatar_url}
//                     name={
//                       w.display_name ||
//                       w.username
//                     }
//                     size={48}
//                   />

//                   <div>
//                     <p className="font-urdu font-bold">
//                       {w.display_name ||
//                         w.username}
//                     </p>

//                     <p className="text-xs font-sans text-secondary">
//                       @{w.username}
//                     </p>
//                   </div>
//                 </div>

//                 {w.bio && (
//                   <p className="text-xs font-urdu text-secondary line-clamp-2 leading-[2]">
//                     {w.bio}
//                   </p>
//                 )}

//                 {w.latest_title && (
//                   <div className="border-t border-border mt-4 pt-3">
//                     <p className="text-[10px] font-urdu text-secondary mb-1">
//                       تازہ ترین تحریر
//                     </p>

//                     <p className="text-xs font-urdu font-medium line-clamp-1">
//                       {w.latest_title}
//                     </p>
//                   </div>
//                 )}
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}
//     </main>
//   );
// }


import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

function Avatar({
  url,
  name,
  size = 24,
}: {
  url: string | null;
  name: string;
  size?: number;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full bg-ink text-paper flex items-center justify-center text-xs font-sans overflow-hidden relative shrink-0 ring-1 ring-border/30"
    >
      {url ? (
        <Image
          src={url}
          alt={name}
          fill
          className="object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );
}

interface FeedPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function FeedPage({
  searchParams,
}: FeedPageProps) {
  const { q } = await searchParams;

  const supabase = await createClient();

  // ----------------------------------------
  // Categories
  // ----------------------------------------

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  // ----------------------------------------
  // Posts
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
        avatar_url,
        bio
      ),
      category:categories(
        id,
        name,
        slug
      )
    `)
    .eq("published", true)
    .order("created_at", {
      ascending: false,
    });

  // ----------------------------------------
  // Search
  // ----------------------------------------

  const filteredPosts = q
    ? posts?.filter((post: any) =>
        post.title
          ?.toLowerCase()
          .includes(q.toLowerCase())
      )
    : posts;

  // ----------------------------------------
  // Writers
  // ----------------------------------------

  const writersMap = new Map<
    string,
    {
      username: string;
      display_name: string | null;
      avatar_url: string | null;
      bio?: string | null;
      latest_title?: string;
    }
  >();

  posts?.forEach((post: any) => {
    if (
      post.profiles &&
      !writersMap.has(post.profiles.username)
    ) {
      writersMap.set(
        post.profiles.username,
        {
          ...post.profiles,
          latest_title: post.title,
        }
      );
    }
  });

  const writers = Array.from(
    writersMap.values()
  ).slice(0, 3);

  // ----------------------------------------
  // Category highlights
  // ----------------------------------------

  const categoryHighlights =
    (categories || [])
      .map((category) => {
        const categoryPosts =
          posts?.filter(
            (post: any) =>
              post.category?.id === category.id
          ) || [];

        return {
          ...category,
          posts: categoryPosts.slice(0, 2),
          count: categoryPosts.length,
        };
      })
      .filter((category) => category.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

  return (
    <main
      className="max-w-6xl mx-auto px-6 py-10"
      dir="rtl"
    >
      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <div className="mb-8">
        <h1 className="text-3xl font-urdu font-bold text-ink">
          {q
            ? `"${q}" کے نتائج`
            : "تازہ ترین تحریریں"}
        </h1>

        <p className="font-urdu text-sm text-secondary mt-2">
          اردو میں لکھی گئی تازہ تحریریں
        </p>
      </div>

      {/* -------------------------------- */}
      {/* Categories — KEEP AT TOP */}
      {/* -------------------------------- */}

      {categories && categories.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-urdu font-bold text-lg">
              زمرے
            </h2>

            <Link
              href="/categories"
              className="font-urdu text-xs text-red-800 hover:underline"
            >
              تمام زمرے
            </Link>
          </div>

          {/* Pills */}

          <div className="flex flex-wrap gap-2">
            <Link
              href="/feed"
              className="px-4 py-2 rounded-full border border-ink bg-ink text-paper text-sm font-urdu"
            >
              تمام تحریریں
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-paper hover:border-red-800 hover:text-red-800 transition text-sm font-urdu"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* -------------------------------- */}
      {/* POSTS + POPULAR CATEGORIES */}
      {/* -------------------------------- */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

        {/* ================================= */}
        {/* POSTS */}
        {/* ================================= */}

        <section>
          {filteredPosts &&
          filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="group relative flex items-start justify-between gap-5 p-5 rounded-2xl bg-paper border border-border/70 hover:border-red-800/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                >
                  {/* Hover accent */}

                  <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex-1 min-w-0">

                    {/* Author */}

                    <div className="flex items-center gap-2.5 mb-2.5">
                      <Avatar
                        url={
                          post.profiles?.avatar_url
                        }
                        name={
                          post.profiles?.display_name ||
                          post.profiles?.username ||
                          "؟"
                        }
                      />

                      <span className="text-xs font-urdu font-medium text-secondary">
                        {post.profiles?.display_name ||
                          post.profiles?.username ||
                          "نامعلوم لکھاری"}
                      </span>
                    </div>

                    {/* Title */}

                    <h2 className="text-xl font-urdu font-bold text-ink group-hover:text-red-800 transition-colors leading-[1.8] mb-2">
                      {post.title}
                    </h2>

                    {/* Category */}

                    {post.category && (
                      <span className="inline-block bg-paper-muted px-2.5 py-1 rounded-full text-[11px] font-urdu text-secondary mb-3">
                        {post.category.name}
                      </span>
                    )}

                    {/* Excerpt */}

                    {post.excerpt && (
                      <p className="text-xs font-urdu text-secondary/90 line-clamp-2 leading-[2] mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Date */}

                    <p className="text-[11px] font-sans text-secondary/60">
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

                  {/* Cover */}

                  {post.cover_image && (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-xl border border-border/80">
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
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="font-urdu text-secondary">
                کوئی تحریر نہیں ملی
              </p>
            </div>
          )}
        </section>

        {/* ================================= */}
        {/* POPULAR CATEGORIES SIDEBAR */}
        {/* ================================= */}

        {categoryHighlights.length > 0 && (
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-paper overflow-hidden">

              {/* Sidebar Header */}

              <div className="p-5 border-b border-border">
                <h3 className="font-urdu font-bold text-xl text-ink">
                  مقبول زمرے
                </h3>

                <p className="font-urdu text-xs text-secondary mt-1">
                  قارئین کی پسندیدہ اصناف
                </p>
              </div>

              {/* Categories */}

              <div className="divide-y divide-border">
                {categoryHighlights.map(
                  (category) => (
                    <div
                      key={category.id}
                      className="p-5"
                    >
                      {/* Category title */}

                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div>
                          <h4 className="font-urdu font-bold text-lg text-ink">
                            {category.name}
                          </h4>

                          <p className="font-urdu text-[11px] text-secondary mt-1">
                            {category.count} تحریریں
                          </p>
                        </div>

                        <Link
                          href={`/category/${category.slug}`}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary hover:border-red-800 hover:text-red-800 transition"
                        >
                          ←
                        </Link>
                      </div>

                      {/* Top posts */}

                      <div className="space-y-3">
                        {category.posts.map(
                          (post: any) => (
                            <Link
                              key={post.id}
                              href={`/post/${post.slug}`}
                              className="group flex items-center gap-3"
                            >
                              {post.cover_image ? (
                                <div className="w-12 h-12 relative shrink-0 rounded-lg overflow-hidden border border-border">
                                  <Image
                                    src={
                                      post.cover_image
                                    }
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-paper-muted flex items-center justify-center">
                                  <span className="font-urdu text-secondary/40">
                                    ہم
                                  </span>
                                </div>
                              )}

                              <div className="min-w-0">
                                <h5 className="font-urdu text-xs font-medium text-ink group-hover:text-red-800 transition-colors line-clamp-2 leading-[1.8]">
                                  {post.title}
                                </h5>

                                <p className="text-[9px] font-sans text-secondary/60 mt-1">
                                  {new Date(
                                    post.created_at
                                  ).toLocaleDateString(
                                    "ur-PK",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </p>
                              </div>
                            </Link>
                          )
                        )}
                      </div>

                      {/* View category */}

                      <Link
                        href={`/category/${category.slug}`}
                        className="inline-block mt-4 font-urdu text-[11px] text-red-800 hover:underline"
                      >
                        تمام تحریریں دیکھیں ←
                      </Link>
                    </div>
                  )
                )}
              </div>

              {/* All categories */}

              <div className="border-t border-border p-4">
                <Link
                  href="/categories"
                  className="block text-center font-urdu text-xs font-semibold text-red-800 hover:underline"
                >
                  تمام زمرے دیکھیں
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ================================= */}
      {/* FEATURED WRITERS */}
      {/* ================================= */}

      {writers.length > 0 && (
        <section className="border-t border-border mt-16 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-urdu font-bold text-2xl text-ink">
                نمایاں لکھاری
              </h3>

              <p className="font-urdu text-xs text-secondary mt-1">
                ہمارے سرگرم قلمکار
              </p>
            </div>

            <Link
              href="/authors"
              className="text-xs font-urdu text-red-800 font-semibold hover:underline"
            >
              تمام لکھاری ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {writers.map((writer) => (
              <Link
                key={writer.username}
                href={`/u/${writer.username}`}
                className="group p-5 rounded-2xl bg-paper border border-border hover:border-red-800/40 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    url={writer.avatar_url}
                    name={
                      writer.display_name ||
                      writer.username
                    }
                    size={48}
                  />

                  <div>
                    <p className="font-urdu font-bold">
                      {writer.display_name ||
                        writer.username}
                    </p>

                    <p className="text-xs font-sans text-secondary">
                      @{writer.username}
                    </p>
                  </div>
                </div>

                {writer.bio && (
                  <p className="text-xs font-urdu text-secondary line-clamp-2 leading-[2]">
                    {writer.bio}
                  </p>
                )}

                {writer.latest_title && (
                  <div className="border-t border-border mt-4 pt-3">
                    <p className="text-[10px] font-urdu text-secondary mb-1">
                      تازہ ترین تحریر
                    </p>

                    <p className="text-xs font-urdu font-medium line-clamp-1">
                      {writer.latest_title}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* FINAL DISCOVERY CTA */}
      {/* ================================= */}

      <section className="border-t border-border mt-16 pt-12 pb-6 text-center">
        <h3 className="font-urdu font-bold text-2xl text-ink">
          مزید دریافت کریں
        </h3>

        <p className="font-urdu text-sm text-secondary mt-2">
          نئے لکھاریوں اور مختلف اصناف کی تحریریں پڑھیں۔
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            href="/categories"
            className="border border-border px-5 py-2.5 rounded-lg font-urdu text-sm hover:bg-paper-muted transition"
          >
            تمام زمرے
          </Link>

          <Link
            href="/authors"
            className="bg-ink text-paper px-5 py-2.5 rounded-lg font-urdu text-sm hover:bg-amber-600 transition"
          >
            تمام لکھاری
          </Link>
        </div>
      </section>
    </main>
  );
}