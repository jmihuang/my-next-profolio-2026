import fs from "node:fs/promises";
import path from "node:path";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("data.db");

function parseJson(value, fallback = []) {
  try {
    return JSON.parse(value || "[]");
  } catch {
    return fallback;
  }
}

function toProduct(row, gallery = [], sections = []) {
  if (!row) return null;
  return {
    ...row,
    categories: parseJson(row.categories_json),
    technologies: parseJson(row.technologies_json),
    notes: parseJson(row.notes_json),
    image: row.cover_image_path,
    cardTechnologyLine: row.card_technology_line,
    gallery: gallery.map((image) => ({ src: image.path, alt: image.alt })),
    sections,
  };
}

function getGallery(productId) {
  return db
    .prepare(
      "SELECT path, alt FROM product_images WHERE product_id = ? AND image_role = 'gallery' AND section_id IS NULL ORDER BY sort_order, id",
    )
    .all(productId);
}

function getSections(productId) {
  const sections = db.prepare("SELECT * FROM product_sections WHERE product_id = ? ORDER BY sort_order, id").all(productId);
  const images = db.prepare("SELECT id, section_id, path, alt, title, description, sort_order FROM product_images WHERE product_id = ? AND section_id IS NOT NULL ORDER BY sort_order, id").all(productId);
  return sections.map((section) => ({
    ...section,
    content: xss(section.content || ""),
    images: images.filter((image) => image.section_id === section.id).map((image) => ({ ...image, src: image.path })),
  }));
}

export async function getAllProducts({ includeDrafts = false } = {}) {
  const where = includeDrafts ? "" : "WHERE status = 'published'";
  const rows = db
    .prepare(`SELECT * FROM products ${where} ORDER BY published_at DESC, id DESC`)
    .all();
  return rows.map((row) => toProduct(row, getGallery(row.id), getSections(row.id)));
}

export function getProductBySlug(slug, { includeDrafts = false } = {}) {
  const where = includeDrafts ? "slug = ?" : "slug = ? AND status = 'published'";
  const row = db.prepare(`SELECT * FROM products WHERE ${where}`).get(slug);
  return toProduct(row, row ? getGallery(row.id) : [], row ? getSections(row.id) : []);
}

export function getProductById(id) {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  return toProduct(row, row ? getGallery(row.id) : [], row ? getSections(row.id) : []);
}

export async function getProductCategories() {
  const categories = new Set();
  for (const product of await getAllProducts()) {
    product.categories.forEach((category) => categories.add(category));
  }
  return ["All", ...categories];
}

function cleanText(value) {
  return xss(String(value || "").trim());
}

function parseList(value) {
  if (Array.isArray(value)) return value;
  return String(value || "")
    .split(",")
    .map((item) => cleanText(item))
    .filter(Boolean);
}

function parseGallery(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [pathValue, ...altParts] = line.split("|");
      return { src: pathValue.trim(), alt: cleanText(altParts.join("|").trim()) };
    })
    .filter((image) => image.src.startsWith("/"));
}

function parseSections(value) {
  try {
    const sections = JSON.parse(value || "[]");
    if (!Array.isArray(sections)) return [];
    return sections.map((section) => ({
      leadingTitle: cleanText(section.leadingTitle),
      title: cleanText(section.title),
      content: xss(String(section.content || "")),
      images: Array.isArray(section.images) ? section.images.map((image) => ({
        path: String(image.path || "").trim(),
        alt: cleanText(image.alt),
        title: cleanText(image.title),
        description: cleanText(image.description),
        uploadKey: String(image.uploadKey || ""),
      })).filter((image) => image.path.startsWith("/") || image.uploadKey) : [],
    }));
  } catch {
    return [];
  }
}

async function storeCoverImage(file, slug) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) return null;
  const extension = file.name.split(".").pop()?.toLowerCase() || "png";
  const fileName = `${slug}-${Date.now()}.${extension}`;
  const relativePath = `/upload/products/${fileName}`;
  const outputDir = path.join(process.cwd(), "public", "upload", "products");
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, fileName), Buffer.from(await file.arrayBuffer()));
  return relativePath;
}

async function storeSectionImage(file, slug) {
  return storeCoverImage(file, `${slug}-section`);
}

function createSlug(title) {
  return `${slugify(title, { lower: true, strict: true })}-${Date.now()}`;
}

