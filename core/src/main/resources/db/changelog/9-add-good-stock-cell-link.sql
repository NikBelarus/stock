ALTER TABLE "good" ADD COLUMN "stock_cell_id" BIGINT;

ALTER TABLE "good"  ADD CONSTRAINT good_stock_cell_id_foreign
        FOREIGN KEY ("stock_cell_id") REFERENCES "stock_cell" ("id")
        ON DELETE CASCADE;