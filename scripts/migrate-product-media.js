const sql = require("better-sqlite3");
const db = sql("data.db");

const columns = db.prepare("PRAGMA table_info(product_images)").all().map((column) => column.name);
if (!columns.includes("title")) db.exec("ALTER TABLE product_images ADD COLUMN title TEXT NOT NULL DEFAULT ''");
if (!columns.includes("description")) db.exec("ALTER TABLE product_images ADD COLUMN description TEXT NOT NULL DEFAULT ''");

const product = db.prepare("SELECT id FROM products WHERE slug = ?").get("commerce-design-system");
if (product) {
  const sections = db.prepare("SELECT id, sort_order FROM product_sections WHERE product_id = ? ORDER BY sort_order").all(product.id);
  const sectionId = new Map(sections.map((section) => [section.sort_order, section.id]));
  const remove = db.prepare("DELETE FROM product_images WHERE section_id = ? AND image_role = 'section'");
  const insert = db.prepare("INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order) VALUES (?, ?, ?, ?, ?, ?, 'section', ?)");
  db.transaction(() => {
    const architecture = sectionId.get(1);
    if (architecture) {
      remove.run(architecture);
      [["/projects/design-system-foundations-colors.png", "Design system color foundations", "Foundations", "定義色彩、字級、間距、圓角與互動狀態。"], ["/projects/design-system-atoms-buttons.png", "Button atom specifications", "Atoms", "建立 Button、Icon、Label、Input 等穩定 CSS 基底。"], ["/projects/design-system-molecules-cart.png", "Cart module molecule", "Molecules", "以多個 Atom 組成欄位、搜尋列、價格資訊等任務單元。"], ["/projects/design-system-organisms-search.png", "Search results organism", "Organisms", "將 Molecules 組合成可放入頁面的功能區塊。"]].forEach(([path, alt, title, description], index) => insert.run(product.id, architecture, path, alt, title, description, index));
    }
    const documentation = sectionId.get(3);
    if (documentation) {
      remove.run(documentation);
      insert.run(product.id, documentation, "/projects/design-system-storybook-docs.png", "Component documentation in Storybook", "Storybook Documentation", "集中呈現元件種類、狀態、可調整欄位與原始碼，作為團隊共享的 source of truth。", 0);
    }
  })();
}

console.log("Product media migration complete.");
