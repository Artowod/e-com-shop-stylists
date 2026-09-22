import { catalogCategories } from "@/data/catalogSeed";
import { categoryBrandSeed } from "@/data/brandSeed";
import { getDatabase } from "./index";
import { brands, categories, categoryBrands } from "./schema";

function toBrandSlug(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function seed() {
  const db = getDatabase();
  await db.insert(categories).values(catalogCategories.map(({ name, slug }, sortOrder) => ({ name, slug, sortOrder }))).onConflictDoNothing();

  const brandNames = [...new Set(Object.values(categoryBrandSeed).flat())];
  await db.insert(brands).values(brandNames.map((name) => ({ name, slug: toBrandSlug(name) }))).onConflictDoNothing();

  const storedCategories = await db.select({ id: categories.id, slug: categories.slug }).from(categories);
  const storedBrands = await db.select({ id: brands.id, name: brands.name }).from(brands);
  const categoryIds = new Map(storedCategories.map((category) => [category.slug, category.id]));
  const brandIds = new Map(storedBrands.map((brand) => [brand.name, brand.id]));
  const associations = Object.entries(categoryBrandSeed).flatMap(([categorySlug, names]) =>
    names.flatMap((name, sortOrder) => {
      const categoryId = categoryIds.get(categorySlug);
      const brandId = brandIds.get(name);
      return categoryId && brandId ? [{ categoryId, brandId, sortOrder, isFeatured: sortOrder < 4 }] : [];
    }),
  );
  await db.insert(categoryBrands).values(associations).onConflictDoNothing();
  console.info(`Seeded ${catalogCategories.length} categories, ${brandNames.length} brands and ${associations.length} associations.`);
}

seed().catch((error: unknown) => {
  console.error("Database seed failed.", error);
  process.exitCode = 1;
});
