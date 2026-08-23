"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { insights } from "@/data/insights";

const selectedSlugs = ["company-registration-bangladesh","vat-registration-smes-bangladesh","sme-sector-bangladesh","startups-in-bangladesh"];
const selected = selectedSlugs.map((slug)=>insights.find((item)=>item.slug===slug)).filter(Boolean);
const [featured, ...rest] = selected;

export default function InsightsPreview() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-surface-muted/55 py-section-lg" aria-labelledby="insights-preview-title">
      <div className="mx-auto max-w-[94rem] px-gutter">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[.2em] text-brand-blue">Latest Insights</p><h2 id="insights-preview-title" className="mt-5 max-w-[13ch] font-display text-h2 font-semibold text-foreground">Understand the issue before it becomes urgent.</h2></div><div className="lg:col-span-4"><p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Short articles on registration, tax, VAT, SMEs, startups and recurring business compliance.</p><Link href="/insights" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">Browse all insights <ArrowRight size={15} className="text-brand-gold"/></Link></div></div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-12 lg:gap-8">
          {featured && (
            <m.article
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0 }}
              className="group overflow-hidden rounded-[1.2rem] border border-border bg-surface transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_20px_55px_rgba(27,20,100,.09)] sm:rounded-[1.35rem] sm:col-span-3 lg:col-span-7"
            >
              <Link href={`/insights/${featured.slug}`} className="flex h-full flex-col min-h-[15rem] sm:min-h-[22rem] lg:min-h-[24rem]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={featured.image} alt={featured.imageAlt || ""} fill sizes="(min-width:1024px) 55vw,100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 to-transparent"/>
                </div>
                <div className="flex flex-1 flex-col p-2.5 sm:p-5 md:p-6">
                  <p className="text-[.52rem] font-extrabold uppercase tracking-[.12em] text-brand-blue sm:text-[.58rem] sm:tracking-[.16em]">{featured.category}</p>
                  <h3 className="text-card mt-1.5 font-display font-semibold leading-[1.1] tracking-[-0.02em] text-foreground group-hover:text-brand-blue sm:mt-3">{featured.title}</h3>
                  <p className="mt-2 hidden text-xs leading-6 text-muted sm:mt-3 sm:block sm:text-sm sm:leading-7">{featured.excerpt}</p>
                  <span className="mt-auto hidden items-center justify-between border-t border-border pt-4 text-xs font-extrabold sm:flex">Read <ArrowUpRight size={14} className="text-brand-gold"/></span>
                </div>
              </Link>
            </m.article>
          )}

          {/* Row on mobile AND desktop, card only at tablet (sm-lg):
              below 640px the single-column grid gives secondary items the same
              full width as the featured card, so a compact thumbnail+text row
              is used there too - only the sm: tier (640-1023px, where these
              already sit narrower than featured in their own 3-col row) keeps
              the original big-image card. At lg: transparent to the grid
              (display:contents), becomes one flex column with hairline
              dividers instead of card chrome. */}
          <div className="contents lg:col-span-5 lg:flex lg:flex-col lg:divide-y lg:divide-border">
            {rest.map((item, i) => (
              <m.article
                key={item.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: Math.min((i + 1) * 0.06, 0.18) }}
                className="group overflow-hidden transition sm:rounded-[1.35rem] sm:border sm:border-border sm:bg-surface sm:hover:-translate-y-1 sm:hover:border-brand-blue/30 sm:hover:shadow-[0_20px_55px_rgba(27,20,100,.09)] lg:flex-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:hover:translate-y-0 lg:hover:border-transparent lg:hover:shadow-none"
              >
                <Link
                  href={`/insights/${item.slug}`}
                  className="flex items-center gap-3 rounded-[0.8rem] p-2 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted sm:h-full sm:min-h-[12rem] sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-none sm:p-0 sm:hover:bg-transparent sm:focus-visible:ring-offset-surface lg:h-full lg:min-h-0 lg:flex-row lg:items-center lg:gap-4 lg:rounded-[0.9rem] lg:p-4 lg:hover:bg-surface lg:focus-visible:ring-offset-surface-muted"
                >
                  <div className="relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-[0.6rem] sm:aspect-[16/10] sm:w-full sm:rounded-none lg:aspect-[4/3] lg:w-28">
                    <Image src={item.image} alt={item.imageAlt || ""} fill sizes="(min-width:1024px) 112px,(min-width:640px) 33vw,80px" className="object-cover transition duration-700 group-hover:scale-[1.035]"/>
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-brand-navy/45 to-transparent sm:block lg:hidden"/>
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-0.5 p-0 sm:justify-start sm:gap-0 sm:p-4 md:p-5 lg:justify-center lg:gap-0 lg:p-0">
                    <p className="text-[.52rem] font-extrabold uppercase tracking-[.12em] text-brand-blue sm:text-[.58rem] sm:tracking-[.16em]">{item.category}</p>
                    <h3 className="text-sm font-display font-semibold leading-[1.25] tracking-[-0.01em] text-foreground group-hover:text-brand-blue line-clamp-2 sm:mt-3 sm:text-lg sm:leading-[1.1] sm:tracking-[-0.02em] sm:line-clamp-none lg:mt-1 lg:text-base lg:leading-[1.25] lg:tracking-[-0.01em] lg:line-clamp-2">{item.title}</h3>
                    <p className="hidden text-xs leading-5 text-muted lg:mt-1.5 lg:block lg:line-clamp-1">{item.excerpt}</p>
                    <span className="mt-auto hidden items-center justify-between border-t border-border pt-4 text-xs font-extrabold sm:flex lg:hidden">Read <ArrowUpRight size={14} className="text-brand-gold"/></span>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={16} className="hidden shrink-0 self-center text-brand-gold opacity-0 transition group-hover:opacity-100 lg:block" />
                </Link>
              </m.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
