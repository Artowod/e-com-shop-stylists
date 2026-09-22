import type { ProductReview } from "@/types/catalog";

export function getReviewSummary(reviews: ProductReview[] = []) {
  const published = reviews.filter((review) => review.status === "published");
  const distribution = [1, 2, 3, 4, 5].reduce<Record<number, number>>((result, rating) => {
    result[rating] = published.filter((review) => review.rating === rating).length;
    return result;
  }, {});
  const average = published.length
    ? published.reduce((total, review) => total + review.rating, 0) / published.length
    : 0;

  return { average, count: published.length, distribution, reviews: published };
}
