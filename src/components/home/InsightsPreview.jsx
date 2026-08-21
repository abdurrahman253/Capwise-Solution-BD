import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { insights } from "@/data/insights";

const selectedSlugs = ["company-registration-bangladesh","vat-registration-smes-bangladesh","sme-sector-bangladesh","startups-in-bangladesh"];
const selected = selectedSlugs.map((slug)=>insights.find((item)=>item.slug===slug)).filter(Boolean);

export default function InsightsPreview() {
  return (
    <section className="bg-surface-muted/55 py-section-lg" aria-labelledby="insights-preview-title">
      <div className="mx-auto max-w-[94rem] px-gutter">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[.2em] text-brand-blue">Latest Insights</p><h2 id="insights-preview-title" className="mt-5 max-w-[13ch] font-display text-h2 font-semibold text-foreground">Understand the issue before it becomes urgent.</h2></div><div className="lg:col-span-4"><p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Short articles on registration, tax, VAT, SMEs, startups and recurring business compliance.</p><Link href="/insights" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">Browse all insights <ArrowRight size={15} className="text-brand-gold"/></Link></div></div>
        <div className="mt-8 grid grid-cols-1 items-stretch gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-12">
          {selected.map((item,index)=><article key={item.slug} className={`group overflow-hidden rounded-[1.2rem] border border-border bg-surface transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_20px_55px_rgba(27,20,100,.09)] sm:rounded-[1.35rem] ${index===0?"sm:col-span-3 lg:col-span-6":"lg:col-span-2"}`}><Link href={`/insights/${item.slug}`} className={`flex h-full flex-col ${index===0?"min-h-[15rem] sm:min-h-[22rem] lg:min-h-[24rem]":"min-h-[11rem] sm:min-h-[15rem] lg:min-h-[24rem]"}`}><div className="relative aspect-[16/10] overflow-hidden"><Image src={item.image} alt={item.imageAlt || ""} fill sizes="(min-width:1024px) 45vw,100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 to-transparent"/></div><div className="flex flex-1 flex-col p-2.5 sm:p-5 md:p-6"><p className="text-[.52rem] font-extrabold uppercase tracking-[.12em] text-brand-blue sm:text-[.58rem] sm:tracking-[.16em]">{item.category}</p><h3 className={`${index===0?"text-card":"text-[0.72rem] sm:text-lg"} mt-1.5 font-display font-semibold leading-[1.1] tracking-[-0.02em] text-foreground group-hover:text-brand-blue sm:mt-3`}>{item.title}</h3>{index===0&&<p className="mt-2 hidden text-xs leading-6 text-muted sm:mt-3 sm:block sm:text-sm sm:leading-7">{item.excerpt}</p>}<span className="mt-auto hidden items-center justify-between border-t border-border pt-4 text-xs font-extrabold sm:flex">Read <ArrowUpRight size={14} className="text-brand-gold"/></span></div></Link></article>)}
        </div>
      </div>
    </section>
  );
}
