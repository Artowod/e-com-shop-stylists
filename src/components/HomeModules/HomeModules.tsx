import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredProducts } from "@/data/catalogSeed";
import { featuredBrands } from "@/data/featuredBrands";
import { getReviewSummary } from "@/lib/reviewSummary";
import { formatPrice } from "@/lib/formatPrice";

import { HorizontalCarousel } from "../HorizontalCarousel/HorizontalCarousel";
import { ProductCard } from "../ProductCard/ProductCard";
import { RatingStars } from "../RatingStars/RatingStars";
import styles from "./HomeModules.module.scss";

const informationCards = [
  { number: "01", title: "Оригінальні товари", text: "Працюємо з професійними брендами та офіційними постачальниками." },
  { number: "02", title: "Допомога у виборі", text: "Підберемо інструмент під техніку роботи, навантаження та бюджет." },
  { number: "03", title: "Доставка по Україні", text: "Відправляємо замовлення до обраного відділення Нової пошти." },
  { number: "04", title: "Для майстрів", text: "Асортимент для барберів, перукарів, колористів і салонів." },
];

function SectionHeading({ eyebrow, title, href = "/catalog" }: { eyebrow: string; title: string; href?: string }) {
  return <div className={styles.heading}><div><span>{eyebrow}</span><h2>{title}</h2></div><Link href={href}>Дивитися всі <ArrowRight aria-hidden="true" /></Link></div>;
}

export function HomeModules() {
  const reviews = featuredProducts.flatMap((product) => getReviewSummary(product.reviews).reviews.map((review) => ({ ...review, product })));
  return (
    <>
      <section className={`${styles.section} ${styles.brands}`} aria-labelledby="brands-title">
        <div className="container"><SectionHeading eyebrow="Перевірені виробники" title="Бренди" href="/brands" /><HorizontalCarousel ariaLabel="Популярні бренди" itemWidth="brand">{featuredBrands.map((brand) => <Link key={brand.slug} className={styles.brandCard} href={`/brands/${brand.slug}`}><span className={styles.brandLogo}><Image src={brand.logoPath} alt={`Логотип ${brand.name}`} width={96} height={64} /></span><strong>{brand.name}</strong></Link>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.weekly}`} aria-labelledby="weekly-title">
        <div className="container"><SectionHeading eyebrow="Вибір майстрів" title="Товари тижня" /><HorizontalCarousel ariaLabel="Товари тижня">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.newProducts}`} aria-labelledby="new-title">
        <div className="container"><SectionHeading eyebrow="Щойно у каталозі" title="Новинки" /><HorizontalCarousel ariaLabel="Нові товари" itemWidth="wide">{featuredProducts.map((product) => <Link key={product.id} className={styles.newCard} href={`/product/${product.slug}`}><div><span>NEW</span><strong>{product.brand}</strong><h3>{product.name}</h3><b>{formatPrice(product.price)}</b></div><Image src={product.image} alt={product.imageAlt} width={210} height={210} /></Link>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.sale}`} aria-labelledby="sale-title">
        <div className="container"><SectionHeading eyebrow="Спеціальні ціни" title="Акції" href="/sale" /><HorizontalCarousel ariaLabel="Акційні товари">{featuredProducts.filter((product) => product.oldPrice).map((product) => <ProductCard key={product.id} product={product} />)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.soon}`} aria-labelledby="soon-title">
        <div className="container"><SectionHeading eyebrow="Очікуємо поставку" title="Скоро в наявності" /><HorizontalCarousel ariaLabel="Скоро в наявності" itemWidth="wide">{featuredProducts.slice().reverse().map((product) => <article key={product.id} className={styles.soonCard}><Image src={product.image} alt={product.imageAlt} width={190} height={190} /><div><span>Скоро в наявності</span><strong>{product.brand}</strong><h3>{product.name}</h3><Link href={`/product/${product.slug}`}>Детальніше</Link></div></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.instagram}`} aria-labelledby="instagram-title">
        <div className="container"><SectionHeading eyebrow="Контент магазину" title="Наш Instagram" href="/" /><p className={styles.moduleNote}>Демонстраційні картки, керовані контентом сайту. Live API не підключено.</p><HorizontalCarousel ariaLabel="Instagram магазину" itemWidth="square">{[...featuredProducts, ...featuredProducts.slice(0, 2)].map((product, index) => <article key={`${product.id}-${index}`} className={styles.instagramCard}><Image src={product.image} alt="" fill sizes="220px" /><span>{index % 2 ? "Поради майстрам" : "Вибір тижня"}</span></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.reviews}`} aria-labelledby="reviews-title">
        <div className="container"><SectionHeading eyebrow="Досвід професіоналів" title="Відгуки" /><HorizontalCarousel ariaLabel="Відгуки покупців" itemWidth="wide">{reviews.map((review) => <article key={review.id} className={styles.reviewCard}><RatingStars average={review.rating} count={1} /><blockquote>“{review.text}”</blockquote><footer><strong>{review.author}</strong><span>{new Intl.DateTimeFormat("uk-UA").format(new Date(review.date))}</span></footer><Link href={`/product/${review.product.slug}#reviews`}>{review.product.name}</Link></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.blog}`} aria-labelledby="blog-title">
        <div className="container"><SectionHeading eyebrow="Корисне для роботи" title="Блог" href="/blog" /><HorizontalCarousel ariaLabel="Статті блогу" itemWidth="editorial">{featuredProducts.slice(0, 3).map((product, index) => <article key={product.id} className={styles.blogCard}><div className={styles.blogImage}><Image src={product.image} alt="" fill sizes="360px" /></div><span>{index === 0 ? "Гайд" : index === 1 ? "Огляд" : "Догляд"}</span><h3>{index === 0 ? "Як обрати машинку для інтенсивної роботи" : index === 1 ? "Професійна техніка: що справді важливо" : "Як продовжити ресурс інструменту"}</h3><Link href="/blog">Читати статтю <ArrowRight aria-hidden="true" /></Link></article>)}</HorizontalCarousel></div>
      </section>

      <section className={`${styles.section} ${styles.about}`} aria-labelledby="about-title">
        <div className="container"><SectionHeading eyebrow="Про магазин" title="Працюємо для вашої майстерності" href="/about" /><HorizontalCarousel ariaLabel="Переваги магазину" itemWidth="wide">{informationCards.map((card) => <article key={card.number} className={styles.aboutCard}><span>{card.number}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</HorizontalCarousel><p className={styles.seoText}>Barber Shop — магазин професійного обладнання, інструментів та косметики для барберів, перукарів і стилістів. Ми збираємо практичний асортимент для щоденної роботи майстрів і допомагаємо обрати техніку під реальні задачі.</p></div>
      </section>
    </>
  );
}
