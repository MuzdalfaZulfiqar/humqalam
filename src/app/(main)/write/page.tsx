// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { createClient } from "@/lib/supabase/client";

// const Editor = dynamic(() => import("@/components/editor/Editor"), { ssr: false });

// function slugify(title: string) {
//   return title
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\u0600-\u06FF-]/g, "");
// }

// export default function WritePage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState<object | null>(null);
//   const [coverFile, setCoverFile] = useState<File | null>(null);
//   const [coverPreview, setCoverPreview] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const supabase = createClient();

//   function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (file) {
//       setCoverFile(file);
//       setCoverPreview(URL.createObjectURL(file));
//     }
//   }

//   async function handlePublish() {
//     setError(null);

//     const { data: userData } = await supabase.auth.getUser();
//     if (!userData.user) {
//       setError("You must be logged in.");
//       return;
//     }
//     if (!title.trim() || !content) {
//       setError("Title and content are required.");
//       return;
//     }

//     setSaving(true);

//     let coverUrl: string | null = null;
//     if (coverFile) {
//       const fileExt = coverFile.name.split(".").pop();
//       const filePath = `${userData.user.id}/${Date.now()}.${fileExt}`;

//       const { error: uploadError } = await supabase.storage
//         .from("covers")
//         .upload(filePath, coverFile);

//       if (uploadError) {
//         setError(`Cover upload failed: ${uploadError.message}`);
//         setSaving(false);
//         return;
//       }

//       const { data: publicUrlData } = supabase.storage.from("covers").getPublicUrl(filePath);
//       coverUrl = publicUrlData.publicUrl;
//     }

//     const slug = `${slugify(title)}-${Date.now()}`;

//     const { error } = await supabase.from("posts").insert({
//       author_id: userData.user.id,
//       title,
//       slug,
//       content,
//       cover_image: coverUrl,
//       published: true,
//     });

//     setSaving(false);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     router.push(`/post/${slug}`);
//   }

//   return (
//     <main className="max-w-3xl mx-auto p-6">
//       <label className="block mb-6">
//         <div className="border border-dashed border-border h-48 flex items-center justify-center cursor-pointer relative overflow-hidden">
//           {coverPreview ? (
//             <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
//           ) : (
//             <span className="text-secondary font-urdu">کور امیج شامل کریں</span>
//           )}
//         </div>
//         <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
//       </label>

//       <input
//         type="text"
//         placeholder="عنوان"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         dir="rtl"
//         className="w-full text-3xl font-urdu border-b border-border pb-3 mb-6 focus:outline-none"
//       />

//       <Editor content={content} onChange={setContent} />

//       {error && <p className="text-sm text-red-600 mt-3 font-sans">{error}</p>}

//       <button
//         onClick={handlePublish}
//         disabled={saving}
//         className="mt-6 bg-ink text-paper px-6 py-2 font-sans"
//       >
//         {saving ? "Publishing..." : "شائع کریں"}
//       </button>
//     </main>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "");
}

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<object | null>(null);

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState(true);

  const router = useRouter();

  const supabase = createClient();

  /*
   * Load categories
   */
useEffect(() => {
  async function loadCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")
      .order("name");

    if (error) {
      console.error("Categories error:", error);
      setError(error.message);
      setLoadingCategories(false);
      return;
    }

    setCategories(data || []);
    setLoadingCategories(false);
  }

  loadCategories();
}, []);

  /*
   * Cover image
   */
  function handleCoverChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  /*
   * Add tag
   */
  function addTag() {
    const value = tagInput.trim();

    if (!value) return;

    // Don't add duplicate tags
    const alreadyExists = tags.some(
      (tag) => tag.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setTagInput("");
      return;
    }

    // Maximum 5 tags
    if (tags.length >= 5) {
      setError("زیادہ سے زیادہ 5 ٹیگز شامل کیے جا سکتے ہیں۔");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
    setError(null);
  }

  /*
   * Remove tag
   */
  function removeTag(tagToRemove: string) {
    setTags((prev) =>
      prev.filter((tag) => tag !== tagToRemove)
    );
  }

  /*
   * Allow Enter to add tag
   */
  function handleTagKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }

    if (
      e.key === "Backspace" &&
      !tagInput &&
      tags.length > 0
    ) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  /*
   * Publish
   */
