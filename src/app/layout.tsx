import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import "./globals.scss";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Barber Shop — професійні товари для майстрів", template: "%s | Barber Shop" },
  description: "Професійні інструменти, техніка й косметика для барберів, перукарів і стилістів.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "uk_UA", siteName: "Barber Shop", title: "Barber Shop", description: "Професійні товари для майстрів." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Barber Shop", url: siteUrl };
  return <html lang="uk" className={manrope.className}><body><SiteHeader /><main>{children}</main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} /></body></html>;
}
