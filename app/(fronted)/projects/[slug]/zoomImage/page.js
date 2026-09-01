import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

function selectedImage(product, requestedImage) {
  const candidates = [
    { src: product.image, alt: product.title },
    ...product.sections.flatMap((section) => section.images.map((image) => ({ src: image.src, alt: image.alt || image.title || product.title }))),
  ];
  return candidates.find((image) => image.src === requestedImage) || candidates[0];
}

export const dynamic = "force-dynamic";

export default async function ZoomInImage({ params, searchParams }) {
  const newsItemSlug = params.slug;
  const productItem = await getProductBySlug(newsItemSlug);
  if (!productItem) {
    notFound();
  }
  const image = selectedImage(productItem, searchParams?.image);

  return (
    <div className="relative min-h-screen bg-[#F7F6F2] p-6 md:p-12">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-contain p-6 md:p-12"
      />
    </div>
  );
}
