CREATE TYPE "public"."attribute_type" AS ENUM('number', 'text', 'select', 'multi_select', 'boolean', 'color');--> statement-breakpoint
CREATE TYPE "public"."availability" AS ENUM('in_stock', 'out_of_stock', 'preorder');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('new', 'confirmed', 'processing', 'shipped', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('pay_on_receipt', 'bank_transfer_legal', 'bank_transfer_individual', 'pay_now', 'installments');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'pay_on_receipt', 'awaiting_transfer', 'paid', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('electrical', 'liquid', 'accessory', 'tool', 'cosmetic');--> statement-breakpoint
CREATE TABLE "attribute_options" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"attribute_id" uuid NOT NULL,
	"value" text NOT NULL,
	"label" text NOT NULL,
	"color_hex" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attributes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"type" "attribute_type" NOT NULL,
	"unit" text,
	"is_filterable" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid,
	"user_email" text,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text,
	"summary" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"image_public_id" text,
	"image_url" text,
	"mobile_image_public_id" text,
	"mobile_image_url" text,
	"destination_url" text,
	"placement" text NOT NULL,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"cover_image_public_id" text,
	"cover_image_url" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo_public_id" text,
	"logo_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"seo_h1" text,
	"seo_text" text,
	"canonical_url" text,
	"is_indexed" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category_attributes" (
	"category_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL,
	"is_required" boolean DEFAULT false NOT NULL,
	"is_filterable_override" boolean,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "category_attributes_category_id_attribute_id_pk" PRIMARY KEY("category_id","attribute_id")
);
--> statement-breakpoint
CREATE TABLE "category_brands" (
	"category_id" uuid NOT NULL,
	"brand_id" uuid NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	CONSTRAINT "category_brands_category_id_brand_id_pk" PRIMARY KEY("category_id","brand_id")
);
--> statement-breakpoint
CREATE TABLE "error_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid,
	"user_email" text,
	"location" text NOT NULL,
	"error_code" text,
	"message" text NOT NULL,
	"context" jsonb,
	"request_id" text
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"variation_id" uuid,
	"sku_snapshot" text NOT NULL,
	"product_name_snapshot" text NOT NULL,
	"variation_snapshot" text,
	"quantity" integer NOT NULL,
	"unit_price" numeric(12, 2) NOT NULL,
	"discount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"line_total" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_number" text NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "order_status" DEFAULT 'new' NOT NULL,
	"recipient_name" text NOT NULL,
	"recipient_phone" text NOT NULL,
	"recipient_email" text NOT NULL,
	"city" text NOT NULL,
	"nova_poshta_branch" text NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"promo_code" text,
	"subtotal" numeric(12, 2) NOT NULL,
	"discount_total" numeric(12, 2) DEFAULT '0' NOT NULL,
	"total" numeric(12, 2) NOT NULL,
	"idempotency_key" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_attribute_values" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL,
	"option_id" uuid,
	"number_value" numeric(14, 4),
	"text_value" text,
	"boolean_value" boolean
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"variation_id" uuid,
	"cloudinary_public_id" text NOT NULL,
	"secure_url" text NOT NULL,
	"alt" text NOT NULL,
	"width" integer,
	"height" integer,
	"format" text,
	"bytes" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"old_price" numeric(12, 2),
	"stock" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"sku" text,
	"brand_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"product_type" "product_type" NOT NULL,
	"short_description" text,
	"description" text,
	"price" numeric(12, 2),
	"old_price" numeric(12, 2),
	"stock" integer,
	"availability" "availability" DEFAULT 'in_stock' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"seo_h1" text,
	"canonical_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "redirects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_path" text NOT NULL,
	"destination_path" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_subject" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"image_url" text,
	"is_admin" boolean DEFAULT false NOT NULL,
	"totp_secret_encrypted" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variation_attribute_values" (
	"variation_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL,
	"option_id" uuid NOT NULL,
	CONSTRAINT "variation_attribute_values_variation_id_attribute_id_pk" PRIMARY KEY("variation_id","attribute_id")
);
--> statement-breakpoint
ALTER TABLE "attribute_options" ADD CONSTRAINT "attribute_options_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_brands" ADD CONSTRAINT "category_brands_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_brands" ADD CONSTRAINT "category_brands_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "error_logs" ADD CONSTRAINT "error_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variation_id_product_variations_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_option_id_attribute_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."attribute_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_variation_id_product_variations_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variations" ADD CONSTRAINT "product_variations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_attribute_values" ADD CONSTRAINT "variation_attribute_values_variation_id_product_variations_id_fk" FOREIGN KEY ("variation_id") REFERENCES "public"."product_variations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_attribute_values" ADD CONSTRAINT "variation_attribute_values_attribute_id_attributes_id_fk" FOREIGN KEY ("attribute_id") REFERENCES "public"."attributes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_attribute_values" ADD CONSTRAINT "variation_attribute_values_option_id_attribute_options_id_fk" FOREIGN KEY ("option_id") REFERENCES "public"."attribute_options"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "attribute_options_value_unique" ON "attribute_options" USING btree ("attribute_id","value");--> statement-breakpoint
CREATE UNIQUE INDEX "attributes_slug_unique" ON "attributes" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_unique" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "brands_slug_unique" ON "brands" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "order_items_order_idx" ON "order_items" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_number_unique" ON "orders" USING btree ("order_number");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_idempotency_unique" ON "orders" USING btree ("idempotency_key");--> statement-breakpoint
CREATE INDEX "orders_user_idx" ON "orders" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "product_attribute_lookup_idx" ON "product_attribute_values" USING btree ("attribute_id","option_id","number_value");--> statement-breakpoint
CREATE INDEX "product_images_product_idx" ON "product_images" USING btree ("product_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "product_variations_sku_unique" ON "product_variations" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "product_variations_product_idx" ON "product_variations" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_unique" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "products_sku_unique" ON "products" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "products_catalog_idx" ON "products" USING btree ("category_id","brand_id","is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "redirects_source_unique" ON "redirects" USING btree ("source_path");--> statement-breakpoint
CREATE UNIQUE INDEX "users_google_subject_unique" ON "users" USING btree ("google_subject");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");