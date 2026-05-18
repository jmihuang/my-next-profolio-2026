import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/catalogue";
import { notFound } from "next/navigation";

export default function ZoomInImage({ params }) {
  const newsItemSlug = params.slug;
  const productItem = getProduct(newsItemSlug);
  if (!productItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <Image
        src={productItem.image}
        alt={productItem.alt}
        fill
        className="object-contain"
      />
    </div>
  );
}
