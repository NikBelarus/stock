ALTER TABLE company ADD COLUMN blocked BOOLEAN DEFAULT FALSE;
ALTER TABLE company ADD COLUMN month_payment NUMERIC(10,2);
ALTER TABLE company ADD COLUMN last_payment_date TIMESTAMP;
