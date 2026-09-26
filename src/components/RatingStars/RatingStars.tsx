"use client";

import { Star } from "lucide-react";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";
import styles from "./RatingStars.module.scss";

export function RatingStars({ average, count, compact = false }: { average: number; count: number; compact?: boolean }) {
  const rounded = Math.round(average);
  const t = useTranslations();
  const label = count ? t("rating.label", { average: average.toFixed(1), count }) : t("rating.noneLabel");
  return (
    <span className={`${styles.rating} ${compact ? styles.compact : ""}`} aria-label={label}>
      <span className={styles.stars} aria-hidden="true">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={star <= rounded ? styles.filled : ""} fill={star <= rounded ? "currentColor" : "none"} />)}</span>
      {count ? <><strong>{average.toFixed(1)}</strong><span>{t("rating.compact", { count })}</span></> : <span>{t("rating.none")}</span>}
    </span>
  );
}
