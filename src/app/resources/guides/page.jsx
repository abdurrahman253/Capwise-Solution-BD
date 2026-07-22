import {
  ArrowRight,
  BookOpenCheck,
  Check,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import {
  guideResources,
  RESOURCE_CONTENT_VERSION,
} from "@/data/resources";

export const metadata = {
  title: "Practical Business Guides",
  description:
    "Preview Capwise Solution BD's practical preparation guides for company registration, tax and VAT compliance, and foreign market entry in Bangladesh.",
  alternates: {
    canonical: "/resources/guides",
  },
};

export default function GuidesPage() {
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
            className="pointer-events-none absolute -right-44 -top-44 -z-10 size-[34rem] rounded-full bg-accent/12 blur-[120px]"
          />

          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-[0.68rem]">
                    Practical guides
                  </p>
                </div>
                <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">
                  Prepare the work.
                  <span className="mt-1 block text-accent-strong">
                    Reduce avoidable friction.
                  </span>
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  These guide concepts are editorial drafts based on the approved
                  content direction. Final downloadable files require technical,
                  client and legal review before publication.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 xl:grid-cols-3">
              {guideResources.map((guide, index) => (
                <article
                  key={guide.slug}
                  id={guide.slug}
                  className={`group scroll-mt-32 relative overflow-hidden rounded-[1.55rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                    guide.featured
                      ? "border-brand bg-brand text-white shadow-[0_28px_80px_rgba(11,31,51,0.18)] xl:row-span-2"
                      : "capwise-resource-card"
                  }`}
                >
                  {guide.featured && (
                    <div
                      aria-hidden="true"
                      className="capwise-soft-noise pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
                    />
                  )}

                  <div className="relative flex h-full min-h-[31rem] flex-col">
                    <div className="flex items-start justify-between gap-5">
                      <span
                        className={`inline-flex size-16 items-center justify-center rounded-full border sm:size-20 ${
                          guide.featured
                            ? "border-white/14 bg-white/6 text-accent"
                            : "border-accent/25 bg-accent/10 text-accent-strong"
                        }`}
                      >
                        {index === 0 ? (
                          <FileCheck2 aria-hidden="true" size={25} strokeWidth={1.7} />
                        ) : (
                          <BookOpenCheck aria-hidden="true" size={25} strokeWidth={1.7} />
                        )}
                      </span>
                      <span
                        className={`font-display text-xs font-bold ${
                          guide.featured ? "text-white/35" : "text-foreground/24"
                        }`}
                      >
                        {guide.number}
                      </span>
                    </div>

                    <div className="mt-12">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          className={`text-[0.6rem] font-bold uppercase tracking-[0.17em] ${
                            guide.featured ? "text-accent" : "text-accent-strong"
                          }`}
                        >
                          {guide.category}
                        </p>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[0.54rem] font-bold uppercase tracking-[0.12em] ${
                            guide.featured
                              ? "border-white/12 bg-white/6 text-white/60"
                              : "border-border bg-surface text-muted"
                          }`}
                        >
                          {guide.status}
                        </span>
                      </div>
                      <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
                        {guide.title}
                      </h2>
                      <p
                        className={`mt-5 text-sm leading-7 ${
                          guide.featured ? "text-white/64" : "text-muted"
                        }`}
                      >
                        {guide.summary}
                      </p>
                    </div>

                    <div
                      className={`mt-8 border-t pt-6 ${
                        guide.featured ? "border-white/12" : "border-border"
                      }`}
                    >
                      <p
                        className={`text-[0.58rem] font-bold uppercase tracking-[0.15em] ${
                          guide.featured ? "text-white/42" : "text-muted"
                        }`}
                      >
                        Planned coverage
                      </p>
                      <div className="mt-4 grid gap-2">
                        {guide.topics.map((topic) => (
                          <div
                            key={topic}
                            className={`flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2 text-[0.7rem] font-bold ${
                              guide.featured
                                ? "border-white/10 bg-white/[0.045] text-white/72"
                                : "border-border bg-surface text-foreground/68"
                            }`}
                          >
                            <Check
                              aria-hidden="true"
                              size={14}
                              className={guide.featured ? "text-accent" : "text-accent-strong"}
                            />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className={`mt-auto flex items-center justify-between gap-4 border-t pt-6 text-xs font-bold transition sm:text-sm ${
                        guide.featured
                          ? "border-white/12 text-white/72 hover:text-accent"
                          : "border-border text-foreground/72 hover:text-accent-strong"
                      }`}
                    >
                      Discuss this topic
                      <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                  </div>
                </article>
              ))}

              <aside className="capwise-resource-card rounded-[1.55rem] border p-6 sm:p-8 xl:col-span-2">
                <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <ShieldCheck aria-hidden="true" size={25} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold">
                      Release status
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl">
                      No placeholder download buttons.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                      The site will only offer a downloadable file after the guide
                      content, citations, design, legal disclaimer and version date
                      are complete and approved. Until then, each item remains
                      transparently marked as an editorial draft.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
