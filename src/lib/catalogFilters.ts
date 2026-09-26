import type { CatalogProduct, ProductFilterAttribute } from "@/types/catalog";
import type { MessageId } from "@/i18n/messages";

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

export type CatalogFilterDefinition = {
  brands: { label: string; value: string; count: number }[];
  price: { min: number; max: number } | null;
  attributes: Array<
    | { slug: string; labelId: MessageId; type: "number"; unitId?: MessageId; min: number; max: number }
    | { slug: string; labelId: MessageId; type: "select" | "boolean"; options: { labelId: MessageId; value: string; count: number }[] }
  >;
  colors: { labelId: MessageId; value: string; hex: string; count: number }[];
  hasAvailable: boolean;
  hasUnavailable: boolean;
  hasSale: boolean;
};

const CATEGORY_ATTRIBUTE_ORDER: Record<string, string[]> = {
  "hair-clippers": ["power-source", "motor-type", "blade-material", "min-cut-length", "max-cut-length", "runtime", "charging-time"],
  trimmers: ["power-source", "motor-type", "blade-material", "min-cut-length", "max-cut-length", "runtime", "charging-time", "blade-width"],
  shavers: ["power-source", "motor-type", "blade-material", "runtime", "charging-time"],
  "hair-dryers": ["power", "motor-type", "ionization", "temperature-modes", "speed-modes"],
  "curling-irons": ["max-temperature", "barrel-size", "coating-material", "thermostat", "ionization"],
  "hair-straighteners": ["max-temperature", "plate-size", "coating-material", "thermostat", "ionization"],
  "hair-stylers": ["max-temperature", "plate-size", "barrel-size", "coating-material", "thermostat", "ionization"],
  "hot-rollers": ["max-temperature", "size", "coating-material", "thermostat", "ionization"],
  cosmetics: ["volume", "hair-type", "purpose", "effect", "fixation-level"],
  coloring: ["volume", "hair-type", "purpose", "effect"],
  "tool-care": ["volume", "purpose", "effect", "compatibility"],
  scissors: ["material", "size", "compatibility", "type"],
  combs: ["material", "size", "diameter", "compatibility", "type"],
  attachments: ["material", "size", "compatibility", "type"],
  accessories: ["material", "size", "compatibility", "type"],
  clips: ["material", "size", "compatibility", "type"],
  components: ["material", "size", "compatibility", "type"],
};

export function toFilterSlug(value: string) {
  const transliteration: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ye", ж: "zh", з: "z", и: "y", і: "i", ї: "yi", й: "i",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
    ш: "sh", щ: "shch", ь: "", ю: "yu", я: "ya",
  };
  return [...value.toLocaleLowerCase("uk-UA")]
    .map((character) => transliteration[character] ?? character)
    .join("")
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getParamValues(value: string | string[] | undefined) {
  if (!value) return [];
  return (Array.isArray(value) ? value : value.split(",")).filter(Boolean);
}

function addCount(map: Map<string, { label: string; count: number }>, value: string, label: string) {
  const current = map.get(value);
  map.set(value, { label, count: (current?.count ?? 0) + 1 });
}

