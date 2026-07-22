import { ArrowUpRight, Info, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import Link from "next/link";

import FaqAccordion from "@/components/faq/FaqAccordion";
import SiteHeader from "@/components/layout/SiteHeader";
import { faqCategories, faqs, FAQ_CONTENT_VERSION } from "@/data/faqs";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Practical answers to common questions about company registration, tax, VAT, accounting, payroll and business compliance in Bangladesh.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content" data-faq-version={FAQ_CONTENT_VERSION}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <section className="capwise-faq relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-32">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="pointer-events-none absolute -right-44 -top-44 -z-10 size-[34rem] rounded-full bg-accent/12 blur-[110px]" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-accent-strong" />
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">Frequently asked</p>
              </div>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">
                First answers for better-informed decisions.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                These answers are general orientation, not individualized tax or legal advice. Current rules and the facts of each matter must be reviewed before action.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-[0.66rem] font-bold text-muted">
                <ShieldCheck aria-hidden="true" size={14} className="text-accent-strong" /> Draft content for client approval
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong"><MessageCircleQuestion aria-hidden="true" size={20} /></span>
                <h2 className="mt-7 font-display text-3xl font-semibold tracking-[-0.05em] text-foreground">Browse by decision stage.</h2>
                <div className="mt-7 grid gap-3">
                  {faqCategories.map((category, index) => (
                    <a key={category.id} href={`#${category.id}`} className="group rounded-xl border border-border bg-background p-4 transition hover:border-accent-strong hover:bg-surface-muted">
                      <span className="text-[0.6rem] font-bold text-foreground/25">{String(index + 1).padStart(2, "0")}</span>
                      <span className="mt-2 block text-sm font-bold text-foreground group-hover:text-accent-strong">{category.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted">{category.description}</span>
                    </a>
                  ))}
                </div>
              </aside>

              <div className="space-y-8 lg:col-span-8">
                {faqCategories.map((category) => (
                  <section key={category.id} id={category.id} className="scroll-mt-36 rounded-[1.6rem] border border-border bg-background px-5 sm:px-8 lg:px-10">
                    <div className="border-b border-border py-6 sm:py-8">
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">{category.label}</p>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{category.description}</p>
                    </div>
                    <FaqAccordion items={faqs.filter((item) => item.category === category.id)} />
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent"><Info aria-hidden="true" size={15} /> Need a fact-specific answer?</p>
              <h2 className="mt-4 max-w-[15ch] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">Bring the context to a focused consultation.</h2>
            </div>
            <Link href="/contact" className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:-translate-y-0.5 hover:bg-[#5eead4]">Book a consultation <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
