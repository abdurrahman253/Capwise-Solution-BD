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
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-blue" />
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Who we work with</p>
          </div>
          <h2 id="firm-intro-title" className="mt-5 max-w-[13ch] font-display text-h2 font-semibold text-foreground">Start from where your business is today.</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted">Every engagement starts from a different point—a new registration, a records backlog, a governance gap or a market-entry decision. Pick the one closest to where the business is right now.</p>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-sm font-bold text-foreground transition hover:border-brand-blue hover:text-brand-blue"
          >
            Get in touch
            <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
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
