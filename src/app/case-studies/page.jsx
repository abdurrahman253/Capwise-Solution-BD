import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import { caseStudies } from "@/data/caseStudies";

export const metadata = {
  title: "Case Studies & Client Evidence",
  description:
    "Capwise Solution BD's evidence publication standard for approved, verifiable client case studies in Bangladesh.",
  alternates: { canonical: "/case-studies" },
};

const evidenceRequirements = [
  "Written client permission or an approved anonymisation decision",
  "A verified challenge, scope, timeline and outcome",
  "No guaranteed or misleading result claims",
  "Approval of names, logos, quotes and commercially sensitive details",
];

export default function CaseStudiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-evidence relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-30">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Case studies & evidence</p>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground">Proof should be verified before it becomes marketing.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">This architecture is ready for approved client stories, but no client, quote, logo or result is fabricated to fill the page.</p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-30">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            {caseStudies.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {caseStudies.map((study) => (
                  <article key={study.slug} className="rounded-[1.5rem] border border-border bg-background p-7 sm:p-9">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">{study.industry}</p>
                    <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-foreground">{study.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted">{study.summary}</p>
                    <Link href={`/case-studies/${study.slug}`} className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-foreground">Read approved case <ArrowRight aria-hidden="true" size={16} /></Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="rounded-[1.6rem] bg-brand p-7 text-white sm:p-10 lg:col-span-7">
                  <FileSearch aria-hidden="true" size={28} className="text-accent" />
                  <p className="mt-7 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">Evidence intake required</p>
                  <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.3rem,4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">The page is ready. The proof must come from real work.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/64">Use the case-study intake process to capture the situation, approved scope, measurable outcome, timeline and publication permissions.</p>
                  <Link href="/contact" className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e]">Discuss evidence approval <ArrowRight aria-hidden="true" size={17} /></Link>
                </div>
                <aside className="rounded-[1.6rem] border border-border bg-background p-7 sm:p-9 lg:col-span-5">
                  <p className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold"><ShieldCheck aria-hidden="true" size={14} /> Publication gate</p>
                  <div className="mt-6 grid gap-4">
                    {evidenceRequirements.map((requirement) => (
                      <div key={requirement} className="flex items-start gap-3 border-t border-border pt-4 text-sm leading-7 text-muted">
                        <CheckCircle2 aria-hidden="true" size={17} className="mt-1 shrink-0 text-accent-strong" />
                        {requirement}
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
