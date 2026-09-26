import "server-only";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "./config";
import { messages, type MessageId } from "./messages";

export async function getLocale() {
  const requestedLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
}

export async function getServerTranslations() {
  const locale = await getLocale();
  return {
    locale,
    t: (id: MessageId, values: Record<string, string | number> = {}) =>
      messages[locale][id].replace(/\{(\w+)\}/g, (placeholder, key: string) => key in values ? String(values[key]) : placeholder),
  };
}
