const sql = require("better-sqlite3");
const db = sql("data.db");
const columns = db.prepare("PRAGMA table_info(products)").all().map((column) => column.name);

if (!columns.includes("sort_order")) {
  db.exec("ALTER TABLE products ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0");
  const rows = db.prepare("SELECT id FROM products ORDER BY published_at DESC, id DESC").all();
  const update = db.prepare("UPDATE products SET sort_order = ? WHERE id = ?");
  db.transaction(() => rows.forEach((row, index) => update.run(index, row.id)))();
}

db.exec("CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products(sort_order, id)");
console.log("Product ordering migration complete.");
