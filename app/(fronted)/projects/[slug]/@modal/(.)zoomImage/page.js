import React from "react";
import Image from "next/image";
import { getProduct } from "@/lib/catalogue";
import { notFound } from "next/navigation";
import Modal from "@/components/modal";

export default function InterceptedZoomInImage({ params }) {
  const newsItemSlug = params.slug;
  const productItem = getProduct(newsItemSlug);
  if (!productItem) {
    notFound();
  }

  return (
    <>
      <Modal>
        <div className="fullscreen-image">
          <Image
            src={productItem.image}
            alt={productItem.alt}
            fill
            className="object-contain"
          />
        </div>
      </Modal>
    </>
  );
}
