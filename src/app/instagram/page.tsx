import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { instagramPosts } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";
import styles from "@/shared/styles/contentPage.module.scss";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("home.instagram"), description: t("metadata.instagram.description"), alternates: { canonical: "/instagram" } }; }

export default async function InstagramPage() {
  const { t } = await getServerTranslations();
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><span>{t("common.instagram")}</span></nav>
      <header className={styles.header}><span className={styles.eyebrow}>{t("home.storeContent")}</span><h1>{t("home.instagram")}</h1><p>{t("instagram.description")}</p></header>
      <div className={`${styles.grid} ${styles.gridThree}`}>{instagramPosts.map((post) => <article className={styles.mediaCard} key={post.id}><div className={styles.instagramImage}><Image src={post.image} alt="" fill sizes="(max-width: 699px) 100vw, (max-width: 1079px) 50vw, 33vw" /></div><span className={styles.instagramLabel}>{t(post.labelId)}</span></article>)}</div>
    </div>
  );
}
