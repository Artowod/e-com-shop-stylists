import Link from "next/link";
import { getServerTranslations } from "@/i18n/server";
export default async function NotFound() { const { t } = await getServerTranslations(); return <div className="container section"><h1>{t("notFound.title")}</h1><p>{t("notFound.description")}</p><Link href="/catalog">{t("common.goToCatalog")}</Link></div>; }
