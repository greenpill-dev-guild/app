import "./globals.css";

import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { PrelineScript } from "../utils/preline-script";

import { WagmiProvider } from "../providers/WagmiProvider";
import { ProposalsProvider } from "../providers/ProposalProvider";

import { Navbar } from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Impact Voice",
  description: "Lets your voice be heard, submit proposals for your community",
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
      <body className={inter.className + " p-2 pb-12 pt-28"}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <WagmiProvider>
            <ProposalsProvider>
              <Navbar />
              {children}
            </ProposalsProvider>
          </WagmiProvider>
        </NextIntlClientProvider>
        <PrelineScript />
      </body>
    </html>
  );
}
