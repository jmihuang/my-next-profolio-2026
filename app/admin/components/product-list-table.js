"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined, PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteProductAction, moveProductAction, toggleFeaturedProductAction } from "@/lib/actions";

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
  async function moveProduct(id, direction) {
    try {
      await moveProductAction(id, direction);
      router.refresh();
    } catch (error) {
      message.error(error.message || "排序失敗");
    }
  }
  async function toggleFeatured(id) {
    try {
      await toggleFeaturedProductAction(id);
      message.success("首頁精選已更新");
      router.refresh();
    } catch (error) {
      message.error(error.message || "更新失敗");
    }
  }

  const featuredCount = data.filter((item) => item.featured_order !== null && item.featured_order !== undefined).length;

  const columns = [
    { title: "名稱", dataIndex: "title", key: "title" },
    { title: "分類", dataIndex: "categories", key: "categories", render: (items) => items.map((item) => <Tag key={item}>{item}</Tag>) },
    { title: "封面", dataIndex: "image", key: "image", render: (image, record) => <Image src={image} alt={record.title} width={80} height={50} className="object-cover" /> },
    { title: "狀態", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "published" ? "green" : "default"}>{status}</Tag> },
    { title: "首頁精選", key: "featured", render: (_, record) => {
      const isFeatured = record.featured_order !== null && record.featured_order !== undefined;
      return <Button type={isFeatured ? "primary" : "default"} icon={isFeatured ? <PushpinFilled /> : <PushpinOutlined />} onClick={() => toggleFeatured(record.id)} disabled={!isFeatured && featuredCount >= 2}>{isFeatured ? `已置頂 ${record.featured_order}` : "置頂"}</Button>;
    } },
    { title: "排序", key: "sort", render: (_, record, index) => <Space size={4}><Button aria-label="上移" icon={<ArrowUpOutlined />} onClick={() => moveProduct(record.id, "up")} disabled={index === 0} /><Button aria-label="下移" icon={<ArrowDownOutlined />} onClick={() => moveProduct(record.id, "down")} disabled={index === data.length - 1} /></Space> },
    { title: "操作", key: "actions", render: (_, record) => <Space><Link href={`/admin/projects/${record.id}/edit`}>編輯</Link><Popconfirm title="確定刪除這個作品？" okText="刪除" cancelText="取消" onConfirm={() => removeProduct(record.id)}><Button type="link" danger>刪除</Button></Popconfirm></Space> },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ["bottomRight"] }}
      rowKey="id"
    />
  );
}
