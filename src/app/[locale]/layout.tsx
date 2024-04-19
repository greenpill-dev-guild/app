import "../globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { Web3Provider } from "@/app/providers/Web3Provider";
import { AppProvider } from "@/app/providers/AppProvider";

import { Navbar } from "@/app/components/Navbar";

const APP_NAME = "Impact Voice";
const APP_DEFAULT_TITLE = "Impact Voice App";
const APP_TITLE_TEMPLATE = "%s - Impact Voice";
const APP_DESCRIPTION =
  "Let your voice be heard, submit proposals for your community";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }, { locale: "ee" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;

  unstable_setRequestLocale(locale);

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Web3Provider>
            <AppProvider>
              <main
                className={`h-[calc(100dvh-4.5rem)] overflow-hidden max-h-[calc(100dvh-4.5rem)] overflow-y-contain`}
              >
                {children}
              </main>
              <Navbar />
              <Toaster />
            </AppProvider>
          </Web3Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
