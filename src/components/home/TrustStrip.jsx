"use client";

import { Briefcase, LayoutGrid, Users } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

const trustFacts = [
  { label: "Clients", value: "160+", detail: "Businesses served across Bangladesh", icon: Users },
  { label: "Team", value: "25", detail: "Professionals across finance, tax, audit and law", icon: Briefcase },
  { label: "Sectors", value: "9", detail: "Industries served, from SME to RMG", icon: LayoutGrid },
];

export default function TrustStrip() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="capwise-trust-strip border-b border-border bg-surface py-section-sm" aria-label="Capwise at a glance">
      <dl className="mx-auto grid max-w-[94rem] grid-cols-1 items-stretch gap-3 px-gutter sm:grid-cols-3 sm:gap-4">
        {trustFacts.map(({ label, value, detail, icon: Icon }, index) => (
          <m.div
            key={label}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: Math.min(index * 0.05, 0.15) }}
            className="capwise-trust-card group relative overflow-hidden rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 sm:p-5"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue sm:size-9">
              <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
            </span>
            <dt className="mt-3 text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue sm:mt-4">{label}</dt>
            <dd className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">{value}</dd>
            <p className="mt-1 text-[0.66rem] leading-4 text-muted sm:text-xs sm:leading-5">{detail}</p>
          </m.div>
        ))}
      </dl>
    </section>
  );
}
