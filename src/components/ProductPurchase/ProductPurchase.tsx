"use client";

import { useState } from "react";
import { CreditCard, Minus, Plus } from "lucide-react";
import { addCartItem } from "@/lib/cartStore";
import type { CatalogProduct } from "@/types/catalog";
import { useProductColor } from "../ProductColorProvider/ProductColorProvider";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";
import styles from "./ProductPurchase.module.scss";

export function ProductPurchase({ product }: { product: CatalogProduct }) {
  const [message, setMessage] = useState("");
  const t = useTranslations();
  const [quantity, setQuantity] = useState(1);
  const { selectedColor, selectedImage, selectColor } = useProductColor();
  function add() { addCartItem({ productId: product.id, variantId: selectedColor || undefined, name: t(product.nameId), slug: product.slug, sku: product.sku, image: selectedImage, price: product.price }, quantity); setMessage(t("product.added")); }
  const selectedColorLabel = product.colors?.find((color) => color.label === selectedColor);
  return <div className={styles.purchase}>{product.colors?.length ? <fieldset className={styles.colors}><legend>{t("product.color", { color: selectedColorLabel ? t(selectedColorLabel.labelId) : selectedColor })}</legend><div>{product.colors.map((color) => <button key={color.label} type="button" title={t(color.labelId)} aria-label={t(color.labelId)} aria-pressed={selectedColor === color.label} onClick={() => selectColor(color.label, color.image)} style={{ "--swatch": color.value } as React.CSSProperties} />)}</div></fieldset> : null}<div className={styles.actions}><div className={styles.quantity}><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label={t("product.decreaseQuantity")}><Minus aria-hidden="true" /></button><output>{quantity}</output><button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label={t("product.increaseQuantity")}><Plus aria-hidden="true" /></button></div><button type="button" onClick={add}>{t("product.buy")}</button><button type="button" className={styles.secondary} onClick={add}>{t("product.quickBuy")}</button><p aria-live="polite">{message}</p></div><div className={styles.installments}><CreditCard aria-hidden="true" /> {t("product.installments")}</div><div className={styles.serviceRows}><details><summary>{t("product.payment")}</summary><p>{t("product.paymentText")}</p></details><details><summary>{t("product.delivery")}</summary><p>{t("product.deliveryText")}</p></details><details><summary>{t("product.warranty")}</summary><p>{t("product.warrantyText")}</p></details><details><summary>{t("product.returns")}</summary><p>{t("product.returnsText")}</p></details></div></div>;
}
