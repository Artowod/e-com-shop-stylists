import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { HorizontalCarousel } from "@/components/HorizontalCarousel/HorizontalCarousel";
import { ProductBundle } from "@/components/ProductBundle/ProductBundle";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { ProductColorProvider } from "@/components/ProductColorProvider/ProductColorProvider";
import { ProductContent } from "@/components/ProductContent/ProductContent";
import { ProductGallery } from "@/components/ProductGallery/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase/ProductPurchase";
import { ProductReviews } from "@/components/ProductReviews/ProductReviews";
import { RatingStars } from "@/components/RatingStars/RatingStars";
import { featuredProducts } from "@/data/catalogSeed";
import { formatPrice } from "@/lib/formatPrice";
import { getReviewSummary } from "@/lib/reviewSummary";
import { getServerTranslations } from "@/i18n/server";

import styles from "./product.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredProducts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const product = featuredProducts.find((item) => item.slug === slug);
  return product ? {
    title: t(product.nameId),
    description: t("metadata.product.description", { product: t(product.nameId), brand: product.brand, price: formatPrice(product.price) }),
    alternates: { canonical: `/product/${slug}` },
  } : {};
}

export default async function ProductPage({ params }: Props) {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const product = featuredProducts.find((item) => item.slug === slug);
  if (!product) notFound();

  const rating = getReviewSummary(product.reviews);
  const related = featuredProducts.filter((item) => item.id !== product.id);
  const pairedProduct = related[0];
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t(product.nameId),
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    image: product.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: product.price,
      availability: product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `/product/${product.slug}`,
    },
    ...(rating.count ? { aggregateRating: { "@type": "AggregateRating", ratingValue: rating.average, reviewCount: rating.count } } : {}),
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}>
          <Link href="/">{t("common.home")}</Link><span>/</span><Link href="/catalog">{t("common.catalog")}</Link><span>/</span><span>{t(product.nameId)}</span>
        </nav>

        <ProductColorProvider product={product}>
          <article className={styles.product}>
            <ProductGallery product={product} />
            <div className={styles.info}>
              <div className={styles.topline}><span className={styles.brand}>{product.brand}</span><span>{t("product.sku", { sku: product.sku })}</span></div>
              <h1>{t(product.nameId)}</h1>
              <div className={styles.ratingLine}><a href="#reviews"><RatingStars average={rating.average} count={rating.count} /></a><span className={styles.available}><CircleCheck aria-hidden="true" /> {t("product.inStock")}</span></div>
              <div className={styles.price}><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}{product.oldPrice && <span>{t("product.savings", { price: formatPrice(product.oldPrice - product.price) })}</span>}</div>
              <ProductPurchase product={product} />
            </div>
          </article>
        </ProductColorProvider>

        {pairedProduct && <ProductBundle mainProduct={product} pairedProduct={pairedProduct} />}
        <ProductContent product={product} />
        <ProductReviews reviews={product.reviews ?? []} />
      </div>

      <section className={`${styles.related} ${styles.recommended}`} aria-labelledby="recommended-title">
        <div className="container"><div className={styles.sectionHeading}><span>{t("product.curated")}</span><h2 id="recommended-title">{t("product.perfectTogether")}</h2></div><HorizontalCarousel ariaLabel={t("product.recommended")}>{related.map((item) => <ProductCard key={item.id} product={item} />)}</HorizontalCarousel></div>
      </section>
      <section className={styles.related} aria-labelledby="liked-title">
        <div className="container"><div className={styles.sectionHeading}><span>{t("product.mayInterest")}</span><h2 id="liked-title">{t("product.alsoLike")}</h2></div><HorizontalCarousel ariaLabel={t("product.alsoLike")}>{[...related].reverse().map((item) => <ProductCard key={item.id} product={item} />)}</HorizontalCarousel></div>
      </section>
      <section className={`${styles.related} ${styles.recent}`} aria-labelledby="recent-title">
        <div className="container"><div className={styles.sectionHeading}><span>{t("product.history")}</span><h2 id="recent-title">{t("product.recentlyViewed")}</h2></div><HorizontalCarousel ariaLabel={t("product.recentlyViewedProducts")}>{featuredProducts.map((item) => <ProductCard key={item.id} product={item} />)}</HorizontalCarousel></div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
