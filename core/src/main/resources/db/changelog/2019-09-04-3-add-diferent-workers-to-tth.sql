ALTER TABLE tth ADD COLUMN dispatcher_id BIGINT DEFAULT NULL;
ALTER TABLE tth ADD CONSTRAINT tth_dispatcher_foreign
    FOREIGN KEY (dispatcher_id) REFERENCES stock_app_user(id);

ALTER TABLE tth ADD COLUMN controller_id BIGINT DEFAULT NULL;
ALTER TABLE tth ADD CONSTRAINT tth_controller_foreign
    FOREIGN KEY (controller_id) REFERENCES stock_app_user(id);