import React from "react";
import { getNews } from "@/lib/news";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const news = await getNews(slug);

  if (!news) {
    notFound();
    return;
  }

  return {
    title: news.title,
    description: news.title,
  };
}
export default async function NewsDetail({ params }) {
  const slug = params.slug;
  const news = await getNews(slug);

  return (
    <div className="news-content">
      <h1 className="title">NEWS</h1>
      <h4 className="page-title">{news.title}</h4>
      <div className="divider"></div>
      <div
        className="body editor-zone"
        dangerouslySetInnerHTML={{
          __html: news.content,
        }}
      ></div>
    </div>
  );
}
