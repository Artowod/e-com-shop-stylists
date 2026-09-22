import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { catalogCategories, featuredProducts } from "@/data/catalogSeed";
import styles from "./catalog.module.scss";

export const metadata: Metadata = { title: "Каталог", description: "Каталог професійних товарів для барберів, перукарів і стилістів.", alternates: { canonical: "/catalog" } };
export default function CatalogPage() { return <div className={`container ${styles.page}`}><nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок"><Link href="/">Головна</Link><span>/</span><span>Каталог</span></nav><h1>Каталог товарів</h1><div className={styles.categories}>{catalogCategories.map((category) => <Link key={category.id} href={`/catalog/${category.slug}`}><span className={styles.categoryName}><Image src={category.iconPath} alt="" width={36} height={36} />{category.name}</span><ArrowRight aria-hidden="true" /></Link>)}</div><section className={styles.allProducts} aria-labelledby="products-title"><div className="sectionHeading"><h2 id="products-title">Популярні товари</h2><span>{featuredProducts.length} товари</span></div><ProductGrid products={featuredProducts} /></section></div>; }
