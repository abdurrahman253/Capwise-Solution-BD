import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { getServiceBySlug, serviceDetails } from "@/data/services";

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

  return (
    <>
      <SiteHeader />
      <ServiceDetailPage service={service} />
    </>
  );
}
