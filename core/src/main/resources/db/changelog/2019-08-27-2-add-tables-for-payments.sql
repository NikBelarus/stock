CREATE TABLE IF NOT EXISTS company_payments
(
    id         BIGSERIAL      NOT NULL,
    date       timestamp      NOT NULL,
    company_id bigint         NOT NULL,
    sum        numeric(10, 2) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE company_payments ADD CONSTRAINT payments_company FOREIGN KEY (company_id) REFERENCES company(id);

ALTER TABLE company DROP COLUMN month_payment;

CREATE TABLE IF NOT EXISTS pricelist
(
    common_price    NUMERIC(10, 2) NOT NULL,
    one_stock_price NUMERIC(10, 2) NOT NULL
);

INSERT INTO pricelist VALUES (100, 50);