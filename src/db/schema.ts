import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const productTypeEnum = pgEnum("product_type", [
  "electrical",
  "liquid",
  "accessory",
  "tool",
  "cosmetic",
]);
export const attributeTypeEnum = pgEnum("attribute_type", [
  "number",
  "text",
  "select",
  "multi_select",
  "boolean",
  "color",
]);
export const availabilityEnum = pgEnum("availability", [
  "in_stock",
  "out_of_stock",
  "preorder",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "new",
  "confirmed",
  "processing",
  "shipped",
  "completed",
  "cancelled",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "pay_on_receipt",
  "bank_transfer_legal",
  "bank_transfer_individual",
  "pay_now",
  "installments",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "pay_on_receipt",
  "awaiting_transfer",
  "paid",
  "failed",
  "cancelled",
]);
export const reviewStatusEnum = pgEnum("review_status", ["pending", "published", "rejected"]);
export const productRelationTypeEnum = pgEnum("product_relation_type", ["bundle", "related", "similar"]);
export const homeSectionTypeEnum = pgEnum("home_section_type", [
  "brands",
  "products_week",
  "new_products",
  "promotions",
  "coming_soon",
  "instagram",
  "reviews",
  "about",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    googleSubject: text("google_subject").notNull(),
    email: text("email").notNull(),
    name: text("name"),
    imageUrl: text("image_url"),
    isAdmin: boolean("is_admin").default(false).notNull(),
    totpSecretEncrypted: text("totp_secret_encrypted"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("users_google_subject_unique").on(table.googleSubject),
    uniqueIndex("users_email_unique").on(table.email),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parentId: uuid("parent_id"),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoH1: text("seo_h1"),
    seoText: text("seo_text"),
    canonicalUrl: text("canonical_url"),
    isIndexed: boolean("is_indexed").default(true).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("categories_slug_unique").on(table.slug),
    index("categories_parent_idx").on(table.parentId),
  ],
);

export const brands = pgTable(
  "brands",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    logoPublicId: text("logo_public_id"),
    logoUrl: text("logo_url"),
    isActive: boolean("is_active").default(true).notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("brands_slug_unique").on(table.slug)],
);

export const categoryBrands = pgTable(
  "category_brands",
  {
    categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    brandId: uuid("brand_id").notNull().references(() => brands.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
  },
  (table) => [primaryKey({ columns: [table.categoryId, table.brandId] })],
);

export const attributes = pgTable(
  "attributes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull(),
    label: text("label").notNull(),
    type: attributeTypeEnum("type").notNull(),
    unit: text("unit"),
    isFilterable: boolean("is_filterable").default(false).notNull(),
    isVisible: boolean("is_visible").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("attributes_slug_unique").on(table.slug)],
);

export const attributeOptions = pgTable(
  "attribute_options",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attributeId: uuid("attribute_id").notNull().references(() => attributes.id, { onDelete: "cascade" }),
    value: text("value").notNull(),
    label: text("label").notNull(),
    colorHex: text("color_hex"),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (table) => [uniqueIndex("attribute_options_value_unique").on(table.attributeId, table.value)],
);

export const categoryAttributes = pgTable(
  "category_attributes",
  {
    categoryId: uuid("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    attributeId: uuid("attribute_id").notNull().references(() => attributes.id, { onDelete: "cascade" }),
    isRequired: boolean("is_required").default(false).notNull(),
    isFilterableOverride: boolean("is_filterable_override"),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (table) => [primaryKey({ columns: [table.categoryId, table.attributeId] })],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    sku: text("sku"),
    brandId: uuid("brand_id").notNull().references(() => brands.id),
    categoryId: uuid("category_id").notNull().references(() => categories.id),
    productType: productTypeEnum("product_type").notNull(),
    shortDescription: text("short_description"),
    description: text("description"),
    price: numeric("price", { precision: 12, scale: 2 }),
    oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
    stock: integer("stock"),
    availability: availabilityEnum("availability").default("in_stock").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoH1: text("seo_h1"),
    canonicalUrl: text("canonical_url"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("products_slug_unique").on(table.slug),
    uniqueIndex("products_sku_unique").on(table.sku),
    index("products_catalog_idx").on(table.categoryId, table.brandId, table.isActive),
  ],
);

export const productVariations = pgTable(
  "product_variations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    sku: text("sku").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
    oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
    stock: integer("stock").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("product_variations_sku_unique").on(table.sku),
    index("product_variations_product_idx").on(table.productId),
  ],
);

export const productAttributeValues = pgTable(
  "product_attribute_values",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    attributeId: uuid("attribute_id").notNull().references(() => attributes.id, { onDelete: "cascade" }),
    optionId: uuid("option_id").references(() => attributeOptions.id, { onDelete: "cascade" }),
    numberValue: numeric("number_value", { precision: 14, scale: 4 }),
    textValue: text("text_value"),
    booleanValue: boolean("boolean_value"),
  },
  (table) => [index("product_attribute_lookup_idx").on(table.attributeId, table.optionId, table.numberValue)],
);

