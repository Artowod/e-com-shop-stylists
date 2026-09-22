CREATE TYPE "public"."home_section_type" AS ENUM('brands', 'products_week', 'new_products', 'promotions', 'coming_soon', 'instagram', 'reviews', 'about');--> statement-breakpoint
CREATE TYPE "public"."product_relation_type" AS ENUM('bundle', 'related', 'similar');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'published', 'rejected');--> statement-breakpoint
CREATE TABLE "home_section_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"product_id" uuid,
	"brand_id" uuid,
	"review_id" uuid,
	"title" text,
	"text" text,
	"image_public_id" text,
	"image_url" text,
	"destination_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "home_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "home_section_type" NOT NULL,
	"title" text NOT NULL,
	"eyebrow" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_relations" (
	"product_id" uuid NOT NULL,
	"related_product_id" uuid NOT NULL,
	"type" "product_relation_type" NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"bundle_price" numeric(12, 2),
	CONSTRAINT "product_relations_product_id_related_product_id_type_pk" PRIMARY KEY("product_id","related_product_id","type"),
	CONSTRAINT "product_relations_not_self" CHECK ("product_relations"."product_id" <> "product_relations"."related_product_id")
);
--> statement-breakpoint
CREATE TABLE "product_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"text" text NOT NULL,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_reviews_rating_range" CHECK ("product_reviews"."rating" between 1 and 5)
);
--> statement-breakpoint
ALTER TABLE "home_section_items" ADD CONSTRAINT "home_section_items_section_id_home_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."home_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "home_section_items" ADD CONSTRAINT "home_section_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "home_section_items" ADD CONSTRAINT "home_section_items_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "home_section_items" ADD CONSTRAINT "home_section_items_review_id_product_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."product_reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "product_relations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_relations" ADD CONSTRAINT "product_relations_related_product_id_products_id_fk" FOREIGN KEY ("related_product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "home_section_items_section_idx" ON "home_section_items" USING btree ("section_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "home_sections_type_unique" ON "home_sections" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "product_reviews_product_user_unique" ON "product_reviews" USING btree ("product_id","user_id");--> statement-breakpoint
CREATE INDEX "product_reviews_public_idx" ON "product_reviews" USING btree ("product_id","status","created_at");