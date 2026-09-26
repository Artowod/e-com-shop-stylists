import { Star } from "lucide-react";
import { getReviewSummary } from "@/lib/reviewSummary";
import type { ProductReview } from "@/types/catalog";
import { RatingStars } from "../RatingStars/RatingStars";
import { getServerTranslations } from "@/i18n/server";
import styles from "./ProductReviews.module.scss";

export async function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  const { locale, t } = await getServerTranslations();
  const summary = getReviewSummary(reviews);
  return <section className={styles.reviews} id="reviews" aria-labelledby="reviews-title"><div className={styles.header}><div><span>{t("reviews.eyebrow")}</span><h2 id="reviews-title">{t("reviews.title")}</h2></div><button type="button" disabled title={t("reviews.oauthHint")}>{t("reviews.leave")}</button></div><div className={styles.overview}><div className={styles.average}><strong>{summary.count ? summary.average.toFixed(1) : "—"}</strong><RatingStars average={summary.average} count={summary.count} /></div><div className={styles.distribution}>{[5, 4, 3, 2, 1].map((rating) => { const count = summary.distribution[rating] ?? 0; const width = summary.count ? `${(count / summary.count) * 100}%` : "0%"; return <div key={rating}><span>{rating} <Star aria-hidden="true" fill="currentColor" /></span><span className={styles.bar}><i style={{ width }} /></span><b>{count}</b></div>; })}</div></div>{summary.reviews.length ? <div className={styles.list}>{summary.reviews.map((review) => <article key={review.id}><header><div><strong>{t(review.authorId)}</strong><time dateTime={review.date}>{new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US").format(new Date(review.date))}</time></div><RatingStars average={review.rating} count={1} compact /></header><p>{t(review.textId)}</p></article>)}</div> : <p className={styles.empty}>{t("reviews.empty")}</p>}</section>;
}
