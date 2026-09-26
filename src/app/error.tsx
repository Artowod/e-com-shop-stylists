"use client";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";
export default function ErrorPage({ reset }: { reset: () => void }) { const t = useTranslations(); return <div className="container section" role="alert"><h1>{t("error.title")}</h1><p>{t("error.description")}</p><button type="button" onClick={reset}>{t("error.retry")}</button></div>; }
