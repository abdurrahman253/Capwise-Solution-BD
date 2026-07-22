"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Link from "next/link";

import IndustryIcon from "@/components/industries/IndustryIcon";
import {
  INDUSTRIES_CONTENT_VERSION,
  industries,
} from "@/data/industries";

const layoutClasses = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function IndustriesOverview() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (index = 0) => ({
    initial: shouldReduceMotion ? false : { y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.62,
      delay: shouldReduceMotion ? 0 : Math.min(index * 0.055, 0.22),
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="industries-served"
      data-industries-version={INDUSTRIES_CONTENT_VERSION}
      aria-labelledby="industries-served-title"
      className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="capwise-soft-noise pointer-events-none absolute inset-0 -z-20 opacity-[0.055] mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 -z-10 size-[34rem] rounded-full bg-accent/12 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-44 -z-10 size-[32rem] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <m.div {...reveal()} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-accent" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.21em] text-accent sm:text-[0.68rem]">
                Industries served
              </p>
            </div>

            <h2
              id="industries-served-title"
              className="mt-5 max-w-[13ch] font-display text-[clamp(2.45rem,5.3vw,5.65rem)] font-semibold leading-[0.95] tracking-[-0.066em] sm:mt-6"
            >
              Different sectors.
              <span className="mt-1 block text-accent">
                Different pressure points.
              </span>
            </h2>
          </m.div>

          <m.div {...reveal(1)} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
              The right advice changes with the operating model. Capwise brings
              sector context into the legal, finance, tax and compliance path.
            </p>

            <Link
              href="/industries"
              className="group mt-6 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-xs font-bold text-white transition hover:border-accent hover:text-accent sm:text-sm"
            >
              Explore industry support
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </m.div>
        </div>

        <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:gap-4">
          {industries.map((industry, index) => (
            <m.article
              key={industry.slug}
              {...reveal(index + 2)}
              className={`${layoutClasses[index]} group overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.075] sm:rounded-[1.5rem]`}
            >
              <Link
                href={`/industries#${industry.slug}`}
                aria-label={`Explore support for ${industry.label}`}
                className="flex h-full min-h-[17rem] flex-col p-5 focus-visible:outline-offset-[-4px] sm:min-h-[20rem] sm:p-7 lg:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent sm:size-12">
                    <IndustryIcon
                      name={industry.icon}
                      size={18}
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="font-display text-[0.63rem] font-bold text-white/38 sm:text-xs">
                    {industry.number}
                  </span>
                </div>

                <div className="mt-7 sm:mt-9">
                  <p className="text-[0.57rem] font-bold uppercase tracking-[0.19em] text-accent sm:text-[0.62rem]">
                    {industry.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-[18ch] font-display text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[1.85rem]">
                    {industry.label}
                  </h3>
                  <p className="mt-3 max-w-xl text-xs leading-6 text-white/56 sm:text-sm sm:leading-7">
                    {industry.homeDescription}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[0.67rem] font-bold text-white/78 sm:text-xs">
                  View sector support
                  <ArrowRight
                    aria-hidden="true"
                    size={15}
                    className="text-accent transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </m.article>
          ))}
        </div>

        <m.div
          {...reveal(7)}
          className="mt-5 grid overflow-hidden rounded-[1.1rem] border border-white/10 bg-white/[0.035] sm:grid-cols-3"
        >
          {["Sector-aware scope", "Connected advisory", "Bangladesh context"].map(
            (item, index) => (
              <div
                key={item}
                className={`flex min-h-14 items-center gap-2.5 px-4 py-3 text-[0.67rem] font-semibold text-white/62 sm:min-h-16 sm:px-5 sm:text-xs ${
                  index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
                }`}
              >
                <Check aria-hidden="true" size={14} className="shrink-0 text-accent" />
                {item}
              </div>
            ),
          )}
        </m.div>
      </div>
    </section>
  );
}
