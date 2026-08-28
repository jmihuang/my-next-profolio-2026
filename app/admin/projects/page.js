import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductListTable from "../components/product-list-table";

export default async function AdminProjectsPage() {
  const products = await getAllProducts({ includeDrafts: true });
  return <div><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-semibold">作品管理</h1><Link className="rounded bg-blue-600 px-4 py-2 text-white" href="/admin/projects/create">新增作品</Link></div><ProductListTable data={products} /></div>;
}
