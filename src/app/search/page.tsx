import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { getServerTranslations } from "@/i18n/server";
import { featuredProducts } from "@/data/catalogSeed";
import styles from "../catalog/catalog.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("search.title"), robots: { index: false, follow: true } }; }
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { t } = await getServerTranslations();
  const query = (await searchParams).q?.trim() ?? ""; const normalized = query.toLocaleLowerCase("uk-UA");
  const results = query ? featuredProducts.filter((product) => [t(product.nameId), product.name, product.brand, product.sku].some((value) => value.toLocaleLowerCase().includes(normalized))) : [];
  return <div className={`container ${styles.page}`}><h1>{t("search.title")}</h1>{query && <p>{t("search.results", { query, count: results.length })}</p>}{results.length ? <ProductGrid products={results} /> : <div className={styles.empty}><h2>{t(query ? "search.empty" : "search.prompt")}</h2><p>{t("search.help")}</p></div>}</div>;
}
