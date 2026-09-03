const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Database = require("better-sqlite3");

const projectRoot = path.resolve(__dirname, "..");
const db = new Database(path.join(projectRoot, "data.db"));

function loadCurrentProjects() {
  const sourcePath = path.join(
    projectRoot,
    "app",
    "(fronted)",
    "projects",
    "project-data.js",
  );
  const source = fs
    .readFileSync(sourcePath, "utf8")
    .replace("export const PROJECTS =", "module.exports.PROJECTS =")
    .replace("export const PROJECT_CATEGORIES =", "module.exports.PROJECT_CATEGORIES =")
    .replace("export function getProject", "function getProject");
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.runInNewContext(source, sandbox, { filename: sourcePath });
  return sandbox.module.exports.PROJECTS;
}

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    eyebrow TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    card_technology_line TEXT NOT NULL DEFAULT '',
    categories_json TEXT NOT NULL DEFAULT '[]',
    technologies_json TEXT NOT NULL DEFAULT '[]',
    notes_json TEXT NOT NULL DEFAULT '[]',
    cover_image_path TEXT NOT NULL,
    case_study_key TEXT,
    status TEXT NOT NULL DEFAULT 'published',
    show_in_confidential_portfolio INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    path TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    image_role TEXT NOT NULL DEFAULT 'gallery',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_products_status_published_at
    ON products(status, published_at DESC);
  CREATE INDEX IF NOT EXISTS idx_product_images_product_sort
    ON product_images(product_id, sort_order);
`);

const insertProduct = db.prepare(`
  INSERT INTO products (
    slug, title, eyebrow, role, summary, card_technology_line,
    categories_json, technologies_json, notes_json, cover_image_path, case_study_key
  ) VALUES (
    @slug, @title, @eyebrow, @role, @summary, @cardTechnologyLine,
    @categoriesJson, @technologiesJson, @notesJson, @coverImagePath, @caseStudyKey
  ) ON CONFLICT(slug) DO NOTHING
`);

const getProductId = db.prepare("SELECT id FROM products WHERE slug = ?");
const insertImage = db.prepare(`
  INSERT INTO product_images (product_id, path, alt, image_role, sort_order)
  SELECT @productId, @path, @alt, 'gallery', @sortOrder
  WHERE NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_id = @productId AND path = @path
  )
`);

const migrate = db.transaction(() => {
  for (const project of loadCurrentProjects()) {
    insertProduct.run({
      ...project,
      categoriesJson: JSON.stringify(project.categories || []),
      technologiesJson: JSON.stringify(project.technologies || []),
      notesJson: JSON.stringify(project.notes || []),
      coverImagePath: project.image,
      caseStudyKey: project.slug,
    });

    const product = getProductId.get(project.slug);
    for (const [sortOrder, image] of (project.gallery || []).entries()) {
      insertImage.run({
        productId: product.id,
        path: image.src,
        alt: image.alt || project.title,
        sortOrder,
      });
    }
  }
});

migrate();
console.log("Products migration completed without overwriting existing records.");
db.close();
