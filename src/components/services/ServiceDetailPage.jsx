import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  MessageCircle,
  Phone,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import ServiceIcon from "@/components/services/ServiceIcon";
import { getRelatedServices, SERVICE_CONTENT_VERSION } from "@/data/services";

function Eyebrow({ children, light = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`h-px w-7 ${light ? "bg-accent" : "bg-accent-strong"}`}
      />
      <p
        className={`text-[0.59rem] font-bold uppercase tracking-[0.2em] sm:text-[0.64rem] ${
          light ? "text-accent" : "text-accent-strong"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export default function ServiceDetailPage({ service }) {
  const relatedServices = getRelatedServices(service);
  const whatsappHref = `https://wa.me/8801624000381?text=${encodeURIComponent(
    `Hello Capwise, I would like to discuss ${service.shortLabel}.`,
  )}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.label,
        description: service.description,
        serviceType: service.label,
        areaServed: {
          "@type": "Country",
          name: "Bangladesh",
        },
        provider: {
          "@type": "ProfessionalService",
          name: "Capwise Solution BD",
          url: "https://capwisebd.com",
          telephone: "+8801624000381",
          email: "info@capwisebd.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Level-03, House 76/A, Road 11, Banani",
            addressLocality: "Dhaka",
            postalCode: "1213",
            addressCountry: "BD",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://capwisebd.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://capwisebd.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.label,
            item: `https://capwisebd.com/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <main
        id="main-content"
        data-service-content-version={SERVICE_CONTENT_VERSION}
      >
        <section className="relative isolate overflow-hidden border-b border-border bg-surface-muted">
          <div
            aria-hidden="true"
            className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[28rem] rounded-full bg-accent/12 blur-[100px] sm:size-[38rem]"
          />

          <div className="mx-auto max-w-[90rem] px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-10 lg:pb-28 lg:pt-10">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-[0.68rem] font-semibold text-muted sm:text-xs"
            >
              <Link href="/" className="transition hover:text-accent-strong">
                Home
              </Link>
              <ChevronRight aria-hidden="true" size={13} />
              <Link
                href="/services"
                className="transition hover:text-accent-strong"
              >
                Services
              </Link>
              <ChevronRight aria-hidden="true" size={13} />
              <span aria-current="page" className="text-foreground/75">
                {service.shortLabel}
              </span>
            </nav>

            <div className="mt-9 grid gap-9 lg:mt-14 lg:grid-cols-[0.95fr_0.75fr] lg:items-end lg:gap-20">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong sm:size-12">
                    <ServiceIcon
                      name={service.icon}
                      size={19}
                      strokeWidth={1.7}
                    />
                  </span>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent-strong sm:text-[0.66rem]">
                    {service.eyebrow} · Bangladesh
                  </p>
                </div>

                <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.45rem,7.5vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.064em] text-foreground sm:mt-7">
                  {service.label}
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-9">
                  {service.description}
                </p>

                <div className="mt-7 flex flex-col gap-2.5 min-[430px]:flex-row min-[430px]:flex-wrap sm:mt-9">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-11 items-center justify-between gap-5 rounded-full bg-action px-5 text-xs font-bold text-action-foreground shadow-[0_14px_35px_rgba(15,118,110,0.18)] transition hover:-translate-y-0.5 hover:bg-action-hover sm:min-h-13 sm:px-6 sm:text-sm"
                  >
                    Request a consultation
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                  <a
                    href="tel:+8801624000381"
                    className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-surface px-5 text-xs font-bold text-foreground transition hover:border-accent hover:text-accent-strong sm:min-h-13 sm:px-6 sm:text-sm"
                  >
                    <Phone aria-hidden="true" size={15} />
                    01624 000 381
                  </a>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[var(--card-shadow)] sm:rounded-[1.75rem]">
                <div className="border-b border-border px-5 py-4 sm:px-7 sm:py-5">
                  <p className="text-[0.59rem] font-bold uppercase tracking-[0.19em] text-accent-strong sm:text-[0.64rem]">
                    Core support areas
                  </p>
                </div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-1">
                  {service.heroPoints.map((item, index) => (
                    <li
                      key={item}
                      className={`flex items-start gap-3 px-5 py-3.5 text-xs font-semibold leading-5 text-foreground/82 sm:px-7 sm:py-4 sm:text-sm ${
                        index > 0 ? "border-t border-border" : ""
                      } ${
                        index === 1
                          ? "sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t"
                          : ""
                      } ${
                        index === 3
                          ? "sm:border-l lg:border-l-0"
                          : ""
                      }`}
                    >
                      <Check
                        aria-hidden="true"
                        size={15}
                        strokeWidth={2.2}
                        className="mt-0.5 shrink-0 text-accent-strong"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border bg-background/60 px-5 py-3.5 text-[0.64rem] font-semibold text-muted sm:px-7 sm:text-[0.7rem]">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck
                      aria-hidden="true"
                      size={13}
                      className="text-accent-strong"
                    />
                    General information
                  </span>
                  <span>Content reviewed July 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <Eyebrow light>Where clients get stuck</Eyebrow>
                <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2rem,6.5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.058em] sm:mt-6">
                  Turn uncertainty into an ordered next step.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden rounded-[1.35rem] border border-white/12 bg-white/12 sm:grid-cols-3 sm:rounded-[1.75rem]">
                {service.problems.map((problem, index) => (
                  <article
                    key={problem.title}
                    className="bg-brand-secondary/75 px-5 py-6 sm:min-h-[16rem] sm:px-6 sm:py-7 lg:px-7"
                  >
                    <span className="font-display text-xs font-bold text-accent">
                      0{index + 1}
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold leading-tight tracking-[-0.04em] text-white sm:text-xl">
                      {problem.title}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-white/62 sm:text-sm sm:leading-7">
                      {problem.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.65fr] lg:gap-16 lg:px-10">
            <div>
              <Eyebrow>Service scope</Eyebrow>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.1rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-foreground sm:mt-6">
                Support shaped around the real requirement.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8">
                The final engagement is confirmed after the business, records
                and current position are reviewed. Relevant work may include:
              </p>

              <ul className="mt-7 grid gap-2.5 sm:mt-9 sm:grid-cols-2 sm:gap-3">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="flex min-h-16 items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-xs font-semibold leading-5 text-foreground/82 sm:min-h-20 sm:px-5 sm:text-sm sm:leading-6"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/11 text-accent-strong">
                      <Check aria-hidden="true" size={12} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[var(--card-shadow)] lg:sticky lg:top-32">
              <div className="bg-surface-muted px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.19em] text-accent-strong">
                  What you can expect
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                  Clear working outputs
                </h3>
              </div>
              <ul className="divide-y divide-border">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 px-5 py-4 text-xs font-semibold leading-6 text-muted sm:px-7 sm:py-5 sm:text-sm"
                  >
                    <ChevronRight
                      aria-hidden="true"
                      size={15}
                      className="mt-1 shrink-0 text-accent-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="border-b border-border bg-surface py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 sm:flex sm:items-end sm:justify-between sm:gap-10">
              <div>
                <Eyebrow>How the work moves</Eyebrow>
                <h2 className="mt-4 max-w-[13ch] font-display text-[clamp(2.1rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-foreground sm:mt-6">
                  A transparent path from question to action.
                </h2>
              </div>
              <p className="max-w-md text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                Scope, responsibilities and next steps remain visible throughout
                the engagement.
              </p>
            </div>

            <ol className="mt-8 grid overflow-hidden rounded-[1.35rem] border border-border bg-border sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:rounded-[1.75rem]">
              {service.process.map((step, index) => (
                <li
                  key={step.title}
                  className={`bg-background px-5 py-6 sm:min-h-[15rem] sm:px-6 sm:py-7 lg:px-7 ${
                    index > 0 ? "border-t border-border sm:border-t-0" : ""
                  } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                    index > 1 ? "sm:border-t lg:border-t-0" : ""
                  } ${index > 0 ? "lg:border-l" : ""}`}
                >
                  <span className="font-display text-xs font-bold text-accent-strong">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.04em] text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[90rem] gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
            <article className="rounded-[1.35rem] border border-border bg-surface p-5 sm:rounded-[1.75rem] sm:p-8 lg:p-10">
              <Eyebrow>Who this is for</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.05em] text-foreground sm:mt-6 sm:text-4xl">
                Useful when your business needs structure and follow-through.
              </h2>
              <ul className="mt-6 space-y-3 sm:mt-8">
                {service.audiences.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs font-semibold leading-6 text-muted sm:text-sm sm:leading-7"
                  >
                    <Check
                      aria-hidden="true"
                      size={15}
                      className="mt-1 shrink-0 text-accent-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.35rem] border border-border bg-surface-muted p-5 sm:rounded-[1.75rem] sm:p-8 lg:p-10">
              <Eyebrow>Why Capwise</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.05em] text-foreground sm:mt-6 sm:text-4xl">
                Connected advice with clear ownership.
              </h2>
              <ul className="mt-6 space-y-3 sm:mt-8">
                {service.reasons.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-xs font-semibold leading-6 text-muted sm:text-sm sm:leading-7"
                  >
                    <ShieldCheck
                      aria-hidden="true"
                      size={16}
                      className="mt-1 shrink-0 text-accent-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="border-b border-border bg-surface py-14 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
            <div>
              <Eyebrow>Related questions</Eyebrow>
              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.1rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.058em] text-foreground sm:mt-6">
                A useful starting point—not a substitute for review.
              </h2>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background p-4 text-xs leading-6 text-muted sm:mt-8 sm:p-5 sm:text-sm">
                <CircleHelp
                  aria-hidden="true"
                  size={17}
                  className="mt-1 shrink-0 text-accent-strong"
                />
                Requirements can change and facts matter. A Capwise adviser
                should confirm current rules, documents, fees and timelines.
              </div>
            </div>

            <div className="border-t border-border">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base font-semibold leading-snug tracking-[-0.035em] text-foreground marker:content-none sm:py-7 sm:text-xl">
                    {faq.question}
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-accent-strong transition group-open:rotate-45 group-open:border-accent sm:size-9">
                      <Plus aria-hidden="true" size={16} />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pr-10 text-xs leading-6 text-muted sm:pb-7 sm:pr-14 sm:text-sm sm:leading-7">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>Connected services</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.05em] text-foreground sm:mt-6 sm:text-4xl">
                  Related support
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-2 text-sm font-bold text-accent-strong hover:underline sm:inline-flex"
              >
                View all services
                <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group flex min-h-40 flex-col justify-between rounded-[1.25rem] border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/45 hover:shadow-[var(--card-shadow)] sm:min-h-52 sm:rounded-[1.5rem] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent/10 text-accent-strong sm:size-11">
                      <ServiceIcon
                        name={related.icon}
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={17}
                      className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                    />
                  </div>
                  <div className="mt-7">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.19em] text-accent-strong">
                      {related.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                      {related.label}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-accent-strong hover:underline sm:hidden"
            >
              View all services
              <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </section>

        <section className="bg-brand py-12 text-white sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-[90rem] gap-7 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-10">
            <div>
              <Eyebrow light>Start with the business issue</Eyebrow>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.058em] sm:mt-6">
                Let&apos;s identify the right next step.
              </h2>
              <p className="mt-4 max-w-2xl text-xs leading-6 text-white/62 sm:mt-5 sm:text-sm sm:leading-7">
                Share a short description of the requirement. Do not send tax,
                identity or other confidential documents through public chat or
                email before a secure process is agreed.
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
                href={whatsappHref}
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
