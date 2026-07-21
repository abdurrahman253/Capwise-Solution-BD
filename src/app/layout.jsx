import { Inter, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

import AppProviders from "@/components/providers/AppProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle =
  "Capwise Solution BD | Tax, VAT & Business Advisory Bangladesh";

const siteDescription =
  "Capwise Solution BD provides company formation, accounting, tax, VAT, payroll, legal and regulatory advisory services in Bangladesh.";

export const metadata = {
  metadataBase: new URL("https://capwisebd.com"),
  applicationName: "Capwise Solution BD",

  title: {
    default: siteTitle,
    template: "%s | Capwise Solution BD",
  },

  description: siteDescription,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "/",
    siteName: "Capwise Solution BD",
    title: siteTitle,
    description: siteDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}