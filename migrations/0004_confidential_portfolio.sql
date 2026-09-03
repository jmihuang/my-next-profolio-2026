ALTER TABLE products ADD COLUMN show_in_confidential_portfolio INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_products_confidential_sort
  ON products(show_in_confidential_portfolio, sort_order, id);
