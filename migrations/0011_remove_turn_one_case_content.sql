-- Turn One links directly to its live website and does not use a portfolio detail page.
DELETE FROM product_images
WHERE product_id = (SELECT id FROM products WHERE slug = 'turn-one');

DELETE FROM product_sections
WHERE product_id = (SELECT id FROM products WHERE slug = 'turn-one');
