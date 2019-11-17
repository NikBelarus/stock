ALTER TABLE good RENAME COLUMN tth_id TO input_tth_id;

ALTER TABLE good
    ADD COLUMN output_tth_id BIGINT;
ALTER TABLE good
    ADD CONSTRAINT good_output_tth_foreign
        FOREIGN KEY (output_tth_id)
            REFERENCES tth (id) ON DELETE SET NULL;