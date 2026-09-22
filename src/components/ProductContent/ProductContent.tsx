import type { CatalogProduct } from "@/types/catalog";
import styles from "./ProductContent.module.scss";

export function ProductContent({ product }: { product: CatalogProduct }) {
  return <section className={styles.content} aria-label="Інформація про товар"><article><h2>Опис</h2><p>Професійний інструмент для інтенсивної щоденної роботи. Ергономічний корпус, точне налаштування та стабільна продуктивність допомагають майстру працювати впевнено протягом зміни.</p></article><details open><summary>Переваги</summary><ul><li>Стабільна робота під навантаженням</li><li>Зручний баланс і контроль руху</li><li>Матеріали, розраховані на професійне використання</li></ul></details><details><summary>Спосіб застосування</summary><p>Перед роботою перевірте заряд і налаштування ножового блока. Очищуйте та змащуйте інструмент відповідно до інструкції виробника.</p></details><article className={styles.characteristics}><h2>Характеристики</h2>{product.characteristics?.length ? <dl>{product.characteristics.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl> : <p>Характеристики уточнюються.</p>}</article></section>;
}
