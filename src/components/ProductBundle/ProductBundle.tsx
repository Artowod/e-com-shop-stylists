"use client";

import Image from "next/image";
import { Equal, Plus } from "lucide-react";
import { useState } from "react";
import { addCartItem } from "@/lib/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import type { CatalogProduct } from "@/types/catalog";
import styles from "./ProductBundle.module.scss";

export function ProductBundle({ mainProduct, pairedProduct }: { mainProduct: CatalogProduct; pairedProduct: CatalogProduct }) {
  const [message, setMessage] = useState("");
  const regularPrice = mainProduct.price + pairedProduct.price;
  const bundlePrice = Math.round(regularPrice * 0.94);
  function addBundle() {
    [mainProduct, pairedProduct].forEach((product) => addCartItem({ productId: product.id, name: product.name, slug: product.slug, sku: product.sku, image: product.image, price: product.price }));
    setMessage("Комплект додано у кошик");
  }
  return <section className={styles.bundle} aria-labelledby="bundle-title"><h2 id="bundle-title">Дешевше разом</h2><div className={styles.content}><div className={styles.product}><Image src={mainProduct.image} alt="" width={86} height={86} /><span>{mainProduct.name}</span><strong>{formatPrice(mainProduct.price)}</strong></div><Plus className={styles.symbol} aria-hidden="true" /><div className={styles.product}><Image src={pairedProduct.image} alt="" width={86} height={86} /><span>{pairedProduct.name}</span><strong>{formatPrice(pairedProduct.price)}</strong></div><Equal className={styles.symbol} aria-hidden="true" /><div className={styles.total}><del>{formatPrice(regularPrice)}</del><strong>{formatPrice(bundlePrice)}</strong><button type="button" onClick={addBundle}>Купити комплект</button></div></div><p aria-live="polite">{message}</p></section>;
}
