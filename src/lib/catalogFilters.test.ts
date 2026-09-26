import { describe, expect, it } from "vitest";

import { featuredProducts } from "../data/catalogSeed";
import { filterCatalogProducts, getCatalogFilterDefinition, sortCatalogProducts } from "./catalogFilters";

describe("catalog filters", () => {
  it("filters by exact brand, numeric range, color and sale state", () => {
    const result = filterCatalogProducts(featuredProducts, {
      brand: "jrl",
      runtimeMin: "200",
      color: "chornyi",
      sale: "1",
    });

    expect(result.map((product) => product.slug)).toEqual(["jrl-freshfade-2020c"]);
  });

  it("creates only options available in the current product context", () => {
    const filters = getCatalogFilterDefinition(featuredProducts.filter((product) => product.categorySlug === "hair-dryers"), "hair-dryers");
    expect(filters.brands.map((option) => option.label)).toEqual(["Parlux"]);
    expect(filters.attributes.map((attribute) => attribute.slug)).toEqual(["power", "ionization", "speed-modes"]);
  });

  it("sorts discounts by their real percentage", () => {
    const sorted = sortCatalogProducts(featuredProducts, "discount");
    expect(sorted[0].slug).toBe("olivia-garden-nanothermic-44");
  });

  it("ignores empty numeric inputs and treats both availability options as no restriction", () => {
    const result = filterCatalogProducts(featuredProducts, { priceMin: "", priceMax: "", availability: ["in-stock", "out-of-stock"] });
    expect(result).toHaveLength(featuredProducts.length);
  });
});
