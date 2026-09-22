import type { Metadata } from "next";
import { CartContent } from "./CartContent";
import styles from "./cart.module.scss";
export const metadata: Metadata = { title: "Кошик", robots: { index: false, follow: false } };
export default function CartPage() { return <div className={`container ${styles.page}`}><CartContent /></div>; }
