
// // src/app/(app)/dashboard/page.tsx
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
// }

// interface DashPost {
//   id: string;
//   title: string;
//   slug: string;
//   published: boolean;
//   created_at: string;
//   category: Category | null;
// }

// export default function DashboardPage() {
//   const [posts, setPosts] = useState<DashPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const supabase = createClient();

//     async function load() {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         router.push("/login");
//         return;
//       }

//       const { data, error } = await supabase
//         .from("posts")
//         .select(`
//           id,
//           title,
//           slug,
//           published,
//           created_at,
//           category:categories (
//             id,
//             name,
//             slug
//           )
//         `)
//         .eq("author_id", user.id)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Dashboard posts error:", error);
//         setError(error.message);
//         setLoading(false);
//         return;
//       }

//       // Supabase can infer nested relationships differently depending
//       // on the generated database types, so normalize the response.
//       const formattedPosts: DashPost[] = (data ?? []).map((post: any) => ({
//         id: post.id,
//         title: post.title,
//         slug: post.slug,
//         published: post.published,
//         created_at: post.created_at,
//         category: post.category
//           ? {
//               id: post.category.id,
//               name: post.category.name,
//               slug: post.category.slug,
//             }
//           : null,
//       }));

//       setPosts(formattedPosts);
//       setLoading(false);
//     }

//     load();
//   }, [router]);

//   async function handleDelete(id: string) {
//     if (!confirm("کیا آپ واقعی اس تحریر کو حذف کرنا چاہتے ہیں؟")) return;

//     const supabase = createClient();

//     const { error } = await supabase
//       .from("posts")
//       .delete()
//       .eq("id", id);

//     if (error) {
//       console.error("Delete error:", error);
//       alert(`Delete failed: ${error.message}`);
//       return;
//     }

//     setPosts((prev) => prev.filter((p) => p.id !== id));
//   }

//   if (loading) {
//     return (
//       <main className="p-6 font-urdu">
//         لوڈ ہو رہا ہے...
//       </main>
//     );
//   }

//   if (error) {
//     return (
//       <main className="max-w-3xl mx-auto p-6">
//         <div className="border border-red-200 bg-red-50 p-4">
//           <p className="font-sans text-sm text-red-600">
//             {error}
//           </p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-3xl mx-auto p-6" dir="rtl">
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-urdu font-bold text-ink">
//             میری تحریریں
//           </h1>

//           <p className="text-sm font-urdu text-secondary mt-1">
//             اپنی تمام تحریریں یہاں سے منظم کریں
//           </p>
//         </div>

//         <Link
//           href="/write"
//           className="bg-ink text-paper px-4 py-2 font-urdu hover:bg-amber-600 transition"
//         >
//           + نئی تحریر
//         </Link>
//       </div>

//       {posts.length > 0 ? (
//         <div className="flex flex-col">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="border-b border-border py-5 flex justify-between items-center gap-6"
//             >
//               <div className="min-w-0 flex-1">
//                 <Link
//                   href={`/post/${post.slug}`}
//                   className="text-xl font-urdu font-medium text-ink hover:text-red-800 hover:underline"
//                 >
//                   {post.title}
//                 </Link>

//                 <div className="flex items-center gap-2 mt-2 flex-wrap">
//                   {post.category && (
//                     <span className="text-xs font-urdu bg-paper-muted px-2.5 py-1 rounded-full text-secondary">
//                       {post.category.name}
//                     </span>
//                   )}

//                   <span className="text-xs text-secondary font-sans">
//                     {new Date(post.created_at).toLocaleDateString("ur-PK")}
//                   </span>

//                   <span className="text-xs text-secondary font-urdu">
//                     · {post.published ? "شائع شدہ" : "ڈرافٹ"}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-2 font-urdu text-sm shrink-0">
//                 <Link
//                   href={`/write/${post.id}`}
//                   className="border border-border px-3 py-1.5 hover:bg-paper-muted transition"
//                 >
//                   ترمیم
//                 </Link>

//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="border border-red-600 text-red-600 px-3 py-1.5 hover:bg-red-50 transition"
//                 >
//                   حذف کریں
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="border border-dashed border-border p-12 text-center">
//           <p className="font-urdu text-secondary mb-4">
//             آپ نے ابھی تک کوئی تحریر نہیں لکھی۔
//           </p>

//           <Link
//             href="/write"
//             className="font-urdu text-red-800 underline"
//           >
//             پہلی تحریر لکھیں
//           </Link>
//         </div>
//       )}
//     </main>
//   );
// }


// src/app/(app)/dashboard/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Profile {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface DashPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  category: Category | null;
  profile: Profile | null;
}

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

/*
 * Edit icon
 */
function EditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

/*
 * Delete icon
 */
function DeleteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

/*
 * Eye icon
 */
