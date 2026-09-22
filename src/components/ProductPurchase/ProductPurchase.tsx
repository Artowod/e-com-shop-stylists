"use client";

import { useState } from "react";
import { CreditCard, Minus, Plus } from "lucide-react";
import { addCartItem } from "@/lib/cartStore";
import type { CatalogProduct } from "@/types/catalog";
import { useProductColor } from "../ProductColorProvider/ProductColorProvider";
import styles from "./ProductPurchase.module.scss";

export function ProductPurchase({ product }: { product: CatalogProduct }) {
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { selectedColor, selectedImage, selectColor } = useProductColor();
  function add() { addCartItem({ productId: product.id, variantId: selectedColor || undefined, name: product.name, slug: product.slug, sku: product.sku, image: selectedImage, price: product.price }, quantity); setMessage("Товар додано в кошик"); }
  return <div className={styles.purchase}>{product.colors?.length ? <fieldset className={styles.colors}><legend>Колір: <strong>{selectedColor}</strong></legend><div>{product.colors.map((color) => <button key={color.label} type="button" title={color.label} aria-label={color.label} aria-pressed={selectedColor === color.label} onClick={() => selectColor(color.label, color.image)} style={{ "--swatch": color.value } as React.CSSProperties} />)}</div></fieldset> : null}<div className={styles.actions}><div className={styles.quantity}><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Зменшити кількість"><Minus aria-hidden="true" /></button><output>{quantity}</output><button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Збільшити кількість"><Plus aria-hidden="true" /></button></div><button type="button" onClick={add}>Купити</button><button type="button" className={styles.secondary} onClick={add}>Швидка покупка</button><p aria-live="polite">{message}</p></div><div className={styles.installments}><CreditCard aria-hidden="true" /> Оплата частинами — після підключення банківського провайдера</div><div className={styles.serviceRows}><details><summary>Оплата</summary><p>Післяплата або безготівкова оплата.</p></details><details><summary>Доставка</summary><p>До обраного відділення Нової пошти.</p></details><details><summary>Гарантія</summary><p>Умови залежать від бренду та конкретного товару.</p></details><details><summary>Обмін / повернення</summary><p>Відповідно до чинних умов магазину.</p></details></div></div>;
}