export const variationAttributeValues = pgTable(
  "variation_attribute_values",
  {
    variationId: uuid("variation_id").notNull().references(() => productVariations.id, { onDelete: "cascade" }),
    attributeId: uuid("attribute_id").notNull().references(() => attributes.id, { onDelete: "cascade" }),
    optionId: uuid("option_id").notNull().references(() => attributeOptions.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.variationId, table.attributeId] })],
);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    variationId: uuid("variation_id").references(() => productVariations.id, { onDelete: "set null" }),
    cloudinaryPublicId: text("cloudinary_public_id").notNull(),
    secureUrl: text("secure_url").notNull(),
    alt: text("alt").notNull(),
    width: integer("width"),
    height: integer("height"),
    format: text("format"),
    bytes: integer("bytes"),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [index("product_images_product_idx").on(table.productId, table.sortOrder)],
);

export const productRelations = pgTable(
  "product_relations",
  {
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    relatedProductId: uuid("related_product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    type: productRelationTypeEnum("type").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    bundlePrice: numeric("bundle_price", { precision: 12, scale: 2 }),
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.relatedProductId, table.type] }),
    check("product_relations_not_self", sql`${table.productId} <> ${table.relatedProductId}`),
  ],
);

export const productReviews = pgTable(
  "product_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    text: text("text").notNull(),
    status: reviewStatusEnum("status").default("pending").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("product_reviews_product_user_unique").on(table.productId, table.userId),
    index("product_reviews_public_idx").on(table.productId, table.status, table.createdAt),
    check("product_reviews_rating_range", sql`${table.rating} between 1 and 5`),
  ],
);

export const homeSections = pgTable(
  "home_sections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: homeSectionTypeEnum("type").notNull(),
    title: text("title").notNull(),
    eyebrow: text("eyebrow"),
    isActive: boolean("is_active").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("home_sections_type_unique").on(table.type)],
);

export const homeSectionItems = pgTable(
  "home_section_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sectionId: uuid("section_id").notNull().references(() => homeSections.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    brandId: uuid("brand_id").references(() => brands.id, { onDelete: "cascade" }),
    reviewId: uuid("review_id").references(() => productReviews.id, { onDelete: "cascade" }),
    title: text("title"),
    text: text("text"),
    imagePublicId: text("image_public_id"),
    imageUrl: text("image_url"),
    destinationUrl: text("destination_url"),
    isActive: boolean("is_active").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    ...timestamps,
  },
  (table) => [index("home_section_items_section_idx").on(table.sectionId, table.sortOrder)],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull(),
    userId: uuid("user_id").notNull().references(() => users.id),
    status: orderStatusEnum("status").default("new").notNull(),
    recipientName: text("recipient_name").notNull(),
    recipientPhone: text("recipient_phone").notNull(),
    recipientEmail: text("recipient_email").notNull(),
    city: text("city").notNull(),
    novaPoshtaBranch: text("nova_poshta_branch").notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    paymentStatus: paymentStatusEnum("payment_status").notNull(),
    promoCode: text("promo_code"),
    subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
    discountTotal: numeric("discount_total", { precision: 12, scale: 2 }).default("0").notNull(),
    total: numeric("total", { precision: 12, scale: 2 }).notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("orders_number_unique").on(table.orderNumber),
    uniqueIndex("orders_idempotency_unique").on(table.idempotencyKey),
    index("orders_user_idx").on(table.userId, table.createdAt),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id),
    variationId: uuid("variation_id").references(() => productVariations.id),
    skuSnapshot: text("sku_snapshot").notNull(),
    productNameSnapshot: text("product_name_snapshot").notNull(),
    variationSnapshot: text("variation_snapshot"),
    quantity: integer("quantity").notNull(),
    unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
    discount: numeric("discount", { precision: 12, scale: 2 }).default("0").notNull(),
    lineTotal: numeric("line_total", { precision: 12, scale: 2 }).notNull(),
  },
  (table) => [index("order_items_order_idx").on(table.orderId)],
);

export const banners = pgTable("banners", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imagePublicId: text("image_public_id"),
  imageUrl: text("image_url"),
  mobileImagePublicId: text("mobile_image_public_id"),
  mobileImageUrl: text("mobile_image_url"),
  destinationUrl: text("destination_url"),
  placement: text("placement").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  ...timestamps,
});

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImagePublicId: text("cover_image_public_id"),
    coverImageUrl: text("cover_image_url"),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ...timestamps,
  },
  (table) => [uniqueIndex("blog_posts_slug_unique").on(table.slug)],
);

export const redirects = pgTable(
  "redirects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sourcePath: text("source_path").notNull(),
    destinationPath: text("destination_path").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("redirects_source_unique").on(table.sourcePath)],
);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email"),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  summary: text("summary").notNull(),
});

export const errorLogs = pgTable("error_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email"),
  location: text("location").notNull(),
  errorCode: text("error_code"),
  message: text("message").notNull(),
  context: jsonb("context"),
  requestId: text("request_id"),
});
