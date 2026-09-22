import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryShowcase } from "@/components/CategoryShowcase/CategoryShowcase";
import { Hero } from "@/components/Hero/Hero";
import { HomeModules } from "@/components/HomeModules/HomeModules";
import styles from "./page.module.scss";

export default function HomePage() {
  return <><Hero /><section className={`container section ${styles.categories}`} aria-labelledby="categories-title"><div className="sectionHeading"><h2 id="categories-title">Популярні категорії</h2><Link href="/catalog">Увесь каталог <ArrowRight aria-hidden="true" /></Link></div><CategoryShowcase /></section><HomeModules /></>;
}
