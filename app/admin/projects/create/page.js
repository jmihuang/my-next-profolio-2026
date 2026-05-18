"use client";
import React, { useState } from "react";
import { Form, Input, Button, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadProduct } from "@/lib/actions";

const CreateProductItem = () => {
  const [pending, setPending] = useState(false);
  const [fileList, setFileList] = useState([]);
  // Handle the file change event
  const handleChange = ({ fileList }) => {
    setFileList(fileList); // Update the state when fileList changes
  };
  const handleSubmit = (values) => {
    setPending(true);
    const formData = new FormData();
    formData.append("image", values.image.file.originFileObj);
    formData.append("alt", values.alt);
    formData.append("name", values.name);
    formData.append("engName", values.engName);
    formData.append("capacity", values.capacity);
    formData.append("price", values.price);
    formData.append("desc", values.desc);
    uploadProduct(formData);
    setTimeout(() => {
      setPending(false);
    }, 1000);
  };

  return (
    <Form
      name="product_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ price: 0 }}
    >
      {/* Alt */}
      <Form.Item
        label="Alt Text"
        name="alt"
        rules={[{ required: true, message: "Alt text is required!" }]}
      >
        <Input placeholder="Enter image alt text" />
      </Form.Item>

      {/* Name */}
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: "Product name is required!" }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      {/* English Name */}
      <Form.Item
        label="English Name"
        name="engName"
        rules={[{ required: true, message: "English name is required!" }]}
      >
        <Input placeholder="Enter English name" />
      </Form.Item>

      {/* Capacity */}
      <Form.Item
        label="Capacity"
        name="capacity"
        rules={[{ required: true, message: "Capacity is required!" }]}
      >
        <Input placeholder="Enter product capacity" />
      </Form.Item>

      {/* Image Upload */}
      <Form.Item label="Product Image" name="image">
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

      {/* Price */}
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Price is required!" }]}
      >
        <InputNumber
          min={0}
          placeholder="Enter price in NTD"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Description (Not Required) */}
      <Form.Item label="Description" name="desc">
        <Input.TextArea placeholder="Enter product description" rows={4} />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit"}
        </Button>
        {/* <Button type="primary" htmlType="submit" disabled={pending}>
          {pending.toString()}
          {pending ? "Submitting..." : "Submit"}
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default CreateProductItem;
