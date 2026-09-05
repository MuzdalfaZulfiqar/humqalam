"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "./Toolbar";

interface EditorProps {
  content: object | null;
  onChange: (content: object) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "اپنی کہانی یہاں لکھیں..." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        dir: "rtl",
        class:
          "font-urdu text-xl leading-loose min-h-[400px] focus:outline-none px-2 py-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-border">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}