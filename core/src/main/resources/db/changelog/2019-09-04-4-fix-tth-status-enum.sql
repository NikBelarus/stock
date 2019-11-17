ALTER TYPE tth_status RENAME TO tth_status_old;
CREATE TYPE tth_status AS ENUM (
    'REGISTERED',
    'VERIFICATION_COMPLETED',
    'REGISTRATION_COMPLETED',
    'RELEASE_ALLOWED'
);
ALTER TABLE tth RENAME COLUMN status TO _status;
ALTER TABLE tth ADD COLUMN status tth_status not null;
ALTER TABLE tth DROP COLUMN _status;
DROP TYPE tth_status_old;