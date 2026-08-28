"use client";

import { Button, Card, Input, Upload } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TinyMCEEditor from "@/components/tinymce";

function createSection() {
  return { leadingTitle: "", title: "", content: "", images: [] };
}

function createImage() {
  return { path: "", alt: "", title: "", description: "", file: null };
}

function normalizeSections(sections = []) {
  return sections.map((section) => ({
    leadingTitle: section.section_leading_title || section.leadingTitle || "",
    title: section.section_title || section.title || "",
    content: section.content || "",
    images: (section.images || []).map((image) => ({ path: image.src || image.path || "", alt: image.alt || "", title: image.title || "", description: image.description || "", file: null })),
  }));
}

function imageFileList(image, sectionIndex, imageIndex) {
  if (image.file) return [{ ...image.file, uid: image.file.uid || `new-${sectionIndex}-${imageIndex}` }];
  if (!image.path) return [];
  return [{
    uid: `saved-${sectionIndex}-${imageIndex}`,
    name: decodeURIComponent(image.path.split("/").pop() || "image"),
    status: "done",
    url: image.path,
  }];
}

function ImageUpload({ image, sectionIndex, imageIndex, onChange, onRemove }) {
  const fileList = imageFileList(image, sectionIndex, imageIndex);

  return <Upload
    accept="image/png,image/jpeg,image/gif,image/webp"
    beforeUpload={() => false}
    fileList={fileList}
    listType="picture-card"
    showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
    onChange={({ fileList: nextFileList }) => {
      const nextFile = nextFileList.at(-1);
      if (!nextFile || !nextFile.originFileObj) return;
      onChange({ path: "", file: nextFile });
    }}
    onRemove={() => {
      onRemove();
      return false;
    }}
  >
    <div className="flex flex-col items-center gap-1 text-xs text-black/60"><UploadOutlined /><span>{fileList.length ? "更換圖片" : "上傳圖片"}</span></div>
  </Upload>;
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
  const removeImageFile = (sectionIndex, imageIndex) => updateImage(sectionIndex, imageIndex, { path: "", file: null });
  const removeImage = (sectionIndex, imageIndex) => updateSection(sectionIndex, { images: sections[sectionIndex].images.filter((_, current) => current !== imageIndex) });
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
          <div className="rounded-lg border border-black/10 p-4">
            <div className="mb-3 text-sm font-medium">圖片與說明</div>
            <div className="space-y-4">
              {section.images.map((image, imageIndex) => <div key={`image-${imageIndex}`} className="grid gap-5 rounded-lg border border-black/10 p-4 md:grid-cols-[240px_minmax(0,1fr)]">
                <div>
                  <ImageUpload image={image} sectionIndex={sectionIndex} imageIndex={imageIndex} onChange={(patch) => updateImage(sectionIndex, imageIndex, patch)} onRemove={() => removeImageFile(sectionIndex, imageIndex)} />
                  <div className="mt-3 flex items-center gap-1">
                    <Button size="small" icon={<ArrowUpOutlined />} onClick={() => moveImage(sectionIndex, imageIndex, -1)} disabled={imageIndex === 0} />
                    <Button size="small" icon={<ArrowDownOutlined />} onClick={() => moveImage(sectionIndex, imageIndex, 1)} disabled={imageIndex === section.images.length - 1} />
                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeImage(sectionIndex, imageIndex)}>刪除圖片</Button>
                  </div>
                </div>
                <div className="grid content-start gap-3">
                  <label className="text-sm font-medium">Alt text<Input className="mt-1.5" value={image.alt} onChange={(event) => updateImage(sectionIndex, imageIndex, { alt: event.target.value })} placeholder="描述圖片內容" /></label>
                  <label className="text-sm font-medium">圖片標題<Input className="mt-1.5" value={image.title} onChange={(event) => updateImage(sectionIndex, imageIndex, { title: event.target.value })} placeholder="圖片標題" /></label>
                  <label className="text-sm font-medium">圖片說明<Input.TextArea className="mt-1.5" rows={3} value={image.description} onChange={(event) => updateImage(sectionIndex, imageIndex, { description: event.target.value })} placeholder="說明這張圖片呈現的內容" /></label>
                </div>
              </div>)}
            </div>
            <Button className="mt-4" icon={<PlusOutlined />} onClick={() => updateSection(sectionIndex, { images: [...section.images, createImage()] })}>新增圖片與說明</Button>
          </div>
        </div>
      </Card>)}
    </div>
    <Button className="mt-6" type="dashed" icon={<PlusOutlined />} onClick={() => updateSections([...sections, createSection()])}>新增案例內容</Button>
  </div>;
}

export { normalizeSections };
