import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.uniudesign.com";
  const products = await getAllProducts();

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    ...products.map((product) => ({ url: `${baseUrl}/projects/${product.slug}`, lastModified: product.updated_at || product.published_at })),
  ];
}
