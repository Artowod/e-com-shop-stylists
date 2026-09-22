"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ChevronRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

import { catalogCategories } from "@/data/catalogSeed";
import { useCart } from "@/lib/cartStore";

import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.serviceBar}>
        <div className={styles.container}>
          <span>Професійні товари для майстрів</span>
          <span className={styles.desktopOnly}>Доставка по всій Україні</span>
        </div>
      </div>
      <div className={`${styles.container} ${styles.mainRow}`}>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <Link className={styles.logo} href="/" aria-label="Barber Shop — головна">
          BARBER<span>SHOP</span>
        </Link>
        <Link className={styles.catalogButton} href="/catalog">
          Каталог
        </Link>
        <form className={styles.search} action="/search" role="search">
          <label className="srOnly" htmlFor="site-search">Пошук товарів</label>
          <input id="site-search" name="q" type="search" placeholder="Знайти товар, бренд або артикул" />
          <button type="submit" aria-label="Шукати"><Search aria-hidden="true" /></button>
        </form>
        <nav className={styles.actions} aria-label="Персональні розділи">
          <Link href="/favorites" aria-label="Обране"><Heart aria-hidden="true" /></Link>
          <Link href="/comparison" aria-label="Порівняння"><ArrowLeftRight aria-hidden="true" /></Link>
          <Link href="/account" aria-label="Особистий кабінет"><UserRound aria-hidden="true" /></Link>
          <Link className={styles.cartLink} href="/cart" aria-label={`Кошик, товарів: ${itemCount}`}>
            <ShoppingBag aria-hidden="true" />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>
        </nav>
      </div>
      <nav className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`} aria-label="Каталог товарів">
        <Link href="/catalog" onClick={() => setIsMenuOpen(false)}>Усі категорії</Link>
        {catalogCategories.map((category) => (
          <Link key={category.id} href={`/catalog/${category.slug}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.mobileCategory}><Image src={category.iconPath} alt="" width={28} height={28} />{category.name}</span><ChevronRight aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
