CREATE TYPE condition AS ENUM('heated', 'not_heated', 'freezer', 'outdoor');
CREATE TYPE goods_state AS ENUM('registred','verification_completed','accepted_for_storage',
  'lost_by_carrier','lost_from_stock','theft_from_stock',
  'shortage_of_carrier','forfeit','recycled',
  'removed_from_storage','release_allowed','removed_from_stock');
CREATE TYPE tth_type AS ENUM ('input','output');
CREATE TYPE user_role AS ENUM ('system_admin','stock_admin','stock_dispatcher','stock_manager','controller','stock_owner');

ALTER TABLE "stock_cells" ALTER COLUMN "storage_condition" TYPE condition USING storage_condition::condition;
ALTER TABLE "TTH" ALTER COLUMN "type" TYPE tth_type USING type::tth_type;
ALTER TABLE "Users" ALTER COLUMN "role" TYPE user_role USING role::user_role;
ALTER TABLE "Goods" ALTER COLUMN "storage_condition" TYPE condition USING storage_condition::condition;
