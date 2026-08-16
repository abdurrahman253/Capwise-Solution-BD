"use client";

import { ArrowUpRight, Building2, Factory, HeartHandshake, Rocket, Ship, Store } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { pickYourIndustryOptions } from "@/data/pickYourIndustry";

const icons = [Store, Rocket, Factory, Ship, HeartHandshake, Building2];

export default function PickYourIndustry() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-brand-navy py-18 text-white sm:py-24 lg:py-28" aria-labelledby="pick-industry-title">
      <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[.2em] text-brand-gold">Pick Your Industry</p>
            <h2 id="pick-industry-title" className="mt-5 max-w-[15ch] font-display text-[clamp(2.8rem,5.4vw,5.8rem)] font-semibold leading-[.94] tracking-[-.068em]">
              Find the guide built for your business.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
              Six starting points for founders, SMEs, startups and organisations with sector-specific registration and compliance needs.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pickYourIndustryOptions.map((item, index) => {
            const Icon = icons[index];
            return (
              <m.article
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-[1.3rem] border border-white/12 bg-white/[.045] p-6 transition hover:-translate-y-1 hover:border-brand-gold/45 hover:bg-white/[.07]"
              >
                <Link href={item.href} className="flex min-h-[16rem] flex-col">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/[.055] text-brand-gold">
                      <Icon size={18} />
                    </span>
                    <span className="text-[.65rem] font-extrabold text-white/35">{item.number}</span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-semibold leading-[1.05] tracking-[-.045em]">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{item.text}</p>
                  <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-xs font-extrabold">
                    Read guide
                    <ArrowUpRight size={15} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
