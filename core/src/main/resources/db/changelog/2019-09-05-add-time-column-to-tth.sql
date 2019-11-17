ALTER TABLE tth RENAME COLUMN date TO registration_date;

ALTER TABLE tth ADD COLUMN verification_date TIMESTAMP;
ALTER TABLE tth ADD COLUMN registration_completed_date TIMESTAMP;