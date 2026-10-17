-- Remove the Turn One responsive showcase section and its images.
DELETE FROM product_images
WHERE section_id IN (
  SELECT id
  FROM product_sections
  WHERE product_id = (SELECT id FROM products WHERE slug = 'turn-one')
    AND sort_order = 2
);

DELETE FROM product_sections
WHERE product_id = (SELECT id FROM products WHERE slug = 'turn-one')
  AND sort_order = 2;
