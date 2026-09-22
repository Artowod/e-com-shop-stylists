import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>SALE · пропозиція тижня</span>
        <h1>Професійна техніка до −30%</h1>
        <p>Спеціальні ціни на перевірені інструменти для барберів, перукарів і стилістів. Кількість акційних товарів обмежена.</p>
        <Link href="/sale">До акційних товарів <ArrowRight aria-hidden="true" /></Link>
      </div>
      <div className={styles.visual} aria-hidden="true">
        <span className={styles.circle} />
        <span className={styles.blade}>PRO<br />01</span>
      </div>
    </section>
  );
}
