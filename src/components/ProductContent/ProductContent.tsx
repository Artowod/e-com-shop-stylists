import type { CatalogProduct } from "@/types/catalog";
import { getServerTranslations } from "@/i18n/server";
import styles from "./ProductContent.module.scss";

export async function ProductContent({ product }: { product: CatalogProduct }) {
  const { t } = await getServerTranslations();
  return <section className={styles.content} aria-label={t("product.infoLabel")}><article><h2>{t("product.descriptionTitle")}</h2><p>{t("product.descriptionText")}</p></article><details open><summary>{t("product.benefits")}</summary><ul><li>{t("product.benefitStable")}</li><li>{t("product.benefitBalance")}</li><li>{t("product.benefitMaterials")}</li></ul></details><details><summary>{t("product.usage")}</summary><p>{t("product.usageText")}</p></details><article className={styles.characteristics}><h2>{t("product.specifications")}</h2>{product.characteristics?.length ? <dl>{product.characteristics.map((item) => <div key={item.labelId}><dt>{t(item.labelId)}</dt><dd>{item.valueId ? t(item.valueId) : item.value}</dd></div>)}</dl> : <p>{t("product.specificationsPending")}</p>}</article></section>;
}
