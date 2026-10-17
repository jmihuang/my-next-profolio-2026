-- Turn One corporate website portfolio entry.
INSERT INTO products (
  slug, title, eyebrow, role, summary, card_technology_line,
  categories_json, technologies_json, notes_json, cover_image_path,
  status, show_in_confidential_portfolio, sort_order
)
SELECT
  'turn-one',
  'Turn One',
  'Corporate Website · UX/UI · Frontend',
  'Communication & Planning · UI/UX Design · Frontend Development',
  '為 Turn One 規劃並設計企業形象網站，將雲端與網路服務內容整理為清楚的資訊架構，並完成響應式前端實作。',
  'Website Planning · UI/UX · Responsive Frontend',
  '["Branding Web"]',
  '["Communication & Planning","Information Architecture","UI/UX Design","Responsive Frontend"]',
  '["需求溝通與網站內容規劃","網站介面與資訊呈現設計","響應式前端工程實作"]',
  '/projects/turn-one/turn-one-desktop.png',
  'published',
  0,
  4
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'turn-one');

INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content)
SELECT id, 0, 'Project overview', 'A digital introduction for cloud and network services.',
  '<p>Turn One 的企業網站以雲端、全球網路與相關服務為主要內容。我負責從需求溝通與內容規劃開始，將服務資訊轉換為可閱讀、可導覽的網站架構。</p><p><a href="https://www.turnone.com.tw/">View live website ↗</a></p>'
FROM products
WHERE slug = 'turn-one'
  AND NOT EXISTS (SELECT 1 FROM product_sections WHERE product_id = products.id AND sort_order = 0);

INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content)
SELECT id, 1, 'Design & build', 'Plan the experience, then carry it through to the interface.',
  '<p>依據服務內容與網站使用情境規劃頁面層級與資訊呈現，完成 UI/UX 設計與前端工程，讓視覺、內容與互動在同一套網站體驗中延續。</p>'
FROM products
WHERE slug = 'turn-one'
  AND NOT EXISTS (SELECT 1 FROM product_sections WHERE product_id = products.id AND sort_order = 1);

INSERT INTO product_sections (product_id, sort_order, section_leading_title, section_title, content)
SELECT id, 2, 'Responsive website', 'A consistent service story across desktop and mobile.',
  '<p>以響應式版面調整內容層級、版型與資訊密度，讓桌機與手機都能清楚瀏覽服務重點與網站內容。</p>'
FROM products
WHERE slug = 'turn-one'
  AND NOT EXISTS (SELECT 1 FROM product_sections WHERE product_id = products.id AND sort_order = 2);

INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order)
SELECT product.id, section.id, '/projects/turn-one/turn-one-desktop.png', 'Turn One desktop website screenshot', 'Desktop website', '以內容分區與視覺節奏呈現雲端與網路服務資訊。', 'section', 0
FROM products AS product
JOIN product_sections AS section ON section.product_id = product.id AND section.sort_order = 2
WHERE product.slug = 'turn-one'
  AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product.id AND path = '/projects/turn-one/turn-one-desktop.png');

INSERT INTO product_images (product_id, section_id, path, alt, title, description, image_role, sort_order)
SELECT product.id, section.id, '/projects/turn-one/turn-one-mobile.png', 'Turn One mobile website screenshot', 'Mobile website', '手機版延續相同的服務內容與閱讀層級。', 'section', 1
FROM products AS product
JOIN product_sections AS section ON section.product_id = product.id AND section.sort_order = 2
WHERE product.slug = 'turn-one'
  AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = product.id AND path = '/projects/turn-one/turn-one-mobile.png');
