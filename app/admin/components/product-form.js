"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Select, Switch, Tabs, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProductAction, updateProductAction } from "@/lib/actions";
import FormSubmit from "@/components/form-submit";
import ProductSectionsEditor, { normalizeSections } from "./product-sections-editor";

const { TextArea } = Input;

function galleryText(product) {
  return (product?.gallery || [])
    .map((image) => `${image.src} | ${image.alt}`)
    .join("\n");
}

export default function ProductForm({ product }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sections, setSections] = useState(() => normalizeSections(product?.sections));
  const [activeTab, setActiveTab] = useState("project");

  async function onFinish(values) {
    setPending(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "coverImage" && value !== undefined) formData.append(key, value);
    });
    const upload = values.coverImage?.file?.originFileObj;
    if (upload) formData.append("coverImage", upload);
    const serializedSections = sections.map((section, sectionIndex) => ({
      ...section,
      images: section.images.map((image, imageIndex) => ({
        path: image.path,
        alt: image.alt,
        title: image.title,
        description: image.description,
        uploadKey: image.file?.originFileObj ? `sectionImageFile_${sectionIndex}_${imageIndex}` : "",
      })),
    }));
    formData.append("sectionsJson", JSON.stringify(serializedSections));
    sections.forEach((section, sectionIndex) => section.images.forEach((image, imageIndex) => {
      const file = image.file?.originFileObj;
      if (file) formData.append(`sectionImageFile_${sectionIndex}_${imageIndex}`, file);
    }));

    try {
      if (product) {
        await updateProductAction(product.id, formData);
        message.success("作品已更新");
        router.refresh();
      } else {
        await createProductAction(formData);
      }
    } catch (error) {
      message.error(error.message || "儲存失敗");
    } finally {
      setPending(false);
    }
  }

  return <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}
    initialValues={{
      title: product?.title,
      eyebrow: product?.eyebrow,
      role: product?.role,
      summary: product?.summary,
      cardTechnologyLine: product?.cardTechnologyLine,
      categories: product?.categories?.join(", "),
      technologies: product?.technologies?.join(", "),
      notes: product?.notes?.join(", "),
      coverImagePath: product?.image,
      galleryPaths: galleryText(product),
      caseStudyKey: product?.case_study_key,
      status: product?.status || "published",
      showInConfidentialPortfolio: Boolean(product?.show_in_confidential_portfolio),
    }}
  >
    {product ? <Tabs activeKey={activeTab} onChange={setActiveTab} items={[{ key: "project", label: "專案資訊" }, { key: "content", label: "案例內容" }]} /> : null}
    <div className={product && activeTab !== "project" ? "hidden" : ""}>
    <Form.Item label="作品名稱" name="title" rules={[{ required: true, message: "請輸入作品名稱" }]}><Input /></Form.Item>
    <Form.Item label="分類（以逗號分隔）" name="categories" rules={[{ required: true, message: "請輸入至少一個分類" }]}><Input placeholder="Product & Commerce, Design Systems" /></Form.Item>
    <Form.Item label="作品摘要" name="summary" rules={[{ required: true, message: "請輸入作品摘要" }]}><TextArea rows={4} /></Form.Item>
    <Form.Item label="Eyebrow" name="eyebrow"><Input /></Form.Item>
    <Form.Item label="角色" name="role"><Input /></Form.Item>
    <Form.Item label="技術摘要" name="cardTechnologyLine"><Input /></Form.Item>
    <Form.Item label="技術（以逗號分隔）" name="technologies"><Input /></Form.Item>
    <Form.Item label="重點（以逗號分隔）" name="notes"><Input /></Form.Item>
    <Form.Item label="封面圖片 Path" name="coverImagePath"><Input placeholder="/projects/example-cover.png" /></Form.Item>
    <Form.Item label="或上傳新封面" name="coverImage"><Upload maxCount={1} beforeUpload={() => false} fileList={fileList} onChange={({ fileList: next }) => setFileList(next)}><Button icon={<UploadOutlined />}>選擇圖片</Button></Upload></Form.Item>
    <Form.Item label="Gallery 圖片（每行：path | alt）" name="galleryPaths"><TextArea rows={5} placeholder="/projects/example-1.png | Example screen" /></Form.Item>
    <Form.Item label="特殊案例 Key" name="caseStudyKey"><Input placeholder="例如 cleaning-doctor；一般作品可留空" /></Form.Item>
    <Form.Item label="發布狀態" name="status"><Select options={[{ value: "published", label: "Published" }, { value: "draft", label: "Draft" }]} /></Form.Item>
    <Form.Item label="加入保密作品集" name="showInConfidentialPortfolio" valuePropName="checked" extra="Show in Confidential Portfolio。開啟後，作品會出現在 /projects-confidential；若為 Draft，則不會出現在公開作品集或首頁，且 detail page 為 noindex。"><Switch checkedChildren="加入" unCheckedChildren="不加入" /></Form.Item>
    </div>
    {(!product || activeTab === "content") ? <ProductSectionsEditor sections={sections} onChange={setSections} /> : null}
    <Form.Item><FormSubmit isSubmitting={pending} onReset={() => form.resetFields()} /></Form.Item>
  </Form>;
}
