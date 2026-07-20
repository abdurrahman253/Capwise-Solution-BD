import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Layers3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const advisorySteps = [
  {
    number: "01",
    title: "Understand the situation",
    description:
      "We listen first, clarify the facts and identify what actually needs attention.",
  },
  {
    number: "02",
    title: "Map the practical route",
    description:
      "You get clear priorities, responsibilities and a realistic path forward.",
  },
  {
    number: "03",
    title: "Coordinate the work",
    description:
      "Our specialists help move filings, reporting and advisory work ahead together.",
  },
];

const trustMarkers = [
  {
    value: "2022",
    label: "Established in Dhaka",
    icon: Building2,
  },
  {
    value: "15+ years",
    label: "Senior advisory experience",
    icon: BadgeCheck,
  },
  {
    value: "7 service areas",
    label: "One coordinated relationship",
    icon: Layers3,
  },
  {
    value: "Bangladesh",
    label: "Local regulatory context",
    icon: MapPin,
  },
];

export default function HomeHero() {
  return (
    <>
      <section
        aria-labelledby="home-hero-title"
        className="relative isolate overflow-hidden border-b border-border bg-surface"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-52 -z-10 size-[34rem] rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[7%] -z-10 hidden w-px bg-border/55 xl:block"
        />

        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-24 xl:gap-24 xl:py-28">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-accent-strong" />
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent-strong">
                Wise choice for your finance
              </p>
            </div>

            <h1
              id="home-hero-title"
              className="font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-foreground"
            >
              Business in Bangladesh,
              <span className="mt-2 block text-accent-strong">
                made clearer.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:mt-8 sm:text-lg">
              From company formation to tax, VAT, accounting and regulatory
              matters, Capwise coordinates the work so your team can move with
              confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-action px-6 text-sm font-bold text-action-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-action-hover"
              >
                Book a Free Consultation
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-bold text-foreground transition hover:border-accent hover:text-accent-strong"
              >
                Explore Our Services
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-3 border-t border-border pt-6 sm:max-w-xl">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted text-accent-strong">
                <MapPin aria-hidden="true" size={17} />
              </span>
              <p className="text-sm leading-6 text-muted">
                <span className="font-semibold text-foreground">
                  Based in Banani, Dhaka.
                </span>{" "}
                Supporting local and foreign-owned businesses across
                Bangladesh.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 hidden size-28 border-b border-l border-accent/60 sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 hidden size-24 rounded-full border border-accent/30 sm:block"
            />

            <article className="relative overflow-hidden rounded-[2rem] border border-brand-secondary bg-brand p-6 text-brand-foreground shadow-[0_30px_80px_rgba(11,31,51,0.22)] sm:p-8 lg:p-9">
              <svg
                aria-hidden="true"
                viewBox="0 0 96 100"
                fill="none"
                className="pointer-events-none absolute -right-6 -top-8 size-44 opacity-[0.08]"
              >
                <path
                  d="M70 18A34 34 0 1 0 70 82"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M29 51L42 64L73 32"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative">
                <p className="text-[0.67rem] font-bold uppercase tracking-[0.2em] text-accent">
                  The Capwise approach
                </p>
                <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-[2.1rem]">
                  Complex requirements. One coordinated path.
                </h2>

                <ol className="mt-8">
                  {advisorySteps.map((step, index) => (
                    <li
                      key={step.number}
                      className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-7 last:pb-0"
                    >
                      {index < advisorySteps.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1 left-[1.35rem] top-11 w-px bg-white/15"
                        />
                      ) : null}

                      <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] font-display text-xs font-bold text-accent">
                        {step.number}
                      </span>

                      <span className="pt-0.5">
                        <span className="block font-display text-base font-bold text-white">
                          {step.title}
                        </span>
                        <span className="mt-1.5 block text-sm leading-6 text-white/60">
                          {step.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex items-start gap-3 border-t border-white/15 pt-6">
                  <ShieldCheck
                    aria-hidden="true"
                    size={20}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <p className="text-sm leading-6 text-white/70">
                    Practical guidance, clear responsibilities and one point of
                    coordination from first conversation to next step.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        aria-label="Capwise at a glance"
        className="border-b border-border bg-surface"
      >
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-6 lg:grid-cols-4">
          {trustMarkers.map(({ value, label, icon: Icon }, index) => (
            <div
              key={value}
              className={`flex min-h-32 items-start gap-3 py-7 sm:items-center sm:gap-4 lg:px-7 lg:py-8 ${
                index % 2 === 1 ? "border-l border-border pl-5 sm:pl-7" : "pr-5"
              } ${
                index === 2 ? "border-t border-border lg:border-l lg:border-t-0" : ""
              } ${
                index === 3 ? "border-t border-border lg:border-t-0" : ""
              }`}
            >
              <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-accent-strong sm:mt-0">
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
              </span>
              <div>
                <dt className="font-display text-lg font-bold tracking-[-0.035em] text-foreground sm:text-xl">
                  {value}
                </dt>
                <dd className="mt-1 text-xs leading-5 text-muted sm:text-sm">
                  {label}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
