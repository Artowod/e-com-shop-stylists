import Link from "next/link";

import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div><strong>BARBER<span>SHOP</span></strong><p>Професійні інструменти й косметика для майстрів.</p></div>
        <div><h2>Покупцям</h2><Link href="/delivery">Доставка й оплата</Link><Link href="/returns">Обмін і повернення</Link><Link href="/warranty">Гарантія</Link></div>
        <div><h2>Каталог</h2><Link href="/catalog">Усі товари</Link><Link href="/brands">Бренди</Link><Link href="/sale">Акції</Link></div>
        <div><h2>Ми на зв’язку</h2><p>Пн–Сб, 09:00–19:00</p><a href="mailto:shop@example.com">shop@example.com</a></div>
      </div>
      <div className={styles.bottom}>© {new Date().getFullYear()} Barber Shop. Усі права захищені.</div>
    </footer>
  );
}
