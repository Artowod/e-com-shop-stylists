import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { blogArticles } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";
import styles from "@/shared/styles/contentPage.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("common.blog"), description: t("metadata.blog.description"), alternates: { canonical: "/blog" } }; }

export default async function BlogPage() {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("common.blog")}</span></nav>
      <header className={styles.header}><span className={styles.eyebrow}>{t("home.usefulForWork")}</span><h1>{t("common.blog")}</h1><p>{t("blog.description")}</p></header>
      <div className={`${styles.grid} ${styles.gridThree}`}>{blogArticles.map((article) => <article className={styles.mediaCard} id={article.slug} key={article.id}><div className={styles.image}><Image src={article.image} alt="" fill sizes="(max-width: 699px) 100vw, (max-width: 1079px) 50vw, 33vw" /></div><div className={styles.mediaCardContent}><span className={styles.tag}>{t(article.categoryId)}</span><h2>{t(article.titleId)}</h2><p>{t("blog.cardText")}</p><Link className={styles.link} href={`/blog#${article.slug}`}>{t("home.readArticle")} <ArrowRight aria-hidden="true" /></Link></div></article>)}</div>
    </div>
  );
}
