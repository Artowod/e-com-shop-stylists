import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryShowcase } from "@/components/CategoryShowcase/CategoryShowcase";
import { Hero } from "@/components/Hero/Hero";
import { HomeModules } from "@/components/HomeModules/HomeModules";
import { getServerTranslations } from "@/i18n/server";
import styles from "./page.module.scss";

export default async function HomePage() {
  const { t } = await getServerTranslations();
  return <><Hero /><section className={`container section ${styles.categories}`} aria-labelledby="categories-title"><div className="sectionHeading"><h2 id="categories-title">{t("home.popularCategories")}</h2><Link href="/catalog">{t("common.viewCatalog")} <ArrowRight aria-hidden="true" /></Link></div><CategoryShowcase /></section><HomeModules /></>;
}
