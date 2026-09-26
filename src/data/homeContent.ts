import { featuredProducts } from "./catalogSeed";
import type { MessageId } from "@/i18n/messages";

export const productsOfWeek = featuredProducts;
export const newProducts = featuredProducts;
export const comingSoonProducts = featuredProducts.slice().reverse();

export const informationCards = [
  { number: "01", titleId: "home.benefit.original.title", textId: "home.benefit.original.text" },
  { number: "02", titleId: "home.benefit.guidance.title", textId: "home.benefit.guidance.text" },
  { number: "03", titleId: "home.benefit.delivery.title", textId: "home.benefit.delivery.text" },
  { number: "04", titleId: "home.benefit.professionals.title", textId: "home.benefit.professionals.text" },
] satisfies { number: string; titleId: MessageId; textId: MessageId }[];

export const blogArticles = featuredProducts.slice(0, 3).map((product, index) => ({
  id: `article-${index + 1}`,
  slug: index === 0 ? "how-to-choose-a-clipper" : index === 1 ? "professional-tools-guide" : "tool-care-guide",
  categoryId: (index === 0 ? "blog.category.guide" : index === 1 ? "blog.category.review" : "blog.category.care") as MessageId,
  titleId: (index === 0 ? "blog.article.clippers" : index === 1 ? "blog.article.equipment" : "blog.article.toolLife") as MessageId,
  image: product.image,
}));

export const instagramPosts = [...featuredProducts, ...featuredProducts.slice(0, 2)].map((product, index) => ({
  id: `${product.id}-${index}`,
  image: product.image,
  labelId: (index % 2 ? "instagram.tip" : "instagram.weeklyPick") as MessageId,
}));
