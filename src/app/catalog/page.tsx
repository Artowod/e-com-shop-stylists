import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getServerTranslations } from "@/i18n/server";
import { catalogCategories, featuredProducts } from "@/data/catalogSeed";
import styles from "./catalog.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.catalog"), description: t("metadata.catalog.description"), alternates: { canonical: "/catalog" } }; }
export default async function CatalogPage() { const { t } = await getServerTranslations(); return <div className={`container ${styles.page}`}><nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("common.catalog")}</span></nav><h1>{t("catalog.title")}</h1><div className={styles.categories}>{catalogCategories.map((category) => <Link key={category.id} href={`/catalog/${category.slug}`}><span className={styles.categoryName}><Image src={category.iconPath} alt="" width={36} height={36} />{t(category.nameId)}</span><ArrowRight aria-hidden="true" /></Link>)}</div><section className={styles.allProducts} aria-labelledby="products-title"><div className="sectionHeading"><h2 id="products-title">{t("catalog.popular")}</h2><span>{t("common.productsCount", { count: featuredProducts.length })}</span></div><ProductGrid products={featuredProducts} /></section></div>; }
