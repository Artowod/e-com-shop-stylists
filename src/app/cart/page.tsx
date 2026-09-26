import type { Metadata } from "next";
import { CartContent } from "./CartContent";
import { getServerTranslations } from "@/i18n/server";
import styles from "./cart.module.scss";
export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("cart.title"), robots: { index: false, follow: false } }; }
export default function CartPage() { return <div className={`container ${styles.page}`}><CartContent /></div>; }
