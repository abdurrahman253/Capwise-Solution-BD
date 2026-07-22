import { ArrowUpRight, BriefcaseBusiness, Building2, Calculator, FileCheck2, UsersRound } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import { businessBangladeshTopics } from "@/data/businessBangladesh";

export const metadata = {
  title: "Doing Business in Bangladesh",
  description:
    "A practical overview of legal structures, incorporation, ongoing compliance, tax, VAT and employment considerations for doing business in Bangladesh.",
  alternates: { canonical: "/business-in-bangladesh" },
};

const topicIcons = [Building2, FileCheck2, BriefcaseBusiness, Calculator, UsersRound];

const topics = businessBangladeshTopics.map((topic, index) => ({
  ...topic,
  icon: topicIcons[index],
}));

export default function BusinessInBangladeshPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-gateway relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-32">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="pointer-events-none absolute -right-44 -top-48 -z-10 size-[38rem] rounded-full bg-accent/12 blur-[120px]" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3"><span className="h-px w-10 bg-accent-strong" /><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">Doing business in Bangladesh</p></div>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.3rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">A clearer route from market-entry decision to compliant operation.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Use this overview to identify the main workstreams. It is general information and should not replace a current review of the law, regulator guidance and the facts.</p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-foreground transition hover:text-accent-strong">Discuss a market-entry plan <ArrowUpRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-12">
              {topics.map(({ icon: Icon, eyebrow, title, description, slug }, index) => (
                <article key={title} className={`group rounded-[1.6rem] border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-accent/40 sm:p-8 ${index < 2 ? "lg:col-span-6" : "lg:col-span-4"}`}>
                  <div className="flex items-start justify-between gap-5"><span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong"><Icon aria-hidden="true" size={19} /></span><span className="font-display text-xs font-bold text-foreground/24">{String(index + 1).padStart(2, "0")}</span></div>
                  <p className="mt-8 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">{eyebrow}</p>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
                  <Link href={`/business-in-bangladesh/${slug}`} className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-foreground transition group-hover:text-accent-strong">Read the practical guide <ArrowUpRight aria-hidden="true" size={15} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">From overview to action</p><h2 className="mt-4 max-w-[17ch] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">Map the registrations, owners, deadlines and operating obligations.</h2></div>
            <div className="flex flex-wrap gap-3"><Link href="/services/company-formation-registration" className="inline-flex h-12 items-center gap-3 rounded-full border border-white/15 px-6 text-sm font-bold text-white transition hover:border-accent hover:text-accent">Formation services <ArrowUpRight aria-hidden="true" size={17} /></Link><Link href="/contact" className="inline-flex h-12 items-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:-translate-y-0.5 hover:bg-[#5eead4]">Book a consultation <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
          </div>
        </section>
      </main>
    </>
  );
}
