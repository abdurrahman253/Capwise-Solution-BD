import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import InsightsExplorer from "@/components/insights/InsightsExplorer";
import { insightCategories, insights } from "@/data/insights";

const quickNav = [
  ["Company Formation", "/services/company-formation-registration"],
  ["Tax & VAT", "/services/tax-advisory-compliance"],
  ["Regulatory & Legal", "/services/regulatory-legal-advisory"],
  ["SME", "/industries/smes-startups"],
];

export const metadata = {
  title: "Business Insights for Bangladesh",
  description: "Concise Capwise guides on company formation, tax, VAT, accounting, payroll, SMEs, startups and industry compliance in Bangladesh.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-border bg-background py-section-lg">
          <div className="mx-auto grid max-w-[94rem] gap-8 px-gutter lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Capwise Insights</p>
              <h1 className="mt-5 max-w-[20ch] font-display text-h1 font-semibold text-foreground">Useful guidance. Less legal noise.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">Short, practical articles for businesses operating in Bangladesh. Use them to understand the issue, then confirm current requirements for your specific case.</p>
              <Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover">Book a Free Consultation <ArrowUpRight aria-hidden="true" size={17} /></Link>
            </div>
            <div className="lg:col-span-5">
              <nav aria-label="Jump to a topic" className="rounded-[1.5rem] border border-border bg-surface p-7 sm:p-8">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">Looking for something specific?</p>
                <div className="mt-5 divide-y divide-border border-t border-border">
                  {quickNav.map(([label, href]) => (
                    <Link key={href} href={href} className="group flex items-center justify-between gap-4 py-4 text-sm font-bold text-foreground transition hover:text-brand-blue">{label}<ArrowRight aria-hidden="true" size={15} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-blue" /></Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </section>
        <section className="bg-background py-section-md">
          <div className="mx-auto max-w-[94rem] px-gutter"><InsightsExplorer insights={insights} categories={insightCategories} /></div>
        </section>
      </main>
    </>
  );
}
