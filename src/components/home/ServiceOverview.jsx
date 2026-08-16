"use client";

import { ArrowUpRight, Building2, Calculator, FileSignature, ReceiptText, Scale, UsersRound, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { services } from "@/config/navigation";

const icons = [Building2, Calculator, ReceiptText, UsersRound, FileSignature, Scale, BriefcaseBusiness];
const capabilities = [
  ["RJSC & setup", "TIN / VAT", "Operational registrations"],
  ["Bookkeeping", "Reporting", "Reconciliations"],
  ["Tax filings", "VAT compliance", "Withholding"],
  ["Payroll", "HR records", "Employment compliance"],
  ["AGM & filings", "Registers", "Corporate changes"],
  ["Licensing", "Contracts", "Regulatory review"],
  ["Growth decisions", "Financing readiness", "Restructuring"],
];

export default function ServiceOverview() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="border-y border-border bg-surface-muted/55 py-18 sm:py-24 lg:py-28" aria-labelledby="service-overview-title">
      <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Services</p><h2 id="service-overview-title" className="mt-5 max-w-[13ch] font-display text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold leading-[.94] tracking-[-.068em] text-foreground">The essentials, connected.</h2></div>
          <div className="lg:col-span-4"><p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Choose a service or start with your business problem. The work is coordinated so one compliance step does not create a gap somewhere else.</p><Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">View all services <ArrowUpRight size={15} className="text-brand-gold" /></Link></div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <m.article key={service.href} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ delay: Math.min(index * .04, .2) }} className={`group relative overflow-hidden rounded-[1.35rem] border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-blue/35 hover:shadow-[0_20px_55px_rgba(27,20,100,.10)] ${index === 0 ? "xl:col-span-2" : ""}`}>
                <Link href={service.href} className="flex h-full min-h-[17rem] flex-col focus-visible:outline-none">
                  <div className="flex items-start justify-between gap-4"><span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"><Icon size={19} strokeWidth={1.8} /></span><span className="font-display text-xs font-extrabold text-brand-gold">{String(index + 1).padStart(2,"0")}</span></div>
                  <h3 className="mt-7 max-w-[18ch] font-display text-2xl font-semibold leading-[1.05] tracking-[-.045em] text-foreground transition group-hover:text-brand-blue">{service.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{capabilities[index].map((item) => <span key={item} className="rounded-full border border-border bg-surface px-3 py-1 text-[0.62rem] font-bold text-muted">{item}</span>)}</div>
                  <span className="mt-auto pt-7 inline-flex items-center gap-2 text-xs font-extrabold text-foreground">Learn more <ArrowUpRight size={14} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </Link>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
