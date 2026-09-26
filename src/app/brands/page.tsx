import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { featuredBrands } from "@/data/featuredBrands";
import { getServerTranslations } from "@/i18n/server";
import styles from "./brands.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.brands"), description: t("metadata.brands.description"), alternates: { canonical: "/brands" } }; }

export default async function BrandsPage() {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}>
        <Link href="/">{t("common.home")}</Link>
        <span>/</span>
        <span>{t("common.brands")}</span>
      </nav>
      <h1 className={styles.pageTitle}>{t("common.brands")}</h1>
      <div className={styles.brandList}>
        {featuredBrands.map((brand) => (
          <Link className={styles.brandLink} href={`/brands/${brand.slug}`} key={brand.slug}>
            <Image src={brand.logoPath} alt={t("common.logoAlt", { brand: brand.name })} width={108} height={76} />
            <strong>{brand.name}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
