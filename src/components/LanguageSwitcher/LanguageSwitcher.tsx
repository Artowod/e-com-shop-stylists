"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useIntl } from "react-intl";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";

import type { Locale } from "@/i18n/config";

import styles from "./LanguageSwitcher.module.scss";

export function LanguageSwitcher() {
  const intl = useIntl();
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function changeLocale(locale: Locale) {
    if (locale === intl.locale) return;
    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ locale }),
      });
      if (!response.ok) throw new Error("Locale update failed.");
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("Could not change locale.", error);
    }
  }

  return (
    <div className={styles.switcher} aria-label={t("language.label")} aria-busy={isPending}>
      {(["uk", "en"] as const).map((locale) => (
        <button key={locale} type="button" disabled={isPending} className={intl.locale === locale ? styles.active : undefined} aria-pressed={intl.locale === locale} onClick={() => void changeLocale(locale)}>
          {locale === "uk" ? "UA" : "EN"}
        </button>
      ))}
    </div>
  );
}
