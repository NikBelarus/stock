CREATE TABLE IF NOT EXISTS "stock_cells" (
                                           "id" bigserial not null,
                                           "storage_condition" varchar(100) not null,
                                           "storage_price" int not null,
                                           "stock_id" int not null,
                                           PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "stocks" (
                                      "id" bigserial not null,
                                      "company_id" int not null,
                                      PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "companies" (
                                         "id" bigserial not null,
                                         "name" varchar(100) not null,
                                         PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "TTH" (
                                   "id" bigserial not null,
                                   "stock_id" int not null,
                                   "carrier_id" int not null,
                                   "driver_id" int,
                                   "vehicle_type" varchar(100) not null,
                                   "manager_id" int not null,
                                   "vehicle_no" varchar(100) not null,
                                   "type" varchar(100) not null,
                                   "date" timestamp not null,
                                   "goods_cost" int not null,
                                   "client_id" int not null,
                                   PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "Carrier" (
                                       "id" bigserial not null,
                                       "name" varchar(100) not null,
                                       PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Driver" (
                                      "id" bigserial not null,
                                      "first_name" varchar(100) not null,
                                      "last_name" varchar(100) not null,
                                      "passport_no" varchar(100) not null,
                                      "issue_country" varchar(100) not null,
                                      PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Users" (
                                     "id" bigserial not null,
                                     "login" varchar(100) not null,
                                     "password" varchar(100) not null,
                                     "role" varchar(100) not null,
                                     "first_name" varchar(100) not null,
                                     "last_name" varchar(100) not null,
                                     "parent_name" varchar(100) not null,
                                     "email" varchar(100) not null,
                                     "birth_date" date not null,
                                     "city" varchar(100) not null,
                                     "street" varchar(100) not null,
                                     "house" varchar(100) not null,
                                     "appartment" int not null,
                                     PRIMARY KEY ("id")
);

CREATE TABLE "Clients" (
                         "id" bigserial not null,
                         "name" varchar not null,
                         PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Cancellation_acts" (
                                                 "id" bigserial not null,
                                                 "stock_id" int not null,
                                                 "date" timestamp not null,
                                                 "cost" int not null,
                                                 "responsible_worker_id" int not null,
                                                 PRIMARY KEY ("id")
);


CREATE TABLE IF NOT EXISTS "Goods" (
                                     "id" bigserial not null,
                                     "name" varchar(100) not null,
                                     "storage_condition" varchar(100) not null,
                                     "tth_id" int not null,
                                     "weight" int not null,
                                     "state" varchar(100) not null,
                                     "inconsistensy_act_id" int,
                                     "cancellation_act_id" int,
                                     "count" int not null,
                                     "unit" varchar(100) not null,
                                     "client_id" int not null,
                                     PRIMARY KEY ("id")
) ;

CREATE TABLE IF NOT EXISTS "acts_of_inconsistency" (
                                                     "id" bigserial not null,
                                                     "driver_id" int not null,
                                                     "stock_worker_id" int not null,
                                                     "date" timestamp not null,
                                                     PRIMARY KEY ("id")
) ;


CREATE TABLE IF NOT EXISTS "Containers" (
                                          "id" bigserial not null,
                                          "marking_code" varchar(100) not null,
                                          "tth_id" int,
                                          PRIMARY KEY ("id")
);

ALTER TABLE "stock_cells" ADD CONSTRAINT "stock_cells_stock_id_foreign" FOREIGN KEY ("stock_id") REFERENCES "stocks" ("id");

ALTER TABLE "stocks" ADD CONSTRAINT "stock_company_id_foreign" FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "Goods" ADD CONSTRAINT "Goods_tth_id_foreign" FOREIGN KEY ("tth_id") REFERENCES "TTH" ("id");
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_cancellation_act_id_foreign" FOREIGN KEY ("cancellation_act_id") REFERENCES "Cancellation_acts" ("id");
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_client_id_foreign" FOREIGN KEY ("client_id") REFERENCES "Clients" ("id");
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_inconsistensy_act_id_foreign" FOREIGN KEY ("inconsistensy_act_id") REFERENCES "acts_of_inconsistency" ("id");

ALTER TABLE "TTH" ADD CONSTRAINT "TTH_stock_id_foreign" FOREIGN KEY ("stock_id") REFERENCES "stocks" ("id");
ALTER TABLE "TTH" ADD CONSTRAINT "TTH_carrier_id_foreign" FOREIGN KEY ("carrier_id") REFERENCES "Carrier" ("id");
ALTER TABLE "TTH" ADD CONSTRAINT "TTH_driver_id_foreign" FOREIGN KEY ("driver_id") REFERENCES "Driver" ("id");
ALTER TABLE "TTH" ADD CONSTRAINT "TTH_manager_id_foreign" FOREIGN KEY ("manager_id") REFERENCES "Users" ("id");
ALTER TABLE "TTH" ADD CONSTRAINT "TTH_client_id_foreign" FOREIGN KEY ("client_id") REFERENCES "Clients" ("id");


ALTER TABLE "Cancellation_acts" ADD CONSTRAINT "Cancellation_acts_responsible_worker_id_foreign" FOREIGN KEY ("responsible_worker_id") REFERENCES "Users" ("id");
ALTER TABLE "Cancellation_acts" ADD CONSTRAINT "Cancellation_acts_stock_id_foreign" FOREIGN KEY ("stock_id") REFERENCES "stocks" ("id");

ALTER TABLE "acts_of_inconsistency" ADD CONSTRAINT "acts_of_inconsistency_driver_id_foreign" FOREIGN KEY ("driver_id") REFERENCES "Driver" ("id");
ALTER TABLE "acts_of_inconsistency" ADD CONSTRAINT "acts_of_inconsistency_stock_worker_id_foreign" FOREIGN KEY ("stock_worker_id") REFERENCES "Users" ("id");

ALTER TABLE "Containers" ADD CONSTRAINT "container_TTH_id_foreign" FOREIGN KEY ("tth_id") REFERENCES "TTH" ("id");





