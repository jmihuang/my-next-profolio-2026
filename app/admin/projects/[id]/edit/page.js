import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import ProductForm from "../../../components/product-form";

export default function EditProductPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();
  return <><h1 className="mb-6 text-2xl font-semibold">編輯作品</h1><ProductForm product={product} /></>;
}
