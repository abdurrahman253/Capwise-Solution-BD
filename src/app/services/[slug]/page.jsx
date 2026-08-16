import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceBySlug, serviceDetails } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.label} in Bangladesh`,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/services/${service.slug}`,
      title: `${service.label} | Capwise Solution BD`,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    description: service.description,
    url: `https://capwisebd.com/services/${service.slug}`,
    areaServed: { "@type": "Country", name: "Bangladesh" },
    provider: {
      "@type": "ProfessionalService",
      name: "Capwise Solution BD",
      url: "https://capwisebd.com",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://capwisebd.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://capwisebd.com/services" },
      { "@type": "ListItem", position: 3, name: service.label, item: `https://capwisebd.com/services/${service.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <SiteHeader />
      <ServiceDetailPage service={service} />
    </>
  );
}
