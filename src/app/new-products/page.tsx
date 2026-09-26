import type { Metadata } from "next";

import { ProductCollectionPage } from "@/components/ProductCollectionPage/ProductCollectionPage";
import { newProducts } from "@/data/homeContent";
import { getServerTranslations } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> { const { t } = await getServerTranslations(); return { title: t("home.newProducts"), description: t("metadata.newProducts.description"), alternates: { canonical: "/new-products" } }; }

export default function NewProductsPage() {
  return <ProductCollectionPage eyebrowId="home.justAdded" titleId="home.newProducts" descriptionId="newProducts.description" products={newProducts} />;
}
