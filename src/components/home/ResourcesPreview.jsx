"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CalendarClock,
  FileCheck2,
  Radar,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Link from "next/link";

import {
  guideResources,
  regulatoryWatchTopics,
  RESOURCE_CONTENT_VERSION,
} from "@/data/resources";

const guideIcons = [FileCheck2, CalendarClock, BookOpenCheck];

export default function ResourcesPreview() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (index = 0, distance = 26) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : Math.min(index * 0.07, 0.28),
      ease: [0.22, 1, 0.36, 1],
    },
  });

  const featuredGuide = guideResources.find((guide) => guide.featured);
  const supportingGuides = guideResources.filter((guide) => !guide.featured);

  return (
    <section
      id="resources-preview"
      data-resource-version={RESOURCE_CONTENT_VERSION}
      aria-labelledby="resources-preview-title"
      className="capwise-resources relative isolate overflow-hidden border-b border-border py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-20 -z-10 size-[31rem] rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 bottom-0 -z-10 size-[28rem] rounded-full bg-gold/8 blur-[120px]"
      />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-end lg:gap-12">
          <m.div {...reveal()} className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-[0.68rem]">
                Guides & regulatory intelligence
              </p>
            </div>

            <h2
              id="resources-preview-title"
              className="mt-5 max-w-[15ch] font-display text-[clamp(2.7rem,5.7vw,6.2rem)] font-semibold leading-[0.93] tracking-[-0.07em] text-foreground sm:mt-6"
            >
              Practical knowledge.
              <span className="mt-1 block text-accent-strong">
                Built for real decisions.
              </span>
            </h2>
          </m.div>

          <m.div {...reveal(1)} className="lg:col-span-4">
            <p className="max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Clear preparation guides and carefully verified regulatory notes
              help decision-makers understand what to organize, what to review
              and when professional advice is needed.
            </p>

            <Link
              href="/resources"
              className="group mt-6 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-xs font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong sm:text-sm"
            >
              Explore the resource centre
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </m.div>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
          <m.article
            {...reveal(2)}
            className="group relative overflow-hidden rounded-[1.6rem] bg-brand text-white shadow-[0_30px_90px_rgba(11,31,51,0.2)] lg:col-span-7 lg:min-h-[38rem]"
          >
            <div
              aria-hidden="true"
              className="capwise-soft-noise pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 size-80 rounded-full bg-accent/18 blur-[90px]"
            />

            <Link
              href={`/resources/guides#${featuredGuide.slug}`}
              aria-label={`Preview ${featuredGuide.title}`}
              className="relative flex h-full min-h-[34rem] flex-col p-6 focus-visible:outline-offset-[-5px] sm:p-8 lg:min-h-[38rem] lg:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/70">
                  <FileCheck2 aria-hidden="true" size={13} className="text-accent" />
                  Featured guide
                </span>
                <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-accent">
                  {featuredGuide.status}
                </span>
              </div>

              <div className="my-10 flex flex-1 items-center justify-center sm:my-12">
                <div className="relative h-[17.5rem] w-[13.5rem] sm:h-[20rem] sm:w-[15.5rem]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-5 rotate-[7deg] rounded-[1.25rem] border border-white/10 bg-white/[0.035] transition duration-700 group-hover:translate-x-7 group-hover:rotate-[10deg]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-4 rotate-[-5deg] rounded-[1.25rem] border border-white/10 bg-white/[0.055] transition duration-700 group-hover:-translate-x-6 group-hover:rotate-[-8deg]"
                  />
                  <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.25rem] border border-white/15 bg-[#f5f1e8] p-5 text-[#0b1f33] shadow-2xl sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-[#0f766e]">
                        Capwise field guide
                      </span>
                      <span className="font-display text-[0.62rem] font-bold text-[#0b1f33]/45">
                        {featuredGuide.number}
                      </span>
                    </div>
                    <div className="mt-8 h-px bg-[#0b1f33]/15" />
                    <p className="mt-8 font-display text-[1.6rem] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-[1.85rem]">
                      Company Registration Checklist
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#0b1f33]/50">
                      Bangladesh
                    </p>
                    <div className="mt-auto grid gap-2">
                      {["Prepare", "Register", "Operationalize"].map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between border-t border-[#0b1f33]/12 pt-2.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#0b1f33]/62"
                        >
                          {item}
                          <span>{String(index + 1).padStart(2, "0")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/12 pt-6">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-accent">
                  {featuredGuide.category}
                </p>
                <div className="mt-3 flex items-end justify-between gap-5">
                  <div>
                    <h3 className="max-w-[19ch] font-display text-[clamp(1.55rem,3vw,2.4rem)] font-semibold leading-[1.04] tracking-[-0.05em]">
                      {featuredGuide.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/62">
                      {featuredGuide.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={22}
                    className="mb-1 shrink-0 text-white/48 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </div>
              </div>
            </Link>
          </m.article>

          <div className="grid gap-5 lg:col-span-5">
            {supportingGuides.map((guide, index) => {
              const Icon = guideIcons[index + 1];

              return (
                <m.article
                  key={guide.slug}
                  {...reveal(index + 3)}
                  className="capwise-resource-card group relative overflow-hidden rounded-[1.4rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7"
                >
                  <Link
                    href={`/resources/guides#${guide.slug}`}
                    aria-label={`Preview ${guide.title}`}
                    className="relative flex h-full min-h-[15rem] flex-col focus-visible:outline-offset-[-5px]"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
                        <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
                      </span>
                      <span className="font-display text-xs font-bold text-foreground/24">
                        {guide.number}
                      </span>
                    </div>

                    <div className="mt-8">
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.17em] text-accent-strong">
                        {guide.category}
                      </p>
                      <h3 className="mt-3 max-w-[19ch] font-display text-[1.45rem] font-semibold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-[1.7rem]">
                        {guide.title}
                      </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5 text-[0.66rem] font-bold text-muted">
                      {guide.status}
                      <ArrowRight
                        aria-hidden="true"
                        size={15}
                        className="transition duration-300 group-hover:translate-x-1 group-hover:text-accent-strong"
                      />
                    </div>
                  </Link>
                </m.article>
              );
            })}

            <m.aside
              {...reveal(5)}
              className="capwise-regulatory-panel relative overflow-hidden rounded-[1.4rem] border p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                  <Radar aria-hidden="true" size={22} strokeWidth={1.7} />
                </span>
                <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.14em] text-muted">
                  Verification first
                </span>
              </div>

              <h3 className="mt-7 max-w-[18ch] font-display text-[1.55rem] font-semibold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-[1.85rem]">
                Regulatory watch, without the noise.
              </h3>

              <div className="mt-6 divide-y divide-border border-y border-border">
                {regulatoryWatchTopics.slice(0, 3).map((topic) => (
                  <div key={topic.slug} className="flex items-center gap-4 py-3.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-xs font-semibold text-foreground/72 sm:text-sm">
                      {topic.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/resources/regulatory-updates"
                className="group mt-6 inline-flex items-center gap-3 text-xs font-bold text-foreground transition hover:text-accent-strong sm:text-sm"
              >
                View the publication standard
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </m.aside>
          </div>
        </div>

        <m.div
          {...reveal(6)}
          className="capwise-resource-note mt-5 grid gap-5 rounded-[1.35rem] border p-5 sm:p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-7"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
            <BookOpenCheck aria-hidden="true" size={20} strokeWidth={1.7} />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              Draft resources are not being presented as current legal or tax advice.
            </p>
            <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">
              Every time-sensitive publication will require official-source review,
              a visible review date and client or legal approval before launch.
            </p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-accent-strong sm:text-sm"
          >
            Our editorial standard
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
