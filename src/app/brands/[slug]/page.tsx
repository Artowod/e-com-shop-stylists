import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getServerTranslations } from "@/i18n/server";
import { featuredProducts } from "@/data/catalogSeed";
import { featuredBrands } from "@/data/featuredBrands";
import styles from "../brands.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredBrands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const brand = featuredBrands.find((item) => item.slug === slug);

  if (!brand) return {};

  return {
    title: brand.name,
    description: t("metadata.brand.description", { brand: brand.name }),
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const brand = featuredBrands.find((item) => item.slug === slug);

  if (!brand) notFound();

  const products = featuredProducts.filter((product) => product.brand === brand.name);

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}>
        <Link href="/">{t("common.home")}</Link>
        <span>/</span>
        <Link href="/brands">{t("common.brands")}</Link>
        <span>/</span>
        <span>{brand.name}</span>
      </nav>

      <header className={styles.brandHero}>
        <span className={styles.brandLogo}>
          <Image src={brand.logoPath} alt={t("common.logoAlt", { brand: brand.name })} width={108} height={76} priority />
        </span>
        <div>
          <h1>{brand.name}</h1>
          <p>{t("brands.description", { brand: brand.name })}</p>
        </div>
      </header>

      {products.length ? (
        <section aria-labelledby="brand-products-title">
          <div className={styles.productsHeading}>
            <h2 id="brand-products-title">{t("brands.products")}</h2>
            <span>{products.length}</span>
          </div>
          <ProductGrid products={products} />
        </section>
      ) : (
        <div className={styles.empty}>
          <h2>{t("brands.emptyTitle")}</h2>
          <p>{t("brands.emptyText", { brand: brand.name })}</p>
          <Link href="/catalog">{t("common.goToCatalog")}</Link>
        </div>
      )}
    </div>
  );
}
