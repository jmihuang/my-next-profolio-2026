"use server";
import React from "react";
import { getAllNews } from "@/lib/news";
import NewListTable from "../components/new-list-table";

export default async function DataIndex() {
  const data = await getAllNews(); // 在這裡獲取數據
  const dataWithKey = data.map((items, idx) => ({
    ...items,
    key: idx + 1,
  }));

  return <NewListTable data={dataWithKey} />;
}
