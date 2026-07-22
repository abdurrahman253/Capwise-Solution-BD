"use client";

import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import { m, useReducedMotion } from "@/components/ui/Motionless";
import Image from "next/image";
import Link from "next/link";

const HERO_VERSION = "legal-finance-editorial-v5-20260722";

const serviceHighlights = [
  "Tax & VAT",
  "Corporate legal",
  "Accounting & finance",
  "Regulatory compliance",
];

const entrance = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.09,
    },
  },
};

const entranceItem = {
  hidden: { y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
        data-hero-version={HERO_VERSION}
        aria-labelledby="home-hero-title"
        className="capwise-hero relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="capwise-hero-grid pointer-events-none absolute inset-0 -z-20"
        />
        <div
          aria-hidden="true"
          className="capwise-hero-glow capwise-hero-glow-primary pointer-events-none absolute -right-40 -top-48 -z-10 size-[42rem] rounded-full blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="capwise-hero-glow capwise-hero-glow-secondary pointer-events-none absolute -bottom-64 -left-48 -z-10 size-[36rem] rounded-full blur-[125px]"
        />

        <div className="mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-10">
          <div className="grid min-h-[42rem] items-center gap-14 py-16 sm:py-20 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16 lg:py-16 xl:min-h-[46rem] xl:gap-24">
            <m.div
              variants={entrance}
              initial="hidden"
              animate="visible"
              className="relative z-10 max-w-[49rem]"
            >
              <m.div variants={entranceItem} className="mb-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-[color:var(--hero-gold)]"
                />
                <p className="capwise-hero-kicker text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:text-[0.7rem]">
                  Corporate advisory in Bangladesh
                </p>
              </m.div>

              <h1
                id="home-hero-title"
                className="max-w-[13ch] font-display text-[clamp(3.15rem,5.65vw,6rem)] font-semibold leading-[0.93] tracking-[-0.066em]"
              >
                <m.span variants={entranceItem} className="capwise-hero-text-secondary block">
                  Legal, tax &amp; finance.
                </m.span>
                <m.span variants={entranceItem} className="capwise-hero-accent mt-1 block">
                  One clear path forward.
                </m.span>
              </h1>

              <m.p
                variants={entranceItem}
                className="capwise-hero-text-muted mt-7 max-w-[42rem] text-base leading-8 sm:mt-8 sm:text-lg sm:leading-9"
              >
                Capwise supports companies with corporate legal, VAT and tax,
                accounting, finance and regulatory compliance—coordinated
                through one practical advisory team.
              </m.p>

              <m.div
                variants={entranceItem}
                className="mt-8 flex flex-wrap gap-x-5 gap-y-3"
                aria-label="Core advisory services"
              >
                {serviceHighlights.map((service) => (
                  <span
                    key={service}
                    className="capwise-hero-service inline-flex items-center gap-2 text-xs font-semibold sm:text-sm"
                  >
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent/12 text-accent-strong">
                      <Check aria-hidden="true" size={12} strokeWidth={2.4} />
                    </span>
                    {service}
                  </span>
                ))}
              </m.div>

              <m.div
                variants={entranceItem}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link
                  href="/contact"
                  className="group inline-flex min-h-13 items-center justify-between gap-7 rounded-[0.9rem] bg-action px-6 text-sm font-bold text-action-foreground shadow-[0_16px_42px_rgba(15,118,110,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-action-hover sm:justify-center"
                >
                  Book a Free Consultation
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href="/services"
                  className="capwise-hero-secondary-button group inline-flex min-h-13 items-center justify-between gap-7 rounded-[0.9rem] border px-6 text-sm font-bold transition duration-300 hover:-translate-y-1 sm:justify-center"
                >
                  Explore Our Services
                  <ArrowRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </m.div>

              <m.div
                variants={entranceItem}
                className="capwise-hero-border mt-9 flex max-w-[42rem] items-start gap-3 border-t pt-5"
              >
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-strong">
                  <MapPin aria-hidden="true" size={15} strokeWidth={1.9} />
                </span>
                <p className="capwise-hero-text-muted text-sm leading-6">
                  <span className="capwise-hero-text-secondary font-semibold">
                    Based in Banani, Dhaka.
                  </span>{" "}
                  Supporting local and foreign-owned businesses across
                  Bangladesh.
                </p>
              </m.div>
            </m.div>

            <div className="relative mx-auto w-full max-w-[41rem] lg:mr-0">
              <div
                aria-hidden="true"
                className="capwise-hero-visual-halo absolute inset-x-[10%] inset-y-[8%] -z-10 rounded-full blur-[75px]"
              />

              <div className="relative min-h-[30rem] sm:min-h-[35rem] lg:min-h-[37rem]">
                <m.figure
                  initial={{ scale: 0.97, y: 26 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 0.28,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="capwise-hero-finance-card absolute inset-y-0 right-0 w-[82%] overflow-hidden rounded-[2rem] border p-2 shadow-[var(--hero-shadow)] sm:w-[79%] sm:rounded-[2.4rem] sm:p-2.5"
                >
                  <div className="relative h-full min-h-[30rem] overflow-hidden rounded-[1.55rem] sm:min-h-[35rem] sm:rounded-[1.9rem] lg:min-h-[37rem]">
                    <Image
                      src="https://images.pexels.com/photos/20500268/pexels-photo-20500268.jpeg?auto=compress&cs=tinysrgb&w=1800"
                      alt="Calculator placed on financial reports and business charts"
                      fill
                      priority
                      quality={88}
                      sizes="(min-width: 1024px) 34rem, 82vw"
                      className="capwise-hero-photo object-cover"
                      style={{ objectPosition: "center 51%" }}
                    />
                    <div
                      aria-hidden="true"
                      className="capwise-hero-photo-scrim absolute inset-0"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/64">
                        Finance &amp; compliance
                      </p>
                      <p className="mt-2 max-w-[17rem] font-display text-xl font-semibold leading-snug sm:text-2xl">
                        Decision-ready numbers. Filing-ready records.
                      </p>
                    </figcaption>
                  </div>
                </m.figure>

                <m.div
                  initial={{ x: -24, y: 12 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.62,
                    duration: 0.78,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="capwise-hero-focus-card absolute left-0 top-8 z-10 max-w-[12.5rem] rounded-2xl border px-4 py-4 shadow-[var(--hero-node-shadow)] backdrop-blur-xl sm:top-12 sm:max-w-[14rem] sm:px-5 sm:py-5"
                >
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[color:var(--hero-gold)]">
                    Integrated support
                  </p>
                  <p className="capwise-hero-text-secondary mt-2 font-display text-sm font-semibold leading-5 sm:text-base sm:leading-6">
                    Legal insight with financial discipline.
                  </p>
                </m.div>

                <m.figure
                  initial={{ x: -28, y: 18 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.48,
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="capwise-hero-legal-card absolute bottom-7 left-0 z-20 w-[55%] overflow-hidden rounded-[1.6rem] border p-1.5 shadow-[var(--hero-node-shadow)] sm:bottom-10 sm:w-[51%] sm:rounded-[1.9rem] sm:p-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:rounded-[1.45rem]">
                    <Image
                      src="https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg?auto=compress&cs=tinysrgb&w=1400"
                      alt="Balance scale beside a laptop representing corporate legal advice"
                      fill
                      quality={88}
                      sizes="(min-width: 1024px) 20rem, 55vw"
                      className="capwise-hero-photo object-cover"
                      style={{ objectPosition: "62% center" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#061827]/70 via-transparent to-transparent"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 px-4 pb-4 text-xs font-bold text-white sm:px-5 sm:pb-5 sm:text-sm">
                      Corporate legal &amp; regulatory
                    </figcaption>
                  </div>
                </m.figure>

                {!shouldReduceMotion ? (
                  <m.span
                    aria-hidden="true"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                    className="capwise-hero-seal absolute bottom-[11%] right-[-0.5rem] z-20 flex size-16 items-center justify-center rounded-full border text-center text-[0.5rem] font-bold uppercase leading-3 tracking-[0.13em] shadow-[var(--hero-node-shadow)] sm:right-[-0.75rem] sm:size-20 sm:text-[0.56rem]"
                  >
                    Clear
                    <br />
                    advice
                  </m.span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="capwise-hero-seal absolute bottom-[11%] right-[-0.5rem] z-20 flex size-16 items-center justify-center rounded-full border text-center text-[0.5rem] font-bold uppercase leading-3 tracking-[0.13em] shadow-[var(--hero-node-shadow)] sm:right-[-0.75rem] sm:size-20 sm:text-[0.56rem]"
                  >
                    Clear
                    <br />
                    advice
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>
    </section>
  );
}
