"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { removeCartItem, updateCartItemQuantity, useCart } from "@/lib/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";
import styles from "./cart.module.scss";

export function CartContent() {
  const cart = useCart();
  const t = useTranslations();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!cart.length) return <div className={styles.empty}><h1>{t("cart.emptyTitle")}</h1><p>{t("cart.emptyText")}</p><Link href="/catalog">{t("common.goToCatalog")}</Link></div>;
  return <><h1>{t("cart.title")}</h1><div className={styles.layout}><div className={styles.items}>{cart.map((item) => <article key={`${item.productId}-${item.variantId ?? "base"}`} className={styles.item}><Link className={styles.image} href={`/product/${item.slug}`}><Image src={item.image} alt="" fill sizes="110px" /></Link><div><Link className={styles.name} href={`/product/${item.slug}`}>{item.name}</Link><span className={styles.sku}>{t("product.sku", { sku: item.sku })}{item.variantId ? ` · ${t("product.color", { color: item.variantId })}` : ""}</span><div className={styles.quantity}><button type="button" onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1, item.variantId)} aria-label={t("product.decreaseQuantity")}><Minus aria-hidden="true" /></button><output>{item.quantity}</output><button type="button" onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1, item.variantId)} aria-label={t("product.increaseQuantity")}><Plus aria-hidden="true" /></button></div></div><div className={styles.linePrice}><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" onClick={() => removeCartItem(item.productId, item.variantId)}>{t("cart.remove")}</button></div></article>)}</div><aside className={styles.summary}><h2>{t("cart.summary")}</h2><div><span>{t("cart.items")}</span><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div><div className={styles.total}><span>{t("cart.total")}</span><strong>{formatPrice(total)}</strong></div><Link href="/checkout">{t("cart.checkout")}</Link><p>{t("cart.notice")}</p></aside></div></>;
}
