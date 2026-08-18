"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

export default function FirmIntro() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-background py-18 sm:py-24 lg:py-28" aria-labelledby="firm-intro-title">
      <div className="mx-auto grid max-w-[94rem] gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 2xl:px-10">
        <m.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} className="lg:col-span-5">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Our Firm</p>
          <h2 id="firm-intro-title" className="mt-5 max-w-[12ch] font-display text-[clamp(2.15rem,3.6vw,3.6rem)] font-semibold leading-[.95] tracking-[-.065em] text-foreground">One advisory team. Fewer disconnected answers.</h2>
        </m.div>
        <m.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: .08 }} className="lg:col-span-6 lg:col-start-7">
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg sm:leading-9">Capwise brings accounting, tax, legal, finance and compliance support together for businesses operating in Bangladesh. We work with founders, SMEs, established companies and foreign market entrants to turn requirements into practical next steps.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Clear scope before work begins", "Simple English, practical guidance", "Connected compliance calendar", "Article-led knowledge for clients"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground"><span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"><Check size={14} /></span>{item}</div>
            ))}
          </div>
          <Link href="/about" className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-sm font-extrabold text-foreground transition hover:border-brand-gold hover:text-brand-blue">About Capwise <ArrowUpRight size={16} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </m.div>
      </div>
    </section>
  );
}
