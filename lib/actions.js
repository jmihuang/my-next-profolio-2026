//form submit

"use server";
import { saveProduct } from "./catalogue";
import { saveNews } from "./news";
import { createProduct, deleteProduct, moveProduct, updateProduct } from "./products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadProduct(formData) {
  const products = {};
  for (const [key, value] of formData.entries()) {
    products[key] = value;
  }
  await saveProduct(products);
}

export async function uploadNews(formData) {
  const News = {};
  for (const [key, value] of formData.entries()) {
    News[key] = value;
  }
  const response = await saveNews(News);
  return response;
}

function productPayload(formData) {
  return Object.fromEntries(formData.entries());
}

export async function createProductAction(formData) {
  const product = await createProduct(productPayload(formData));
  revalidatePath("/projects");
  redirect(`/admin/projects/${product.id}/edit`);
}

export async function saveProductSectionsAction(id, formData) {
  const product = await updateProduct(id, productPayload(formData));
  revalidatePath("/projects");
  revalidatePath(`/projects/${product.slug}`);
  revalidatePath(`/admin/projects/${id}/edit`);
  return product;
}

export async function updateProductAction(id, formData) {
  const product = await updateProduct(id, productPayload(formData));
  revalidatePath("/projects");
  revalidatePath(`/projects/${product.slug}`);
  revalidatePath(`/admin/projects/${id}/edit`);
  return product;
}

export async function deleteProductAction(id) {
  const product = deleteProduct(id);
  revalidatePath("/projects");
  revalidatePath(`/projects/${product.slug}`);
}

export async function moveProductAction(id, direction) {
  const product = moveProduct(id, direction);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return product;
}
