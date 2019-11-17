ALTER TABLE cancellation_act
    DROP CONSTRAINT "Cancellation_acts_stock_id_foreign",
    ADD CONSTRAINT cancellation_act_stock_id_foreign
        FOREIGN KEY ("stock_id") REFERENCES "stock" ("id")
        ON DELETE CASCADE;



ALTER TABLE cancellation_act ALTER COLUMN responsible_worker_id DROP NOT NULL;
ALTER TABLE cancellation_act
    DROP CONSTRAINT "Cancellation_acts_responsible_worker_id_foreign",
    ADD CONSTRAINT cancellation_act_responsible_worker_id_foreign
        FOREIGN KEY ("responsible_worker_id") REFERENCES "user" ("id")
        ON DELETE SET NULL;

ALTER TABLE stock_cell
    DROP CONSTRAINT "stock_cells_stock_id_foreign",
    ADD CONSTRAINT stock_cell_stock_id_foreign
        FOREIGN KEY ("stock_id") REFERENCES "stock" ("id")
        ON DELETE CASCADE;

ALTER TABLE stock
    DROP CONSTRAINT "stock_company_id_foreign",
    ADD CONSTRAINT stock_company_id_foreign
        FOREIGN KEY ("company_id") REFERENCES "stock" ("id")
        ON DELETE CASCADE;

ALTER TABLE good ALTER COLUMN tth_id DROP NOT NULL;
ALTER TABLE good
    DROP CONSTRAINT "Goods_tth_id_foreign",
    ADD CONSTRAINT good_tth_id_foreign
        FOREIGN KEY ("tth_id") REFERENCES "tth" ("id")
        ON DELETE SET NULL;

ALTER TABLE good
    DROP CONSTRAINT "Goods_cancellation_act_id_foreign",
    ADD CONSTRAINT good_cancellation_act_id_foreign
        FOREIGN KEY ("cancellation_act_id") REFERENCES "cancellation_act" ("id")
        ON DELETE SET NULL;

ALTER TABLE good ALTER COLUMN client_id DROP NOT NULL;
ALTER TABLE good
    DROP CONSTRAINT "Goods_client_id_foreign",
    ADD CONSTRAINT good_client_id_foreign
        FOREIGN KEY ("client_id") REFERENCES "client" ("id")
        ON DELETE SET NULL;

ALTER TABLE good
    DROP CONSTRAINT "Goods_inconsistensy_act_id_foreign",
    ADD CONSTRAINT good_inconsistensy_act_id_foreign
        FOREIGN KEY ("inconsistensy_act_id") REFERENCES "inconsistency_act" ("id")
        ON DELETE SET NULL;

ALTER TABLE tth
    DROP CONSTRAINT "TTH_stock_id_foreign",
    ADD CONSTRAINT tth_stock_id_foreign
        FOREIGN KEY ("stock_id") REFERENCES "stock" ("id")
        ON DELETE CASCADE;

ALTER TABLE tth
    DROP CONSTRAINT "TTH_carrier_id_foreign",
    ADD CONSTRAINT tth_carrier_id_foreign
        FOREIGN KEY ("carrier_id") REFERENCES "carrier" ("id")
        ON DELETE SET NULL;

ALTER TABLE tth
    DROP CONSTRAINT "TTH_driver_id_foreign",
    ADD CONSTRAINT tth_driver_id_foreign
        FOREIGN KEY ("driver_id") REFERENCES "driver" ("id")
        ON DELETE SET NULL;

ALTER TABLE tth ALTER COLUMN manager_id DROP NOT NULL;
ALTER TABLE tth
    DROP CONSTRAINT "TTH_manager_id_foreign",
    ADD CONSTRAINT tth_manager_id_foreign
        FOREIGN KEY ("manager_id") REFERENCES "user" ("id")
        ON DELETE SET NULL;

ALTER TABLE tth ALTER COLUMN client_id DROP NOT NULL;
ALTER TABLE tth
    DROP CONSTRAINT "TTH_client_id_foreign",
    ADD CONSTRAINT tth_client_id_foreign
        FOREIGN KEY ("client_id") REFERENCES "client" ("id")
        ON DELETE SET NULL;

ALTER TABLE inconsistency_act ALTER COLUMN driver_id DROP NOT NULL;
ALTER TABLE inconsistency_act
    DROP CONSTRAINT "acts_of_inconsistency_driver_id_foreign",
    ADD CONSTRAINT inconsistency_act_driver_id_foreign
        FOREIGN KEY ("driver_id") REFERENCES "driver" ("id")
        ON DELETE SET NULL;

ALTER TABLE inconsistency_act ALTER COLUMN stock_worker_id DROP NOT NULL;
ALTER TABLE inconsistency_act
    DROP CONSTRAINT "acts_of_inconsistency_stock_worker_id_foreign",
    ADD CONSTRAINT inconsistency_act_stock_worker_id_foreign
        FOREIGN KEY ("stock_worker_id") REFERENCES "user" ("id")
        ON DELETE SET NULL;

ALTER TABLE container
    DROP CONSTRAINT "container_TTH_id_foreign",
    ADD CONSTRAINT container_tth_id_foreign
        FOREIGN KEY ("tth_id") REFERENCES "tth" ("id")
        ON DELETE CASCADE;