function normalizeInput(input, existing = {}) {
  const title = cleanText(input.title);
  return {
    slug: existing.slug || createSlug(title),
    title,
    eyebrow: cleanText(input.eyebrow),
    role: cleanText(input.role),
    summary: cleanText(input.summary),
    cardTechnologyLine: cleanText(input.cardTechnologyLine),
    categoriesJson: JSON.stringify(parseList(input.categories)),
    technologiesJson: JSON.stringify(parseList(input.technologies)),
    notesJson: JSON.stringify(parseList(input.notes)),
    coverImagePath: cleanText(input.coverImagePath),
    caseStudyKey: cleanText(input.caseStudyKey) || null,
    status: input.status === "draft" ? "draft" : "published",
    gallery: parseGallery(input.galleryPaths),
  };
}

function replaceGallery(productId, gallery) {
  db.prepare("DELETE FROM product_images WHERE product_id = ?").run(productId);
  const insert = db.prepare(
    "INSERT INTO product_images (product_id, path, alt, image_role, sort_order) VALUES (?, ?, ?, 'gallery', ?)",
  );
  gallery.forEach((image, index) => insert.run(productId, image.src, image.alt, index));
}

async function replaceSections(productId, sections, input, slug) {
  const resolved = await Promise.all(sections.map(async (section) => ({
    ...section,
    images: await Promise.all(section.images.map(async (image) => ({
      ...image,
      path: image.uploadKey ? await storeSectionImage(input[image.uploadKey], slug) : image.path,
    }))),
  })));

  const removeImages = db.prepare("DELETE FROM product_images WHERE section_id IN (SELECT id FROM product_sections WHERE product_id = ?)");
  const removeSections = db.prepare("DELETE FROM product_sections WHERE product_id = ?");
  const insertSection = db.prepare(`INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content) VALUES (?, ?, ?, ?, ?)`);
  const insertImage = db.prepare(`INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order) VALUES (?, ?, ?, ?, ?, ?, 'section', ?)`);

  db.transaction(() => {
    removeImages.run(productId);
    removeSections.run(productId);
    resolved.forEach((section, sectionIndex) => {
      const result = insertSection.run(productId, sectionIndex, section.leadingTitle, section.title, section.content);
      section.images.filter((image) => image.path?.startsWith("/")).forEach((image, imageIndex) => {
        insertImage.run(productId, result.lastInsertRowid, image.path, image.alt, image.title, image.description, imageIndex);
      });
    });
  })();
}

export async function createProduct(input) {
  const product = normalizeInput(input);
  const uploadedPath = await storeCoverImage(input.coverImage, product.slug);
  product.coverImagePath = uploadedPath || product.coverImagePath;
  if (!product.coverImagePath.startsWith("/")) throw new Error("Cover image path is required.");

  const result = db
    .prepare(`INSERT INTO products (
      slug, title, eyebrow, role, summary, card_technology_line,
      categories_json, technologies_json, notes_json, cover_image_path,
      case_study_key, status
    ) VALUES (
      @slug, @title, @eyebrow, @role, @summary, @cardTechnologyLine,
      @categoriesJson, @technologiesJson, @notesJson, @coverImagePath,
      @caseStudyKey, @status
    )`)
    .run(product);
  replaceGallery(result.lastInsertRowid, product.gallery);
  await replaceSections(result.lastInsertRowid, parseSections(input.sectionsJson), input, product.slug);
  return getProductById(result.lastInsertRowid);
}

export async function updateProduct(id, input) {
  const existing = getProductById(id);
  if (!existing) throw new Error("Product not found.");
  const product = normalizeInput(input, existing);
  const uploadedPath = await storeCoverImage(input.coverImage, product.slug);
  product.coverImagePath = uploadedPath || product.coverImagePath || existing.image;
  if (!product.coverImagePath.startsWith("/")) throw new Error("Cover image path is required.");

  db.prepare(`UPDATE products SET
    title = @title, eyebrow = @eyebrow, role = @role, summary = @summary,
    card_technology_line = @cardTechnologyLine, categories_json = @categoriesJson,
    technologies_json = @technologiesJson, notes_json = @notesJson,
    cover_image_path = @coverImagePath, case_study_key = @caseStudyKey,
    status = @status, updated_at = CURRENT_TIMESTAMP
    WHERE id = @id`).run({ ...product, id });
  if (input.galleryPaths !== undefined) replaceGallery(id, product.gallery);
  if (input.sectionsJson !== undefined) await replaceSections(id, parseSections(input.sectionsJson), input, product.slug);
  return getProductById(id);
}

export function deleteProduct(id) {
  const product = getProductById(id);
  if (!product) throw new Error("Product not found.");
  db.prepare("DELETE FROM product_images WHERE product_id = ?").run(id);
  db.prepare("DELETE FROM product_sections WHERE product_id = ?").run(id);
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return product;
}
