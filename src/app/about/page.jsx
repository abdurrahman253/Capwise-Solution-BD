import { ArrowUpRight, Compass, Scale, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "About Capwise Solution BD",
  description:
    "Learn about Capwise Solution BD's mission, approach and multidisciplinary advisory model for businesses operating in Bangladesh.",
  alternates: { canonical: "/about" },
};

const principles = [
  { icon: Scale, title: "Integrity before convenience", text: "Advice should be accurate, transparent and clear about uncertainty, approvals and changing rules." },
  { icon: Compass, title: "Practical direction", text: "Complex regulation is translated into an ordered sequence of decisions, documents and responsibilities." },
  { icon: UsersRound, title: "Coordinated expertise", text: "Finance, tax, audit, regulatory and legal perspectives are brought together under one engagement." },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-gateway relative isolate overflow-hidden border-b border-border py-section-lg">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-gutter lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3"><span className="h-px w-10 bg-accent-strong" /><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">About Capwise</p></div>
              <h1 className="mt-6 max-w-[12ch] font-display text-h1 font-semibold text-foreground">One coordinated advisory partner for complex business obligations.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Capwise Solution BD is a Dhaka-based multidisciplinary consultancy helping organisations translate financial, tax, legal and regulatory requirements into practical business action.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-[0.66rem] font-bold text-muted"><ShieldCheck aria-hidden="true" size={14} className="text-accent-strong" /> Founded 2022 · Dhaka, Bangladesh</div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-section-lg">
          <div className="mx-auto grid max-w-[90rem] gap-5 px-gutter lg:grid-cols-2">
            <article className="rounded-[1.7rem] bg-brand p-7 text-white shadow-[0_32px_95px_rgba(27,20,100,0.22)] sm:p-10 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Mission</p>
              <h2 className="mt-6 font-display text-h2 font-semibold text-white">Be the reliable partner behind confident, compliant growth.</h2>
              <p className="mt-6 text-sm leading-7 text-white/64 sm:text-base sm:leading-8">Deliver support that is accurate and on time, so clients can spend their attention on running the business.</p>
            </article>
            <article className="rounded-[1.7rem] border border-border bg-background p-7 sm:p-10 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">Vision</p>
              <h2 className="mt-6 font-display text-h2 font-semibold text-foreground">A trusted one-stop advisory firm built on integrity and long-term relationships.</h2>
              <p className="mt-6 text-sm leading-7 text-muted sm:text-base sm:leading-8">Recognised for efficiency, clear communication and consistently high professional standards.</p>
            </article>
          </div>
        </section>

        <section className="capwise-industries py-section-lg">
          <div className="mx-auto max-w-[90rem] px-gutter">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Our approach</p>
                <h2 className="mt-5 max-w-[11ch] font-display text-h2 font-semibold text-foreground">Strong advice is useful only when it can be acted on.</h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8">The team combines professional training with practical knowledge of how business works in Bangladesh.</p>
              </div>
              <div className="grid gap-4 lg:col-span-7">
                {principles.map(({ icon: Icon, title, text }, index) => (
                  <article key={title} className="capwise-industries-card rounded-[1.4rem] border p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-5"><span className="capwise-industries-icon inline-flex size-11 items-center justify-center rounded-full border"><Icon aria-hidden="true" size={18} /></span><span className="font-display text-xs font-bold text-foreground/24">{String(index + 1).padStart(2, "0")}</span></div>
                    <h3 className="mt-7 font-display text-card font-semibold text-foreground">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-section-md text-white">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-gutter lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Meet the advisors</p><h2 className="mt-4 max-w-[16ch] font-display text-h2 font-semibold text-white">Specialist depth, shared responsibility.</h2></div>
            <div className="flex flex-wrap gap-3"><Link href="/team" className="inline-flex h-12 items-center gap-3 rounded-full border border-white/15 px-6 text-sm font-bold text-white transition hover:border-accent hover:text-accent">View the team <ArrowUpRight aria-hidden="true" size={17} /></Link><Link href="/contact" className="inline-flex h-12 items-center gap-3 rounded-full bg-brand-gold px-6 text-sm font-extrabold text-brand-navy shadow-[0_10px_28px_rgba(212,175,55,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-gold-soft active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy">Book a Free Consultation <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
          </div>
        </section>
      </main>
    </>
  );
}
