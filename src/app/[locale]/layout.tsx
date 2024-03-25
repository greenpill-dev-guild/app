import "./globals.css";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BrowserCheck } from "../components/BrowserCheck";
import { WagmiProvider } from "../components/WagmiProvider";
import { ProposalsProvider } from "../context/ProposalContext";

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

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <BrowserCheck>
      <html lang={locale}>
        <body className={inter.className + " p-2 pb-12 pt-28"}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <WagmiProvider>
              <div>
                <ProposalsProvider>
                  <div className="mb-4">
                    <Navbar />
                  </div>
                  {children}
                  <Footer />
                </ProposalsProvider>
              </div>
            </WagmiProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </BrowserCheck>
  );
}
