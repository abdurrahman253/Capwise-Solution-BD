"use client";

import { ArrowUpRight, Building2, Factory, HeartHandshake, Rocket, Ship, Store } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { pickYourIndustryOptions } from "@/data/pickYourIndustry";

const icons = [Store, Rocket, Factory, Ship, HeartHandshake, Building2];

export default function PickYourIndustry() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-brand-navy py-18 text-white sm:py-24 lg:py-28" aria-labelledby="pick-industry-title">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[32rem] rounded-full bg-brand-gold/10 blur-[120px]" />
      <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[.2em] text-brand-gold">Pick Your Industry</p>
            <h2 id="pick-industry-title" className="mt-5 max-w-[15ch] font-display text-h2 font-semibold">
              Find the guide built for your business.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
              Six starting points for founders, SMEs, startups and organisations with sector-specific registration and compliance needs.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pickYourIndustryOptions.map((item, index) => {
            const Icon = icons[index];
            return (
              <m.article
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-[1.1rem] border border-white/12 bg-white/[.045] p-4 transition hover:-translate-y-1 hover:border-brand-gold/45 hover:bg-white/[.07] sm:rounded-[1.3rem] sm:p-6"
              >
                <Link href={item.href} className="flex min-h-[10.5rem] flex-col sm:min-h-[16rem]">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/[.055] text-brand-gold sm:size-11">
                      <Icon size={15} className="sm:hidden" />
                      <Icon size={18} className="hidden sm:block" />
                    </span>
                    <span className="text-[.65rem] font-extrabold text-white/35">{item.number}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold leading-[1.15] tracking-[-.03em] sm:mt-7 sm:text-2xl sm:leading-[1.05] sm:tracking-[-.045em]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-white/58 sm:mt-3 sm:text-sm sm:leading-7">{item.text}</p>
                  <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 text-[0.68rem] font-extrabold sm:pt-5 sm:text-xs">
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
