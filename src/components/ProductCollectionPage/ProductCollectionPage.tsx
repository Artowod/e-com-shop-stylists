import Link from "next/link";

import type { CatalogProduct } from "@/types/catalog";
import type { MessageId } from "@/i18n/messages";
import { getServerTranslations } from "@/i18n/server";
import { ProductGrid } from "../ProductGrid/ProductGrid";

import styles from "./ProductCollectionPage.module.scss";

type ProductCollectionPageProps = {
  eyebrowId: MessageId;
  titleId: MessageId;
  descriptionId: MessageId;
  products: CatalogProduct[];
};

export async function ProductCollectionPage({ eyebrowId, titleId, descriptionId, products }: ProductCollectionPageProps) {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}>
        <Link href="/">{t("common.home")}</Link>
        <span>/</span>
        <span>{t(titleId)}</span>
      </nav>

      <header className={styles.header}>
        <span>{t(eyebrowId)}</span>
        <h1>{t(titleId)}</h1>
        <p>{t(descriptionId)}</p>
      </header>

      <div className={styles.count}>{t("common.productsCount", { count: products.length })}</div>
      <ProductGrid products={products} />
    </div>
  );
}
