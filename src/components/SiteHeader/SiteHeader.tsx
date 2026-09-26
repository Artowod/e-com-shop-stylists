"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ChevronRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

import { catalogCategories } from "@/data/catalogSeed";
import { useCart } from "@/lib/cartStore";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { useTranslations } from "@/components/IntlProvider/IntlProvider";

import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const cart = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.serviceBar}>
        <div className={styles.container}>
          <span>{t("header.tagline")}</span>
          <span className={styles.desktopOnly}>{t("header.delivery")}</span>
        </div>
      </div>
      <div className={`${styles.container} ${styles.mainRow}`}>
        <button
          className={styles.menuButton}
          type="button"
          aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <Link className={styles.logo} href="/" aria-label={t("header.homeLabel")}>
          BARBER<span>SHOP</span>
        </Link>
        <Link className={styles.catalogButton} href="/catalog">
          {t("common.catalog")}
        </Link>
        <form className={styles.search} action="/search" role="search">
          <label className="srOnly" htmlFor="site-search">{t("header.searchLabel")}</label>
          <input id="site-search" name="q" type="search" placeholder={t("header.searchPlaceholder")} />
          <button type="submit" aria-label={t("header.searchButton")}><Search aria-hidden="true" /></button>
        </form>
        <nav className={styles.actions} aria-label={t("header.personalSections")}>
          <Link href="/favorites" aria-label={t("header.favorites")}><Heart aria-hidden="true" /></Link>
          <Link href="/comparison" aria-label={t("header.comparison")}><ArrowLeftRight aria-hidden="true" /></Link>
          <Link href="/account" aria-label={t("header.account")}><UserRound aria-hidden="true" /></Link>
          <Link className={styles.cartLink} href="/cart" aria-label={t("header.cartLabel", { count: itemCount })}>
            <ShoppingBag aria-hidden="true" />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
      <nav className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`} aria-label={t("header.catalogNav")}>
        <Link href="/catalog" onClick={() => setIsMenuOpen(false)}>{t("header.allCategories")}</Link>
        {catalogCategories.map((category) => (
          <Link key={category.id} href={`/catalog/${category.slug}`} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.mobileCategory}><Image src={category.iconPath} alt="" width={28} height={28} />{t(category.nameId)}</span><ChevronRight aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </header>
  );
}
