import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { notFound } from "next/navigation";

import { CatalogFilters } from "@/components/CatalogFilters/CatalogFilters";
import type { MessageId } from "@/i18n/messages";
import { getServerTranslations } from "@/i18n/server";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { catalogCategories, featuredProducts } from "@/data/catalogSeed";
import {
  filterCatalogProducts,
  getCatalogFilterDefinition,
  getParamValues,
  sortCatalogProducts,
  type CatalogFilterDefinition,
  type CatalogSearchParams,
} from "@/lib/catalogFilters";

import styles from "../catalog.module.scss";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<CatalogSearchParams> };
type ActiveFilter = { key: string; value?: string; label: string };

export function generateStaticParams() {
  return catalogCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const category = catalogCategories.find((item) => item.slug === slug);
  return category ? { title: t(category.nameId), description: t("metadata.category.description", { category: t(category.nameId) }), alternates: { canonical: `/catalog/${slug}` } } : {};
}

type Translate = (id: MessageId, values?: Record<string, string | number>) => string;

function getActiveFilters(filters: CatalogFilterDefinition, searchParams: CatalogSearchParams, t: Translate): ActiveFilter[] {
  const active: ActiveFilter[] = [];
  const addOptions = (key: string, selected: string[], options: { label?: string; labelId?: MessageId; value: string }[]) => selected.forEach((value) => {
    const option = options.find((item) => item.value === value);
    if (option) active.push({ key, value, label: option.labelId ? t(option.labelId) : option.label ?? value });
  });

  addOptions("availability", getParamValues(searchParams.availability), [{ value: "in-stock", labelId: "product.inStock" }, { value: "out-of-stock", labelId: "product.outOfStock" }]);
  addOptions("brand", getParamValues(searchParams.brand), filters.brands);
  if (typeof searchParams.priceMin === "string" && searchParams.priceMin) active.push({ key: "priceMin", label: t("filters.priceFrom", { price: searchParams.priceMin }) });
  if (typeof searchParams.priceMax === "string" && searchParams.priceMax) active.push({ key: "priceMax", label: t("filters.priceTo", { price: searchParams.priceMax }) });

  for (const attribute of filters.attributes) {
    if (attribute.type === "number") {
      const min = searchParams[`${attribute.slug}Min`];
      const max = searchParams[`${attribute.slug}Max`];
      const unit = attribute.unitId ? ` ${t(attribute.unitId)}` : "";
      if (typeof min === "string" && min) active.push({ key: `${attribute.slug}Min`, label: t("filters.attributeFrom", { attribute: t(attribute.labelId), value: min, unit }) });
      if (typeof max === "string" && max) active.push({ key: `${attribute.slug}Max`, label: t("filters.attributeTo", { attribute: t(attribute.labelId), value: max, unit }) });
    } else {
      addOptions(attribute.slug, getParamValues(searchParams[attribute.slug]), attribute.options);
    }
  }

  addOptions("color", getParamValues(searchParams.color), filters.colors);
  if (getParamValues(searchParams.sale).includes("1")) active.push({ key: "sale", value: "1", label: t("filters.discounted") });
  return active;
}

function buildFilterHref(path: string, searchParams: CatalogSearchParams, filter: ActiveFilter) {
  const nextParams = new URLSearchParams();
  for (const [key, rawValue] of Object.entries(searchParams)) {
    for (const value of getParamValues(rawValue)) {
      if (key !== filter.key || (filter.value !== undefined && value !== filter.value)) nextParams.append(key, value);
    }
  }
  const query = nextParams.toString();
  return query ? `${path}?${query}` : path;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { t } = await getServerTranslations();
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const sortValue = Array.isArray(resolvedSearchParams.sort) ? resolvedSearchParams.sort[0] : resolvedSearchParams.sort;
  const sort = sortValue ?? "default";
  const category = catalogCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  const path = `/catalog/${slug}`;
  const categoryProducts = featuredProducts.filter((product) => product.categorySlug === slug);
  const filters = getCatalogFilterDefinition(categoryProducts, slug);
  const products = sortCatalogProducts(filterCatalogProducts(categoryProducts, resolvedSearchParams), sort);
  const activeFilters = getActiveFilters(filters, resolvedSearchParams, t);
  const preservedFilterParams = Object.entries(resolvedSearchParams).flatMap(([key, rawValue]) => key === "sort" ? [] : getParamValues(rawValue).map((value) => ({ key, value })));

  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumbs} aria-label={t("common.breadcrumbs")}><Link href="/">{t("common.home")}</Link><span>/</span><Link href="/catalog">{t("common.catalog")}</Link><span>/</span><span>{t(category.nameId)}</span></nav>
      <h1 className={styles.categoryTitle}><Image src={category.iconPath} alt="" width={58} height={58} />{t(category.nameId)}</h1>

      <div className={styles.catalogLayout}>
        <CatalogFilters action={path} filters={filters} searchParams={resolvedSearchParams} sort={sort} activeCount={activeFilters.length} />
        <div className={styles.results}>
          <div className={styles.toolbar}>
            <span>{t("catalog.found", { count: products.length })}</span>
            <form action={path} method="get">
              {preservedFilterParams.map(({ key, value }, index) => <input key={`${key}-${value}-${index}`} type="hidden" name={key} value={value} />)}
              <label htmlFor="sort">{t("catalog.sort")}</label>
              <select id="sort" name="sort" defaultValue={sort}>
                <option value="default">{t("catalog.sortDefault")}</option>
                <option value="price-asc">{t("catalog.sortPriceAsc")}</option>
                <option value="price-desc">{t("catalog.sortPriceDesc")}</option>
                <option value="newest">{t("catalog.sortNewest")}</option>
                <option value="discount">{t("catalog.sortDiscount")}</option>
              </select>
              <button type="submit">{t("catalog.apply")}</button>
            </form>
          </div>

          {activeFilters.length > 0 && <div className={styles.activeFilters} aria-label={t("catalog.activeFilters")}>{activeFilters.map((filter) => <Link key={`${filter.key}-${filter.value ?? "range"}`} href={buildFilterHref(path, resolvedSearchParams, filter)}>{filter.label}<X aria-hidden="true" /></Link>)}<Link className={styles.clearFilters} href={path}>{t("catalog.clearAll")}</Link></div>}

          {products.length > 0 ? <ProductGrid products={products} /> : <div className={styles.empty}><h2>{t("catalog.emptyTitle")}</h2><p>{t("catalog.emptyText")}</p><Link href={path}>{t("catalog.clearFilters")}</Link></div>}
        </div>
      </div>
    </div>
  );
}
