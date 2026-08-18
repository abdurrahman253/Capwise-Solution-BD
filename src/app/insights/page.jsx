import SiteHeader from "@/components/layout/SiteHeader";
import InsightsExplorer from "@/components/insights/InsightsExplorer";
import { insightCategories, insights } from "@/data/insights";

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
        <section className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-24 lg:py-28">
          <div className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-brand-blue/10 blur-[110px]" />
          <div className="mx-auto grid max-w-[94rem] gap-8 px-5 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-8 2xl:px-10">
            <div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Capwise Insights</p><h1 className="mt-5 max-w-[12ch] font-display text-[clamp(2.4rem,4.4vw,4.6rem)] font-semibold leading-[.91] tracking-[-.075em] text-foreground">Useful guidance. Less legal noise.</h1></div>
            <div className="lg:col-span-4"><p className="text-base leading-8 text-muted">Short, practical articles for businesses operating in Bangladesh. Use them to understand the issue, then confirm current requirements for your specific case.</p></div>
          </div>
        </section>
        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10"><InsightsExplorer insights={insights} categories={insightCategories} /></div>
        </section>
      </main>
    </>
  );
}
