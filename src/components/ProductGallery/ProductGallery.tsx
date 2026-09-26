"use client";

import Image from "next/image";
import type { CatalogProduct } from "@/types/catalog";
import { useProductColor } from "../ProductColorProvider/ProductColorProvider";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";
import styles from "./ProductGallery.module.scss";

export function ProductGallery({ product }: { product: CatalogProduct }) {
  const images = product.images?.length ? product.images : [product.image];
  const t = useTranslations();
  const { selectedColor, selectedImage, selectColor, selectImage } = useProductColor();
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  function showImage(image: string) {
    const matchingColor = product.colors?.find((color) => color.image === image);
    if (matchingColor) {
      selectColor(matchingColor.label, matchingColor.image);
      return;
    }
    selectImage(image);
  }

  const selectedColorLabel = product.colors?.find((color) => color.label === selectedColor);
  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails} aria-label={t("product.thumbnails")}>
        {images.map((image, index) => <button key={`${image}-${index}`} type="button" aria-label={t("product.showImage", { number: index + 1 })} aria-pressed={selectedImage === image} onClick={() => showImage(image)}><Image src={image} alt="" width={72} height={72} /></button>)}
      </div>
      <div className={styles.mainImage}>
        {discount > 0 && <span className={styles.discount}>−{discount}%</span>}
        <Image src={selectedImage} alt={selectedColorLabel ? t("product.imageColorAlt", { alt: t(product.imageAltId), color: t(selectedColorLabel.labelId) }) : t(product.imageAltId)} fill priority sizes="(max-width: 849px) 100vw, 52vw" />
      </div>
    </div>
  );
}
