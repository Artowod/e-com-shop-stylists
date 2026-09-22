import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { catalogCategories, featuredProducts } from "@/data/catalogSeed";
import styles from "../catalog.module.scss";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string }> };
export function generateStaticParams() { return catalogCategories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const category = catalogCategories.find((item) => item.slug === slug); return category ? { title: category.name, description: `${category.name}: професійні товари з доставкою по Україні.`, alternates: { canonical: `/catalog/${slug}` } } : {}; }

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params; const { sort = "default" } = await searchParams; const category = catalogCategories.find((item) => item.slug === slug); if (!category) notFound();
  const categoryProducts = featuredProducts.filter((product) => product.categorySlug === slug);
  const products = [...categoryProducts].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0);
  return <div className={`container ${styles.page}`}><nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок"><Link href="/">Головна</Link><span>/</span><Link href="/catalog">Каталог</Link><span>/</span><span>{category.name}</span></nav><h1 className={styles.categoryTitle}><Image src={category.iconPath} alt="" width={58} height={58} />{category.name}</h1><div className={styles.toolbar}><button type="button">Фільтри</button><form><label htmlFor="sort">Сортування</label><select id="sort" name="sort" defaultValue={sort}><option value="default">За замовчуванням</option><option value="price-asc">Від дешевих</option><option value="price-desc">Від дорогих</option><option value="newest">Новинки</option></select><button type="submit">Застосувати</button></form></div>{products.length ? <ProductGrid products={products} /> : <div className={styles.empty}><h2>Товари готуються до публікації</h2><p>Категорія вже створена. Після підключення Neon товари з’являться тут без зміни коду сторінки.</p><Link href="/catalog">Повернутися до каталогу</Link></div>}</div>;
}
