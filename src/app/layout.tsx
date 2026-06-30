import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../i18n/client";
import { getLocale } from "../i18n/server";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = SITE_TITLE[locale];
  const description = SITE_DESCRIPTION[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    generator: "Next.js",
    keywords: [
      "publicar propiedades",
      "portales inmobiliarios",
      "agentes inmobiliarios",
      "inmobiliaria Paraguay",
      "Infocasas",
      "Clasipar",
      "Facebook Marketplace inmuebles",
      "PUBLIK",
      "publicar en todos los portales",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    alternates: {
      canonical: "/",
      languages: { es: "/", en: "/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_PY",
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider locale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
