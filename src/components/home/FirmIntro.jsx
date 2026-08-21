"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";

const segments = [
  {
    label: "Founders",
    problem: "First question: which structure to register under.",
    href: "/services/company-formation-registration",
    linkLabel: "Company formation & registration",
  },
  {
    label: "SMEs",
    problem: "Often starts with the books: incomplete records make everything after harder.",
    href: "/services/accounting-bookkeeping",
    linkLabel: "Accounting & bookkeeping",
  },
  {
    label: "Established companies",
    problem: "Often a records gap: filings and resolutions that have fallen behind the business.",
    href: "/services/corporate-secretarial",
    linkLabel: "Corporate secretarial",
  },
  {
    label: "Foreign entrants",
    problem: "First decision: company, branch or liaison-office presence.",
    href: "/business-in-bangladesh",
    linkLabel: "Doing business in Bangladesh",
  },
];

export default function FirmIntro() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-background py-section-lg" aria-labelledby="firm-intro-title">
      <div className="mx-auto grid max-w-[94rem] gap-10 px-gutter lg:grid-cols-12 lg:gap-14">
        <m.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} className="lg:col-span-5">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Who we work with</p>
          <h2 id="firm-intro-title" className="mt-5 max-w-[13ch] font-display text-h2 font-semibold text-foreground">Start from where your business is today.</h2>
        </m.div>
        <m.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: .08 }} className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {segments.map((segment) => (
            <Link
              key={segment.label}
              href={segment.href}
              className="group flex flex-col rounded-[1.1rem] border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-brand-blue/35"
            >
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-brand-blue">{segment.label}</p>
              <p className="mt-3 text-sm leading-6 text-foreground">{segment.problem}</p>
              <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-extrabold text-foreground group-hover:text-brand-blue">
                {segment.linkLabel}
                <ArrowRight size={14} className="text-brand-gold transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
}
