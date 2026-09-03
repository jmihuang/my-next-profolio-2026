-- Replace the remote campaign artwork with project-owned portfolio assets.
UPDATE products
SET cover_image_path = '/projects/hncb-sny/hncb-sny-rwd-mockup.png',
    updated_at = CURRENT_TIMESTAMP
WHERE slug = 'hncb-sny-welcome';

DELETE FROM product_images
WHERE product_id = (SELECT id FROM products WHERE slug = 'hncb-sny-welcome')
  AND path = 'https://lililala0112.github.io/bank/images/title.png';

INSERT INTO product_images (
  product_id, section_id, path, alt, title, description, image_role, sort_order
)
SELECT
  products.id,
  product_sections.id,
  '/projects/hncb-sny/hncb-sny-home.png',
  'SnY 迎新雙重送活動首頁',
  'Landing page',
  '以雙活動入口、角色插畫與明確 CTA 建立迎新活動的第一印象。',
  'section',
  0
FROM products
JOIN product_sections ON product_sections.product_id = products.id
WHERE products.slug = 'hncb-sny-welcome'
  AND product_sections.section_leading_title = 'Project overview'
  AND NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_images.product_id = products.id
      AND product_images.path = '/projects/hncb-sny/hncb-sny-home.png'
  );

INSERT INTO product_images (
  product_id, section_id, path, alt, title, description, image_role, sort_order
)
SELECT
  products.id,
  product_sections.id,
  '/projects/hncb-sny/hncb-sny-step-1.png',
  'SnY 迎新雙重送第一重活動頁',
  'Welcome flow',
  '以三步驟行動引導與 App 畫面，說明舊戶推薦新戶的參與流程。',
  'section',
  1
FROM products
JOIN product_sections ON product_sections.product_id = products.id
WHERE products.slug = 'hncb-sny-welcome'
  AND product_sections.section_leading_title = 'Project overview'
  AND NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_images.product_id = products.id
      AND product_images.path = '/projects/hncb-sny/hncb-sny-step-1.png'
  );

INSERT INTO product_images (
  product_id, section_id, path, alt, title, description, image_role, sort_order
)
SELECT
  products.id,
  product_sections.id,
  '/projects/hncb-sny/hncb-sny-step-2.png',
  'SnY 迎新雙重送第二重活動頁',
  'Reward experience',
  '以獎項、活動條件與行動按鈕收斂新戶抽獎資訊。',
  'section',
  2
FROM products
JOIN product_sections ON product_sections.product_id = products.id
WHERE products.slug = 'hncb-sny-welcome'
  AND product_sections.section_leading_title = 'Project overview'
  AND NOT EXISTS (
    SELECT 1 FROM product_images
    WHERE product_images.product_id = products.id
      AND product_images.path = '/projects/hncb-sny/hncb-sny-step-2.png'
  );
