-- Add the HNCB SnY welcome campaign case study without duplicating the record.
INSERT INTO products (
  slug, title, eyebrow, role, summary, card_technology_line,
  categories_json, technologies_json, notes_json, cover_image_path,
  case_study_key, status, sort_order
)
SELECT
  'hncb-sny-welcome',
  'SnY 迎新雙重送｜華南銀行',
  'Banking Campaign · Interactive Website',
  'Visual Design · Frontend Development · Motion Design',
  '為華南銀行 SnY 迎新雙重送製作活動網站，負責視覺設計、前端切版與動態效果，將迎新禮與抽獎活動整理為具主題感與引導性的互動體驗。',
  'HTML · CSS · jQuery · GSAP · MotionPath',
  '["Branding Web"]',
  '["Visual Design", "HTML", "CSS", "jQuery", "GSAP", "MotionPath"]',
  '["活動主視覺與頁面設計", "RWD 前端切版與互動導覽", "GSAP / MotionPath 動態效果"]',
  'https://lililala0112.github.io/bank/images/title.png',
  NULL,
  'published',
  COALESCE((SELECT MAX(sort_order) + 1 FROM products), 0)
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE slug = 'hncb-sny-welcome'
);

INSERT INTO product_sections (
  product_id, sort_order, section_leading_title, section_title, content
)
SELECT
  products.id,
  0,
  'Project overview',
  '為迎新活動打造具節奏感的數位互動體驗。',
  '<p>以銀行迎新活動為主題，整合活動資訊、任務引導與抽獎內容，讓使用者能依序理解並參與整體活動。</p><h3>負責工作</h3><ul><li>活動主視覺與頁面設計</li><li>RWD 前端切版與互動導覽</li><li>使用 jQuery、GSAP 與 MotionPath 製作動態效果</li></ul><p><a href="https://lililala0112.github.io/bank/index.html" target="_blank" rel="noreferrer">View live site ↗</a></p>'
FROM products
WHERE products.slug = 'hncb-sny-welcome'
  AND NOT EXISTS (
    SELECT 1 FROM product_sections
    WHERE product_sections.product_id = products.id
      AND product_sections.section_leading_title = 'Project overview'
  );

INSERT INTO product_images (
  product_id, section_id, path, alt, title, description, image_role, sort_order
)
SELECT
  products.id,
  product_sections.id,
  'https://lililala0112.github.io/bank/images/title.png',
  '華南銀行 SnY 迎新雙重送活動主視覺',
  'Campaign key visual',
  '以活動主視覺延伸頁面氛圍與互動節奏。',
  'section',
  0
FROM products
JOIN product_sections ON product_sections.product_id = products.id
WHERE products.slug = 'hncb-sny-welcome'
  AND product_sections.section_leading_title = 'Project overview'
  AND NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_images.product_id = products.id
      AND product_images.path = 'https://lililala0112.github.io/bank/images/title.png'
  );
