import type { Metadata } from "next";
import Link from "next/link";

import { RatingStars } from "@/components/RatingStars/RatingStars";
import { getServerTranslations } from "@/i18n/server";
import { featuredProducts } from "@/data/catalogSeed";
import { getReviewSummary } from "@/lib/reviewSummary";
import styles from "@/shared/styles/contentPage.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.reviews"), description: t("metadata.reviews.description"), alternates: { canonical: "/reviews" } }; }

export default async function ReviewsPage() {
  const { locale, t } = await getServerTranslations();
  const reviews = featuredProducts.flatMap((product) => getReviewSummary(product.reviews).reviews.map((review) => ({ ...review, product })));

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("common.reviews")}</span></nav>
      <header className={styles.header}><span className={styles.eyebrow}>{t("home.professionalExperience")}</span><h1>{t("reviews.pageTitle")}</h1><p>{t("reviews.pageDescription")}</p></header>
      <div className={styles.grid}>{reviews.map((review) => <article className={`${styles.card} ${styles.review}`} key={review.id}><RatingStars average={review.rating} count={1} /><blockquote>“{t(review.textId)}”</blockquote><footer><strong>{t(review.authorId)}</strong><span>{new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US").format(new Date(review.date))}</span></footer><Link className={styles.link} href={`/product/${review.product.slug}#reviews`}>{t(review.product.nameId)}</Link></article>)}</div>
    </div>
  );
}
