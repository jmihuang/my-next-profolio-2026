"use client";

import Link from "next/link";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteExperienceAction, moveExperienceAction } from "@/lib/actions";

export default function ExperienceListTable({ data }) {
  const router = useRouter();
  async function remove(id) {
    try { await deleteExperienceAction(id); message.success("工作經歷已刪除"); router.refresh(); }
    catch (error) { message.error(error.message || "刪除失敗"); }
  }
  async function move(id, direction) {
    try { await moveExperienceAction(id, direction); router.refresh(); }
    catch (error) { message.error(error.message || "排序失敗"); }
  }
  const columns = [
    { title: "期間", dataIndex: "period" },
    { title: "公司／組織", dataIndex: "company" },
    { title: "職稱", dataIndex: "role" },
    { title: "狀態", dataIndex: "status", render: (status) => <Tag color={status === "published" ? "green" : "default"}>{status}</Tag> },
    { title: "排序", render: (_, record, index) => <Space size={4}><Button aria-label="上移" icon={<ArrowUpOutlined />} onClick={() => move(record.id, "up")} disabled={index === 0} /><Button aria-label="下移" icon={<ArrowDownOutlined />} onClick={() => move(record.id, "down")} disabled={index === data.length - 1} /></Space> },
    { title: "操作", render: (_, record) => <Space><Link href={`/admin/experience/${record.id}/edit`}>編輯</Link><Popconfirm title="確定刪除這筆工作經歷？" okText="刪除" cancelText="取消" onConfirm={() => remove(record.id)}><Button type="link" danger>刪除</Button></Popconfirm></Space> },
  ];
  return <Table columns={columns} dataSource={data} rowKey="id" pagination={{ position: ["bottomRight"] }} />;
}
