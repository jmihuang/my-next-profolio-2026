"use client";
import { Space, Table } from "antd";

export default function newsDataTable({ data }) {
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
    },
    {
      title: "內容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "創建日期",
      dataIndex: "create_time",
      key: "創建日期",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/edit/${record.key}`}>編輯</a>
          <a href={`/delete/${record.key}`}>刪除</a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      pagination={{
        position: ["bottomRight"],
      }}
      dataSource={data}
    />
  );
}
