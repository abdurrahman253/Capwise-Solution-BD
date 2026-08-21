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
        <section className="relative overflow-hidden border-b border-border bg-background py-section-lg">
          <div className="mx-auto grid max-w-[94rem] gap-8 px-gutter lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Capwise Insights</p><h1 className="mt-5 max-w-[12ch] font-display text-h1 font-semibold text-foreground">Useful guidance. Less legal noise.</h1></div>
            <div className="lg:col-span-4"><p className="text-base leading-8 text-muted">Short, practical articles for businesses operating in Bangladesh. Use them to understand the issue, then confirm current requirements for your specific case.</p></div>
          </div>
        </section>
        <section className="bg-background py-section-md">
          <div className="mx-auto max-w-[94rem] px-gutter"><InsightsExplorer insights={insights} categories={insightCategories} /></div>
        </section>
      </main>
    </>
  );
}
