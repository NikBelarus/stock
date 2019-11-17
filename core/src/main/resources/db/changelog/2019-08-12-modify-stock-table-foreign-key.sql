ALTER TABLE stock
    DROP CONSTRAINT stock_company_id_foreign,
    ADD CONSTRAINT stock_company_id_foreign
        FOREIGN KEY ("company_id") REFERENCES "company" ("id")
            ON DELETE CASCADE;