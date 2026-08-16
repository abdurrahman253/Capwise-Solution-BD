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

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredTeamMembers.map((member, index) => (
            <m.article key={member.slug} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }} className="group overflow-hidden rounded-[1.55rem] bg-brand-navy p-7 text-white shadow-[0_26px_75px_rgba(27,20,100,.16)] sm:p-9">
              <Link href={`/team#${member.slug}`} className="flex min-h-[21rem] flex-col focus-visible:outline-none">
                <div className="flex items-start justify-between gap-5"><Avatar initials={member.initials} featured /><span className="text-xs font-extrabold text-brand-gold">0{index+1}</span></div>
                <div className="mt-auto pt-10"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-brand-gold">{member.role}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em] sm:text-4xl">{member.name}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/65">{member.specialty}</p><div className="mt-6 flex items-center justify-between border-t border-white/12 pt-5 text-xs font-bold text-white/64"><span>{member.experience}</span><ArrowUpRight size={16} className="text-brand-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div></div>
              </Link>
            </m.article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportingTeamMembers.map((member, index) => (
            <m.article key={member.slug} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: Math.min(index*.04,.16) }} className="rounded-[1.25rem] border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_18px_45px_rgba(27,20,100,.08)]">
              <Link href={`/team#${member.slug}`} className="flex min-h-[13rem] flex-col"><div className="flex items-start justify-between"><Avatar initials={member.initials}/><ArrowUpRight size={14} className="text-brand-gold"/></div><h3 className="mt-6 font-display text-lg font-semibold tracking-[-.035em] text-foreground">{member.name}</h3><p className="mt-2 text-xs leading-5 text-muted">{member.specialty}</p><span className="mt-auto pt-4 text-[0.62rem] font-extrabold uppercase tracking-[.14em] text-brand-blue">{member.role}</span></Link>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
