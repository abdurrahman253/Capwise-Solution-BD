"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  Landmark,
  LineChart,
} from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";

const chapters = [
  {
    number: "01",
    eyebrow: "Choose the foundation",
    title: "Structure the entry path.",
    description:
      "Clarify ownership, legal structure and the practical setup route before applications and commitments begin.",
    icon: Building2,
  },
  {
    number: "02",
    eyebrow: "Activate the business",
    title: "Coordinate the setup requirements.",
    description:
      "Map registration, licensing, tax and VAT steps that may apply to the business and its intended activities.",
    icon: FileCheck2,
  },
  {
    number: "03",
    eyebrow: "Protect operations",
    title: "Build a dependable compliance rhythm.",
    description:
      "Connect bookkeeping, reporting, tax, VAT, payroll and statutory responsibilities to day-to-day operations.",
    icon: Landmark,
  },
  {
    number: "04",
    eyebrow: "Prepare for change",
    title: "Keep governance ready for growth.",
    description:
      "Strengthen records and decision support as the company evolves, raises capital or expands its Bangladesh presence.",
    icon: LineChart,
  },
];

const lenses = [
  "Legal structure",
  "Incorporation procedures",
  "Tax & VAT",
  "Labour & payroll",
  "Ongoing compliance",
];

export default function BangladeshPreview() {
  return (
    <section
      id="business-in-bangladesh-preview"
      aria-labelledby="bangladesh-preview-title"
      className="capwise-gateway relative isolate overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="capwise-soft-noise pointer-events-none absolute inset-0 -z-20 opacity-[0.035] mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 -top-56 -z-10 size-[42rem] rounded-full bg-accent/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-80 right-[-10rem] -z-10 size-[44rem] rounded-full border border-accent/10 bg-accent/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-28">
          <m.div
            initial={{ y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="lg:sticky lg:top-36 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.67rem] font-bold uppercase tracking-[0.22em] text-accent-strong">
                Doing business in Bangladesh
              </p>
            </div>

            <h2
              id="bangladesh-preview-title"
              className="mt-6 max-w-2xl font-display text-[clamp(2.8rem,5.2vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.068em]"
            >
              Enter informed.
              <span className="mt-2 block text-accent-strong">
                Operate prepared.
              </span>
            </h2>

            <p className="capwise-gateway-muted mt-7 max-w-xl text-base leading-8">
              Bangladesh offers real opportunity, but market entry and ongoing
              compliance are connected decisions. Capwise helps turn the
              requirements into an ordered, practical path.
            </p>

            <Link
              href="/business-in-bangladesh"
              className="group mt-9 inline-flex min-h-13 items-center justify-center gap-5 rounded-full bg-action px-6 text-sm font-bold text-action-foreground shadow-[0_16px_45px_rgba(15,118,110,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-action-hover"
            >
              Explore the Bangladesh guide
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <div className="capwise-gateway-panel mt-12 overflow-hidden rounded-[1.75rem] border p-6 sm:p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.21em] text-accent-strong">
                    Advisory lens
                  </p>
                  <p className="mt-2 font-display text-lg font-bold tracking-[-0.035em]">
                    Five connected areas
                  </p>
                </div>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
                  <BadgeCheck aria-hidden="true" size={18} />
                </span>
              </div>

              <div className="capwise-gateway-border mt-6 border-t">
                {lenses.map((lens, index) => (
                  <div
                    key={lens}
                    className="capwise-gateway-border flex items-center justify-between gap-5 border-b py-3.5 last:border-b-0"
                  >
                    <span className="capwise-gateway-muted text-sm font-semibold">
                      {lens}
                    </span>
                    <span className="font-display text-[0.62rem] font-bold text-accent-strong">
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>

          <div className="capwise-gateway-border relative border-t">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[1.45rem] top-0 hidden w-px bg-accent/22 sm:block"
            />

            {chapters.map(({ number, eyebrow, title, description, icon: Icon }, index) => (
              <m.article
                key={number}
                initial={{ x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.42 }}
                transition={{ delay: index * 0.06 }}
                className="capwise-gateway-border group relative border-b py-10 sm:pl-20 sm:py-13 lg:py-16"
              >
                <span className="absolute left-0 top-12 hidden size-12 items-center justify-center rounded-full border border-accent/25 bg-[var(--gateway-background)] font-display text-[0.64rem] font-bold text-accent-strong transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-[#042f2e] sm:inline-flex lg:top-[4.1rem]">
                  {number}
                </span>

                <div className="grid gap-6 xl:grid-cols-[1fr_0.78fr] xl:items-start xl:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-full border border-accent/20 bg-accent/8 text-accent-strong sm:hidden">
                        <Icon aria-hidden="true" size={17} />
                      </span>
                      <p className="text-[0.63rem] font-bold uppercase tracking-[0.2em] text-accent-strong">
                        {eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.5vw,3.65rem)] font-semibold leading-[1] tracking-[-0.058em]">
                      {title}
                    </h3>
                  </div>

                  <div className="xl:pt-1">
                    <span className="mb-5 hidden size-10 items-center justify-center rounded-full border border-accent/20 bg-accent/8 text-accent-strong xl:inline-flex">
                      <Icon aria-hidden="true" size={17} />
                    </span>
                    <p className="capwise-gateway-muted max-w-lg text-sm leading-7 sm:text-[0.95rem] sm:leading-8">
                      {description}
                    </p>
                    <Link
                      href="/business-in-bangladesh"
                      aria-label={`Learn more: ${title}`}
                      className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-accent-strong transition hover:gap-3"
                    >
                      Learn more
                      <ArrowRight aria-hidden="true" size={14} />
                    </Link>
                  </div>
                </div>
              </m.article>
            ))}

            <m.div
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="capwise-gateway-panel mt-10 flex items-start gap-4 rounded-2xl border px-5 py-5 sm:ml-20 sm:px-6"
            >
              <BadgeCheck
                aria-hidden="true"
                size={18}
                className="mt-0.5 shrink-0 text-accent-strong"
              />
              <p className="capwise-gateway-muted text-xs leading-6 sm:text-sm">
                Regulatory details can change and requirements vary by
                business. Capwise scopes the current position before
                recommending an action.
              </p>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
