"use client";

import { useSyncExternalStore } from "react";

export type CartItem = {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
};

const STORAGE_KEY = "barber-shop-cart-v1";
const EMPTY_CART: CartItem[] = [];
let memoryCart: CartItem[] = EMPTY_CART;
let hydrated = false;
const listeners = new Set<() => void>();

function readCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (hydrated) return memoryCart;

  hydrated = true;
  try {
    const rawCart = window.localStorage.getItem(STORAGE_KEY);
    memoryCart = rawCart ? (JSON.parse(rawCart) as CartItem[]) : EMPTY_CART;
  } catch (error) {
    console.error("Failed to restore the cart from browser storage.", error);
    memoryCart = EMPTY_CART;
  }

  return memoryCart;
}

function saveCart(nextCart: CartItem[]) {
  memoryCart = nextCart;
  hydrated = true;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
  } catch (error) {
    console.error("Failed to save the cart in browser storage.", error);
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addCartItem(item: Omit<CartItem, "quantity">, quantity = 1) {
  const cart = readCart();
  const matchingIndex = cart.findIndex(
    (current) => current.productId === item.productId && current.variantId === item.variantId,
  );

  if (matchingIndex === -1) {
    saveCart([...cart, { ...item, quantity }]);
    return;
  }

  saveCart(
    cart.map((current, index) =>
      index === matchingIndex ? { ...current, quantity: current.quantity + quantity } : current,
    ),
  );
}

export function updateCartItemQuantity(productId: string, quantity: number, variantId?: string) {
  if (quantity < 1) {
    removeCartItem(productId, variantId);
    return;
  }

  saveCart(
    readCart().map((item) =>
      item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item,
    ),
  );
}

export function removeCartItem(productId: string, variantId?: string) {
  saveCart(
    readCart().filter(
      (item) => !(item.productId === productId && item.variantId === variantId),
    ),
  );
}

export function useCart() {
  return useSyncExternalStore(subscribe, readCart, () => EMPTY_CART);
}
