import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { comingSoonProducts } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";
import styles from "@/shared/styles/contentPage.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("home.comingSoon"), description: t("metadata.comingSoon.description"), alternates: { canonical: "/coming-soon" } }; }

export default async function ComingSoonPage() {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("home.comingSoon")}</span></nav>
      <header className={styles.header}><span className={styles.eyebrow}>{t("home.awaitingDelivery")}</span><h1>{t("home.comingSoon")}</h1><p>{t("comingSoon.description")}</p></header>
      <div className={styles.grid}>
        {comingSoonProducts.map((product) => <article className={`${styles.card} ${styles.soonCard}`} key={product.id}><Image src={product.image} alt={t(product.imageAltId)} width={180} height={180} /><div><span className={styles.tag}>{t("home.comingSoon")}</span><h2>{t(product.nameId)}</h2><p>{product.brand}</p><Link className={styles.link} href={`/product/${product.slug}`}>{t("common.learnMore")} <ArrowRight aria-hidden="true" /></Link></div></article>)}
      </div>
    </div>
  );
}
