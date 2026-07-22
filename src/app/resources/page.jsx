import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  FileCheck2,
  Radar,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import {
  guideResources,
  regulatoryWatchTopics,
  resourcePublicationPrinciples,
  RESOURCE_CONTENT_VERSION,
} from "@/data/resources";

export const metadata = {
  title: "Business Guides & Regulatory Resources",
  description:
    "Explore Capwise Solution BD's practical business guides and publication framework for verified regulatory updates in Bangladesh.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" data-resource-version={RESOURCE_CONTENT_VERSION}>
        <section className="capwise-resources relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-32">
          <div
            aria-hidden="true"
            className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-52 -top-48 -z-10 size-[38rem] rounded-full bg-accent/12 blur-[120px]"
          />

          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-[0.68rem]">
                    Resource centre
                  </p>
                </div>

                <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7.4rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">
                  Less complexity.
                  <span className="mt-1 block text-accent-strong">
                    Better prepared decisions.
                  </span>
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Practical guides help teams prepare. Verified regulatory notes
                  help them understand what changed, why it matters and when a
                  professional review is appropriate.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Guides", "Checklists", "Regulatory watch", "Source review"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-[0.62rem] font-bold text-foreground/68"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-2">
              <Link
                href="/resources/guides"
                className="group relative min-h-[29rem] overflow-hidden rounded-[1.6rem] bg-brand p-6 text-white shadow-[0_30px_90px_rgba(11,31,51,0.2)] focus-visible:outline-offset-[-5px] sm:p-8 lg:p-10"
              >
                <div
                  aria-hidden="true"
                  className="capwise-soft-noise pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/16 blur-[85px]"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <span className="inline-flex size-14 items-center justify-center rounded-full border border-white/12 bg-white/6 text-accent">
                      <BookOpenCheck aria-hidden="true" size={22} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-xs font-bold text-white/35">01</span>
                  </div>

                  <div className="mt-14 max-w-xl">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-accent">
                      Practical guides
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
                      Prepare before the process begins.
                    </h2>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/64 sm:text-base sm:leading-8">
                      Checklists and field guides designed to organize decisions,
                      documents and internal responsibilities before a compliance
                      or market-entry engagement.
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-5 border-t border-white/12 pt-6">
                    <span className="text-xs font-bold text-white/68 sm:text-sm">
                      {guideResources.length} initial editorial drafts
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={22}
                      className="text-white/45 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </div>
                </div>
              </Link>

              <Link
                href="/resources/regulatory-updates"
                className="capwise-resource-card group relative min-h-[29rem] overflow-hidden rounded-[1.6rem] border p-6 focus-visible:outline-offset-[-5px] sm:p-8 lg:p-10"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-36 -right-28 size-80 rounded-full bg-gold/10 blur-[90px]"
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-5">
                    <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                      <Radar aria-hidden="true" size={22} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-xs font-bold text-foreground/24">02</span>
                  </div>

                  <div className="mt-14 max-w-xl">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-gold">
                      Regulatory intelligence
                    </p>
                    <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-foreground">
                      Verified changes. Clear implications.
                    </h2>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8">
                      A publication framework for time-sensitive updates that
                      prioritizes official sources, visible review dates and
                      practical explanations over rushed commentary.
                    </p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-5 border-t border-border pt-6">
                    <span className="text-xs font-bold text-muted sm:text-sm">
                      {regulatoryWatchTopics.length} monitoring areas
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={22}
                      className="text-foreground/35 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-strong"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="capwise-resources border-y border-border py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
                  <ShieldCheck aria-hidden="true" size={23} strokeWidth={1.7} />
                </span>
                <p className="mt-7 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">
                  Publication standard
                </p>
                <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.2rem,4.8vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">
                  Accuracy is part of the design.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Regulatory content can become harmful when it is vague, stale
                  or presented without context. Capwise resources will follow a
                  visible review and approval process before publication.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {resourcePublicationPrinciples.map((principle, index) => (
                  <article
                    key={principle}
                    className="capwise-resource-card rounded-[1.35rem] border p-6 sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <FileCheck2
                        aria-hidden="true"
                        size={20}
                        strokeWidth={1.7}
                        className="text-accent-strong"
                      />
                      <span className="font-display text-xs font-bold text-foreground/24">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-8 text-sm font-semibold leading-7 text-foreground sm:text-base">
                      {principle}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-10">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">
                <FileCheck2 aria-hidden="true" size={14} />
                Information has limits
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
                Use the guide. Then review your situation.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
                Public resources can improve preparation, but they cannot replace
                advice based on the entity, transaction, sector and current law.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:-translate-y-0.5 hover:bg-[#5eead4]"
            >
              Discuss your situation
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
