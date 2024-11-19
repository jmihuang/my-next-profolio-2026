"use client";
import React, { useEffect, useState } from "react";
import { Alert, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadNews } from "@/lib/actions";
import TinyMCEEditor from "@/components/tinymce";
import FormSubmit from "@/components/form-submit";

const CreateProductItem = () => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [contentValue, setContentValue] = useState("");
  const [form] = Form.useForm();

  // Handle the file change event
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", contentValue);
    formData.append("image", values.image.file.originFileObj);

    try {
      const response = await uploadNews(formData);
      if (response.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // 3秒後隱藏提示
        onReset(); // Reset the form only on success
      } else {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false); // Handle error case
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form reset
  const onReset = () => {
    form.resetFields();
    setFileList([]);
    setContentValue("");
    if (window.tinymce) {
      window.tinymce.get("news_form_content").setContent("");
    }
  };

  const onEditorChange = (value) => {
    setContentValue(value);
  };

  useEffect(() => {
    console.log("isSubmitting", isSubmitting);
  }, [isSubmitting]);

  return (
    <div className="relative">
      {/* 成功訊息 Alert */}
      {success && (
        <Alert
          message="Product created successfully"
          type="success"
          showIcon
          closable
          onClose={() => setSuccess(false)}
          className="absolute w-full left-1/2 transform -translate-x-1/2 z-10 animate-fadeInOut"
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        name="news_form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ price: 0 }}
      >
        {/* Title */}
        <Form.Item
          label="標題名稱"
          name="title"
          rules={[{ required: true, message: "Title text is required!" }]}
        >
          <Input placeholder="標題名稱" />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item label="顯示圖片" name="image">
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            multiple={false}
            fileList={fileList}
            showUploadList={true}
            accept="image/png,image/gif,image/jpeg"
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* TinyMCE Editor */}
        <Form.Item>
          <TinyMCEEditor onEditorChange={onEditorChange} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <FormSubmit isSubmitting={isSubmitting} onReset={onReset} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProductItem;
