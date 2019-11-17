ALTER TABLE cancellation_act DROP COLUMN cost;

ALTER TABLE cancellation_act RENAME COLUMN responsible_worker_id TO controller_id;
