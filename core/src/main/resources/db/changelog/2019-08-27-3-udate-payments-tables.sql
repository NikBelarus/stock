ALTER TABLE company_payments ADD COLUMN deleted BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE pricelist ADD COLUMN deleted BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE company_payments RENAME TO company_payment;

ALTER TABLE pricelist ADD COLUMN id bigserial NOT NULL;

ALTER TABLE pricelist ADD PRIMARY KEY (id);

