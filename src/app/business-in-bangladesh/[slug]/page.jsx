import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import { businessBangladeshTopics, getBusinessTopic } from "@/data/businessBangladesh";

export function generateStaticParams() {
  return businessBangladeshTopics.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = getBusinessTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `/business-in-bangladesh/${topic.slug}` },
  };
}

export default async function BusinessTopicPage({ params }) {
  const { slug } = await params;
  const topic = getBusinessTopic(slug);
  if (!topic) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-gateway relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-30">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">{topic.eyebrow}</p>
              <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground">{topic.title}</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">{topic.intro}</p>
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-surface/70 p-4 text-xs leading-6 text-muted">
                <ShieldCheck aria-hidden="true" size={16} className="mt-1 shrink-0 text-gold" />
                General planning information. Current legal, tax, regulatory and procedural requirements must be confirmed for the actual case.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-30">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <div className="grid gap-5 lg:col-span-8 sm:grid-cols-2">
              {topic.sections.map((section, index) => (
                <article key={section.title} className="rounded-[1.45rem] border border-border bg-background p-6 sm:p-8">
                  <span className="font-display text-xs font-bold text-foreground/25">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-7 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground">{section.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
                </article>
              ))}
            </div>
            <aside className="rounded-[1.5rem] bg-brand p-7 text-white lg:col-span-4 lg:p-9">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">Preparation checklist</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">Bring the right facts into the first review.</h2>
              <div className="mt-7 grid gap-3">
                {topic.checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 border-t border-white/12 pt-3 text-xs font-semibold leading-6 text-white/68">
                    <Check aria-hidden="true" size={15} className="mt-1 shrink-0 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:bg-[#5eead4]">
                Request a focused review
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
