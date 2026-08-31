"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, Button, Card, Form, Input, Typography } from "antd";

const { Title, Text } = Typography;

export default function AdminLoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values) {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email: values.email.trim(),
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email 或密碼不正確，請再試一次。");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("目前無法登入，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f5f5f5",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 420 }}>
        <Title level={2}>Admin Login</Title>
        <Text type="secondary">登入後即可管理作品與最新消息。</Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 28 }}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "請輸入有效的 Email。" }]}
          >
            <Input autoComplete="email" placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "請輸入密碼。" }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>

          {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} /> : null}

          <Button block type="primary" htmlType="submit" loading={isSubmitting}>
            登入後台
          </Button>
        </Form>
      </Card>
    </main>
  );
}
