import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import IndustryIcon from "@/components/industries/IndustryIcon";
import SiteHeader from "@/components/layout/SiteHeader";
import { industries } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.label} Advisory Support`,
    description: industry.description,
    alternates: { canonical: `/industries/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  if (!industry) notFound();
  const relatedServices = industry.serviceSlugs.map(getServiceBySlug).filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-industries relative isolate overflow-hidden border-b border-[var(--industries-border)] py-16 sm:py-24 lg:py-30">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-40" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <div className="inline-flex size-16 items-center justify-center rounded-full border border-[var(--industries-border)] bg-[var(--industries-panel)] text-[var(--industries-accent)]">
                <IndustryIcon name={industry.icon} size={25} />
              </div>
              <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[var(--industries-accent)]">{industry.eyebrow}</p>
              <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[var(--industries-foreground)]">{industry.label}</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-[var(--industries-muted)] sm:text-base sm:leading-8">{industry.description}</p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-30">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <div className="lg:col-span-7">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">Priority workstreams</p>
              <h2 className="mt-4 max-w-[15ch] font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">Coordinate the obligations that affect day-to-day operations.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {industry.supportAreas.map((area) => (
                  <div key={area} className="rounded-[1.3rem] border border-border bg-background p-5">
                    <Check aria-hidden="true" size={18} className="text-accent-strong" />
                    <p className="mt-5 text-sm font-semibold leading-7 text-foreground">{area}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-border bg-background p-7 lg:col-span-5 lg:p-9">
              <p className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold"><ShieldCheck aria-hidden="true" size={14} /> Related Capwise services</p>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {relatedServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block text-sm font-bold text-foreground">{service.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">{service.description}</span>
                    </span>
                    <ArrowRight aria-hidden="true" size={17} className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent-strong" />
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:bg-action-hover">Discuss this industry <ArrowRight aria-hidden="true" size={17} /></Link>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
