"use client";

import { ArrowRight, ArrowUpRight, BadgeCheck, UsersRound } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Link from "next/link";

import {
  featuredTeamMember,
  supportingTeamMembers,
  TEAM_CONTENT_VERSION,
} from "@/data/team";

export default function TeamPreview() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (index = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.68,
      delay: shouldReduceMotion ? 0 : Math.min(index * 0.06, 0.24),
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="team-preview"
      data-team-version={TEAM_CONTENT_VERSION}
      aria-labelledby="team-preview-title"
      className="relative isolate overflow-hidden border-y border-border bg-surface py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-16 -z-10 size-[30rem] rounded-full bg-accent/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 bottom-0 -z-10 size-[28rem] rounded-full bg-gold/8 blur-[110px]"
      />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <m.div {...reveal()} className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-[0.68rem]">
                Advisory team
              </p>
            </div>

            <h2
              id="team-preview-title"
              className="mt-5 max-w-[14ch] font-display text-[clamp(2.7rem,5.7vw,6.2rem)] font-semibold leading-[0.93] tracking-[-0.07em] text-foreground sm:mt-6"
            >
              Different disciplines.
              <span className="mt-1 block text-accent-strong">
                One coordinated direction.
              </span>
            </h2>
          </m.div>

          <m.div {...reveal(1)} className="lg:col-span-4">
            <p className="max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Financial, tax, regulatory and legal perspectives are brought
              together so clients receive a clearer path—not disconnected
              answers from separate advisers.
            </p>

            <Link
              href="/team"
              className="group mt-6 inline-flex items-center gap-3 border-b border-foreground/20 pb-2 text-xs font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong sm:text-sm"
            >
              Meet the advisory team
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </m.div>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          <m.article
            {...reveal(2)}
            className="group relative overflow-hidden rounded-[1.5rem] bg-brand text-brand-foreground shadow-[0_28px_80px_rgba(11,31,51,0.18)] lg:col-span-5 lg:min-h-[37rem]"
          >
            <div
              aria-hidden="true"
              className="capwise-soft-noise pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/16 blur-[80px]"
            />

            <Link
              href={`/team#${featuredTeamMember.slug}`}
              aria-label={`Read the profile for ${featuredTeamMember.name}`}
              className="relative flex h-full min-h-[31rem] flex-col p-6 focus-visible:outline-offset-[-5px] sm:p-8 lg:min-h-[37rem] lg:p-10"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/68">
                  <BadgeCheck aria-hidden="true" size={13} className="text-accent" />
                  Senior advisory
                </span>
                <span className="font-display text-xs font-bold text-white/38">01</span>
              </div>

              <div className="mt-10 flex flex-1 items-center justify-center sm:mt-12">
                <div className="relative flex aspect-square w-[min(68vw,18rem)] items-center justify-center rounded-full border border-white/12 bg-white/[0.045]">
                  <div className="absolute inset-5 rounded-full border border-dashed border-accent/28 transition duration-700 group-hover:rotate-12" />
                  <div className="absolute inset-10 rounded-full border border-white/10" />
                  <span className="font-display text-[clamp(4rem,12vw,7.5rem)] font-semibold tracking-[-0.09em] text-white/92">
                    {featuredTeamMember.initials}
                  </span>
                </div>
              </div>

              <div className="mt-8 border-t border-white/12 pt-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-accent">
                  <span>{featuredTeamMember.role}</span>
                  <span aria-hidden="true" className="size-1 rounded-full bg-white/30" />
                  <span>{featuredTeamMember.experience}</span>
                </div>
                <h3 className="mt-3 font-display text-[clamp(1.65rem,3vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                  {featuredTeamMember.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
                  {featuredTeamMember.specialty}
                </p>
              </div>
            </Link>
          </m.article>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {supportingTeamMembers.map((member, index) => (
              <m.article
                key={member.slug}
                {...reveal(index + 3)}
                className="group relative overflow-hidden rounded-[1.35rem] border border-border bg-background p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:bg-surface hover:shadow-[0_22px_60px_rgba(11,31,51,0.09)] sm:p-6 lg:min-h-[18rem] lg:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-4 font-display text-[3.75rem] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.035] transition duration-500 group-hover:text-accent/[0.08]"
                >
                  {String(index + 2).padStart(2, "0")}
                </span>

                <Link
                  href={`/team#${member.slug}`}
                  aria-label={`Read the profile for ${member.name}`}
                  className="relative flex h-full flex-col focus-visible:outline-offset-[-5px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-sm font-bold tracking-[-0.035em] text-accent-strong sm:size-16">
                      {member.initials}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                    />
                  </div>

                  <div className="mt-8">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.17em] text-accent-strong">
                      {member.role}
                    </p>
                    <h3 className="mt-3 max-w-[16ch] font-display text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.045em] text-foreground sm:text-[1.55rem]">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-xs leading-6 text-muted sm:text-sm sm:leading-7">
                      {member.specialty}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5 text-[0.66rem] font-bold text-foreground/68 sm:text-xs">
                    {member.experience}
                    <ArrowRight
                      aria-hidden="true"
                      size={14}
                      className="text-accent-strong transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </m.article>
            ))}
          </div>
        </div>

        <m.div
          {...reveal(7)}
          className="mt-5 flex flex-col gap-4 rounded-[1.15rem] border border-border bg-background px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-start gap-3">
            <UsersRound
              aria-hidden="true"
              size={17}
              className="mt-0.5 shrink-0 text-accent-strong"
            />
            <p className="max-w-3xl text-[0.68rem] leading-5 text-muted sm:text-xs sm:leading-6">
              Team profile details are based on the current client-supplied
              working draft. Photography, credentials and extended biographies
              will be published only after individual approval.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 text-[0.68rem] font-bold text-accent-strong hover:underline sm:text-xs"
          >
            Talk to the team
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
