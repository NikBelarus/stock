ALTER TABLE stock_cell ADD COLUMN volume NUMERIC(10,2);
ALTER TABLE stock_cell ADD COLUMN count_on_stock NUMERIC(10,0);
ALTER TABLE stock_cell DROP COLUMN storage_price;