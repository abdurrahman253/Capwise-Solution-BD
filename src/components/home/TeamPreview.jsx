"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import { featuredTeamMembers, supportingTeamMembers } from "@/data/team";

function Avatar({ initials, featured = false }) {
  return <span className={`${featured ? "size-20 text-xl" : "size-14 text-sm"} inline-flex items-center justify-center rounded-full border ${featured ? "border-white/18 bg-white/8 text-white" : "border-brand-blue/20 bg-brand-blue/8 text-brand-blue"} font-display font-extrabold tracking-[-.05em]`}>{initials}</span>;
}

export default function TeamPreview() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="border-y border-border bg-background py-18 sm:py-24 lg:py-28" aria-labelledby="team-preview-title">
      <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-brand-blue">Our Team</p><h2 id="team-preview-title" className="mt-5 max-w-[13ch] font-display text-[clamp(2.8rem,5.4vw,5.7rem)] font-semibold leading-[.94] tracking-[-.068em] text-foreground">Two lead profiles. One connected team.</h2></div>
          <div className="lg:col-span-4"><p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Capwise combines finance, tax, audit, legal and regulatory experience so clients can bring one business issue into one coordinated conversation.</p><Link href="/team" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-brand-blue">Meet the full team <ArrowUpRight size={15} className="text-brand-gold" /></Link></div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2">
          {featuredTeamMembers.map((member, index) => (
            <m.article key={member.slug} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }} className="group overflow-hidden rounded-[1.3rem] bg-brand-navy p-5 text-white shadow-[0_26px_75px_rgba(27,20,100,.16)] sm:rounded-[1.55rem] sm:p-7 lg:p-9">
              <Link href={`/team#${member.slug}`} className="flex min-h-[13rem] flex-col focus-visible:outline-none sm:min-h-[18rem] lg:min-h-[21rem]">
                <div className="flex items-start justify-between gap-5"><Avatar initials={member.initials} featured /><span className="text-xs font-extrabold text-brand-gold">0{index+1}</span></div>
                <div className="mt-auto pt-6 sm:pt-10"><p className="text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-brand-gold sm:text-[0.62rem] sm:tracking-[0.16em]">{member.role}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.045em] sm:mt-3 sm:text-3xl sm:tracking-[-.05em] lg:text-4xl">{member.name}</h3><p className="mt-2 max-w-xl text-xs leading-6 text-white/65 sm:mt-3 sm:text-sm sm:leading-7">{member.specialty}</p><div className="mt-4 flex items-center justify-between border-t border-white/12 pt-4 text-xs font-bold text-white/64 sm:mt-6 sm:pt-5"><span>{member.experience}</span><ArrowUpRight size={16} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></div>
              </Link>
            </m.article>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4 lg:grid-cols-4">
          {supportingTeamMembers.map((member, index) => (
            <m.article key={member.slug} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: Math.min(index*.04,.16) }} className="rounded-[1.1rem] border border-border bg-surface p-3.5 transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_18px_45px_rgba(27,20,100,.08)] sm:rounded-[1.25rem] sm:p-5">
              <Link href={`/team#${member.slug}`} className="flex min-h-[8.5rem] flex-col sm:min-h-[13rem]"><div className="flex items-start justify-between"><Avatar initials={member.initials}/><ArrowUpRight size={14} className="text-brand-gold"/></div><h3 className="mt-3 font-display text-sm font-semibold tracking-[-.025em] text-foreground sm:mt-6 sm:text-lg sm:tracking-[-.035em]">{member.name}</h3><p className="mt-1 text-[0.68rem] leading-4 text-muted sm:mt-2 sm:text-xs sm:leading-5">{member.specialty}</p><span className="mt-auto pt-2.5 text-[0.56rem] font-extrabold uppercase tracking-[.1em] text-brand-blue sm:pt-4 sm:text-[0.62rem] sm:tracking-[.14em]">{member.role}</span></Link>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
