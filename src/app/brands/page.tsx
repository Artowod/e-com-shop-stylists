import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { featuredBrands } from "@/data/featuredBrands";
import styles from "./brands.module.scss";

export const metadata: Metadata = {
  title: "Бренди",
  description: "Професійні бренди техніки та інструментів для барберів, перукарів і стилістів.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок">
        <Link href="/">Головна</Link>
        <span>/</span>
        <span>Бренди</span>
      </nav>
      <h1 className={styles.pageTitle}>Бренди</h1>
      <div className={styles.brandList}>
        {featuredBrands.map((brand) => (
          <Link className={styles.brandLink} href={`/brands/${brand.slug}`} key={brand.slug}>
            <Image src={brand.logoPath} alt={`Логотип ${brand.name}`} width={108} height={76} />
            <strong>{brand.name}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
