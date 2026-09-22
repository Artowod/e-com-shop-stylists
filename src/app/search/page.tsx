import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { featuredProducts } from "@/data/catalogSeed";
import styles from "../catalog/catalog.module.scss";

export const metadata: Metadata = { title: "Пошук", robots: { index: false, follow: true } };
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() ?? ""; const normalized = query.toLocaleLowerCase("uk-UA");
  const results = query ? featuredProducts.filter((product) => [product.name, product.brand, product.sku].some((value) => value.toLocaleLowerCase("uk-UA").includes(normalized))) : [];
  return <div className={`container ${styles.page}`}><h1>Пошук</h1>{query && <p>Результати для «{query}»: {results.length}</p>}{results.length ? <ProductGrid products={results} /> : <div className={styles.empty}><h2>{query ? "Нічого не знайдено" : "Введіть пошуковий запит"}</h2><p>Спробуйте назву товару, бренд, модель або артикул.</p></div>}</div>;
}
