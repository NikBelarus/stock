CREATE TYPE vehicle_type AS ENUM ('railway','truck');

ALTER TABLE "Goods" ALTER COLUMN  "state" TYPE goods_state USING state::goods_state;
ALTER TABLE "TTH" ALTER COLUMN  "vehicle_type" TYPE vehicle_type USING vehicle_type::vehicle_type;
