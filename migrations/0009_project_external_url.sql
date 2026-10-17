-- Optional public link shown on a project detail page.
ALTER TABLE products ADD COLUMN external_url TEXT;

UPDATE products
SET external_url = 'https://www.turnone.com.tw/'
WHERE slug = 'turn-one';
