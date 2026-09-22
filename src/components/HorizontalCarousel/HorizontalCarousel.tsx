"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, type ReactNode, useCallback } from "react";
import styles from "./HorizontalCarousel.module.scss";

type Props = {
  ariaLabel: string;
  children: ReactNode;
  itemWidth?: "brand" | "product" | "wide" | "square" | "editorial";
  className?: string;
};

export function HorizontalCarousel({ ariaLabel, children, itemWidth = "product", className = "" }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: true });
  const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={`${styles.carousel} ${className}`}>
      <button className={`${styles.arrow} ${styles.previous}`} type="button" onClick={scrollPrevious} aria-label={`Попередні елементи: ${ariaLabel}`}><ChevronLeft aria-hidden="true" /></button>
      <div className={styles.viewport} ref={emblaRef} aria-label={ariaLabel}>
        <div className={styles.track}>{Children.map(children, (child) => <div className={`${styles.slide} ${styles[itemWidth]}`}>{child}</div>)}</div>
      </div>
      <button className={`${styles.arrow} ${styles.next}`} type="button" onClick={scrollNext} aria-label={`Наступні елементи: ${ariaLabel}`}><ChevronRight aria-hidden="true" /></button>
    </div>
  );
}
