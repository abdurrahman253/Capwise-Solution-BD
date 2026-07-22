import {
  ArrowRight,
  Check,
  ExternalLink,
  FileClock,
  Radar,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import {
  regulatoryWatchTopics,
  resourcePublicationPrinciples,
  RESOURCE_CONTENT_VERSION,
} from "@/data/resources";

export const metadata = {
  title: "Regulatory Updates Publication Standard",
  description:
    "See how Capwise Solution BD will verify, review and publish Bangladesh tax, VAT, corporate, investment and employment regulatory updates.",
  alternates: {
    canonical: "/resources/regulatory-updates",
  },
};

const officialSourceFamilies = [
  "National Board of Revenue (NBR)",
  "Registrar of Joint Stock Companies and Firms (RJSC)",
  "Bangladesh Investment Development Authority (BIDA)",
  "Bangladesh Bank and applicable legislation",
];

export default function RegulatoryUpdatesPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" data-resource-version={RESOURCE_CONTENT_VERSION}>
        <section className="capwise-resources relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-28">
          <div
            aria-hidden="true"
            className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-44 -top-44 -z-10 size-[34rem] rounded-full bg-gold/10 blur-[120px]"
          />

          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold sm:text-[0.68rem]">
                    Regulatory intelligence
                  </p>
                </div>
                <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">
                  Verify first.
                  <span className="mt-1 block text-accent-strong">
                    Explain what matters.
                  </span>
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  This page defines the editorial framework for future updates.
                  It does not present unverified or time-sensitive rules as current
                  professional guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 md:grid-cols-2">
              {regulatoryWatchTopics.map((topic, index) => (
                <article
                  key={topic.slug}
                  id={topic.slug}
                  className="capwise-resource-card scroll-mt-32 relative overflow-hidden rounded-[1.5rem] border p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="inline-flex size-16 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
                      {index === 0 ? (
                        <FileClock aria-hidden="true" size={24} strokeWidth={1.7} />
                      ) : (
                        <Radar aria-hidden="true" size={24} strokeWidth={1.7} />
                      )}
                    </span>
                    <span className="font-display text-xs font-bold text-foreground/24">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-9 text-[0.6rem] font-bold uppercase tracking-[0.17em] text-accent-strong">
                    {topic.label}
                  </p>
                  <h2 className="mt-3 max-w-[22ch] font-display text-[clamp(1.55rem,3vw,2.25rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-foreground">
                    {topic.title}
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-muted">
                    {topic.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-[0.66rem] font-bold text-muted">
                    <ShieldCheck aria-hidden="true" size={15} className="text-gold" />
                    {topic.sourceLabel}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="capwise-resources border-y border-border py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <ShieldCheck aria-hidden="true" size={23} strokeWidth={1.7} />
                </span>
                <p className="mt-7 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold">
                  Before any update goes live
                </p>
                <h2 className="mt-4 max-w-[15ch] font-display text-[clamp(2.2rem,4.8vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">
                  A visible trail from source to explanation.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  A useful regulatory note should make it easy for a reader to
                  identify the underlying authority, the review date, the affected
                  audience and the limits of the explanation.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  {resourcePublicationPrinciples.map((principle, index) => (
                    <div
                      key={principle}
                      className="capwise-resource-card rounded-[1.35rem] border p-6"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <Check
                          aria-hidden="true"
                          size={19}
                          className="text-accent-strong"
                        />
                        <span className="font-display text-xs font-bold text-foreground/24">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-7 text-sm font-semibold leading-7 text-foreground">
                        {principle}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="capwise-regulatory-panel mt-4 rounded-[1.35rem] border p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <ExternalLink
                      aria-hidden="true"
                      size={18}
                      className="text-gold"
                    />
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-gold">
                      Primary source families
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {officialSourceFamilies.map((source) => (
                      <div
                        key={source}
                        className="flex items-start gap-3 border-t border-border pt-3 text-xs font-semibold leading-6 text-muted"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {source}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-10">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">
                <Radar aria-hidden="true" size={14} />
                Need a current interpretation?
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
                Review the rule in the context of the business.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
                The same change can affect businesses differently depending on
                structure, sector, transaction and existing compliance position.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:-translate-y-0.5 hover:bg-[#5eead4]"
            >
              Request a review
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
