import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { featuredProducts } from "@/data/catalogSeed";
import { featuredBrands } from "@/data/featuredBrands";
import styles from "../brands.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredBrands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = featuredBrands.find((item) => item.slug === slug);

  if (!brand) return {};

  return {
    title: brand.name,
    description: `Професійна техніка та інструменти ${brand.name} з доставкою по Україні.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = featuredBrands.find((item) => item.slug === slug);

  if (!brand) notFound();

  const products = featuredProducts.filter((product) => product.brand === brand.name);

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок">
        <Link href="/">Головна</Link>
        <span>/</span>
        <Link href="/brands">Бренди</Link>
        <span>/</span>
        <span>{brand.name}</span>
      </nav>

      <header className={styles.brandHero}>
        <span className={styles.brandLogo}>
          <Image src={brand.logoPath} alt={`Логотип ${brand.name}`} width={108} height={76} priority />
        </span>
        <div>
          <h1>{brand.name}</h1>
          <p>Професійна техніка та інструменти {brand.name} для барберів, перукарів і стилістів.</p>
        </div>
      </header>

      {products.length ? (
        <section aria-labelledby="brand-products-title">
          <div className={styles.productsHeading}>
            <h2 id="brand-products-title">Товари бренду</h2>
            <span>{products.length}</span>
          </div>
          <ProductGrid products={products} />
        </section>
      ) : (
        <div className={styles.empty}>
          <h2>Товари готуються до публікації</h2>
          <p>Сторінка бренду вже доступна. Асортимент {brand.name} незабаром з’явиться у каталозі.</p>
          <Link href="/catalog">Перейти до каталогу</Link>
        </div>
      )}
    </div>
  );
}
