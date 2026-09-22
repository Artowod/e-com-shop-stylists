"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { removeCartItem, updateCartItemQuantity, useCart } from "@/lib/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import styles from "./cart.module.scss";

export function CartContent() {
  const cart = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!cart.length) return <div className={styles.empty}><h1>Кошик порожній</h1><p>Додайте товари з каталогу — вони збережуться у цьому браузері.</p><Link href="/catalog">Перейти до каталогу</Link></div>;
  return <><h1>Кошик</h1><div className={styles.layout}><div className={styles.items}>{cart.map((item) => <article key={`${item.productId}-${item.variantId ?? "base"}`} className={styles.item}><Link className={styles.image} href={`/product/${item.slug}`}><Image src={item.image} alt="" fill sizes="110px" /></Link><div><Link className={styles.name} href={`/product/${item.slug}`}>{item.name}</Link><span className={styles.sku}>Артикул: {item.sku}{item.variantId ? ` · Колір: ${item.variantId}` : ""}</span><div className={styles.quantity}><button type="button" onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1, item.variantId)} aria-label="Зменшити кількість"><Minus aria-hidden="true" /></button><output>{item.quantity}</output><button type="button" onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1, item.variantId)} aria-label="Збільшити кількість"><Plus aria-hidden="true" /></button></div></div><div className={styles.linePrice}><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" onClick={() => removeCartItem(item.productId, item.variantId)}>Видалити</button></div></article>)}</div><aside className={styles.summary}><h2>Разом</h2><div><span>Товарів</span><span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div><div className={styles.total}><span>До сплати</span><strong>{formatPrice(total)}</strong></div><Link href="/checkout">Перейти до оформлення</Link><p>Перед створенням замовлення ціни та наявність будуть перевірені сервером.</p></aside></div></>;
}