function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<DashPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          cover_image,
          published,
          created_at,
          profiles(
            username,
            display_name,
            avatar_url
          ),
          category:categories(
            id,
            name,
            slug
          )
        `)
        .eq("author_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Dashboard posts error:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      const formattedPosts: DashPost[] = (data ?? []).map(
        (post: any) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? null,
          cover_image: post.cover_image ?? null,
          published: post.published,
          created_at: post.created_at,

          profile: post.profiles
            ? {
                username: post.profiles.username,
                display_name:
                  post.profiles.display_name,
                avatar_url:
                  post.profiles.avatar_url,
              }
            : null,

          category: post.category
            ? {
                id: post.category.id,
                name: post.category.name,
                slug: post.category.slug,
              }
            : null,
        })
      );

      setPosts(formattedPosts);
      setLoading(false);
    }

    load();
  }, [router]);

  async function handleDelete(id: string) {
    if (
      !confirm(
        "کیا آپ واقعی اس تحریر کو حذف کرنا چاہتے ہیں؟"
      )
    ) {
      return;
    }

    setDeletingId(id);

    const supabase = createClient();

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);

      alert(
        `تحریر حذف نہیں ہو سکی: ${error.message}`
      );

      setDeletingId(null);
      return;
    }

    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );

    setDeletingId(null);
  }

  if (loading) {
    return (
      <main
        className="max-w-4xl mx-auto px-6 py-10"
        dir="rtl"
      >
        <p className="font-urdu text-secondary">
          لوڈ ہو رہا ہے...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className="max-w-4xl mx-auto px-6 py-10"
        dir="rtl"
      >
        <div className="border border-red-200 bg-red-50 px-4 py-3 rounded-xl">
          <p className="text-sm text-red-600 font-sans">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="max-w-4xl mx-auto px-6 py-10"
      dir="rtl"
    >
      {/* -------------------------------- */}
      {/* Header */}
      {/* -------------------------------- */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-urdu font-bold text-ink">
            میری تحریریں
          </h1>

          <p className="font-urdu text-sm text-secondary mt-2">
            اپنی تمام تحریریں یہاں سے منظم کریں
          </p>
        </div>

        <Link
          href="/write"
          className="bg-ink text-paper px-5 py-2.5 rounded-lg font-urdu text-sm hover:bg-amber-600 transition"
        >
          + نئی تحریر
        </Link>
      </div>

      {/* -------------------------------- */}
      {/* Posts */}
      {/* -------------------------------- */}

      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => {
            const authorName =
              post.profile?.display_name ||
              post.profile?.username ||
              "؟";

            return (
              <div
                key={post.id}
                className="group relative flex items-start justify-between gap-5 p-5 rounded-2xl bg-paper border border-border/70 hover:border-red-800/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                 

                  {/* Title */}
                  <Link
                    href={`/post/${post.slug}`}
                    className="block text-xl font-urdu font-bold text-ink hover:text-red-800 transition-colors leading-[1.8] mb-2"
                  >
                    {post.title}
                  </Link>

                  {/* Category + Status */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {post.category && (
                      <span className="inline-block bg-paper-muted px-2.5 py-1 rounded-full text-[11px] font-urdu text-secondary">
                        {post.category.name}
                      </span>
                    )}

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-urdu ${
                        post.published
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {post.published
                        ? "شائع شدہ"
                        : "ڈرافٹ"}
                    </span>
                  </div>

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
                    ).toLocaleDateString("ur-PK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    {/* Edit */}
                    <Link
                      href={`/write/${post.id}`}
                      title="ترمیم کریں"
                      aria-label="ترمیم کریں"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-secondary hover:text-ink hover:bg-paper-muted transition"
                    >
                      <EditIcon />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(post.id)
                      }
                      disabled={
                        deletingId === post.id
                      }
                      title="حذف کریں"
                      aria-label="حذف کریں"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition disabled:opacity-50"
                    >
                      {deletingId === post.id ? (
                        <span className="text-xs">
                          ...
                        </span>
                      ) : (
                        <DeleteIcon />
                      )}
                    </button>

                    {/* View */}
                    {post.published && (
                      <Link
                        href={`/post/${post.slug}`}
                        title="تحریر دیکھیں"
                        aria-label="تحریر دیکھیں"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-secondary hover:text-ink hover:bg-paper-muted transition"
                      >
                        <EyeIcon />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Cover */}
                {post.cover_image && (
                  <Link
                    href={`/post/${post.slug}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 relative shrink-0 overflow-hidden rounded-xl border border-border/80"
                  >
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="font-urdu text-secondary mb-4">
            آپ نے ابھی تک کوئی تحریر نہیں لکھی۔
          </p>

          <Link
            href="/write"
            className="font-urdu text-red-800 underline"
          >
            پہلی تحریر لکھیں
          </Link>
        </div>
      )}
    </main>
  );
}