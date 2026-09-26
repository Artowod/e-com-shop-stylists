import type { Metadata } from "next";

import { ProductCollectionPage } from "@/components/ProductCollectionPage/ProductCollectionPage";
import { productsOfWeek } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("home.productsOfWeek"), description: t("metadata.weekProducts.description"), alternates: { canonical: "/products-of-the-week" } }; }

export default function ProductsOfTheWeekPage() {
  return <ProductCollectionPage eyebrowId="home.professionalsChoice" titleId="home.productsOfWeek" descriptionId="weekProducts.description" products={productsOfWeek} />;
}