export function getCatalogFilterDefinition(products: CatalogProduct[], categorySlug?: string): CatalogFilterDefinition {
  const brands = new Map<string, { label: string; count: number }>();
  const colors = new Map<string, { labelId: MessageId; hex: string; count: number }>();
  type AttributeAggregate = { labelId: MessageId; type: ProductFilterAttribute["type"]; unitId?: MessageId; numbers: number[]; options: Map<string, { labelId: MessageId; count: number }> };
  const attributes = new Map<string, AttributeAggregate>();

  for (const product of products) {
    addCount(brands, toFilterSlug(product.brand), product.brand);
    for (const color of product.colors ?? []) {
      const value = toFilterSlug(color.label);
      const current = colors.get(value);
      colors.set(value, { labelId: color.labelId, hex: color.value, count: (current?.count ?? 0) + 1 });
    }
    for (const attribute of product.filterAttributes ?? []) {
      const current: AttributeAggregate = attributes.get(attribute.slug) ?? { labelId: attribute.labelId, type: attribute.type, unitId: attribute.type === "number" ? attribute.unitId : undefined, numbers: [], options: new Map() };
      if (attribute.type === "number") current.numbers.push(attribute.value);
      if (attribute.type === "select") {
        const option = current.options.get(toFilterSlug(attribute.value));
        current.options.set(toFilterSlug(attribute.value), { labelId: attribute.valueId, count: (option?.count ?? 0) + 1 });
      }
      if (attribute.type === "boolean") {
        const value = attribute.value ? "yes" : "no";
        const option = current.options.get(value);
        current.options.set(value, { labelId: attribute.value ? "attribute.yes" : "attribute.no", count: (option?.count ?? 0) + 1 });
      }
      attributes.set(attribute.slug, current);
    }
  }

  const prices = products.map((product) => product.price);
  return {
    brands: [...brands].map(([value, option]) => ({ value, ...option })).sort((a, b) => a.label.localeCompare(b.label, "uk")),
    price: prices.length ? { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) } : null,
    attributes: [...attributes.entries()].map(([slug, attribute]) => attribute.type === "number"
      ? { slug, labelId: attribute.labelId, type: "number" as const, unitId: attribute.unitId, min: Math.min(...attribute.numbers), max: Math.max(...attribute.numbers) }
      : { slug, labelId: attribute.labelId, type: attribute.type, options: [...attribute.options].map(([value, option]) => ({ value, ...option })) })
      .sort((a, b) => {
        const order = categorySlug ? CATEGORY_ATTRIBUTE_ORDER[categorySlug] ?? [] : [];
        const aIndex = order.indexOf(a.slug);
        const bIndex = order.indexOf(b.slug);
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) - (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }),
    colors: [...colors].map(([value, option]) => ({ value, ...option })),
    hasAvailable: products.some((product) => product.isAvailable),
    hasUnavailable: products.some((product) => !product.isAvailable),
    hasSale: products.some((product) => product.oldPrice && product.oldPrice > product.price),
  };
}

function parseNumber(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (rawValue === undefined || rawValue.trim() === "") return undefined;
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function productHasAttributeValue(product: CatalogProduct, slug: string, selectedValues: string[]) {
  const attribute = product.filterAttributes?.find((item) => item.slug === slug);
  if (!attribute || attribute.type === "number") return false;
  const value = attribute.type === "boolean" ? (attribute.value ? "yes" : "no") : toFilterSlug(attribute.value);
  return selectedValues.includes(value);
}

export function filterCatalogProducts(products: CatalogProduct[], searchParams: CatalogSearchParams) {
  const selectedBrands = getParamValues(searchParams.brand);
  const selectedAvailability = getParamValues(searchParams.availability);
  const selectedColors = getParamValues(searchParams.color);
  const priceMin = parseNumber(searchParams.priceMin);
  const priceMax = parseNumber(searchParams.priceMax);
  const attributeSlugs = [...new Set(products.flatMap((product) => (product.filterAttributes ?? []).map((attribute) => attribute.slug)))];

  return products.filter((product) => {
    if (selectedBrands.length && !selectedBrands.includes(toFilterSlug(product.brand))) return false;
    if (selectedAvailability.length === 1 && selectedAvailability.includes("in-stock") && !product.isAvailable) return false;
    if (selectedAvailability.length === 1 && selectedAvailability.includes("out-of-stock") && product.isAvailable) return false;
    if (priceMin !== undefined && product.price < priceMin) return false;
    if (priceMax !== undefined && product.price > priceMax) return false;
    if (selectedColors.length && !(product.colors ?? []).some((color) => selectedColors.includes(toFilterSlug(color.label)))) return false;
    if (getParamValues(searchParams.sale).includes("1") && !(product.oldPrice && product.oldPrice > product.price)) return false;

    for (const slug of attributeSlugs) {
      const attribute = product.filterAttributes?.find((item) => item.slug === slug);
      const min = parseNumber(searchParams[`${slug}Min`]);
      const max = parseNumber(searchParams[`${slug}Max`]);
      const selected = getParamValues(searchParams[slug]);
      if ((min !== undefined || max !== undefined || selected.length > 0) && !attribute) return false;
      if (attribute?.type === "number") {
        if (min !== undefined && attribute.value < min) return false;
        if (max !== undefined && attribute.value > max) return false;
      } else if (selected.length && !productHasAttributeValue(product, slug, selected)) {
        return false;
      }
    }
    return true;
  });
}

export function sortCatalogProducts(products: CatalogProduct[], sort: string) {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    if (sort === "discount") {
      const discountA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
      const discountB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
      return discountB - discountA;
    }
    return 0;
  });
}
