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
        <section className="capwise-gateway relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-32">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="pointer-events-none absolute -right-48 -top-44 -z-10 size-[36rem] rounded-full bg-accent/12 blur-[115px]" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3"><span className="h-px w-10 bg-accent-strong" /><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">About Capwise</p></div>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.3rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">One coordinated advisory partner for complex business obligations.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">Capwise Solution BD is a Dhaka-based multidisciplinary consultancy helping organisations translate financial, tax, legal and regulatory requirements into practical business action.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-[0.66rem] font-bold text-muted"><ShieldCheck aria-hidden="true" size={14} className="text-accent-strong" /> Founded 2022 · Dhaka, Bangladesh</div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-[90rem] gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
            <article className="rounded-[1.7rem] bg-brand p-7 text-white shadow-[0_32px_95px_rgba(11,31,51,0.22)] sm:p-10 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Mission</p>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.6rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-white">Be the reliable partner behind confident, compliant growth.</h2>
              <p className="mt-6 text-sm leading-7 text-white/64 sm:text-base sm:leading-8">Deliver accurate, timely and practical financial, tax, legal and regulatory support so clients can focus on operating and growing their business.</p>
            </article>
            <article className="rounded-[1.7rem] border border-border bg-background p-7 sm:p-10 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">Vision</p>
              <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.6rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-foreground">A trusted one-stop advisory firm built on integrity and long-term relationships.</h2>
              <p className="mt-6 text-sm leading-7 text-muted sm:text-base sm:leading-8">Capwise aims to be recognised for coordinated expertise, efficiency, clear communication and responsible professional standards.</p>
            </article>
          </div>
        </section>

        <section className="capwise-industries py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Our approach</p>
                <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-foreground">Strong advice is useful only when it can be acted on.</h2>
                <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-8">The multidisciplinary team combines professional training with practical understanding of Bangladesh&apos;s business environment and builds ongoing relationships rather than one-off transactions.</p>
              </div>
              <div className="grid gap-4 lg:col-span-7">
                {principles.map(({ icon: Icon, title, text }, index) => (
                  <article key={title} className="capwise-industries-card rounded-[1.4rem] border p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-5"><span className="capwise-industries-icon inline-flex size-11 items-center justify-center rounded-full border"><Icon aria-hidden="true" size={18} /></span><span className="font-display text-xs font-bold text-foreground/24">{String(index + 1).padStart(2, "0")}</span></div>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div><p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Meet the advisors</p><h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">Specialist depth, shared responsibility.</h2></div>
            <div className="flex flex-wrap gap-3"><Link href="/team" className="inline-flex h-12 items-center gap-3 rounded-full border border-white/15 px-6 text-sm font-bold text-white transition hover:border-accent hover:text-accent">View the team <ArrowUpRight aria-hidden="true" size={17} /></Link><Link href="/contact" className="inline-flex h-12 items-center gap-3 rounded-full bg-accent px-6 text-sm font-bold text-[#042f2e] transition hover:-translate-y-0.5 hover:bg-[#5eead4]">Book a consultation <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
          </div>
        </section>
      </main>
    </>
  );
}
