import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Oxanium } from "next/font/google";

import "../globals.css";

import { isLocale, locales } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";
import { LanguageProvider } from "@/shared/i18n/LanguageProvider";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-oxanium",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RERBERT.DEV",
  description: "Interactive developer portfolio of Rerbert Viana.",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={oxanium.variable}>
        <LanguageProvider locale={locale} dictionary={dictionary}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
