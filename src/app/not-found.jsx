import { ArrowLeft, ArrowRight, Compass, Home, Search } from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="capwise-not-found relative isolate overflow-hidden">
        <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-50" />
        <div className="pointer-events-none absolute -right-40 top-10 -z-10 size-[30rem] rounded-full bg-accent/12 blur-[110px]" />

        <section className="mx-auto grid min-h-[72vh] max-w-[90rem] items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:px-10 lg:py-28">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-strong" />
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">Navigation exception</p>
            </div>
            <p className="mt-7 font-display text-[clamp(5.5rem,15vw,12rem)] font-semibold leading-[0.75] tracking-[-0.09em] text-foreground/8">404</p>
            <h1 className="mt-7 max-w-[11ch] font-display text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-foreground">
              This route does not lead to a published page.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              The address may have changed, the page may still be in review, or the link may be incomplete. Use one of the verified paths below.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex h-12 items-center gap-3 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition hover:-translate-y-0.5 hover:bg-action-hover">
                <Home aria-hidden="true" size={17} /> Return home
              </Link>
              <Link href="/services" className="inline-flex h-12 items-center gap-3 rounded-full border border-border bg-surface px-6 text-sm font-bold text-foreground transition hover:border-accent-strong hover:text-accent-strong">
                Explore services <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-border bg-surface/82 p-6 shadow-[0_28px_90px_rgba(11,31,51,0.12)] backdrop-blur-xl sm:p-9 lg:col-span-5">
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-strong"><Compass aria-hidden="true" size={20} /></span>
            <h2 className="mt-7 font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">Useful destinations</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {[
                ["Resource centre", "/resources", Search],
                ["Frequently asked questions", "/faq", ArrowRight],
                ["Book a consultation", "/contact", ArrowLeft],
              ].map(([label, href, Icon]) => (
                <Link key={href} href={href} className="group flex items-center justify-between gap-4 py-4 text-sm font-bold text-foreground transition hover:text-accent-strong">
                  <span className="flex items-center gap-3"><Icon aria-hidden="true" size={16} className="text-accent-strong" />{label}</span>
                  <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
