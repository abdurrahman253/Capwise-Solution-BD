"use client";

import {
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Check,
  FileSignature,
  ReceiptText,
  Scale,
  UsersRound,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Link from "next/link";

import { services } from "@/config/navigation";

const SERVICES_VERSION = "services-editorial-v6-20260722";

const servicePresentation = [
  {
    href: "/services/tax-advisory-compliance",
    eyebrow: "VAT & tax",
    icon: ReceiptText,
    scope: [
      "Tax planning and returns",
      "VAT registration and filing",
      "Withholding and NBR compliance",
    ],
    className: "lg:col-span-7",
    featured: true,
  },
  {
    href: "/services/regulatory-legal-advisory",
    eyebrow: "Legal & regulatory",
    icon: Scale,
    scope: [
      "Commercial agreements",
      "Licensing and approvals",
      "Company and employment law",
    ],
    className: "lg:col-span-5",
  },
  {
    href: "/services/accounting-bookkeeping",
    eyebrow: "Finance & reporting",
    icon: Calculator,
    scope: [
      "Bookkeeping and closing",
      "Management reporting",
      "Budgeting and Virtual CFO support",
    ],
    className: "lg:col-span-5",
  },
  {
    href: "/services/company-formation-registration",
    eyebrow: "Company setup",
    icon: Building2,
    scope: [
      "RJSC registration",
      "Trade licence, TIN and BIN",
      "Foreign investment support",
    ],
    className: "lg:col-span-7",
  },
  {
    href: "/services/corporate-secretarial",
    eyebrow: "Corporate governance",
    icon: FileSignature,
    scope: ["Annual returns", "Resolutions and statutory records"],
    className: "lg:col-span-4",
    compact: true,
  },
  {
    href: "/services/payroll-hr-compliance",
    eyebrow: "People operations",
    icon: UsersRound,
    scope: ["Payroll processing", "HR policy and compliance"],
    className: "lg:col-span-4",
    compact: true,
  },
  {
    href: "/services/business-advisory",
    eyebrow: "Business advisory",
    icon: BriefcaseBusiness,
    scope: ["Market-entry planning", "Models and decision support"],
    className: "lg:col-span-4",
    compact: true,
  },
];

const serviceCards = servicePresentation.map((presentation) => ({
  ...services.find((service) => service.href === presentation.href),
  ...presentation,
}));

const connectedAreas = [
  { label: "Legal", icon: Scale },
  { label: "VAT & tax", icon: ReceiptText },
  { label: "Finance", icon: Calculator },
  { label: "Compliance", icon: BookOpenCheck },
];

export default function ServiceOverview() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (index = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.68,
      delay: shouldReduceMotion ? 0 : Math.min(index * 0.055, 0.22),
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="services-overview"
      data-services-version={SERVICES_VERSION}
      aria-labelledby="services-overview-title"
      className="capwise-section-services relative isolate overflow-hidden py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-20 -z-10 size-[38rem] rounded-full bg-accent/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />

      <div className="mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <m.div {...reveal()} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.67rem] font-bold uppercase tracking-[0.22em] text-accent-strong">
                Advisory services
              </p>
            </div>

            <h2
              id="services-overview-title"
              className="mt-6 max-w-[12ch] font-display text-[clamp(2.85rem,5.4vw,5.9rem)] font-semibold leading-[0.94] tracking-[-0.068em] text-foreground"
            >
              Every critical obligation.
              <span className="mt-2 block text-accent-strong">
                One coordinated team.
              </span>
            </h2>
          </m.div>

          <m.div {...reveal(1)} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-xl text-base leading-8 text-muted">
              Legal, VAT, tax and financial decisions affect one another.
              Capwise connects the work, so your business can move from setup
              to day-to-day compliance with clearer priorities and ownership.
            </p>

            <Link
              href="/services"
              className="group mt-7 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-sm font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong"
            >
              View all services
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </m.div>
        </div>

        <m.div
          {...reveal(2)}
          aria-label="Connected advisory areas"
          className="mt-14 grid overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_18px_60px_rgba(11,31,51,0.06)] sm:grid-cols-2 lg:mt-18 lg:grid-cols-4"
        >
          {connectedAreas.map(({ label, icon: Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-20 items-center gap-3 px-5 py-4 sm:px-6 ${
                index > 0 ? "border-t border-border sm:border-t-0" : ""
              } ${
                index % 2 === 1 ? "sm:border-l" : ""
              } ${
                index > 1 ? "sm:border-t lg:border-t-0" : ""
              } ${index > 0 ? "lg:border-l" : ""}`}
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
                <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
              </span>
              <span className="text-sm font-bold text-foreground">{label}</span>
            </div>
          ))}
        </m.div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border shadow-[var(--card-shadow)] lg:grid-cols-12 lg:rounded-[2rem]">
          {serviceCards.map(
            (
              {
                href,
                label,
                description,
                eyebrow,
                icon: Icon,
                scope,
                className,
                featured,
                compact,
              },
              index,
            ) => (
              <m.article
                key={href}
                {...reveal(index + 2)}
                className={`${className} group relative overflow-hidden ${
                  featured
                    ? "bg-surface-muted text-foreground"
                    : "bg-surface text-foreground"
                }`}
              >
                {featured ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute -right-20 -top-20 size-64 rounded-full border border-accent/14"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -right-4 -top-4 size-36 rounded-full border border-accent/20"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-accent/10 to-transparent"
                    />
                  </>
                ) : null}

                <Link
                  href={href}
                  aria-label={`Explore ${label}`}
                  className={`relative flex h-full flex-col p-7 transition duration-500 focus-visible:outline-offset-[-4px] sm:p-9 ${
                    compact
                      ? "min-h-[22rem] lg:min-h-[27rem] lg:p-8 xl:p-9"
                      : "min-h-[24rem] sm:min-h-[26rem] lg:min-h-[32rem] lg:p-10 xl:p-11"
                  } ${
                    featured
                      ? "hover:bg-accent/[0.075]"
                      : "hover:bg-accent/[0.045]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className={`inline-flex size-12 items-center justify-center rounded-full border ${
                        featured
                          ? "border-accent/22 bg-accent/10 text-accent-strong"
                          : "border-border bg-background text-accent-strong"
                      }`}
                    >
                      <Icon aria-hidden="true" size={20} strokeWidth={1.7} />
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={19}
                      className={`transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        featured ? "text-accent-strong" : "text-muted"
                      }`}
                    />
                  </div>

                  <div className={compact ? "mt-12" : "mt-14 sm:mt-16"}>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">
                      {eyebrow}
                    </p>
                    <h3
                      className={`mt-4 max-w-[18ch] font-display font-semibold leading-[1.02] tracking-[-0.052em] ${
                        compact
                          ? "text-2xl sm:text-[1.7rem]"
                          : "text-[clamp(2rem,3.1vw,3.45rem)]"
                      }`}
                    >
                      {label}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                      {description}
                    </p>
                  </div>

                  <ul className="mt-auto grid gap-3 border-t border-border pt-6 text-muted">
                    {scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs font-semibold leading-5 sm:text-[0.82rem]"
                      >
                        <Check
                          aria-hidden="true"
                          size={14}
                          strokeWidth={2.2}
                          className="mt-0.5 shrink-0 text-accent-strong"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              </m.article>
            ),
          )}
        </div>

        <m.div
          {...reveal(3)}
          className="mt-10 flex flex-col gap-6 border-y border-border py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:mt-14 lg:px-2"
        >
          <div className="max-w-2xl">
            <p className="font-display text-xl font-semibold tracking-[-0.035em] text-foreground sm:text-2xl">
              Not sure where your requirement fits?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Start with the business issue. We will help identify the relevant
              obligations and a practical next step.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-4 rounded-full bg-action px-6 text-sm font-bold text-action-foreground shadow-[0_14px_38px_rgba(15,118,110,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-action-hover"
          >
            Talk to an Adviser
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </m.div>
      </div>
    </section>
  );
}