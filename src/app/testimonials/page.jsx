import { ArrowUpRight, BadgeCheck, FileCheck2, LockKeyhole, MessageSquareQuote, ShieldCheck } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Client Testimonials & Evidence",
  description:
    "Learn how Capwise Solution BD verifies client testimonials and case evidence before publication.",
  alternates: { canonical: "/testimonials" },
  robots: { index: false, follow: true },
};

const standards = [
  { icon: BadgeCheck, title: "Named and approved", text: "Attribution, organisation and wording are published only with explicit client approval." },
  { icon: FileCheck2, title: "Scope is documented", text: "The service context and any stated outcome must be supported by the engagement record." },
  { icon: LockKeyhole, title: "Confidentiality first", text: "Sensitive facts, figures and identities remain private unless publication is expressly authorised." },
];

export default function TestimonialsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="bg-brand text-white">
          <div className="mx-auto grid min-h-[70vh] max-w-[90rem] gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-end lg:px-10 lg:py-28">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3"><span className="h-px w-10 bg-accent" /><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent">Client evidence</p></div>
              <h1 className="mt-7 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.4rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-white">Credibility is stronger when every word can be verified.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-white/64 sm:text-base sm:leading-8">No testimonial, logo, result or client identity is fabricated. This page establishes the publication standard while approved evidence is being prepared.</p>
              <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-[0.65rem] font-bold text-white/60"><ShieldCheck aria-hidden="true" size={14} className="text-accent" /> Evidence library in approval workflow</span>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-3">
              {standards.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="rounded-[1.5rem] border border-border bg-background p-6 sm:p-8">
                  <div className="flex items-start justify-between"><span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong"><Icon aria-hidden="true" size={19} /></span><span className="font-display text-xs font-bold text-foreground/24">{String(index + 1).padStart(2, "0")}</span></div>
                  <h2 className="mt-9 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="capwise-evidence py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="rounded-[1.8rem] border border-border bg-surface p-7 text-center shadow-[0_28px_90px_rgba(11,31,51,0.09)] sm:p-12 lg:p-16">
              <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong"><MessageSquareQuote aria-hidden="true" size={22} /></span>
              <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Publication status</p>
              <h2 className="mx-auto mt-4 max-w-[17ch] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-foreground">Verified client stories will appear here after approval.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">Until then, Capwise relies on transparent service scope, team credentials, process clarity and direct consultation rather than invented social proof.</p>
              <Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover">Discuss your requirements <ArrowUpRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
