import { ArrowRight, BookOpenText, CalendarClock, ShieldCheck } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import { blogPosts } from "@/data/blog";

export const metadata = {
  title: "Business Compliance Insights",
  description:
    "Reviewed Capwise insights on company formation, tax, VAT, accounting, payroll and regulatory compliance in Bangladesh.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-resources relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-30">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Insights & explainers</p>
              <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground">Useful content needs a source, reviewer and maintenance date.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">The publishing architecture is ready. Articles remain unpublished until the content is reviewed against current official sources.</p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-30">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            {blogPosts.length ? (
              <div className="grid gap-5 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <article key={post.slug} className="rounded-[1.5rem] border border-border bg-background p-7">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent-strong">{post.category}</p>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground">{post.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-foreground">Read article <ArrowRight aria-hidden="true" size={16} /></Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-[1.5rem] bg-brand p-7 text-white lg:col-span-2 sm:p-9">
                  <BookOpenText aria-hidden="true" size={28} className="text-accent" />
                  <h2 className="mt-6 max-w-[15ch] font-display text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">No fabricated articles are being used as launch filler.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/64">The first approved topic cluster should cover company formation, tax and VAT, recurring compliance, payroll and foreign market entry with clear reviewer ownership.</p>
                  <Link href="/resources/regulatory-updates" className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e]">See publication standard <ArrowRight aria-hidden="true" size={17} /></Link>
                </div>
                <aside className="rounded-[1.5rem] border border-border bg-background p-7 sm:p-9">
                  <p className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold"><ShieldCheck aria-hidden="true" size={14} /> Every article needs</p>
                  <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
                    <p className="flex items-start gap-3 border-t border-border pt-4"><CalendarClock aria-hidden="true" size={17} className="mt-1 shrink-0 text-accent-strong" /> Last-reviewed date and reviewer</p>
                    <p className="flex items-start gap-3 border-t border-border pt-4"><ShieldCheck aria-hidden="true" size={17} className="mt-1 shrink-0 text-accent-strong" /> Official or authoritative source trail</p>
                    <p className="flex items-start gap-3 border-t border-border pt-4"><BookOpenText aria-hidden="true" size={17} className="mt-1 shrink-0 text-accent-strong" /> Clear general-information disclaimer</p>
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
