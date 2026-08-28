"use client";

import { Button, Card, Input, Upload } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TinyMCEEditor from "@/components/tinymce";

const { TextArea } = Input;

function createSection() {
  return { leadingTitle: "", title: "", content: "", images: [] };
}

function normalizeSections(sections = []) {
  return sections.map((section) => ({
    leadingTitle: section.section_leading_title || section.leadingTitle || "",
    title: section.section_title || section.title || "",
    content: section.content || "",
    images: (section.images || []).map((image) => ({ path: image.src || image.path || "", alt: image.alt || "", title: image.title || "", description: image.description || "" })),
  }));
}

export default function ProductSectionsEditor({ sections, onChange }) {
  const updateSections = (next) => onChange(next);
  const updateSection = (index, patch) => updateSections(sections.map((section, current) => current === index ? { ...section, ...patch } : section));
  const moveSection = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    updateSections(next);
  };
  const updateImage = (sectionIndex, imageIndex, patch) => updateSection(sectionIndex, { images: sections[sectionIndex].images.map((image, current) => current === imageIndex ? { ...image, ...patch } : image) });
  const moveImage = (sectionIndex, imageIndex, direction) => {
    const images = [...sections[sectionIndex].images];
    const target = imageIndex + direction;
    if (target < 0 || target >= images.length) return;
    [images[imageIndex], images[target]] = [images[target], images[imageIndex]];
    updateSection(sectionIndex, { images });
  };

  return <div className="mt-10 border-t border-black/10 pt-8">
    <div className="mb-6"><div className="text-sm tracking-[0.18em] uppercase text-black/45">案例內容</div><h2 className="mt-2 text-2xl font-medium">Content Sections</h2></div>
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => <Card key={`section-${sectionIndex}`} title={`Section ${String(sectionIndex + 1).padStart(2, "0")}`} extra={<div className="flex gap-2"><Button size="small" aria-label="Move section up" icon={<ArrowUpOutlined />} onClick={() => moveSection(sectionIndex, -1)} disabled={sectionIndex === 0} /><Button size="small" aria-label="Move section down" icon={<ArrowDownOutlined />} onClick={() => moveSection(sectionIndex, 1)} disabled={sectionIndex === sections.length - 1} /><Button size="small" danger icon={<DeleteOutlined />} onClick={() => updateSections(sections.filter((_, index) => index !== sectionIndex))}>Delete</Button></div>}>
        <div className="space-y-4">
          <label className="block text-sm font-medium">Section Leading Title<Input className="mt-2" value={section.leadingTitle} onChange={(event) => updateSection(sectionIndex, { leadingTitle: event.target.value })} placeholder="The problem" /></label>
          <label className="block text-sm font-medium">Section Title<Input className="mt-2" value={section.title} onChange={(event) => updateSection(sectionIndex, { title: event.target.value })} placeholder="Consistency cannot depend on individual decisions." /></label>
          <div><div className="mb-2 text-sm font-medium">Content</div><TinyMCEEditor editorId={`product_section_${sectionIndex}`} initialValue={section.content} onEditorChange={(content) => updateSection(sectionIndex, { content })} /></div>
          <div className="rounded-lg border border-black/10 p-4"><div className="mb-3 text-sm font-medium">圖片與說明</div><div className="space-y-3">{section.images.map((image, imageIndex) => <div key={`image-${imageIndex}`} className="rounded border border-black/10 p-3"><div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"><Input value={image.path} onChange={(event) => updateImage(sectionIndex, imageIndex, { path: event.target.value })} placeholder="/projects/example.png（可留空）" /><Input value={image.alt} onChange={(event) => updateImage(sectionIndex, imageIndex, { alt: event.target.value })} placeholder="Alt text" /><div className="flex gap-1"><Button size="small" icon={<ArrowUpOutlined />} onClick={() => moveImage(sectionIndex, imageIndex, -1)} disabled={imageIndex === 0} /><Button size="small" icon={<ArrowDownOutlined />} onClick={() => moveImage(sectionIndex, imageIndex, 1)} disabled={imageIndex === section.images.length - 1} /><Button size="small" danger icon={<DeleteOutlined />} onClick={() => updateSection(sectionIndex, { images: section.images.filter((_, index) => index !== imageIndex) })} /></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><Input value={image.title} onChange={(event) => updateImage(sectionIndex, imageIndex, { title: event.target.value })} placeholder="圖片標題" /><Input value={image.description} onChange={(event) => updateImage(sectionIndex, imageIndex, { description: event.target.value })} placeholder="圖片說明" /></div>
            <Upload className="mt-3" maxCount={1} beforeUpload={() => false} onChange={({ file }) => updateImage(sectionIndex, imageIndex, { uploadKey: `sectionImageFile_${sectionIndex}_${imageIndex}`, file })}><Button size="small" icon={<UploadOutlined />}>Upload Image</Button></Upload>
          </div>)}</div><Button className="mt-3" icon={<PlusOutlined />} onClick={() => updateSection(sectionIndex, { images: [...section.images, { path: "", alt: "", title: "", description: "" }] })}>新增圖片與說明</Button></div>
        </div>
      </Card>)}</div>
    <Button className="mt-6" type="dashed" icon={<PlusOutlined />} onClick={() => updateSections([...sections, createSection()])}>新增案例內容</Button>
  </div>;
}

export { normalizeSections };
