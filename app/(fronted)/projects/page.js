import React, { Suspense } from "react";
import Link from "next/link";
import ProductGrid from "./product-grid";
import ProductItem from "./product-item";
import LoadingSpinner from "@/components/loading-spinner";
import { getProducts } from "@/lib/catalogue";
async function LoadProducts() {
  const products = await getProducts();
  return products.map((product, idx) => {
    return <ProductItem key={idx} id={idx} {...product} />;
  });
}

export default function Product() {
  return (
    <div className="product">
      <h1>All Products</h1>
      <ul className="flex gap-2">
        <li>
          <Link href="/projects/product-1">巧克力酥</Link>
        </li>
        <li>
          <Link href="/projects/product-2">草莓甜心派</Link>
        </li>
        <li>
          <Link href="/projects/product-3">花生好事蜜糖吐司</Link>
        </li>
      </ul>
      <ProductGrid>
        <Suspense fallback={<LoadingSpinner />}>
          <LoadProducts />
        </Suspense>
      </ProductGrid>
    </div>
  );
}
