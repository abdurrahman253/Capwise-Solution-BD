import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Enquiry Received",
  description: "Confirmation page for a Capwise Solution BD website enquiry.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }) {
  const values = await searchParams;
  const reference = typeof values?.reference === "string" ? values.reference.slice(0, 40) : "";

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative isolate overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
        <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-40" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <section className="rounded-[2rem] border border-border bg-surface p-7 text-center shadow-[var(--card-shadow)] sm:p-12">
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-accent text-[#042f2e] shadow-[0_18px_50px_rgba(20,184,166,.24)]">
              <CheckCircle2 aria-hidden="true" size={28} />
            </span>
            <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Enquiry received</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.7rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-foreground">
              Thank you for contacting Capwise.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              The advisory team will review the business context and respond using the contact details supplied. Response timing depends on the nature and urgency of the request.
            </p>
            {reference ? (
              <p className="mt-6 inline-flex rounded-full border border-accent/30 bg-accent/8 px-4 py-2 text-xs font-extrabold tracking-[0.08em] text-accent-strong">
                REFERENCE&nbsp; {reference}
              </p>
            ) : null}
            <div className="mx-auto mt-7 flex max-w-xl items-start gap-3 rounded-xl border border-border bg-background p-4 text-left text-xs leading-6 text-muted">
              <ShieldCheck aria-hidden="true" size={17} className="mt-1 shrink-0 text-gold" />
              Do not send confidential tax, identity, banking or company documents until a Capwise adviser confirms an appropriate secure channel.
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/services" className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:bg-action-hover">
                Explore services
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-bold text-foreground transition hover:border-accent/45">
                Return home
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
