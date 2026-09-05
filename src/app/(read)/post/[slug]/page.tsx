// src/app/(public)/post/[slug]/page.tsx
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@/components/post/SaveButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const supabase = await createClient();

  // const { data: post, error } = await supabase
  //   .from("posts")
  //   .select("*, profiles(username, display_name, avatar_url, bio)")
  //   .eq("slug", slug)
  //   .maybeSingle();

  const { data: post, error } = await supabase
  .from("posts")
  .select(`
    *,
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
  .eq("slug", slug)
  .maybeSingle();


  if (error || !post) notFound();

  console.log("POST:", post);
console.log("PROFILE:", post?.profiles);

  const html = generateHTML(post.content, [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ]);

  const { data: morePosts } = await supabase
    .from("posts")
    .select("id, title, slug, cover_image, created_at")
    .eq("published", true)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const authorName = post.profiles?.display_name || post.profiles?.username;

  return (
    <main>
      <article className="max-w-2xl mx-auto px-6 py-16">
        {/* Title block */}
        <h1 className="text-4xl md:text-5xl font-urdu font-bold leading-tight mb-6" dir="rtl">
          {post.title}
        </h1>


{post.category && (
  <Link
    href={`/category/${post.category.slug}`}
    className="inline-block mb-6 px-3 py-1.5 rounded-full bg-paper-muted text-secondary hover:text-red-800 transition font-urdu text-xs"
  >
    {post.category.name}
  </Link>
)}

      {/* Author byline */}
<div className="flex items-center justify-between border-b border-border pb-7 mb-10">
  <Link
    href={`/u/${post.profiles?.username}`}
    className="flex items-center gap-3 group"
  >
  <div className="relative w-11 h-11 shrink-0 aspect-square rounded-[50%] overflow-hidden bg-ink border border-border">
  {post.profiles?.avatar_url ? (
    <Image
      src={post.profiles.avatar_url}
      alt={authorName || "Author"}
      fill
      sizes="44px"
      className="rounded-[50%] object-cover"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center rounded-[50%] bg-ink text-paper font-sans">
      {(authorName || "?").charAt(0).toUpperCase()}
    </div>
  )}
</div>

    <div>
      <p className="font-urdu font-bold text-base group-hover:underline">
        {authorName}
      </p>

      <p className="text-xs text-secondary font-sans mt-1">
        {new Date(post.created_at).toLocaleDateString("ur-PK", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  </Link>

  <SaveButton postId={post.id} />
</div>

        {/* Cover image */}
        {post.cover_image && (
          <div className="w-full h-80 relative mb-10 border border-border">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Body */}
        <div
          dir="rtl"
          className="font-urdu text-xl leading-loose prose-headings:font-bold
            [&_p]:mb-6 [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
            [&_blockquote]:border-r-4 [&_blockquote]:border-ink [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:text-secondary
            [&_ul]:list-disc [&_ul]:pr-6 [&_ol]:list-decimal [&_ol]:pr-6
            [&_a]:underline [&_img]:my-6 [&_img]:w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />

    {/* Author card */}
<div className="mt-20 pt-10 border-t border-border">
  <div className="flex items-start gap-5">
<div className="relative w-16 h-16 shrink-0 aspect-square rounded-[50%] overflow-hidden bg-ink border border-border">
  {post.profiles?.avatar_url ? (
    <Image
      src={post.profiles.avatar_url}
      alt={authorName || "Author"}
      fill
      sizes="64px"
      className="rounded-[50%] object-cover"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center rounded-[50%] bg-ink text-paper text-xl font-sans">
      {(authorName || "?").charAt(0).toUpperCase()}
    </div>
  )}
</div>

    <div className="pt-1">
      <p className="text-xs font-sans uppercase tracking-widest text-secondary mb-2">
        مصنف
      </p>

      <p className="font-urdu font-bold text-xl mb-2">
        {authorName}
      </p>

      {post.profiles?.bio && (
        <p
          className="text-secondary font-urdu leading-loose"
          dir="rtl"
        >
          {post.profiles.bio}
        </p>
      )}
    </div>

  </div>
</div>
      </article>

      {/* More posts */}
      {morePosts && morePosts.length > 0 && (
        <section className="border-t border-border bg-panel py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-urdu font-bold mb-8">مزید پڑھیں</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {morePosts.map((p) => (
                <Link key={p.id} href={`/post/${p.slug}`} className="bg-paper border border-border block">
                  {p.cover_image && (
                    <div className="h-36 relative border-b border-border">
                      <Image src={p.cover_image} alt={p.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-urdu font-bold" dir="rtl">{p.title}</h3>
                    <p className="text-xs text-secondary font-sans mt-2">
                      {new Date(p.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}