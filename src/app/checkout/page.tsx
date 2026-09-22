import type { Metadata } from "next";
import Link from "next/link";
import styles from "../cart/cart.module.scss";
export const metadata: Metadata = { title: "Оформлення замовлення", robots: { index: false, follow: false } };
export default function CheckoutPage() { return <div className={`container ${styles.page}`}><div className={styles.empty}><h1>Потрібен вхід</h1><p>Оформлення доступне після входу через Google. Підключення OAuth потребує реальних `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` та `AUTH_SECRET`; замовлення до цього моменту не створюється.</p><Link href="/cart">Повернутися до кошика</Link></div></div>; }
