"use client";

import {
  ArrowUpRight,
  Compass,
  Layers3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { m } from "@/components/ui/Motionless";
import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Connected advice, not disconnected tasks.",
    description:
      "Formation, finance, tax and regulatory work are considered together, so one decision does not quietly create a problem somewhere else.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Practical Bangladesh context.",
    description:
      "Support is shaped around the procedures, filings and operating realities businesses navigate in Bangladesh—not a generic global checklist.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Clear priorities and ownership.",
    description:
      "You know what matters now, what can wait and who is coordinating the next step across the advisory relationship.",
    icon: Compass,
  },
  {
    number: "04",
    title: "Built for responsible continuity.",
    description:
      "The relationship can continue from setup into reporting, compliance, governance and the decisions that come with growth.",
    icon: ShieldCheck,
  },
];

const workflow = ["Understand", "Prioritise", "Coordinate", "Follow through"];

const workflowBorders = [
  "",
  "border-l border-border",
  "border-t border-border lg:border-l lg:border-t-0",
  "border-t border-l border-border lg:border-t-0",
];

export default function WhyCapwise() {
  return (
    <section
      id="why-capwise"
      aria-labelledby="why-capwise-title"
      className="relative overflow-hidden border-y border-border bg-surface py-section-lg"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-13rem] top-[-9rem] size-[32rem] rounded-full border border-accent/10 bg-accent/8 blur-[90px]"
      />

      <div className="relative mx-auto max-w-[90rem] px-gutter">
        <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-32">
          <m.div
            initial={{ y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            className="lg:sticky lg:top-36 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.67rem] font-bold uppercase tracking-[0.22em] text-accent-strong">
                Why Capwise
              </p>
            </div>

            <h2
              id="why-capwise-title"
              className="mt-6 max-w-2xl font-display text-h2 font-semibold text-foreground"
            >
              Complexity needs
              <span className="mt-2 block text-accent-strong">
                clear ownership.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted">
              Capwise is designed around the relationship between obligations,
              not just the completion of isolated filings. The result is a
              more coherent path from question to action.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-sm font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong"
            >
              Discover our approach
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <div className="mt-12 hidden items-end gap-4 lg:flex">
              <span className="font-display text-[7rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.055]">
                ONE
              </span>
              <span className="pb-3 text-[0.62rem] font-bold uppercase leading-5 tracking-[0.18em] text-muted">
                Coordinated
                <br />
                advisory path
              </span>
            </div>
          </m.div>

          <div className="border-t border-border">
            {principles.map(({ number, title, description, icon: Icon }, index) => (
              <m.article
                key={number}
                initial={{ y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: index * 0.06 }}
                className="group relative border-b border-border py-9 sm:py-11"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent-strong transition-transform duration-700 group-hover:scale-x-100"
                />

                <div className="grid gap-6 sm:grid-cols-[4rem_3rem_1fr] sm:items-start sm:gap-7">
                  <span className="font-display text-3xl font-semibold tracking-[-0.055em] text-foreground/18">
                    {number}
                  </span>

                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-accent-strong transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                  </span>

                  <div>
                    <h3 className="max-w-2xl font-display text-card font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-[0.95rem] sm:leading-8">
                      {description}
                    </p>
                  </div>
                </div>
              </m.article>
            ))}
          </div>
        </div>

        <m.div
          initial={{ y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-background sm:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {workflow.map((label, index) => (
              <div
                key={label}
                className={`relative min-h-24 px-4 py-4 sm:min-h-28 sm:px-6 sm:py-6 lg:min-h-32 lg:px-7 ${workflowBorders[index]}`}
              >
                <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-accent-strong sm:text-[0.6rem] sm:tracking-[0.2em]">
                  0{index + 1}
                </span>
                <p className="mt-3 font-display text-sm font-bold tracking-[-0.025em] text-foreground sm:mt-5 sm:text-lg sm:tracking-[-0.035em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
