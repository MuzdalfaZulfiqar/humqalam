// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import dynamic from "next/dynamic";
// import { createClient } from "@/lib/supabase/client";

// const Editor = dynamic(() => import("@/components/editor/Editor"), { ssr: false });

// export default function EditPostPage() {
//   const { id } = useParams<{ id: string }>();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState<object | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const supabase = createClient();

//   useEffect(() => {
//     async function load() {
//       const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
//       if (error || !data) {
//         setError("Post not found.");
//         setLoading(false);
//         return;
//       }
//       setTitle(data.title);
//       setContent(data.content);
//       setLoading(false);
//     }
//     load();
//   }, [id, supabase]);

//   async function handleSave() {
//     setSaving(true);
//     setError(null);

//     const { error } = await supabase
//       .from("posts")
//       .update({ title, content, updated_at: new Date().toISOString() })
//       .eq("id", id);

//     setSaving(false);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     router.push("/dashboard");
//     router.refresh();
//   }

//   if (loading) return <main className="p-6 font-urdu">لوڈ ہو رہا ہے...</main>;

//   return (
//     <main className="max-w-3xl mx-auto p-6">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         dir="rtl"
//         className="w-full text-3xl font-urdu border-b border-border pb-3 mb-6 focus:outline-none"
//       />

//       <Editor content={content} onChange={setContent} />

//       {error && <p className="text-sm text-red-600 mt-3 font-sans">{error}</p>}

