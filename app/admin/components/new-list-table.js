"use client";
import React from "react";
import DataTable from "@/components/data-table";
import Image from "next/image";
import { Space } from "antd";

export default function newListTable({ data }) {
  const columns = [
    {
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "標題",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "圖片",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Space size="middle">
          <Image src={`/${image}`} alt="image" width={60} height={60} />
        </Space>
      ),
    },
    {
      title: "內容",
      dataIndex: "content",
      key: "content",
      render: (text) => text.replace(/<[^>]*>/g, ""),
    },
    {
      title: "創建日期",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={`/edit/${record.id}`}>編輯</a>
          <a href={`/delete/${record.id}`}>刪除</a>
        </Space>
      ),
    },
  ];
  return <DataTable data={data} columns={columns} />;
}
