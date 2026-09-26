"use client";

import type { ReactNode } from "react";
import { IntlProvider as ReactIntlProvider, useIntl } from "react-intl";

import type { Locale } from "@/i18n/config";
import { messages, type MessageId } from "@/i18n/messages";

type MessageValues = Record<string, string | number | Date>;

export function useTranslations() {
  const intl = useIntl();
  return (id: MessageId, values?: MessageValues) => intl.formatMessage({ id }, values);
}

export function AppIntlProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <ReactIntlProvider locale={locale} messages={messages[locale]}>{children}</ReactIntlProvider>;
}
