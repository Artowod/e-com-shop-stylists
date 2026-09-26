import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";

import styles from "./SiteFooter.module.scss";

export async function SiteFooter() {
  const { t } = await getServerTranslations();
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div><strong>BARBER<span>SHOP</span></strong><p>{t("footer.description")}</p></div>
        <div><h2>{t("footer.customers")}</h2><Link href="/delivery">{t("footer.deliveryPayment")}</Link><Link href="/returns">{t("footer.returns")}</Link><Link href="/warranty">{t("footer.warranty")}</Link></div>
        <div><h2>{t("common.catalog")}</h2><Link href="/catalog">{t("footer.allProducts")}</Link><Link href="/brands">{t("common.brands")}</Link><Link href="/sale">{t("common.sale")}</Link></div>
        <div><h2>{t("footer.contact")}</h2><p>{t("footer.hours")}</p><a href="mailto:shop@example.com">shop@example.com</a></div>
      </div>
      <div className={styles.bottom}>{t("footer.copyright", { year: new Date().getFullYear() })}</div>
    </footer>
  );
}
