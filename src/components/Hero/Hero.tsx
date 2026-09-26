import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServerTranslations } from "@/i18n/server";

import styles from "./Hero.module.scss";

export async function Hero() {
  const { t } = await getServerTranslations();
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.description")}</p>
        <Link href="/sale">
          {t("hero.cta")} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.circle} />
        <span className={styles.blade}>
          PRO
          <br />
          01
        </span>
      </div>
    </section>
  );
}
