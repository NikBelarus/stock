ALTER TABLE good ADD COLUMN carrier_id BIGINT;

ALTER TABLE good ADD CONSTRAINT good_carrier_foreign
    FOREIGN KEY (carrier_id) REFERENCES carrier(id)
    ON DELETE SET NULL;

ALTER TABLE good DROP COLUMN client_id;
ALTER TABLE tth DROP COLUMN  client_id;

DROP TABLE client;