import type { CatalogProduct } from "@/types/catalog";

import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  return <div className={styles.grid}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
