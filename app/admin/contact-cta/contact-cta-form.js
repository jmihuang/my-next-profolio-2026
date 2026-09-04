"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { updateContactCtaAction } from "@/lib/actions";

const { TextArea } = Input;

export default function ContactCtaForm({ initialValue }) {
  const [form] = Form.useForm();
  const router = useRouter();
  async function onFinish(values) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    try { await updateContactCtaAction(formData); message.success("聯絡 CTA 已更新，所有前台頁面會同步套用。"); router.refresh(); }
    catch (error) { message.error(error.message || "儲存失敗"); }
  }
  return <Form form={form} layout="vertical" initialValues={initialValue} onFinish={onFinish}>
    <Form.Item name="eyebrow" label="上方標籤" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="title" label="標題" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="description" label="說明文字" rules={[{ required: true }]}><TextArea rows={3} /></Form.Item>
    <div className="grid gap-4 md:grid-cols-2">
      <Form.Item name="email_label" label="主要按鈕文字" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="email_address" label="Email" rules={[{ required: true, type: "email" }]}><Input /></Form.Item>
      <Form.Item name="linkedin_label" label="LinkedIn 按鈕文字" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="linkedin_url" label="LinkedIn 連結" rules={[{ required: true, type: "url" }]}><Input /></Form.Item>
      <Form.Item name="projects_label" label="Projects 按鈕文字" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="projects_url" label="Projects 連結" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="cv_label" label="CV 按鈕文字" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="cv_url" label="CV 檔案連結" rules={[{ required: true }]}><Input /></Form.Item>
    </div>
    <Button type="primary" htmlType="submit">儲存聯絡 CTA</Button>
  </Form>;
}
