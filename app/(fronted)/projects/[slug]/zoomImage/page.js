import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

export default function ZoomInImage({ params }) {
  const newsItemSlug = params.slug;
  const productItem = getProductBySlug(newsItemSlug);
  if (!productItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <Image
        src={productItem.image}
        alt={productItem.title}
        fill
        className="object-contain"
      />
    </div>
  );
}
