CREATE TABLE IF NOT EXISTS "companies_statistics" (
                                           "id" bigserial not null,
                                           "date" date not null,
                                           "income" numeric(10,2) not null,
                                           "consumption" numeric(10,2) not null,
                                           "company_id" BIGINT not null,
                                           PRIMARY KEY ("id")
);

ALTER TABLE companies_statistics ADD CONSTRAINT company_id_foreign
        FOREIGN KEY ("company_id") REFERENCES "company" ("id");