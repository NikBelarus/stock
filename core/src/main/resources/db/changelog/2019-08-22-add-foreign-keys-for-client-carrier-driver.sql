ALTER TABLE tth ADD COLUMN number_in_company BIGINT NOT NULL;

ALTER TABLE client ADD COLUMN company_id BIGINT NOT NULL;

ALTER TABLE client ADD CONSTRAINT client_company_id_foreign
    FOREIGN KEY ("company_id") REFERENCES company(id)
    ON DELETE SET NULL;

ALTER TABLE carrier ADD COLUMN company_id BIGINT NOT NULL;

ALTER TABLE carrier ADD CONSTRAINT carrier_company_id_foreign
    FOREIGN KEY ("company_id") REFERENCES company(id)
    ON DELETE SET NULL;

ALTER TABLE driver ADD COLUMN  carrier_id BIGINT NOT NULL;

ALTER TABLE driver ADD CONSTRAINT driver_carrier_id_foreign
    FOREIGN KEY (carrier_id) REFERENCES carrier(id)
    ON DELETE SET NULL;

ALTER TABLE client ADD COLUMN email VARCHAR(100);

