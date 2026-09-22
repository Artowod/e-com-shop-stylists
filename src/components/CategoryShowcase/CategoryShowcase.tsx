import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { catalogCategories } from "@/data/catalogSeed";

import styles from "./CategoryShowcase.module.scss";

export function CategoryShowcase() {
  return (
    <div className={styles.grid}>
      {catalogCategories.slice(0, 8).map((category, index) => (
        <Link key={category.id} href={`/catalog/${category.slug}`}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <Image className={styles.icon} src={category.iconPath} alt="" width={32} height={32} />
          <span>{category.name}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
