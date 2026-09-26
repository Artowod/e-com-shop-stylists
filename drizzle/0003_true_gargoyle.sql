ALTER TABLE "product_reviews" RENAME COLUMN "text" TO "text_ua";--> statement-breakpoint
ALTER TABLE "product_reviews" ADD COLUMN "text_en" text;--> statement-breakpoint
UPDATE "product_reviews" SET "text_en" = "text_ua";--> statement-breakpoint
ALTER TABLE "product_reviews" ALTER COLUMN "text_en" SET NOT NULL;
