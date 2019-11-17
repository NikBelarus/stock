ALTER TABLE tth DROP COLUMN consignment_num;

ALTER TABlE tth ADD COLUMN company_id BIGINT;
ALTER TABLE tth ADD constraint tth_company_foreign
    FOREIGN KEY (company_id) REFERENCES company(id)
    ON DELETE SET NULL;