"use client";

import type { Editor } from "@tiptap/react";

export default function Toolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const btn = (active: boolean) =>
    `px-3 py-1.5 border-r border-border font-sans text-sm ${
      active ? "bg-ink text-paper" : "bg-paper text-ink"
    }`;

  return (
    <div className="flex border-b border-border font-sans" dir="ltr">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btn(editor.isActive("bold"))}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btn(editor.isActive("italic"))}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btn(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editor.isActive("bulletList"))}
      >
        List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editor.isActive("blockquote"))}
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={btn(false)}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={btn(false)}
      >
        Redo
      </button>
    </div>
  );
}