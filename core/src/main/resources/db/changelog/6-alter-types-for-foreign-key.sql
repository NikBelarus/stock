ALTER TABLE stock_cell ALTER COLUMN stock_id TYPE BIGINT;

ALTER TABLE stock ALTER COLUMN company_id TYPE BIGINT;

ALTER TABLE tth ALTER COLUMN stock_id TYPE BIGINT;
ALTER TABLE tth ALTER COLUMN carrier_id TYPE BIGINT;
ALTER TABLE tth ALTER COLUMN driver_id TYPE BIGINT;
ALTER TABLE tth ALTER COLUMN manager_id TYPE BIGINT;
ALTER TABLE tth ALTER COLUMN client_id TYPE BIGINT;

ALTER TABLE cancellation_act ALTER COLUMN stock_id TYPE BIGINT;
ALTER TABLE cancellation_act ALTER COLUMN responsible_worker_id TYPE BIGINT;

ALTER TABLE good ALTER COLUMN tth_id TYPE BIGINT;
ALTER TABLE good ALTER COLUMN inconsistensy_act_id TYPE BIGINT;
ALTER TABLE good ALTER COLUMN cancellation_act_id TYPE BIGINT;
ALTER TABLE good ALTER COLUMN client_id TYPE BIGINT;

ALTER TABLE inconsistency_act ALTER COLUMN driver_id TYPE BIGINT;
ALTER TABLE inconsistency_act ALTER COLUMN stock_worker_id TYPE BIGINT;

ALTER TABLE container ALTER COLUMN tth_id TYPE BIGINT;






