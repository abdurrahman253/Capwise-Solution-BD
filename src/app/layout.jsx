import { Inter, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import AppProviders from "@/components/providers/AppProviders";
import SiteFooter from "@/components/layout/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";

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

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
    },
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};


const officialProfiles = [
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
].filter(Boolean);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Capwise Solution BD",
  url: "https://capwisebd.com",
  slogan: "Wise Choice for Your Finance.",
  foundingDate: "2022",
  email: "info@capwisebd.com",
  telephone: "+8801624000381",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: "+8801624000381",
    email: "info@capwisebd.com",
    areaServed: "BD",
    availableLanguage: ["English", "Bengali"],
  },
  ...(officialProfiles.length ? { sameAs: officialProfiles } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level-03, House 76/A, Road 11, Banani",
    addressLocality: "Dhaka",
    postalCode: "1213",
    addressCountry: "BD",
  },
  areaServed: { "@type": "Country", name: "Bangladesh" },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a className="capwise-skip-link" href="#main-content">Skip to main content</a>
        <JsonLd data={organizationJsonLd} />
        <AppProviders>
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}