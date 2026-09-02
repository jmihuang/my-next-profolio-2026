"use client";

import Image from "next/image";
import { Space, Table } from "antd";

function toImagePath(image) {
  if (!image) return null;
  return image.startsWith("/") ? image : `/${image}`;
}

export default function NewListTable({ data }) {
  const columns = [
    {
      title: "標題",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "圖片",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        const src = toImagePath(image);
        if (!src) return "—";

        return (
          <Space size="middle">
            <Image src={src} alt="最新消息圖片" width={60} height={60} />
          </Space>
        );
      },
    },
    {
      title: "內容",
      dataIndex: "content",
      key: "content",
      render: (text) => String(text || "").replace(/<[^>]*>/g, ""),
    },
    {
      title: "建立日期",
      dataIndex: "create_time",
      key: "create_time",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottomRight"] }}
      rowKey={(record) => record.id || record.key}
    />
  );
}
