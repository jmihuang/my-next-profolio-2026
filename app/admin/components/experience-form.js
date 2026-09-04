"use client";

import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { createExperienceAction, updateExperienceAction } from "@/lib/actions";

const { TextArea } = Input;

export default function ExperienceForm({ experience }) {
  const [form] = Form.useForm();
  const router = useRouter();

  async function onFinish(values) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    try {
      if (experience) {
        await updateExperienceAction(experience.id, formData);
        message.success("工作經歷已更新");
        router.refresh();
      } else {
        await createExperienceAction(formData);
      }
    } catch (error) {
      message.error(error.message || "儲存失敗");
    }
  }

  return <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
    period: experience?.period,
    company: experience?.company,
    role: experience?.role,
    summary: experience?.summary,
    highlights: experience?.highlights?.join("\n"),
    status: experience?.status || "published",
  }}>
    <Form.Item label="任職期間" name="period" rules={[{ required: true, message: "請輸入任職期間" }]}><Input placeholder="2022/06 — 2024/03" /></Form.Item>
    <Form.Item label="公司／組織" name="company" rules={[{ required: true, message: "請輸入公司名稱" }]}><Input /></Form.Item>
    <Form.Item label="職稱" name="role" rules={[{ required: true, message: "請輸入職稱" }]}><Input /></Form.Item>
    <Form.Item label="經歷摘要" name="summary" rules={[{ required: true, message: "請輸入經歷摘要" }]}><TextArea rows={4} /></Form.Item>
    <Form.Item label="重點內容（每行一項）" name="highlights"><TextArea rows={6} placeholder="專案或職責重點" /></Form.Item>
    <Form.Item label="發布狀態" name="status"><Select options={[{ value: "published", label: "Published（前台顯示）" }, { value: "draft", label: "Draft（僅後台）" }]} /></Form.Item>
    <Button type="primary" htmlType="submit">儲存工作經歷</Button>
  </Form>;
}
