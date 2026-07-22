import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import ServiceIcon from "@/components/services/ServiceIcon";
import {
  SERVICE_CONTENT_VERSION,
  serviceDetails,
  serviceGroups,
} from "@/data/services";

export const metadata = {
  title: "Business Advisory Services in Bangladesh",
  description:
    "Explore Capwise services for company formation, accounting, tax, VAT, payroll, corporate secretarial, legal, regulatory and business advisory in Bangladesh.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Business Advisory Services | Capwise Solution BD",
    description:
      "Seven connected service areas for business setup, finance, tax, legal, regulatory and ongoing compliance in Bangladesh.",
  },
};

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Capwise Solution BD services",
  itemListElement: serviceDetails.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.label,
    url: `https://capwisebd.com/services/${service.slug}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceListSchema).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main
        id="main-content"
        data-service-content-version={SERVICE_CONTENT_VERSION}
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
                Services
              </span>
            </nav>

            <div className="mt-10 grid gap-7 lg:mt-14 lg:grid-cols-[1.1fr_0.62fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="h-px w-7 bg-accent-strong" />
                  <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent-strong sm:text-[0.65rem]">
                    Advisory services
                  </p>
                </div>
                <h1 className="mt-5 max-w-[13ch] font-display text-[clamp(2.55rem,8vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.068em] text-foreground sm:mt-7">
                  Seven disciplines.
                  <span className="mt-1 block text-accent-strong">
                    One coordinated path.
                  </span>
                </h1>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Company setup, accounts, tax, VAT, payroll, corporate records
                  and legal decisions affect one another. Capwise helps organise
                  that work around the business issue—not isolated tasks.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex min-h-11 items-center justify-center gap-4 rounded-full bg-action px-5 text-xs font-bold text-action-foreground shadow-[0_14px_36px_rgba(15,118,110,0.18)] transition hover:-translate-y-0.5 hover:bg-action-hover sm:min-h-13 sm:px-6 sm:text-sm"
                >
                  Discuss your requirement
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

        <section className="bg-background py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
              {serviceDetails.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group relative flex min-h-[18rem] flex-col overflow-hidden rounded-[1.35rem] border border-border bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[var(--card-shadow)] sm:min-h-[22rem] sm:rounded-[1.65rem] sm:p-7 ${
                    index < 2 ? "lg:col-span-6" : "lg:col-span-4"
                  } ${index === 6 ? "lg:col-start-5" : ""}`}
                >
                  {index === 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-20 -top-20 size-56 rounded-full bg-accent/8 blur-2xl"
                    />
                  ) : null}
                  <div className="relative flex items-start justify-between gap-5">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent-strong sm:size-12">
                      <ServiceIcon
                        name={service.icon}
                        size={19}
                        strokeWidth={1.7}
                      />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                    />
                  </div>

                  <div className="relative mt-8 sm:mt-10">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.19em] text-accent-strong sm:text-[0.62rem]">
                      {service.eyebrow}
                    </p>
                    <h2 className="mt-3 max-w-[18ch] font-display text-[1.55rem] font-semibold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-[2rem]">
                      {service.label}
                    </h2>
                    <p className="mt-3 max-w-xl text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                      {service.navDescription}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-border pt-5 text-[0.68rem] font-bold text-foreground sm:text-xs">
                    Explore this service
                    <ArrowRight
                      aria-hidden="true"
                      size={15}
                      className="text-accent-strong transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-7 bg-accent-strong" />
                <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent-strong sm:text-[0.65rem]">
                  Connected by business stage
                </p>
              </div>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,6vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-foreground sm:mt-6">
                Start, operate and grow with clearer ownership.
              </h2>
            </div>

            <div className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-5">
              {serviceGroups.map((group) => (
                <article
                  key={group.number}
                  className="rounded-[1.25rem] border border-border bg-background p-5 sm:rounded-[1.5rem] sm:p-7"
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="font-display text-xs font-bold text-accent-strong">
                      {group.number}
                    </span>
                    <span className="text-[0.58rem] font-bold uppercase tracking-[0.18em] text-muted">
                      {group.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                    {group.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {group.slugs.map((slug) => {
                      const item = serviceDetails.find(
                        (service) => service.slug === slug,
                      );

                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="flex items-center gap-2.5 text-[0.68rem] font-bold text-foreground/78 transition hover:text-accent-strong sm:text-xs"
                          >
                            <Check
                              aria-hidden="true"
                              size={13}
                              className="shrink-0 text-accent-strong"
                            />
                            {item.shortLabel}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[90rem] gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-10">
            <div>
              <p className="text-[0.59rem] font-bold uppercase tracking-[0.2em] text-accent">
                Not sure where to begin?
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.058em]">
                Start with the issue. We&apos;ll help map the service.
              </h2>
              <p className="mt-4 max-w-2xl text-xs leading-6 text-white/62 sm:text-sm sm:leading-7">
                Share a short summary without confidential documents. A Capwise
                adviser can then confirm the relevant scope and practical next
                step.
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
                href="https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20would%20like%20to%20discuss%20business%20support."
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
