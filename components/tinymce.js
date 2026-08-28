"use client";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const TinyMCEEditor = ({ onEditorChange, initialValue = "", editorId = "news_form_content" }) => {
  const editorRef = useRef(null);
  // The section editor updates its parent state on every edit. Keep TinyMCE's
  // initial document stable so an IME composition is not replaced mid-input.
  const initialContentRef = useRef(initialValue);
  return (
    <>
      <Editor
        apiKey={apiKey}
        initialValue={initialContentRef.current}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={onEditorChange}
        id={editorId}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default TinyMCEEditor;
