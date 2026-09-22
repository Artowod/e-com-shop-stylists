export type ProductType = "electrical" | "liquid" | "accessory" | "tool" | "cosmetic";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  iconPath: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categorySlug: string;
  productType: ProductType;
  price: number;
  oldPrice?: number;
  image: string;
  imageAlt: string;
  isAvailable: boolean;
  isNew?: boolean;
  images?: string[];
  colors?: { label: string; value: string; image: string }[];
  characteristics?: { label: string; value: string }[];
  reviews?: ProductReview[];
};

export type ProductReview = {
  id: string;
  productId: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  status: "published" | "pending" | "rejected";
};
