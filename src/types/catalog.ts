import type { MessageId } from "@/i18n/messages";

export type ProductType = "electrical" | "liquid" | "accessory" | "tool" | "cosmetic";

export type CatalogCategory = {
  id: string;
  name: string;
  nameId: MessageId;
  slug: string;
  iconPath: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  nameId: MessageId;
  slug: string;
  sku: string;
  brand: string;
  categorySlug: string;
  productType: ProductType;
  price: number;
  oldPrice?: number;
  image: string;
  imageAlt: string;
  imageAltId: MessageId;
  isAvailable: boolean;
  isNew?: boolean;
  images?: string[];
  colors?: { label: string; labelId: MessageId; value: string; image: string }[];
  characteristics?: { label: string; labelId: MessageId; value: string; valueId?: MessageId }[];
  filterAttributes?: ProductFilterAttribute[];
  reviews?: ProductReview[];
};

export type ProductFilterAttribute =
  | { slug: string; label: string; labelId: MessageId; type: "number"; value: number; unit: string; unitId?: MessageId }
  | { slug: string; label: string; labelId: MessageId; type: "select"; value: string; valueId: MessageId }
  | { slug: string; label: string; labelId: MessageId; type: "boolean"; value: boolean };

export type ProductReview = {
  id: string;
  productId: string;
  author: string;
  authorId: MessageId;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  textId: MessageId;
  date: string;
  status: "published" | "pending" | "rejected";
};
