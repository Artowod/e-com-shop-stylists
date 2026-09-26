ALTER TABLE "attribute_options" RENAME COLUMN "label" TO "label_ua";--> statement-breakpoint
ALTER TABLE "attributes" RENAME COLUMN "label" TO "label_ua";--> statement-breakpoint
ALTER TABLE "attributes" RENAME COLUMN "unit" TO "unit_ua";--> statement-breakpoint
ALTER TABLE "banners" RENAME COLUMN "title" TO "title_ua";--> statement-breakpoint
ALTER TABLE "banners" RENAME COLUMN "subtitle" TO "subtitle_ua";--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "title" TO "title_ua";--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "excerpt" TO "excerpt_ua";--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "content" TO "content_ua";--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "seo_title" TO "seo_title_ua";--> statement-breakpoint
ALTER TABLE "blog_posts" RENAME COLUMN "seo_description" TO "seo_description_ua";--> statement-breakpoint
ALTER TABLE "brands" RENAME COLUMN "seo_title" TO "seo_title_ua";--> statement-breakpoint
ALTER TABLE "brands" RENAME COLUMN "seo_description" TO "seo_description_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "name" TO "name_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "description" TO "description_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "seo_title" TO "seo_title_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "seo_description" TO "seo_description_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "seo_h1" TO "seo_h1_ua";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "seo_text" TO "seo_text_ua";--> statement-breakpoint
ALTER TABLE "home_section_items" RENAME COLUMN "title" TO "title_ua";--> statement-breakpoint
ALTER TABLE "home_section_items" RENAME COLUMN "text" TO "text_ua";--> statement-breakpoint
ALTER TABLE "home_sections" RENAME COLUMN "title" TO "title_ua";--> statement-breakpoint
ALTER TABLE "home_sections" RENAME COLUMN "eyebrow" TO "eyebrow_ua";--> statement-breakpoint
ALTER TABLE "product_attribute_values" RENAME COLUMN "text_value" TO "text_value_ua";--> statement-breakpoint
ALTER TABLE "product_images" RENAME COLUMN "alt" TO "alt_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "name" TO "name_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "short_description" TO "short_description_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "description" TO "description_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "seo_title" TO "seo_title_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "seo_description" TO "seo_description_ua";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "seo_h1" TO "seo_h1_ua";--> statement-breakpoint
ALTER TABLE "attribute_options" ADD COLUMN "label_en" text;--> statement-breakpoint
ALTER TABLE "attributes" ADD COLUMN "label_en" text;--> statement-breakpoint
ALTER TABLE "attributes" ADD COLUMN "unit_en" text;--> statement-breakpoint
ALTER TABLE "banners" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "banners" ADD COLUMN "subtitle_en" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "excerpt_en" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "content_en" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "seo_title_en" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "seo_description_en" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "seo_title_en" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "seo_description_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "name_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "seo_title_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "seo_description_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "seo_h1_en" text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "seo_text_en" text;--> statement-breakpoint
ALTER TABLE "home_section_items" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "home_section_items" ADD COLUMN "text_en" text;--> statement-breakpoint
ALTER TABLE "home_sections" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "home_sections" ADD COLUMN "eyebrow_en" text;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD COLUMN "text_value_en" text;--> statement-breakpoint
ALTER TABLE "product_images" ADD COLUMN "alt_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "name_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "short_description_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seo_title_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seo_description_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seo_h1_en" text;--> statement-breakpoint

UPDATE "attribute_options" SET "label_en" = "label_ua";--> statement-breakpoint
UPDATE "attributes" SET "label_en" = "label_ua", "unit_en" = "unit_ua";--> statement-breakpoint
UPDATE "banners" SET "title_en" = "title_ua", "subtitle_en" = "subtitle_ua";--> statement-breakpoint
UPDATE "blog_posts" SET "title_en" = "title_ua", "excerpt_en" = "excerpt_ua", "content_en" = "content_ua", "seo_title_en" = "seo_title_ua", "seo_description_en" = "seo_description_ua";--> statement-breakpoint
UPDATE "brands" SET "seo_title_en" = "seo_title_ua", "seo_description_en" = "seo_description_ua";--> statement-breakpoint
UPDATE "categories" SET "name_en" = "name_ua", "description_en" = "description_ua", "seo_title_en" = "seo_title_ua", "seo_description_en" = "seo_description_ua", "seo_h1_en" = "seo_h1_ua", "seo_text_en" = "seo_text_ua";--> statement-breakpoint
UPDATE "categories" SET "name_en" = CASE "slug"
  WHEN 'hair-clippers' THEN 'Hair clippers'
  WHEN 'trimmers' THEN 'Trimmers'
  WHEN 'shavers' THEN 'Shavers'
  WHEN 'hair-dryers' THEN 'Hair dryers'
  WHEN 'curling-irons' THEN 'Curling irons'
  WHEN 'hair-straighteners' THEN 'Hair straighteners'
  WHEN 'hair-stylers' THEN 'Hair stylers'
  WHEN 'hot-rollers' THEN 'Hot rollers'
  WHEN 'combs' THEN 'Combs and brushes'
  WHEN 'scissors' THEN 'Scissors'
  WHEN 'tool-care' THEN 'Tool care'
  WHEN 'bags-and-cases' THEN 'Backpacks, bags, and cases'
  WHEN 'coloring' THEN 'Coloring'
  WHEN 'clips' THEN 'Clips'
  WHEN 'components' THEN 'Components'
  WHEN 'attachments' THEN 'Attachments'
  WHEN 'accessories' THEN 'Accessories'
  WHEN 'clothing' THEN 'Clothing'
  WHEN 'cosmetics' THEN 'Cosmetics'
  WHEN 'sets' THEN 'Sets'
  WHEN 'salon-equipment' THEN 'Salon equipment'
  ELSE "name_en"
END;--> statement-breakpoint
UPDATE "home_section_items" SET "title_en" = "title_ua", "text_en" = "text_ua";--> statement-breakpoint
UPDATE "home_sections" SET "title_en" = "title_ua", "eyebrow_en" = "eyebrow_ua";--> statement-breakpoint
UPDATE "product_attribute_values" SET "text_value_en" = "text_value_ua";--> statement-breakpoint
UPDATE "product_images" SET "alt_en" = "alt_ua";--> statement-breakpoint
UPDATE "products" SET "name_en" = "name_ua", "short_description_en" = "short_description_ua", "description_en" = "description_ua", "seo_title_en" = "seo_title_ua", "seo_description_en" = "seo_description_ua", "seo_h1_en" = "seo_h1_ua";--> statement-breakpoint

ALTER TABLE "attribute_options" ALTER COLUMN "label_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attributes" ALTER COLUMN "label_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "banners" ALTER COLUMN "title_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "title_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "content_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "home_sections" ALTER COLUMN "title_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" ALTER COLUMN "alt_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name_en" SET NOT NULL;
