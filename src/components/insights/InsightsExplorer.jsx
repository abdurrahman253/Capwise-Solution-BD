"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function InsightsExplorer({ insights, categories }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return insights.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const queryMatch = !term || `${item.title} ${item.excerpt} ${item.category}`.toLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [category, query, insights]);

  return (
    <>
      <div className="flex flex-col gap-5 border-y border-border py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-3.5 py-2 text-[0.68rem] font-extrabold transition ${category === item ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-surface text-muted hover:border-brand-blue/35 hover:text-brand-blue"}`}>{item}</button>
          ))}
        </div>
        <label className="relative block w-full lg:w-[19rem]">
          <span className="sr-only">Search insights</span>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search insights" className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/65 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10" />
        </label>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, index) => (
          <article key={item.slug} className={`group overflow-hidden rounded-[1.4rem] border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_22px_60px_rgba(27,20,100,.10)] ${index === 0 && category === "All" && !query ? "md:col-span-2" : ""}`}>
            <Link href={`/insights/${item.slug}`} className="flex h-full min-h-[26rem] flex-col focus-visible:outline-none">
              <div className="relative aspect-[16/9] overflow-hidden bg-brand-navy">
                <Image src={item.image} alt={item.imageAlt || ""} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.17em] text-brand-blue">{item.category}</p>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-.045em] text-foreground transition group-hover:text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.excerpt}</p>
                <span className="mt-auto flex items-center justify-between border-t border-border pt-5 text-xs font-extrabold text-foreground">Read insight <ArrowUpRight size={15} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-sm text-muted">No insights match that search yet.</div>}
    </>
  );
}
