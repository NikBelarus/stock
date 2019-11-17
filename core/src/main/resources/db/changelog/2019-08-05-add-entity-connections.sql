ALTER TABLE "stock_app_user" ADD COLUMN "company_id" BIGINT;

ALTER TABLE "stock_app_user" ADD CONSTRAINT  stock_app_user_company_id_foreign
    FOREIGN KEY ("company_id") REFERENCES "company"("id");

ALTER TABLE "stock_app_user" ADD COLUMN "stock_id" BIGINT;

ALTER TABLE "stock_app_user" ADD CONSTRAINT  stock_app_user_stock_id_foreign
    FOREIGN KEY ("stock_id") REFERENCES "stock"("id");
