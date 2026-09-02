const sql = require("better-sqlite3");

const db = sql("data.db");

function hasColumn(table, column) {
  return db.prepare(`PRAGMA table_info(${table})`).all().some((item) => item.name === column);
}

db.exec(`
  CREATE TABLE IF NOT EXISTS product_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    section_leading_title TEXT NOT NULL DEFAULT '',
    section_title TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_product_sections_product_sort
    ON product_sections(product_id, sort_order, id);
`);

if (!hasColumn("product_images", "section_id")) {
  db.exec("ALTER TABLE product_images ADD COLUMN section_id INTEGER REFERENCES product_sections(id) ON DELETE CASCADE");
}

db.exec(`
  CREATE INDEX IF NOT EXISTS idx_product_images_section_sort
    ON product_images(section_id, sort_order, id);
`);

const product = db.prepare("SELECT id FROM products WHERE slug = ?").get("commerce-design-system");

if (product) {
  const existing = db.prepare("SELECT count(*) AS count FROM product_sections WHERE product_id = ?").get(product.id);
  if (existing.count === 0) {
    const insertSection = db.prepare(`
      INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content)
      VALUES (?, ?, ?, ?, ?)
    `);
    const sections = [
      [0, "The problem", "Consistency cannot depend on individual decisions.", "<p>過去的購物流程中，相似元件常有不同樣式與數值；CSS 也容易在新需求下被覆寫、疊加。當交接者沒有規則可依循，畫面一致性與後續維護便高度依賴個人經驗。</p>"],
      [1, "System architecture", "Nested by purpose, not by page.", "<p>以 Atomic Design 的分層思維建立 Style Guide：最小元件先有穩定規則，再逐層巢狀組合成較完整的任務區塊。頁面只負責組合，不應再各自覆寫內層元件的 CSS；核心樣式由 CSS 基底維護，Tailwind 則只處理少量、明確的版面調整。</p><ol><li><strong>Foundations</strong>：定義色彩、字級、間距、圓角與互動狀態。</li><li><strong>Atoms</strong>：建立 Button、Icon、Label、Input 等穩定 CSS 基底。</li><li><strong>Molecules</strong>：以多個 Atom 組成欄位、搜尋列、價格資訊等任務單元。</li><li><strong>Organisms</strong>：將 Molecules 組合成可放入頁面的功能區塊。</li></ol>"],
      [2, "Component model", "Change the parameters, not the component.", "<p>將按鈕、輸入框與狀態等既有結構收斂到元件 CSS；使用者只需要透過 Props 或預設的 Utility 傳入尺寸、間距、圓角與排列方式。這保留了使用彈性，也避免為了單一情境去改寫或破壞原本元件。</p><pre><code>&lt;Button\n  variant=\"contained\"\n  tone=\"primary\"\n  size=\"lg\"\n  spacing=\"m-10\"\n  radius=\"xl\"\n/&gt;</code></pre>"],
      [3, "Shared documentation", "A source of truth for the team.", "<p>以 Storybook 將元件種類、狀態、可調整欄位與原始碼集中呈現。設計、前端與接手成員不只知道元件「長什麼樣子」，也能理解何時使用、如何調整，並直接複製程式碼投入開發。</p><ul><li>降低元件被任意覆寫的風險。</li><li>讓新需求在既定規則下快速組合。</li><li>提供跨角色可共同使用的文件與程式碼。</li></ul>"],
    ];
    const inserted = db.transaction(() => sections.map((section) => insertSection.run(product.id, ...section)))();
    const sectionId = inserted[3].lastInsertRowid;
    db.prepare(`
      INSERT INTO product_images (product_id, section_id, path, alt, image_role, sort_order)
      VALUES (?, ?, ?, ?, 'section', 0)
    `).run(product.id, sectionId, "/projects/design-system-storybook-docs.png", "Component documentation in Storybook");
  }
}

console.log("Product sections migration complete.");
