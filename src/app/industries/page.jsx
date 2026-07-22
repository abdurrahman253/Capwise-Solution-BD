import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import IndustryIcon from "@/components/industries/IndustryIcon";
import SiteHeader from "@/components/layout/SiteHeader";
import {
  INDUSTRIES_CONTENT_VERSION,
  industries,
} from "@/data/industries";
import { getServiceBySlug } from "@/data/services";

export const metadata = {
  title: "Industries We Serve in Bangladesh",
  description:
    "Sector-aware legal, accounting, tax, VAT, payroll, regulatory and business advisory support for SMEs, foreign investors, NGOs, manufacturers and trading companies in Bangladesh.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    type: "website",
    url: "/industries",
    title: "Industries We Serve | Capwise Solution BD",
    description:
      "Practical advisory support shaped around five business environments in Bangladesh.",
  },
};

const industryListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Industries served by Capwise Solution BD",
  itemListElement: industries.map((industry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: industry.label,
    url: `https://capwisebd.com/industries/${industry.slug}`,
  })),
};

const operatingLens = [
  {
    number: "01",
    title: "Understand the operating model",
    description:
      "Start with the organisation, ownership, activities and commercial reality—not a generic checklist.",
  },
  {
    number: "02",
    title: "Map sector obligations",
    description:
      "Identify the registrations, approvals, reporting and people responsibilities that may apply.",
  },
  {
    number: "03",
    title: "Coordinate ongoing support",
    description:
      "Connect legal, finance, tax and compliance work around clear priorities and ownership.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industryListSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main
        id="main-content"
        data-industries-content-version={INDUSTRIES_CONTENT_VERSION}
      >
        <section className="relative isolate overflow-hidden border-b border-border bg-surface-muted">
          <div
            aria-hidden="true"
            className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-48 -top-44 -z-10 size-[34rem] rounded-full bg-accent/13 blur-[110px]"
          />

          <div className="mx-auto max-w-[90rem] px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-10 lg:pb-28 lg:pt-10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[0.68rem] font-semibold text-muted sm:text-xs"
            >
              <Link href="/" className="transition hover:text-accent-strong">
                Home
              </Link>
              <ChevronRight aria-hidden="true" size={13} />
              <span aria-current="page" className="text-foreground/75">
                Industries
              </span>
            </nav>

            <div className="mt-10 grid gap-7 lg:mt-14 lg:grid-cols-[1.1fr_0.62fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-7 bg-accent-strong" />
                  <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent-strong sm:text-[0.65rem]">
                    Industries we serve
                  </p>
                </div>
                <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(2.55rem,8vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.068em] text-foreground sm:mt-7">
                  Sector context changes
                  <span className="mt-1 block text-accent-strong">
                    the compliance path.
                  </span>
                </h1>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Ownership, regulation, reporting and operating risk look
                  different across sectors. Capwise shapes the advisory scope
                  around those practical differences.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex min-h-11 items-center justify-center gap-4 rounded-full bg-action px-5 text-xs font-bold text-action-foreground shadow-[0_14px_36px_rgba(15,118,110,0.18)] transition hover:-translate-y-0.5 hover:bg-action-hover sm:min-h-13 sm:px-6 sm:text-sm"
                >
                  Discuss your sector
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <nav
          aria-label="Industry page sections"
          className="border-b border-border bg-surface"
        >
          <div className="mx-auto flex max-w-[90rem] snap-x gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
            {industries.map((industry) => (
              <a
                key={industry.slug}
                href={`#${industry.slug}`}
                className="inline-flex min-h-10 shrink-0 snap-start items-center rounded-full border border-border bg-background px-4 text-[0.67rem] font-bold text-foreground/75 transition hover:border-accent/40 hover:text-accent-strong sm:text-xs"
              >
                {industry.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="bg-background py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-7 bg-accent-strong" />
                <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent-strong sm:text-[0.65rem]">
                  Our operating lens
                </p>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,6vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-foreground sm:mt-6">
                Begin with how the organisation really works.
              </h2>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.35rem] border border-border bg-border sm:mt-12 lg:grid-cols-3 lg:rounded-[1.75rem]">
              {operatingLens.map((item) => (
                <article key={item.number} className="bg-surface p-5 sm:p-7 lg:p-8">
                  <span className="font-display text-xs font-bold text-accent-strong">
                    {item.number}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            {industries.map((industry) => {
              const relatedServices = industry.serviceSlugs
                .map((slug) => getServiceBySlug(slug))
                .filter(Boolean);

              return (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  className="scroll-mt-28 border-b border-border py-10 last:border-b-0 sm:py-14 lg:py-18"
                >
                  <div className="grid gap-7 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                      <div className="flex items-start justify-between gap-5 lg:justify-start lg:gap-7">
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent-strong sm:size-13">
                          <IndustryIcon
                            name={industry.icon}
                            size={19}
                            strokeWidth={1.75}
                          />
                        </span>
                        <span className="font-display text-xs font-bold text-muted lg:order-first">
                          {industry.number}
                        </span>
                      </div>
                      <p className="mt-6 text-[0.58rem] font-bold uppercase tracking-[0.19em] text-accent-strong sm:text-[0.63rem]">
                        {industry.eyebrow}
                      </p>
                      <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,4vw,3.7rem)] font-semibold leading-[1] tracking-[-0.055em] text-foreground">
                        {industry.label}
                      </h2>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-[0.95rem] sm:leading-8">
                        {industry.description}
                      </p>
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="group mt-6 inline-flex items-center gap-2 text-xs font-bold text-foreground transition hover:text-accent-strong"
                      >
                        View sector guide
                        <ArrowUpRight
                          aria-hidden="true"
                          size={15}
                          className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>

                    <div className="lg:col-span-6 lg:col-start-7">
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.19em] text-muted sm:text-[0.63rem]">
                        Areas of support
                      </p>
                      <ul className="mt-3 overflow-hidden rounded-[1.15rem] border border-border bg-background">
                        {industry.supportAreas.map((area) => (
                          <li
                            key={area}
                            className="flex min-h-13 items-center gap-3 border-b border-border px-4 py-3 text-xs font-semibold leading-5 text-foreground/78 last:border-b-0 sm:min-h-14 sm:px-5 sm:text-sm"
                          >
                            <Check
                              aria-hidden="true"
                              size={14}
                              className="shrink-0 text-accent-strong"
                            />
                            {area}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {relatedServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-[0.66rem] font-bold text-foreground/75 transition hover:border-accent/40 hover:text-accent-strong sm:text-xs"
                          >
                            {service.shortLabel}
                            <ArrowRight
                              aria-hidden="true"
                              size={13}
                              className="text-accent-strong transition group-hover:translate-x-0.5"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-brand py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[90rem] gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-10">
            <div>
              <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent">
                Start with your operating reality
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.058em]">
                Let&apos;s map the sector-specific next step.
              </h2>
              <p className="mt-4 max-w-2xl text-xs leading-6 text-white/62 sm:text-sm sm:leading-7">
                Share a short summary of the organisation and requirement.
                Capwise can then confirm the relevant advisory scope without
                asking you to send confidential documents through public chat.
              </p>
            </div>

            <div className="grid gap-2.5 min-[430px]:grid-cols-2 lg:w-[24rem]">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-accent px-5 text-xs font-bold text-[#042f2e] transition hover:bg-[#5eead4] sm:min-h-13 sm:text-sm"
              >
                Book consultation
                <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
              <a
                href="https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20would%20like%20to%20discuss%20support%20for%20my%20industry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-white/18 bg-white/6 px-5 text-xs font-bold text-white transition hover:border-accent/50 hover:bg-white/10 sm:min-h-13 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
