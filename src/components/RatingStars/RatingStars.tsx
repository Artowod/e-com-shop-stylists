import { Star } from "lucide-react";
import styles from "./RatingStars.module.scss";

export function RatingStars({ average, count, compact = false }: { average: number; count: number; compact?: boolean }) {
  const rounded = Math.round(average);
  const label = count ? `${average.toFixed(1)} з 5, ${count} відгуків` : "Ще немає відгуків";
  return (
    <span className={`${styles.rating} ${compact ? styles.compact : ""}`} aria-label={label}>
      <span className={styles.stars} aria-hidden="true">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={star <= rounded ? styles.filled : ""} fill={star <= rounded ? "currentColor" : "none"} />)}</span>
      {count ? <><strong>{average.toFixed(1)}</strong><span>· {count} відгуків</span></> : <span>Без відгуків</span>}
    </span>
  );
}
