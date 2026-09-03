import slugify from "slugify";
import xss from "xss";
import { getCloudflareContext } from "@opennextjs/cloudflare";

let legacyDb;

async function getDb() {
  if (process.env.NODE_ENV === "development") {
    if (!legacyDb) {
      const { default: Database } = await import(/* webpackIgnore: true */ "better-sqlite3");
      legacyDb = new Database("data.db");
    }
    return { kind: "legacy", db: legacyDb };
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.PRODUCTS_DB) throw new Error("PRODUCTS_DB D1 binding is not configured.");
    return { kind: "d1", db: env.PRODUCTS_DB };
  } catch (error) {
    throw error;
  }
}

async function all(query, ...values) {
  const connection = await getDb();
  if (connection.kind === "legacy") return connection.db.prepare(query).all(...values);
  const result = await connection.db.prepare(query).bind(...values).all();
  return result.results || [];
}

async function first(query, ...values) {
  const connection = await getDb();
  if (connection.kind === "legacy") return connection.db.prepare(query).get(...values) || null;
  return (await connection.db.prepare(query).bind(...values).first()) || null;
}

async function run(query, ...values) {
  const connection = await getDb();
  if (connection.kind === "legacy") {
    const result = connection.db.prepare(query).run(...values);
    return { meta: { last_row_id: result.lastInsertRowid } };
  }
  return connection.db.prepare(query).bind(...values).run();
}

function parseJson(value, fallback = []) {
  try { return JSON.parse(value || "[]"); } catch { return fallback; }
}

function toProduct(row, gallery = [], sections = []) {
  if (!row) return null;
  return { ...row, categories: parseJson(row.categories_json), technologies: parseJson(row.technologies_json), notes: parseJson(row.notes_json), image: row.cover_image_path, cardTechnologyLine: row.card_technology_line, gallery: gallery.map((image) => ({ src: image.path, alt: image.alt })), sections };
}

async function getGallery(productId) {
  return all("SELECT path, alt FROM product_images WHERE product_id = ? AND image_role = 'gallery' AND section_id IS NULL ORDER BY sort_order, id", productId);
}

async function getSections(productId) {
  const [sections, images] = await Promise.all([
    all("SELECT * FROM product_sections WHERE product_id = ? ORDER BY sort_order, id", productId),
    all("SELECT id, section_id, path, alt, title, description, sort_order FROM product_images WHERE product_id = ? AND section_id IS NOT NULL ORDER BY sort_order, id", productId),
  ]);
  return sections.map((section) => ({ ...section, content: xss(section.content || ""), images: images.filter((image) => image.section_id === section.id).map((image) => ({ ...image, src: image.path })) }));
}

async function hydrateProduct(row) {
  if (!row) return null;
  const [gallery, sections] = await Promise.all([getGallery(row.id), getSections(row.id)]);
  return toProduct(row, gallery, sections);
}

export async function getAllProducts({ includeDrafts = false } = {}) {
  const where = includeDrafts ? "" : "WHERE status = 'published'";
  return Promise.all((await all(`SELECT * FROM products ${where} ORDER BY sort_order ASC, id ASC`)).map(hydrateProduct));
}

export async function getConfidentialProducts() {
  return Promise.all((await all("SELECT * FROM products WHERE show_in_confidential_portfolio = 1 ORDER BY sort_order ASC, id ASC")).map(hydrateProduct));
}

export async function getFeaturedProducts() {
  return Promise.all((await all("SELECT * FROM products WHERE status = 'published' AND featured_order IS NOT NULL ORDER BY featured_order ASC, id ASC LIMIT 2")).map(hydrateProduct));
}

export async function getProductBySlug(slug, { includeDrafts = false } = {}) {
  const where = includeDrafts ? "slug = ?" : "slug = ? AND (status = 'published' OR show_in_confidential_portfolio = 1)";
  return hydrateProduct(await first(`SELECT * FROM products WHERE ${where}`, slug));
}

export async function getProductById(id) { return hydrateProduct(await first("SELECT * FROM products WHERE id = ?", id)); }

