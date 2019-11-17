CREATE TYPE tth_status AS ENUM ('registered',
    'verification_completed',
    'registration_completed',
    'release_allowed');

ALTER TABLE tth ADD COLUMN status tth_status DEFAULT 'registered' NOT NULL;