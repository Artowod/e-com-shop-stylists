export const locales = ["uk", "en"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "uk";
export const LOCALE_COOKIE = "barber-shop-locale";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
