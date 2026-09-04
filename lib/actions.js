//form submit

"use server";
import { saveProduct } from "./catalogue";
import { saveNews } from "./news";
import { createProduct, deleteProduct, moveProduct, toggleFeaturedProduct, updateProduct } from "./products";
import { createExperience, deleteExperience, moveExperience, updateExperience } from "./experiences";
import { updateContactCta } from "./contact-cta";
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

function revalidateProductPortfolio(product) {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/projects-all");
  revalidatePath("/projects-confidential");
  revalidatePath(`/projects/${product.slug}`);
  revalidatePath("/sitemap.xml");
}

export async function createProductAction(formData) {
  const product = await createProduct(productPayload(formData));
  revalidateProductPortfolio(product);
  redirect(`/admin/projects/${product.id}/edit`);
}

export async function saveProductSectionsAction(id, formData) {
  const product = await updateProduct(id, productPayload(formData));
  revalidateProductPortfolio(product);
  revalidatePath(`/admin/projects/${id}/edit`);
  return product;
}

export async function updateProductAction(id, formData) {
  const product = await updateProduct(id, productPayload(formData));
  revalidateProductPortfolio(product);
  revalidatePath(`/admin/projects/${id}/edit`);
  return product;
}

export async function deleteProductAction(id) {
  const product = await deleteProduct(id);
  revalidateProductPortfolio(product);
}

export async function moveProductAction(id, direction) {
  const product = await moveProduct(id, direction);
  revalidateProductPortfolio(product);
  revalidatePath("/admin/projects");
  return product;
}

export async function toggleFeaturedProductAction(id) {
  const product = await toggleFeaturedProduct(id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  return product;
}

function revalidateExperiencePortfolio() {
  revalidatePath("/experience");
  revalidatePath("/cv");
}

export async function createExperienceAction(formData) {
  const experience = await createExperience(productPayload(formData));
  revalidateExperiencePortfolio();
  redirect(`/admin/experience/${experience.id}/edit`);
}

export async function updateExperienceAction(id, formData) {
  const experience = await updateExperience(id, productPayload(formData));
  revalidateExperiencePortfolio();
  revalidatePath(`/admin/experience/${id}/edit`);
  return experience;
}

export async function deleteExperienceAction(id) {
  await deleteExperience(id);
  revalidateExperiencePortfolio();
}

export async function moveExperienceAction(id, direction) {
  await moveExperience(id, direction);
  revalidateExperiencePortfolio();
  revalidatePath("/admin/experience");
}

export async function updateContactCtaAction(formData) {
  const contactCta = await updateContactCta(productPayload(formData));
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/cv");
  revalidatePath("/experience");
  revalidatePath("/admin/contact-cta");
  return contactCta;
}
