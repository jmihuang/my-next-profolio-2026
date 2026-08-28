"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Popconfirm, Space, Tag, message } from "antd";
import { useRouter } from "next/navigation";
import DataTable from "@/components/data-table";
import { deleteProductAction } from "@/lib/actions";

export default function ProductListTable({ data }) {
  const router = useRouter();
  async function removeProduct(id) {
    try {
      await deleteProductAction(id);
      message.success("作品已刪除");
      router.refresh();
    } catch (error) {
      message.error(error.message || "刪除失敗");
    }
  }

  const columns = [
    { title: "名稱", dataIndex: "title", key: "title" },
    { title: "分類", dataIndex: "categories", key: "categories", render: (items) => items.map((item) => <Tag key={item}>{item}</Tag>) },
    { title: "封面", dataIndex: "image", key: "image", render: (image, record) => <Image src={image} alt={record.title} width={80} height={50} className="object-cover" /> },
    { title: "狀態", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "published" ? "green" : "default"}>{status}</Tag> },
    { title: "操作", key: "actions", render: (_, record) => <Space><Link href={`/admin/projects/${record.id}/edit`}>編輯</Link><Popconfirm title="確定刪除這個作品？" okText="刪除" cancelText="取消" onConfirm={() => removeProduct(record.id)}><Button type="link" danger>刪除</Button></Popconfirm></Space> },
  ];
  return <DataTable data={data.map((item) => ({ ...item, key: item.id }))} columns={columns} />;
}
