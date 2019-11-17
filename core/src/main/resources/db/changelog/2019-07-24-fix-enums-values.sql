ALTER TABLE "user" RENAME TO stock_app_user;

CREATE TYPE storage_condition AS ENUM('HEATED',
    'NOT_HEATED',
    'FREEZER',
    'OUTDOOR');
ALTER TABLE good ALTER COLUMN "storage_condition" TYPE condition USING storage_condition::condition;
ALTER TABLE stock_cell ALTER COLUMN "storage_condition" TYPE condition USING storage_condition::condition;

ALTER TABLE good RENAME COLUMN storage_condition TO _storage_condition;
ALTER TABLE good ADD COLUMN storage_condition storage_condition not null;
ALTER TABLE good DROP COLUMN _storage_condition;

ALTER TABLE stock_cell RENAME COLUMN storage_condition TO _storage_condition;
ALTER TABLE stock_cell ADD COLUMN storage_condition storage_condition not null;
ALTER TABLE stock_cell DROP COLUMN _storage_condition;
DROP TYPE condition;


ALTER TYPE goods_state RENAME TO goods_state_old;
CREATE TYPE goods_state AS ENUM('REGISTRED',
    'VERIFICATION_COMPLETED',
    'ACCEPTED_FOR_STORAGE',
    'LOST_BY_CARRIER',
    'FORFEIT',
    'RECYCLED',
    'REMOVED_FROM_STORAGE',
    'RELEASE_ALLOWED',
    'REMOVED_FROM_STOCK');
ALTER TABLE good RENAME COLUMN state TO _state;
ALTER TABLE good ADD COLUMN state goods_state not null;
ALTER TABLE good DROP COLUMN _state;
DROP TYPE goods_state_old;


ALTER TYPE tth_type RENAME TO tth_type_old;
CREATE TYPE tth_type AS ENUM ('INPUT',
    'OUTPUT');
ALTER TABLE tth RENAME COLUMN type TO _type;
ALTER TABLE tth ADD COLUMN type tth_type not null;
ALTER TABLE tth DROP COLUMN _type;
DROP TYPE tth_type_old;


ALTER TYPE  user_role RENAME TO  user_role_old;
CREATE TYPE user_role AS ENUM ('SYSTEM_ADMIN',
    'STOCK_ADMIN',
    'STOCK_DISPATCHER',
    'STOCK_MANAGER',
    'CONTROLLER',
    'STOCK_OWNER');
ALTER TABLE stock_app_user RENAME COLUMN role TO _role;
ALTER TABLE stock_app_user ADD COLUMN role user_role not null;
ALTER TABLE stock_app_user DROP COLUMN _role;
DROP TYPE user_role_old;


ALTER TYPE vehicle_type RENAME TO vehicle_type_old;
CREATE TYPE vehicle_type AS ENUM ('RAILWAY',
    'TRUCK');
ALTER TABLE tth RENAME COLUMN vehicle_type TO _vehicle_type;
ALTER TABLE tth ADD COLUMN vehicle_type vehicle_type not null;
ALTER TABLE tth DROP COLUMN _vehicle_type;
DROP TYPE vehicle_type_old;


