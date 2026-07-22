"use client";

import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { m, useReducedMotion } from "@/components/ui/Motionless";
import Link from "next/link";

import FaqAccordion from "@/components/faq/FaqAccordion";
import { featuredFaqs } from "@/data/faqs";

export default function FaqPreview() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: shouldReduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <section
      className="capwise-faq border-y border-border py-16 sm:py-24 lg:py-32"
      aria-labelledby="faq-preview-title"
    >
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <m.div {...reveal} className="lg:col-span-5 lg:sticky lg:top-36 lg:self-start">
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong">
            <MessageCircleQuestion aria-hidden="true" size={20} />
          </span>
          <p className="mt-8 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">
            Frequently asked
          </p>
          <h2
            id="faq-preview-title"
            className="mt-5 max-w-[11ch] font-display text-[clamp(2.8rem,5.7vw,6.1rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground"
          >
            Clear first answers. Better next questions.
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-muted sm:text-base sm:leading-8">
            Practical orientation for common compliance decisions. Every answer
            remains general information until the facts and current rules are reviewed.
          </p>

          <Link
            href="/faq"
            className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-sm font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong"
          >
            Explore all questions
            <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </m.div>

        <m.div {...reveal} className="rounded-[1.6rem] border border-border bg-surface px-5 shadow-[0_24px_70px_rgba(11,31,51,0.08)] sm:px-8 lg:col-span-7 lg:px-10">
          <FaqAccordion items={featuredFaqs} />
        </m.div>
      </div>
    </section>
  );
}
