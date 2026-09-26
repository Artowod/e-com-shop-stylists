"use client";

import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef } from "react";

import { getParamValues, type CatalogFilterDefinition, type CatalogSearchParams } from "@/lib/catalogFilters";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";

import styles from "./CatalogFilters.module.scss";

type FilterFormProps = {
  action: string;
  filters: CatalogFilterDefinition;
  searchParams: CatalogSearchParams;
  sort: string;
  idPrefix: string;
  onApply?: () => void;
};

function FilterForm({ action, filters, searchParams, sort, idPrefix, onApply }: FilterFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const selectedAvailability = getParamValues(searchParams.availability);
  const selectedBrands = getParamValues(searchParams.brand);
  const selectedColors = getParamValues(searchParams.color);
  const selectedSale = getParamValues(searchParams.sale);

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextParams = new URLSearchParams();
    for (const [key, value] of new FormData(event.currentTarget).entries()) {
      if (typeof value === "string" && value.trim()) nextParams.append(key, value);
    }
    onApply?.();
    const query = nextParams.toString();
    router.push(query ? `${action}?${query}` : action);
  }

  return <form className={styles.form} action={action} method="get" onSubmit={applyFilters}>
      {sort !== "default" && <input type="hidden" name="sort" value={sort} />}

      {(filters.hasAvailable || filters.hasUnavailable) && <fieldset><legend>{t("filters.availability")}</legend>
        {filters.hasAvailable && <label><input type="checkbox" name="availability" value="in-stock" defaultChecked={selectedAvailability.includes("in-stock")} /><span>{t("product.inStock")}</span></label>}
        {filters.hasUnavailable && <label><input type="checkbox" name="availability" value="out-of-stock" defaultChecked={selectedAvailability.includes("out-of-stock")} /><span>{t("product.outOfStock")}</span></label>}
      </fieldset>}

      {filters.brands.length > 0 && <fieldset><legend>{t("filters.brand")}</legend>{filters.brands.map((brand) => <label key={brand.value}><input type="checkbox" name="brand" value={brand.value} defaultChecked={selectedBrands.includes(brand.value)} /><span>{brand.label}</span><small>{brand.count}</small></label>)}</fieldset>}

      {filters.price && <fieldset><legend>{t("filters.price")}</legend><div className={styles.range}><label htmlFor={`${idPrefix}-price-min`}>{t("filters.from")}<input id={`${idPrefix}-price-min`} name="priceMin" type="number" min="0" inputMode="numeric" placeholder={String(filters.price.min)} defaultValue={typeof searchParams.priceMin === "string" ? searchParams.priceMin : ""} /></label><label htmlFor={`${idPrefix}-price-max`}>{t("filters.to")}<input id={`${idPrefix}-price-max`} name="priceMax" type="number" min="0" inputMode="numeric" placeholder={String(filters.price.max)} defaultValue={typeof searchParams.priceMax === "string" ? searchParams.priceMax : ""} /></label></div></fieldset>}

      {filters.attributes.map((attribute) => attribute.type === "number" ? <fieldset key={attribute.slug}><legend>{t(attribute.labelId)}{attribute.unitId ? `, ${t(attribute.unitId)}` : ""}</legend><div className={styles.range}><label htmlFor={`${idPrefix}-${attribute.slug}-min`}>{t("filters.from")}<input id={`${idPrefix}-${attribute.slug}-min`} name={`${attribute.slug}Min`} type="number" step="any" inputMode="decimal" placeholder={String(attribute.min)} defaultValue={typeof searchParams[`${attribute.slug}Min`] === "string" ? searchParams[`${attribute.slug}Min`] : ""} /></label><label htmlFor={`${idPrefix}-${attribute.slug}-max`}>{t("filters.to")}<input id={`${idPrefix}-${attribute.slug}-max`} name={`${attribute.slug}Max`} type="number" step="any" inputMode="decimal" placeholder={String(attribute.max)} defaultValue={typeof searchParams[`${attribute.slug}Max`] === "string" ? searchParams[`${attribute.slug}Max`] : ""} /></label></div></fieldset> : <fieldset key={attribute.slug}><legend>{t(attribute.labelId)}</legend>{attribute.options.map((option) => <label key={option.value}><input type="checkbox" name={attribute.slug} value={option.value} defaultChecked={getParamValues(searchParams[attribute.slug]).includes(option.value)} /><span>{t(option.labelId)}</span><small>{option.count}</small></label>)}</fieldset>)}

      {filters.colors.length > 0 && <fieldset><legend>{t("filters.color")}</legend>{filters.colors.map((color) => <label key={color.value}><input type="checkbox" name="color" value={color.value} defaultChecked={selectedColors.includes(color.value)} /><i className={styles.swatch} style={{ "--filter-color": color.hex } as React.CSSProperties} aria-hidden="true" /><span>{t(color.labelId)}</span><small>{color.count}</small></label>)}</fieldset>}

      {filters.hasSale && <fieldset><legend>{t("filters.sale")}</legend><label><input type="checkbox" name="sale" value="1" defaultChecked={selectedSale.includes("1")} /><span>{t("filters.discounted")}</span></label></fieldset>}

      <div className={styles.actions}><button type="submit">{t("filters.show")}</button><Link href={action}>{t("catalog.clearAll")}</Link></div>
    </form>
  ;
}

type CatalogFiltersProps = Omit<FilterFormProps, "idPrefix"> & { activeCount: number };

export function CatalogFilters({ action, filters, searchParams, sort, activeCount }: CatalogFiltersProps) {
  const t = useTranslations();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return <div className={styles.filterColumn}>
      <button className={styles.mobileTrigger} type="button" onClick={() => dialogRef.current?.showModal()}><SlidersHorizontal aria-hidden="true" />{t("filters.title")}{activeCount > 0 && <span>{activeCount}</span>}</button>
      <aside className={styles.desktopPanel} aria-label={t("filters.aria")}><h2>{t("filters.title")}</h2><FilterForm action={action} filters={filters} searchParams={searchParams} sort={sort} idPrefix="desktop" /></aside>
      <dialog className={styles.dialog} ref={dialogRef} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}><h2>{t("filters.title")}</h2><button type="button" aria-label={t("filters.close")} onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button></div>
          <FilterForm action={action} filters={filters} searchParams={searchParams} sort={sort} idPrefix="mobile" onApply={() => dialogRef.current?.close()} />
        </div>
      </dialog>
    </div>;
}