export async function getProductCategories() {
  const categories = new Set();
  for (const product of await getAllProducts()) product.categories.forEach((category) => categories.add(category));
  return ["All", ...categories];
}

function cleanText(value) { return xss(String(value || "").trim()); }
function parseList(value) { return (Array.isArray(value) ? value : String(value || "").split(",")).map(cleanText).filter(Boolean); }
function parseGallery(value) {
  return String(value || "").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const [pathValue, ...altParts] = line.split("|");
    return { src: pathValue.trim(), alt: cleanText(altParts.join("|").trim()) };
  }).filter((image) => image.src.startsWith("/"));
}

function parseSections(value) {
  try {
    const sections = JSON.parse(value || "[]");
    if (!Array.isArray(sections)) return [];
    return sections.map((section) => ({ leadingTitle: cleanText(section.leadingTitle), title: cleanText(section.title), content: xss(String(section.content || "")), images: Array.isArray(section.images) ? section.images.map((image) => ({ path: String(image.path || "").trim(), alt: cleanText(image.alt), title: cleanText(image.title), description: cleanText(image.description), uploadKey: String(image.uploadKey || "") })).filter((image) => image.path.startsWith("/") || image.uploadKey) : [] }));
  } catch { return []; }
}

async function storeCoverImage(file, slug) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) return null;
  // Image storage stays local for this migration. Production uploads need R2 later.
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${slug}-${Date.now()}.${extension}`;
  const relativePath = `/upload/products/${fileName}`;
  const outputDir = path.join(process.cwd(), "public", "upload", "products");
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, fileName), Buffer.from(await file.arrayBuffer()));
  return relativePath;
}

const storeSectionImage = (file, slug) => storeCoverImage(file, `${slug}-section`);
const createSlug = (title) => `${slugify(title, { lower: true, strict: true })}-${Date.now()}`;
async function nextSortOrder() { return (await first("SELECT COALESCE(MAX(sort_order), -1) + 1 AS value FROM products")).value; }

async function normalizeInput(input, existing = {}) {
  const title = cleanText(input.title);
  return { slug: existing.slug || createSlug(title), title, eyebrow: cleanText(input.eyebrow), role: cleanText(input.role), summary: cleanText(input.summary), cardTechnologyLine: cleanText(input.cardTechnologyLine), categoriesJson: JSON.stringify(parseList(input.categories)), technologiesJson: JSON.stringify(parseList(input.technologies)), notesJson: JSON.stringify(parseList(input.notes)), coverImagePath: cleanText(input.coverImagePath), caseStudyKey: cleanText(input.caseStudyKey) || null, sortOrder: existing.sort_order ?? await nextSortOrder(), status: input.status === "draft" ? "draft" : "published", showInConfidentialPortfolio: input.showInConfidentialPortfolio === "true" || input.showInConfidentialPortfolio === "1" || input.showInConfidentialPortfolio === true ? 1 : 0, gallery: parseGallery(input.galleryPaths) };
}

async function replaceGallery(productId, gallery) {
  await run("DELETE FROM product_images WHERE product_id = ? AND image_role = 'gallery' AND section_id IS NULL", productId);
  await Promise.all(gallery.map((image, index) => run("INSERT INTO product_images (product_id, path, alt, image_role, sort_order) VALUES (?, ?, ?, 'gallery', ?)", productId, image.src, image.alt, index)));
}

async function replaceSections(productId, sections, input, slug) {
  const resolved = await Promise.all(sections.map(async (section) => ({ ...section, images: await Promise.all(section.images.map(async (image) => ({ ...image, path: image.uploadKey ? await storeSectionImage(input[image.uploadKey], slug) : image.path }))) })));
  await run("DELETE FROM product_images WHERE section_id IN (SELECT id FROM product_sections WHERE product_id = ?)", productId);
  await run("DELETE FROM product_sections WHERE product_id = ?", productId);
  for (let sectionIndex = 0; sectionIndex < resolved.length; sectionIndex += 1) {
    const section = resolved[sectionIndex];
    const result = await run("INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content) VALUES (?, ?, ?, ?, ?)", productId, sectionIndex, section.leadingTitle, section.title, section.content);
    const sectionId = result.meta.last_row_id;
    await Promise.all(section.images.filter((image) => image.path?.startsWith("/")).map((image, imageIndex) => run("INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order) VALUES (?, ?, ?, ?, ?, ?, 'section', ?)", productId, sectionId, image.path, image.alt, image.title, image.description, imageIndex)));
  }
}

export async function createProduct(input) {
  const product = await normalizeInput(input);
  product.coverImagePath = await storeCoverImage(input.coverImage, product.slug) || product.coverImagePath;
  if (!product.coverImagePath.startsWith("/")) throw new Error("Cover image path is required.");
  const result = await run("INSERT INTO products (slug, title, eyebrow, role, summary, card_technology_line, categories_json, technologies_json, notes_json, cover_image_path, case_study_key, status, show_in_confidential_portfolio, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", product.slug, product.title, product.eyebrow, product.role, product.summary, product.cardTechnologyLine, product.categoriesJson, product.technologiesJson, product.notesJson, product.coverImagePath, product.caseStudyKey, product.status, product.showInConfidentialPortfolio, product.sortOrder);
  await replaceGallery(result.meta.last_row_id, product.gallery);
  await replaceSections(result.meta.last_row_id, parseSections(input.sectionsJson), input, product.slug);
  return getProductById(result.meta.last_row_id);
}

export async function updateProduct(id, input) {
  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found.");
  const product = await normalizeInput(input, existing);
  product.coverImagePath = await storeCoverImage(input.coverImage, product.slug) || product.coverImagePath || existing.image;
  if (!product.coverImagePath.startsWith("/")) throw new Error("Cover image path is required.");
  await run("UPDATE products SET title = ?, eyebrow = ?, role = ?, summary = ?, card_technology_line = ?, categories_json = ?, technologies_json = ?, notes_json = ?, cover_image_path = ?, case_study_key = ?, status = ?, show_in_confidential_portfolio = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", product.title, product.eyebrow, product.role, product.summary, product.cardTechnologyLine, product.categoriesJson, product.technologiesJson, product.notesJson, product.coverImagePath, product.caseStudyKey, product.status, product.showInConfidentialPortfolio, id);
  if (input.galleryPaths !== undefined) await replaceGallery(id, product.gallery);
  if (input.sectionsJson !== undefined) await replaceSections(id, parseSections(input.sectionsJson), input, product.slug);
  return getProductById(id);
}

export async function deleteProduct(id) {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found.");
  await run("DELETE FROM product_images WHERE product_id = ?", id);
  await run("DELETE FROM product_sections WHERE product_id = ?", id);
  await run("DELETE FROM products WHERE id = ?", id);
  return product;
}

export async function moveProduct(id, direction) {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found.");
  const comparison = direction === "up" ? "<" : ">";
  const order = direction === "up" ? "DESC" : "ASC";
  const adjacent = await first(`SELECT * FROM products WHERE sort_order ${comparison} ? ORDER BY sort_order ${order}, id ${order} LIMIT 1`, product.sort_order);
  if (!adjacent) return product;
  await Promise.all([
    run("UPDATE products SET sort_order = ? WHERE id = ?", adjacent.sort_order, product.id),
    run("UPDATE products SET sort_order = ? WHERE id = ?", product.sort_order, adjacent.id),
  ]);
  return getProductById(id);
}

export async function toggleFeaturedProduct(id) {
  const product = await getProductById(id);
  if (!product) throw new Error("Product not found.");
  if (product.featured_order !== null && product.featured_order !== undefined) {
    await run("UPDATE products SET featured_order = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ?", id);
    return getProductById(id);
  }
  const featuredCount = (await first("SELECT COUNT(*) AS value FROM products WHERE featured_order IS NOT NULL")).value;
  if (featuredCount >= 2) throw new Error("首頁最多只能置頂兩個作品，請先取消其中一個。");
  await run("UPDATE products SET featured_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", featuredCount + 1, id);
  return getProductById(id);
}