//   async function handleSave() {
//     setError(null);

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user) {
//       setError("You must be logged in.");
//       return;
//     }

//     if (!title.trim()) {
//       setError("عنوان ضروری ہے۔");
//       return;
//     }

//     if (!content) {
//       setError("تحریر کا متن ضروری ہے۔");
//       return;
//     }

//     if (!categoryId) {
//       setError("براہ کرم ایک زمرہ منتخب کریں۔");
//       return;
//     }

//     setSaving(true);

//     /*
//      * 1. Upload cover
//      */
//     let coverUrl: string | null = null;

//     if (coverFile) {
//       const fileExt = coverFile.name.split(".").pop();

//       const filePath = `${user.id}/${Date.now()}.${fileExt}`;

//       const {
//         error: uploadError,
//       } = await supabase.storage
//         .from("covers")
//         .upload(filePath, coverFile);

//       if (uploadError) {
//         setError(
//           `Cover upload failed: ${uploadError.message}`
//         );
//         setSaving(false);
//         return;
//       }

//       const {
//         data: publicUrlData,
//       } = supabase.storage
//         .from("covers")
//         .getPublicUrl(filePath);

//       coverUrl = publicUrlData.publicUrl;
//     }

//     /*
//      * 2. Create slug
//      */
//     const slug = `${slugify(title)}-${Date.now()}`;

//     /*
//      * 3. Create post
//      */
//     const {
//       data: post,
//       error: postError,
//     } = await supabase
//       .from("posts")
//       .insert({
//         author_id: user.id,
//         title: title.trim(),
//         slug,
//         content,
//         cover_image: coverUrl,
//         category_id: categoryId,
//         published,
//       })
//       .select("id, slug")
//       .single();

//     if (postError || !post) {
//       console.error("Post creation error:", postError);

//       setError(
//         postError?.message || "Post creation failed."
//       );

//       setSaving(false);
//       return;
//     }

//     /*
//      * 4. Create / find tags
//      */
//     if (tags.length > 0) {
//       const tagRows: {
//         name: string;
//         slug: string;
//       }[] = [];

//       for (const tag of tags) {
//         tagRows.push({
//           name: tag.trim(),
//           slug: slugify(tag),
//         });
//       }

//       /*
//        * Insert tags.
//        *
//        * onConflict prevents duplicate slug errors.
//        */
//       const {
//         error: tagInsertError,
//       } = await supabase
//         .from("tags")
//         .upsert(tagRows, {
//           onConflict: "slug",
//           ignoreDuplicates: true,
//         });

//       if (tagInsertError) {
//         console.error(
//           "Tag creation error:",
//           tagInsertError
//         );

//         setError(
//           `Tags could not be saved: ${tagInsertError.message}`
//         );

//         setSaving(false);
//         return;
//       }

//       /*
//        * 5. Get tag IDs
//        */
//       const tagSlugs = tagRows.map(
//         (tag) => tag.slug
//       );

//       const {
//         data: savedTags,
//         error: tagFetchError,
//       } = await supabase
//         .from("tags")
//         .select("id, slug")
//         .in("slug", tagSlugs);

//       if (tagFetchError) {
//         console.error(
//           "Tag fetch error:",
//           tagFetchError
//         );

//         setError(tagFetchError.message);
//         setSaving(false);
//         return;
//       }

//       /*
//        * 6. Connect tags to post
//        */
//       if (savedTags && savedTags.length > 0) {
//         const postTagRows = savedTags.map(
//           (tag) => ({
//             post_id: post.id,
//             tag_id: tag.id,
//           })
//         );

//         const {
//           error: postTagError,
//         } = await supabase
//           .from("post_tags")
//           .insert(postTagRows);

//         if (postTagError) {
//           console.error(
//             "Post tags error:",
//             postTagError
//           );

//           setError(
//             `Tags could not be attached: ${postTagError.message}`
//           );

//           setSaving(false);
//           return;
//         }
//       }
//     }

//    setSaving(false);

// if (published) {
//   router.push(`/post/${post.slug}`);
// } else {
//   router.push("/dashboard");
// }

// router.refresh();
//   }

async function handleSave(shouldPublish: boolean) {
  setError(null);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setError("آپ کو پہلے لاگ اِن ہونا ضروری ہے۔");
    router.push("/login");
    return;
  }

  if (!title.trim()) {
    setError("عنوان ضروری ہے۔");
    return;
  }

  if (!content) {
    setError("تحریر کا متن ضروری ہے۔");
    return;
  }

  if (!categoryId) {
    setError("براہ کرم ایک زمرہ منتخب کریں۔");
    return;
  }

  setSaving(true);

  try {
    // -----------------------------
    // Upload cover
    // -----------------------------

    let coverUrl: string | null = null;

    if (coverFile) {
      const fileExt = coverFile.name.split(".").pop();

      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("covers")
        .upload(filePath, coverFile);

      if (uploadError) {
        throw new Error(
          `کور امیج اپ لوڈ ناکام: ${uploadError.message}`
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("covers")
        .getPublicUrl(filePath);

      coverUrl = publicUrlData.publicUrl;
    }

    // -----------------------------
    // Create slug
    // -----------------------------

    const slug = `${slugify(title)}-${Date.now()}`;

    // -----------------------------
    // Create post
    // -----------------------------

  const postPayload = {
  author_id: user.id,
  title: title.trim(),
  slug,
  content,
  cover_image: coverUrl,
  category_id: categoryId,
  published: shouldPublish,
};

console.log("================================");
console.log("SAVE MODE:", shouldPublish ? "PUBLISH" : "DRAFT");
console.log("USER ID:", user.id);
console.log("POST PAYLOAD:", postPayload);
console.log("================================");

    console.log("Creating post:", postPayload);
    console.log("Current user:", user.id);

    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert(postPayload)
      .select("id, slug")
      .single();

    if (postError || !post) {
      console.error("Post creation error:", postError);
      throw new Error(
        postError?.message || "Post creation failed."
      );
    }

    // -----------------------------
    // Create / find tags
    // -----------------------------

    if (tags.length > 0) {
      const tagRows = tags
        .map((tag) => ({
          name: tag.trim(),
          slug: slugify(tag),
        }))
        .filter((tag) => tag.slug);

      if (tagRows.length > 0) {
        const { error: tagInsertError } = await supabase
          .from("tags")
          .upsert(tagRows, {
            onConflict: "slug",
            ignoreDuplicates: true,
          });

        if (tagInsertError) {
          console.error("Tag creation error:", tagInsertError);
          throw new Error(
            `Tags could not be saved: ${tagInsertError.message}`
          );
        }

        const tagSlugs = tagRows.map((tag) => tag.slug);

        const { data: savedTags, error: tagFetchError } =
          await supabase
            .from("tags")
            .select("id, slug")
            .in("slug", tagSlugs);

        if (tagFetchError) {
          throw new Error(tagFetchError.message);
        }

        if (savedTags && savedTags.length > 0) {
          const postTagRows = savedTags.map((tag) => ({
            post_id: post.id,
            tag_id: tag.id,
          }));

          const { error: postTagError } = await supabase
            .from("post_tags")
            .insert(postTagRows);

          if (postTagError) {
            throw new Error(
              `Tags could not be attached: ${postTagError.message}`
            );
          }
        }
      }
    }

    // -----------------------------
    // Done
    // -----------------------------

    if (shouldPublish) {
      router.push(`/post/${post.slug}`);
    } else {
      router.push("/dashboard");
    }

    router.refresh();
  } catch (err) {
    console.error("Save error:", err);

    setError(
      err instanceof Error
        ? err.message
        : "کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔"
    );
  } finally {
    setSaving(false);
  }
}

  return (
    <main
      className="max-w-3xl mx-auto px-6 py-10"
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-urdu font-bold text-ink">
          نئی تحریر
        </h1>

        <p className="font-urdu text-sm text-secondary mt-2">
          اپنے خیالات کو الفاظ دیں۔
        </p>
      </div>

      {/* Cover */}
      <label className="block mb-7 cursor-pointer">
        <div className="border border-dashed border-border h-52 flex items-center justify-center relative overflow-hidden rounded-xl hover:border-ink transition">
          {coverPreview ? (
            <Image
              src={coverPreview}
              alt="Cover preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-center">
              <p className="text-secondary font-urdu">
                کور امیج شامل کریں
              </p>

              <p className="text-xs text-secondary/70 font-urdu mt-1">
                اختیاری
              </p>
            </div>
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
        placeholder="عنوان"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        dir="rtl"
        className="w-full text-3xl font-urdu border-b border-border pb-4 mb-6 focus:outline-none focus:border-ink bg-transparent"
      />

      {/* Category + Tags */}
      <div className="border border-border rounded-xl p-5 mb-8 bg-paper">
        {/* Category */}
        <div className="mb-6">
          <label className="block font-urdu text-sm text-secondary mb-2">
            زمرہ
          </label>

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
            disabled={loadingCategories}
            className="w-full border border-border bg-transparent px-4 py-3 font-urdu focus:outline-none focus:border-ink rounded-lg"
          >
            <option value="">
              {loadingCategories
                ? "زمرے لوڈ ہو رہے ہیں..."
                : "زمرہ منتخب کریں"}
            </option>

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
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-urdu text-sm text-secondary">
              ٹیگز
            </label>

            <span className="text-xs text-secondary font-sans">
              {tags.length}/5
            </span>
          </div>

          <div className="border border-border rounded-lg p-2 min-h-[48px] flex flex-wrap items-center gap-2 focus-within:border-ink">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-paper-muted border border-border px-3 py-1 rounded-full text-sm font-urdu"
              >
                <span>#{tag}</span>

                <button
                  type="button"
                  onClick={() =>
                    removeTag(tag)
                  }
                  className="text-secondary hover:text-red-700 font-sans"
                >
                  ×
                </button>
              </span>
            ))}

            <input
              type="text"
              value={tagInput}
              onChange={(e) =>
                setTagInput(e.target.value)
              }
              onKeyDown={handleTagKeyDown}
              placeholder={
                tags.length >= 5
                  ? ""
                  : "ٹیگ لکھیں اور Enter دبائیں"
              }
              disabled={tags.length >= 5}
              className="flex-1 min-w-[180px] bg-transparent px-2 py-1 font-urdu focus:outline-none"
            />
          </div>

          <p className="text-xs text-secondary/70 font-urdu mt-2">
            مثال: محبت، لاہور، ادب
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="mb-6">
        <Editor
          content={content}
          onChange={setContent}
        />
      </div>


{/* Error */}
{error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 mb-5 rounded-lg">
          <p className="text-sm text-red-600 font-urdu">
            {error}
          </p>
        </div>
      )}

      {/* Publish */}
   <div className="flex items-center justify-end gap-3">
  {/* Save Draft */}
  <button
    type="button"
    onClick={() => handleSave(false)}
    disabled={saving}
    className="border border-border px-6 py-3 font-urdu rounded-lg hover:bg-paper-muted transition disabled:opacity-50"
  >
    {saving ? "محفوظ ہو رہا ہے..." : "ڈرافٹ محفوظ کریں"}
  </button>

  {/* Publish */}
  <button
    type="button"
    onClick={() => handleSave(true)}
    disabled={saving}
    className="bg-ink text-paper px-7 py-3 font-urdu rounded-lg hover:bg-amber-600 transition disabled:opacity-50"
  >
    {saving ? "محفوظ ہو رہا ہے..." : "شائع کریں"}
  </button>
</div>
    </main>
  );
}