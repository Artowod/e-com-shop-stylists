import type { Metadata } from "next";
import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";
import styles from "../cart/cart.module.scss";
export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("checkout.title"), robots: { index: false, follow: false } }; }
export default async function CheckoutPage() { const { t } = await getServerTranslations(); return <div className={`container ${styles.page}`}><div className={styles.empty}><h1>{t("checkout.signIn")}</h1><p>{t("checkout.description")}</p><Link href="/cart">{t("checkout.back")}</Link></div></div>; }
