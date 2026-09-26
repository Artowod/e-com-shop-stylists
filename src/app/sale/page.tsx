import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getServerTranslations } from "@/i18n/server";
import { featuredProducts } from "@/data/catalogSeed";

import styles from "./sale.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.sale"), description: t("metadata.sale.description"), alternates: { canonical: "/sale" } }; }

export default async function SalePage() {
  const { t } = await getServerTranslations();
  const saleProducts = featuredProducts.filter((product) => product.oldPrice && product.oldPrice > product.price);

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}>
        <Link href="/">{t("common.home")}</Link>
        <span>/</span>
        <span>{t("common.sale")}</span>
      </nav>

      <header className={styles.hero}>
        <span className={styles.eyebrow}>{t("home.specialPrices")}</span>
        <h1>{t("sale.pageTitle")}</h1>
        <p>{t("sale.description")}</p>
      </header>

      <section aria-labelledby="sale-products-title">
        <div className={styles.heading}>
          <h2 id="sale-products-title">{t("sale.current")}</h2>
          <span>{t("common.productsCount", { count: saleProducts.length })}</span>
        </div>

        {saleProducts.length > 0 ? (
          <ProductGrid products={saleProducts} />
        ) : (
          <div className={styles.empty}>
            <h2>{t("sale.emptyTitle")}</h2>
            <p>{t("sale.emptyText")}</p>
            <Link href="/catalog">{t("common.goToCatalog")}</Link>
          </div>
        )}
      </section>
    </div>
  );
}
