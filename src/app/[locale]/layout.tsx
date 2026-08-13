import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Instrument_Sans, Inter_Tight, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { Providers } from "@/shared/context/global/providers";
import { cn } from "@/shared/lib/utils";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display-family",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans-family",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-family",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "ORICO — AI Business Platform",
  description: "The Arabic-first AI business platform for founders and teams.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        geistMono.variable,
        instrumentSans.variable,
        interTight.variable,
        ibmPlexSansArabic.variable,
        locale === "ar" && "font-arabic",
      )}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
