import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { GoogleTagManagerFallback } from "@/components/GoogleTagManager/GoogleTagManager";
import { AppIntlProvider } from "@/components/IntlProvider/IntlProvider";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { getSiteUrl } from "@/lib/siteUrl";
import { getLocale, getServerTranslations } from "@/i18n/server";
import "./globals.scss";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], display: "swap" });
const siteUrl = getSiteUrl();
const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getServerTranslations();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("metadata.home.title"), template: "%s | Barber Shop" },
    description: t("metadata.home.description"),
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: locale === "uk" ? "uk_UA" : "en_US", siteName: "Barber Shop", title: "Barber Shop", description: t("metadata.home.ogDescription") },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Barber Shop", url: siteUrl };
  const safeGoogleTagManagerId = googleTagManagerId ? JSON.stringify(googleTagManagerId).replace(/</g, "\\u003c") : null;
  return <html lang={locale} className={manrope.className}><head>{safeGoogleTagManagerId ? <Script id="google-tag-manager" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${safeGoogleTagManagerId});`}</Script> : null}</head><body><AppIntlProvider locale={locale}>{googleTagManagerId ? <GoogleTagManagerFallback containerId={googleTagManagerId} /> : null}<SiteHeader /><main>{children}</main><SiteFooter /></AppIntlProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} /></body></html>;
}
