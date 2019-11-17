ALTER TABLE  company ADD COLUMN pricelist_id BIGINT NOT NULL DEFAULT 1;

ALTER TABLE company ADD CONSTRAINT company_pricelist_id_foreign
    FOREIGN KEY (pricelist_id) REFERENCES pricelist(id)
        ON DELETE RESTRICT;