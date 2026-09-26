import type { Metadata } from "next";
import Link from "next/link";

import { informationCards } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";
import styles from "@/shared/styles/contentPage.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.about"), description: t("metadata.about.description"), alternates: { canonical: "/about" } }; }

export default async function AboutPage() {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("common.about")}</span></nav>
      <header className={styles.header}><span className={styles.eyebrow}>{t("common.about")}</span><h1>{t("about.title")}</h1><p>{t("about.description")}</p></header>
      <div className={styles.grid}>{informationCards.map((card) => <article className={styles.card} key={card.number}><span className={styles.tag}>{card.number}</span><h2>{t(card.titleId)}</h2><p>{t(card.textId)}</p></article>)}</div>
    </div>
  );
}
