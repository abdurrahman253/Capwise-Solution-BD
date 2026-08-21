import { ShieldCheck } from "lucide-react";

import SiteHeader from "@/components/layout/SiteHeader";

export default function LegalDocumentPage({ eyebrow, title, intro, reviewNote, sections }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-resources relative isolate overflow-hidden border-b border-border py-section-lg">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-40" />
          <div className="mx-auto max-w-[90rem] px-gutter">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">{eyebrow}</p>
            <h1 className="mt-6 max-w-[14ch] font-display text-h1 font-semibold text-foreground">{title}</h1>
            <p className="mt-7 max-w-3xl text-sm leading-7 text-muted sm:text-base sm:leading-8">{intro}</p>
            <div className="mt-7 flex max-w-3xl items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-4 text-xs leading-6 text-muted">
              <ShieldCheck aria-hidden="true" size={17} className="mt-1 shrink-0 text-gold" />
              {reviewNote}
            </div>
          </div>
        </section>

        <section className="bg-surface py-section-lg">
          <div className="mx-auto grid max-w-[90rem] gap-5 px-gutter lg:grid-cols-2">
            {sections.map((section, index) => (
              <article key={section.title} className="rounded-[1.45rem] border border-border bg-background p-6 sm:p-8">
                <span className="font-display text-xs font-bold text-foreground/25">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-7 font-display text-h2 font-semibold text-foreground">{section.title}</h2>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