//       <button
//         onClick={handleSave}
//         disabled={saving}
//         className="mt-6 bg-ink text-paper px-6 py-2 font-sans"
//       >
//         {saving ? "Saving..." : "تبدیلیاں محفوظ کریں"}
//       </button>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const Editor = dynamic(
  () => import("@/components/editor/Editor"),
  { ssr: false }
);

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object | null>(null);

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [published, setPublished] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // -----------------------------------
      // Load categories
      // -----------------------------------

      const { data: categoryData, error: categoryError } =
        await supabase
          .from("categories")
          .select("id, name, slug")
          .order("name");

      if (categoryError) {
        console.error(categoryError);
      }

      setCategories(categoryData || []);

      // -----------------------------------
      // Load post
      // -----------------------------------

      const { data: post, error: postError } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          content,
          cover_image,
          published,
          category_id,
          author_id
        `)
        .eq("id", id)
        .eq("author_id", user.id)
        .single();

      if (postError || !post) {
        setError("تحریر نہیں ملی۔");
        setLoading(false);
        return;
      }

      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.category_id || "");
      setCoverImage(post.cover_image);
      setPublished(post.published);

      // -----------------------------------
      // Load post tags
      // -----------------------------------

      const { data: postTags, error: tagError } = await supabase
        .from("post_tags")
        .select(`
          tags (
            id,
            name,
            slug
          )
        `)
        .eq("post_id", id);

      if (tagError) {
        console.error("Tag loading error:", tagError);
      }

      const existingTags =
        postTags
          ?.map((item: any) => item.tags?.name)
          .filter(Boolean) || [];

      setTags(existingTags);

      setLoading(false);
    }

    load();
  }, [id, router, supabase]);

  // -----------------------------------
  // Cover image
  // -----------------------------------

  function handleCoverChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  // -----------------------------------
  // Tags
  // -----------------------------------

  function addTag() {
    const value = tagInput.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    if (tags.length >= 5) {
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }

    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  // -----------------------------------
  // Save
  // -----------------------------------

  async function handleSave() {
    setSaving(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      if (!title.trim()) {
        setError("عنوان ضروری ہے۔");
        setSaving(false);
        return;
      }

      if (!content) {
        setError("تحریر کا متن ضروری ہے۔");
        setSaving(false);
        return;
      }

      // -----------------------------------
      // Upload new cover if selected
      // -----------------------------------

      let finalCoverImage = coverImage;

      if (coverFile) {
        const fileExt = coverFile.name.split(".").pop();

        const filePath = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("covers")
          .upload(filePath, coverFile);

        if (uploadError) {
          setError(
            `کور امیج اپ لوڈ ناکام: ${uploadError.message}`
          );
          setSaving(false);
          return;
        }

        const { data: publicUrlData } =
          supabase.storage
            .from("covers")
            .getPublicUrl(filePath);

        finalCoverImage = publicUrlData.publicUrl;
      }

      // -----------------------------------
      // Update post
      // -----------------------------------

      const { error: updateError } = await supabase
        .from("posts")
        .update({
          title: title.trim(),
          content,
          category_id: categoryId || null,
          cover_image: finalCoverImage,
          published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("author_id", user.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
        return;
      }

      // -----------------------------------
      // Remove existing tag relationships
      // -----------------------------------

      const { error: deleteTagError } = await supabase
        .from("post_tags")
        .delete()
        .eq("post_id", id);

      if (deleteTagError) {
        console.error(
          "Existing tags delete error:",
          deleteTagError
        );
      }

      // -----------------------------------
      // Create/find tags
      // -----------------------------------

      for (const tagName of tags) {
        const slug = tagName
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\u0600-\u06FF-]/g, "");

        if (!slug) continue;

        // Find existing tag
        const { data: existingTag } = await supabase
          .from("tags")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        let tagId = existingTag?.id;

        // Create if it doesn't exist
        if (!tagId) {
          const { data: newTag, error: tagCreateError } =
            await supabase
              .from("tags")
              .insert({
                name: tagName.trim(),
                slug,
              })
              .select("id")
              .single();

          if (tagCreateError) {
            console.error(
              "Tag creation error:",
              tagCreateError
            );
            continue;
          }

          tagId = newTag.id;
        }

        // -----------------------------------
        // Connect tag to post
        // -----------------------------------

        const { error: relationError } = await supabase
          .from("post_tags")
          .insert({
            post_id: id,
            tag_id: tagId,
          });

        if (relationError) {
          console.error(
            "Post tag relation error:",
            relationError
          );
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main
        className="max-w-3xl mx-auto p-6 font-urdu"
        dir="rtl"
      >
        لوڈ ہو رہا ہے...
      </main>
    );
  }

  return (
    <main
      className="max-w-3xl mx-auto px-6 py-10"
      dir="rtl"
    >
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-2xl font-urdu font-bold text-ink">
          تحریر میں ترمیم کریں
        </h1>

        <p className="font-urdu text-sm text-secondary mt-1">
          اپنی تحریر، زمرہ اور ٹیگز تبدیل کریں
        </p>
      </div>

      {/* Cover */}

      <label className="block mb-8 cursor-pointer">
        <div className="relative w-full h-56 border border-dashed border-border overflow-hidden bg-paper-muted flex items-center justify-center">
          {coverPreview || coverImage ? (
            <Image
              src={coverPreview || coverImage!}
              alt={title || "Cover"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="font-urdu text-secondary">
              کور امیج شامل کریں
            </span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="hidden"
        />
      </label>

      {/* Title */}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان"
        className="w-full text-3xl font-urdu font-bold border-b border-border pb-4 mb-8 focus:outline-none focus:border-ink"
      />

      {/* Category */}

      <div className="mb-6">
        <label className="block font-urdu text-sm text-secondary mb-2">
          زمرہ
        </label>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-border bg-paper px-4 py-3 font-urdu focus:outline-none focus:border-ink"
        >
          <option value="">زمرہ منتخب کریں</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}

      <div className="mb-8">
        <label className="block font-urdu text-sm text-secondary mb-2">
          ٹیگز
        </label>

        <div className="border border-border p-3 min-h-[52px] flex flex-wrap items-center gap-2 focus-within:border-ink">
          {tags.map((tag) => (
            <span
              key={tag}
             className="inline-flex items-center gap-2 bg-paper-muted border border-border px-3 py-1.5 rounded-full text-xs font-urdu"       >
              #{tag}

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-secondary hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}

          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={addTag}
            placeholder={
              tags.length >= 5
                ? "زیادہ سے زیادہ 5 ٹیگز"
                : "ٹیگ لکھیں اور Enter دبائیں"
            }
            disabled={tags.length >= 5}
            className="flex-1 min-w-[180px] outline-none font-urdu text-sm bg-transparent"
          />
        </div>

        <p className="text-[11px] text-secondary font-urdu mt-2">
          زیادہ سے زیادہ 5 ٹیگز
        </p>
      </div>

      {/* Editor */}

      <div className="mb-8">
        <Editor
          content={content}
          onChange={setContent}
        />
      </div>

      {/* Publish status */}

      <div className="border border-border p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="font-urdu font-medium">
            تحریر کی حالت
          </p>

          <p className="font-urdu text-xs text-secondary mt-1">
            {published
              ? "یہ تحریر قارئین کو نظر آ رہی ہے۔"
              : "یہ تحریر ابھی ڈرافٹ ہے۔"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPublished(!published)}
          className={`px-4 py-2 font-urdu text-sm ${
            published
              ? "bg-ink text-paper"
              : "border border-border"
          }`}
        >
          {published ? "شائع شدہ" : "ڈرافٹ"}
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-5">
          <p className="font-urdu text-sm">
            {error}
          </p>
        </div>
      )}

      {/* Save */}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-ink text-paper px-7 py-3 font-urdu hover:bg-amber-600 transition disabled:opacity-50"
        >
          {saving
            ? "محفوظ ہو رہا ہے..."
            : "تبدیلیاں محفوظ کریں"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="border border-border px-6 py-3 font-urdu hover:bg-paper-muted transition"
        >
          منسوخ کریں
        </button>
      </div>
    </main>
  );
}