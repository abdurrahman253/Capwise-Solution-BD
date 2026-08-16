import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { insights } from "@/data/insights";

const selectedSlugs = ["company-registration-bangladesh","vat-registration-smes-bangladesh","sme-sector-bangladesh","startups-in-bangladesh"];
const selected = selectedSlugs.map((slug)=>insights.find((item)=>item.slug===slug)).filter(Boolean);

export default function InsightsPreview() {
  return (
    <section className="bg-surface-muted/55 py-18 sm:py-24 lg:py-28" aria-labelledby="insights-preview-title">
      <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[.2em] text-brand-blue">Latest Insights</p><h2 id="insights-preview-title" className="mt-5 max-w-[13ch] font-display text-[clamp(2.8rem,5.4vw,5.8rem)] font-semibold leading-[.94] tracking-[-.068em] text-foreground">Understand the issue before it becomes urgent.</h2></div><div className="lg:col-span-4"><p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Short articles on registration, tax, VAT, SMEs, startups and recurring business compliance.</p><Link href="/insights" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">Browse all insights <ArrowRight size={15} className="text-brand-gold"/></Link></div></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {selected.map((item,index)=><article key={item.slug} className={`group overflow-hidden rounded-[1.35rem] border border-border bg-surface transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_20px_55px_rgba(27,20,100,.09)] ${index===0?"lg:col-span-6":"lg:col-span-2"}`}><Link href={`/insights/${item.slug}`} className="flex h-full min-h-[24rem] flex-col"><div className="relative aspect-[16/10] overflow-hidden"><Image src={item.image} alt={item.imageAlt || ""} fill sizes="(min-width:1024px) 45vw,100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 to-transparent"/></div><div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[.58rem] font-extrabold uppercase tracking-[.16em] text-brand-blue">{item.category}</p><h3 className={`${index===0?"text-3xl":"text-lg"} mt-3 font-display font-semibold leading-tight tracking-[-.045em] text-foreground group-hover:text-brand-blue`}>{item.title}</h3>{index===0&&<p className="mt-3 text-sm leading-7 text-muted">{item.excerpt}</p>}<span className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs font-extrabold">Read <ArrowUpRight size={14} className="text-brand-gold"/></span></div></Link></article>)}
        </div>
      </div>
    </section>
  );
}
