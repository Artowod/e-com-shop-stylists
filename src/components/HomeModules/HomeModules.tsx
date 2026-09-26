import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredProducts } from "@/data/catalogSeed";
import { featuredBrands } from "@/data/featuredBrands";
import { blogArticles, comingSoonProducts, informationCards, instagramPosts, newProducts, productsOfWeek } from "@/data/homeContent";
import { getReviewSummary } from "@/lib/reviewSummary";
import { formatPrice } from "@/lib/formatPrice";
import { getServerTranslations } from "@/i18n/server";
import type { MessageId } from "@/i18n/messages";

import { HorizontalCarousel } from "../HorizontalCarousel/HorizontalCarousel";
import { ProductCard } from "../ProductCard/ProductCard";
import { RatingStars } from "../RatingStars/RatingStars";
import styles from "./HomeModules.module.scss";

type Translator = (id: MessageId, values?: Record<string, string | number>) => string;

function SectionHeading({ eyebrowId, titleId, href, t }: { eyebrowId: MessageId; titleId: MessageId; href: string; t: Translator }) {
  return <div className={styles.heading}><div><span>{t(eyebrowId)}</span><h2>{t(titleId)}</h2></div><Link href={href}>{t("common.viewAll")} <ArrowRight aria-hidden="true" /></Link></div>;
}

export async function HomeModules() {
  const { locale, t } = await getServerTranslations();
  const reviews = featuredProducts.flatMap((product) => getReviewSummary(product.reviews).reviews.map((review) => ({ ...review, product })));
  return (
    <>
      <section className={`${styles.section} ${styles.brands}`} aria-labelledby="brands-title">
        <div className="container"><SectionHeading eyebrowId="home.trustedManufacturers" titleId="common.brands" href="/brands" t={t} /><HorizontalCarousel ariaLabel={t("home.popularBrands")} itemWidth="brand">{featuredBrands.map((brand) => <Link key={brand.slug} className={styles.brandCard} href={`/brands/${brand.slug}`}><span className={styles.brandLogo}><Image src={brand.logoPath} alt={t("common.logoAlt", { brand: brand.name })} width={96} height={64} /></span><strong>{brand.name}</strong></Link>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.weekly}`} aria-labelledby="weekly-title">
        <div className="container"><SectionHeading eyebrowId="home.professionalsChoice" titleId="home.productsOfWeek" href="/products-of-the-week" t={t} /><HorizontalCarousel ariaLabel={t("home.productsOfWeek")}>{productsOfWeek.map((product) => <ProductCard key={product.id} product={product} />)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.newProducts}`} aria-labelledby="new-title">
        <div className="container"><SectionHeading eyebrowId="home.justAdded" titleId="home.newProducts" href="/new-products" t={t} /><HorizontalCarousel ariaLabel={t("home.newProductsLabel")} itemWidth="wide">{newProducts.map((product) => <Link key={product.id} className={styles.newCard} href={`/product/${product.slug}`}><div><span>{t("product.new")}</span><strong>{product.brand}</strong><h3>{t(product.nameId)}</h3><b>{formatPrice(product.price)}</b></div><Image src={product.image} alt={t(product.imageAltId)} width={210} height={210} /></Link>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.sale}`} aria-labelledby="sale-title">
        <div className="container"><SectionHeading eyebrowId="home.specialPrices" titleId="common.sale" href="/sale" t={t} /><HorizontalCarousel ariaLabel={t("home.saleProducts")}>{featuredProducts.filter((product) => product.oldPrice).map((product) => <ProductCard key={product.id} product={product} />)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.soon}`} aria-labelledby="soon-title">
        <div className="container"><SectionHeading eyebrowId="home.awaitingDelivery" titleId="home.comingSoon" href="/coming-soon" t={t} /><HorizontalCarousel ariaLabel={t("home.comingSoon")} itemWidth="wide">{comingSoonProducts.map((product) => <article key={product.id} className={styles.soonCard}><Image src={product.image} alt={t(product.imageAltId)} width={190} height={190} /><div><span>{t("home.comingSoon")}</span><strong>{product.brand}</strong><h3>{t(product.nameId)}</h3><Link href={`/product/${product.slug}`}>{t("common.learnMore")}</Link></div></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.instagram}`} aria-labelledby="instagram-title">
        <div className="container"><SectionHeading eyebrowId="home.storeContent" titleId="home.instagram" href="/instagram" t={t} /><p className={styles.moduleNote}>{t("home.instagramNote")}</p><HorizontalCarousel ariaLabel={t("home.instagramAria")} itemWidth="square">{instagramPosts.map((post) => <article key={post.id} className={styles.instagramCard}><Image src={post.image} alt="" fill sizes="220px" /><span>{t(post.labelId)}</span></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.reviews}`} aria-labelledby="reviews-title">
        <div className="container"><SectionHeading eyebrowId="home.professionalExperience" titleId="common.reviews" href="/reviews" t={t} /><HorizontalCarousel ariaLabel={t("home.customerReviews")} itemWidth="wide">{reviews.map((review) => <article key={review.id} className={styles.reviewCard}><RatingStars average={review.rating} count={1} /><blockquote>“{t(review.textId)}”</blockquote><footer><strong>{t(review.authorId)}</strong><span>{new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US").format(new Date(review.date))}</span></footer><Link href={`/product/${review.product.slug}#reviews`}>{t(review.product.nameId)}</Link></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.blog}`} aria-labelledby="blog-title">
        <div className="container"><SectionHeading eyebrowId="home.usefulForWork" titleId="common.blog" href="/blog" t={t} /><HorizontalCarousel ariaLabel={t("home.blogArticles")} itemWidth="editorial">{blogArticles.map((article) => <article key={article.id} className={styles.blogCard}><div className={styles.blogImage}><Image src={article.image} alt="" fill sizes="360px" /></div><span>{t(article.categoryId)}</span><h3>{t(article.titleId)}</h3><Link href={`/blog#${article.slug}`}>{t("home.readArticle")} <ArrowRight aria-hidden="true" /></Link></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.about}`} aria-labelledby="about-title">
        <div className="container"><SectionHeading eyebrowId="common.about" titleId="home.supportingCraft" href="/about" t={t} /><HorizontalCarousel ariaLabel={t("home.storeBenefits")} itemWidth="wide">{informationCards.map((card) => <article key={card.number} className={styles.aboutCard}><span>{card.number}</span><h3>{t(card.titleId)}</h3><p>{t(card.textId)}</p></article>)}</HorizontalCarousel><p className={styles.seoText}>{t("home.aboutText")}</p></div>
      </section>
    </>
  );
}
