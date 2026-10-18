import { ArrowRight, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import { primaryContact, whatsappHref } from "@/config/contacts";
import { featuredTeamMembers, supportingTeamMembers, TEAM_CONTENT_VERSION } from "@/data/team";

export const metadata = { title:"Our Team", description:"Meet the multidisciplinary financial, tax, audit, legal and regulatory advisory team at Capwise Solution BD.", alternates:{canonical:"/team"} };

function ProfileCard({ member, featured=false }) {
  return <article id={member.slug} className={`scroll-mt-28 rounded-[1.5rem] ${featured?"bg-brand-navy text-white shadow-[0_28px_80px_rgba(27,20,100,.16)]":"border border-border bg-surface text-foreground"} p-7 sm:p-9`}>
    <div className="flex items-start gap-5"><span className={`inline-flex ${featured?"size-20 border-white/15 bg-white/7 text-white":"size-16 border-brand-blue/20 bg-brand-blue/8 text-brand-blue"} items-center justify-center rounded-full border font-display text-lg font-extrabold`}>{member.initials}</span></div>
    <p className={`mt-8 text-[.6rem] font-extrabold uppercase tracking-[.17em] ${featured?"text-brand-gold":"text-brand-blue"}`}>{member.role}</p>
    <h2 className={`mt-3 font-display ${featured?"text-card":"text-lg"} font-semibold leading-[1.1] tracking-[-0.02em]`}>{member.name}</h2>
    <p className={`mt-4 text-sm leading-7 ${featured?"text-white/64":"text-muted"}`}>{member.specialty}</p>
    <p className={`mt-6 border-t pt-5 text-sm leading-7 ${featured?"border-white/12 text-white/62":"border-border text-muted"}`}>{member.summary}</p>
    {member.memberships ? (
      <div className="mt-6 grid gap-5">
        <dl className="grid gap-4 rounded-xl border border-white/12 bg-white/[.04] p-4 sm:p-5">
          <div>
            <dt className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-brand-gold">Experience</dt>
            <dd className="mt-2 text-sm font-semibold text-white/85">{member.experience}</dd>
          </div>
          <div className="border-t border-white/10 pt-4">
            <dt className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-brand-gold">Qualifications</dt>
            <dd className="mt-2 text-sm font-semibold leading-7 text-white/85">{member.credential}</dd>
          </div>
        </dl>
        <div>
          <h3 className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-brand-gold">Professional memberships</h3>
          <ul className="mt-3 grid gap-2.5">
            {member.memberships.map((membership) => (
              <li key={membership} className="flex items-start gap-2.5 text-sm leading-6 text-white/70">
                <Check aria-hidden="true" size={15} className="mt-1 shrink-0 text-brand-gold" />
                <span>Member, {membership}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="mt-6 grid gap-2 sm:grid-cols-2">{[member.experience,member.credential].map(item=><div key={item} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[.68rem] font-bold ${featured?"border-white/10 bg-white/[.04] text-white/65":"border-border bg-background text-muted"}`}><Check size={13} className={featured?"text-brand-gold":"text-brand-blue"}/>{item}</div>)}</div>
    )}
    {member.linkedinUrl && (
      <a
        href={member.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${member.name}'s LinkedIn profile (opens in a new tab)`}
        className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white/85 transition hover:border-brand-gold hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
      >
        <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
        LinkedIn profile
        <ArrowUpRight aria-hidden="true" size={14} className="text-brand-gold" />
      </a>
    )}
  </article>;
}

export default function TeamPage(){return <><SiteHeader/><main id="main-content" data-team-version={TEAM_CONTENT_VERSION}>
  <section className="border-b border-border bg-background py-section-lg"><div className="mx-auto grid max-w-[94rem] gap-10 px-gutter lg:grid-cols-12 lg:gap-14"><div className="lg:col-span-7"><p className="text-[.62rem] font-extrabold uppercase tracking-[.2em] text-brand-blue">Our Team</p><h1 className="mt-5 max-w-[20ch] font-display text-h1 font-semibold text-foreground">Different disciplines. One shared direction.</h1><p className="mt-6 max-w-xl text-base leading-8 text-muted">Finance, tax, audit, regulatory and legal perspectives are brought together around the client’s actual business issue.</p><Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover">Book a Free Consultation <ArrowUpRight aria-hidden="true" size={17} /></Link></div><div className="lg:col-span-5"><nav aria-label="Jump to team section" className="rounded-[1.5rem] border border-border bg-surface p-7 sm:p-8"><p className="text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">On this page</p><div className="mt-5 divide-y divide-border border-t border-border">{[["Featured team members","#featured-team"],["Supporting team","#supporting-team"],["The wider team","#wider-team"]].map(([label,href])=><a key={href} href={href} className="group flex items-center justify-between gap-4 py-4 text-sm font-bold text-foreground transition hover:text-brand-blue">{label}<ArrowRight aria-hidden="true" size={15} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-blue" /></a>)}</div></nav></div></div></section>
  <section className="bg-background py-section-md"><div className="mx-auto max-w-[94rem] px-gutter"><p id="featured-team" className="scroll-mt-28 text-[.6rem] font-extrabold uppercase tracking-[.18em] text-brand-blue">Featured team members</p><div className="mt-6 grid gap-5 lg:grid-cols-2">{featuredTeamMembers.map(m=><ProfileCard key={m.slug} member={m} featured/>)}</div><p id="supporting-team" className="mt-14 scroll-mt-28 text-[.6rem] font-extrabold uppercase tracking-[.18em] text-brand-blue">Supporting team</p><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{supportingTeamMembers.map(m=><ProfileCard key={m.slug} member={m}/>)}</div>
    <div id="wider-team" className="mt-14 scroll-mt-28 rounded-[1.5rem] border border-border bg-surface p-7 sm:p-9">
      <p className="text-[.6rem] font-extrabold uppercase tracking-[.18em] text-brand-blue">The wider team</p>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base sm:leading-8">The profiles above are part of a wider 25-person team. It also includes a Fellow Chartered Accountant (FCA), a Chartered Certified Accountant (FCCA), a tax consultant and income tax lawyer, a business operations lead, a former NBR officer, an advocate of the Supreme Court of Bangladesh, an advocate of the Dhaka Judge Court, and 15 CA article-completed (CACC) professionals from established Bangladeshi CA firms — with 4 advocates and 4 ITP licence holders across the team.</p>
    </div>
  </div></section>
  <section className="bg-brand-navy py-section-md text-white"><div className="mx-auto flex max-w-[94rem] flex-col gap-8 px-gutter lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[.6rem] font-extrabold uppercase tracking-[.18em] text-brand-gold">Start with context</p><h2 className="mt-3 max-w-3xl font-display text-h3 font-semibold">Bring the full business picture to one conversation.</h2></div><div className="flex flex-wrap gap-3"><Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-gold px-6 text-sm font-extrabold text-brand-navy shadow-[0_10px_28px_rgba(212,175,55,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-soft active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy">Book a Free Consultation <ArrowRight size={16}/></Link><a href={whatsappHref(primaryContact.whatsapp, "Hello Capwise, I would like to book a consultation.")} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/18 px-6 text-sm font-bold"><MessageCircle size={16}/>WhatsApp</a></div></div></section>
</main></>}
