import Link from "next/link";
export default function NotFound() { return <div className="container section"><h1>Сторінку не знайдено</h1><p>Можливо, адресу було змінено або товар ще не опублікований.</p><Link href="/catalog">Перейти до каталогу</Link></div>; }
