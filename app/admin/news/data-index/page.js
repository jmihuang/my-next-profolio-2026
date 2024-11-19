"use server";
import React from "react";
import { getAllNews } from "@/lib/news";
import NewsDataTable from "@/app/admin/news/data-index/newsDataTable";

export default async function DataIndex() {
  const data = await getAllNews(); // 在這裡獲取數據

  return <NewsDataTable data={data} />;
}
