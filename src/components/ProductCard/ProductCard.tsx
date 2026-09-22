"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Check, Heart, Plus } from "lucide-react";
import { useState } from "react";

import { addCartItem } from "@/lib/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import { getReviewSummary } from "@/lib/reviewSummary";
import type { CatalogProduct } from "@/types/catalog";
import { RatingStars } from "../RatingStars/RatingStars";

import styles from "./ProductCard.module.scss";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const [isAdded, setIsAdded] = useState(false);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  const rating = getReviewSummary(product.reviews);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  function addToCart() {
    addCartItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: product.image,
      price: product.price,
    });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1600);
  }

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} href={`/product/${product.slug}`}>
        <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 576px) 50vw, (max-width: 1023px) 33vw, 25vw" />
        <span className={styles.badges}>
          {discount && <span className={styles.discount}>−{discount}%</span>}
          {product.isNew && <span className={styles.new}>Новинка</span>}
        </span>
      </Link>
      <div className={styles.utilities}>
        <button type="button" aria-pressed={isFavorite} aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"} onClick={() => setIsFavorite((value) => !value)}><Heart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} /></button>
        <button type="button" aria-pressed={isCompared} aria-label={isCompared ? "Видалити з порівняння" : "Додати до порівняння"} onClick={() => setIsCompared((value) => !value)}><ArrowLeftRight aria-hidden="true" /></button>
      </div>
      <div className={styles.content}>
        <span className={styles.brand}>{product.brand}</span>
        <h3><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
        <RatingStars average={rating.average} count={rating.count} compact />
        <span className={styles.availability}>{product.isAvailable ? "В наявності" : "Немає в наявності"}</span>
        <div className={styles.priceRow}>
          <div><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
          <button type="button" onClick={addToCart} disabled={!product.isAvailable} aria-label={`Додати ${product.name} у кошик`}>
            {isAdded ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
          </button>
        </div>
      </div>
    </article>
  );
}
