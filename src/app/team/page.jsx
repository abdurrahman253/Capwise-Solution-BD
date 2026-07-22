import {
  ArrowRight,
  BadgeCheck,
  Check,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import { teamMembers, TEAM_CONTENT_VERSION } from "@/data/team";

export const metadata = {
  title: "Advisory Team",
  description:
    "Meet the multidisciplinary financial, tax, audit, legal and regulatory advisory team supporting Capwise Solution BD clients.",
  alternates: {
    canonical: "/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" data-team-version={TEAM_CONTENT_VERSION}>
        <section className="relative isolate overflow-hidden border-b border-border bg-background py-16 sm:py-24 lg:py-32">
          <div
            aria-hidden="true"
            className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-52 -top-48 -z-10 size-[38rem] rounded-full bg-accent/12 blur-[120px]"
          />

          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong sm:text-[0.68rem]">
                    The advisory team
                  </p>
                </div>

                <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,7.4rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">
                  Specialist depth.
                  <span className="mt-1 block text-accent-strong">
                    Shared responsibility.
                  </span>
                </h1>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Capwise brings together finance, audit, tax, regulatory and
                  legal perspectives so the client receives one coordinated
                  advisory path.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Financial", "Tax & VAT", "Regulatory", "Legal"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-[0.62rem] font-bold text-foreground/68"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member, index) => (
                <article
                  key={member.slug}
                  id={member.slug}
                  className={`group scroll-mt-32 relative overflow-hidden rounded-[1.5rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                    member.featured
                      ? "border-brand bg-brand text-white shadow-[0_28px_80px_rgba(11,31,51,0.18)] md:col-span-2 xl:col-span-1 xl:row-span-2"
                      : "border-border bg-background text-foreground hover:border-accent/35 hover:bg-surface hover:shadow-[0_22px_60px_rgba(11,31,51,0.09)]"
                  }`}
                >
                  {member.featured && (
                    <div
                      aria-hidden="true"
                      className="capwise-soft-noise pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
                    />
                  )}

                  <div className="relative flex h-full min-h-[24rem] flex-col">
                    <div className="flex items-start justify-between gap-5">
                      <span
                        className={`inline-flex size-16 items-center justify-center rounded-full border font-display text-sm font-bold tracking-[-0.04em] sm:size-20 ${
                          member.featured
                            ? "border-white/14 bg-white/6 text-white"
                            : "border-accent/25 bg-accent/10 text-accent-strong"
                        }`}
                      >
                        {member.initials}
                      </span>
                      <span
                        className={`font-display text-xs font-bold ${
                          member.featured ? "text-white/35" : "text-foreground/24"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-10">
                      <p
                        className={`text-[0.6rem] font-bold uppercase tracking-[0.17em] ${
                          member.featured ? "text-accent" : "text-accent-strong"
                        }`}
                      >
                        {member.role}
                      </p>
                      <h2 className="mt-3 max-w-[17ch] font-display text-[clamp(1.65rem,3vw,2.45rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
                        {member.name}
                      </h2>
                      <p
                        className={`mt-4 text-sm leading-7 ${
                          member.featured ? "text-white/62" : "text-muted"
                        }`}
                      >
                        {member.specialty}
                      </p>
                    </div>

                    <div
                      className={`mt-7 border-t pt-6 ${
                        member.featured ? "border-white/12" : "border-border"
                      }`}
                    >
                      <p
                        className={`text-sm leading-7 ${
                          member.featured ? "text-white/68" : "text-muted"
                        }`}
                      >
                        {member.summary}
                      </p>
                    </div>

                    <div className="mt-auto grid gap-2 pt-8 sm:grid-cols-2">
                      {[member.experience, member.credential].map((item) => (
                        <div
                          key={item}
                          className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-[0.66rem] font-bold ${
                            member.featured
                              ? "border-white/10 bg-white/[0.045] text-white/72"
                              : "border-border bg-surface text-foreground/68"
                          }`}
                        >
                          <Check
                            aria-hidden="true"
                            size={13}
                            className={member.featured ? "text-accent" : "text-accent-strong"}
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}

              <aside className="relative overflow-hidden rounded-[1.5rem] border border-border bg-background p-6 sm:p-8 xl:col-span-2">
                <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <ShieldCheck aria-hidden="true" size={25} strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold">
                      Verification standard
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl">
                      Accuracy before publication.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                      Current profiles are based on client-supplied working
                      information. Photography, credentials, designations and
                      extended biographies will be published only after the
                      relevant team member and client approve them.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-brand py-14 text-white sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-10">
            <div>
              <p className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">
                <BadgeCheck aria-hidden="true" size={14} />
                Start with the right expertise
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
                Bring the full picture to one conversation.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
                Share the business context and immediate concern. Capwise can
                identify the disciplines that should be involved from the
                beginning.
              </p>
            </div>

            <div className="grid gap-2.5 min-[430px]:grid-cols-2 lg:w-[25rem]">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-5 text-xs font-bold text-[#042f2e] transition hover:bg-[#5eead4] sm:text-sm"
              >
                Book consultation
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <a
                href="https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/18 bg-white/6 px-5 text-xs font-bold text-white transition hover:border-accent/50 hover:bg-white/10 sm:text-sm"
              >
                <MessageCircle aria-hidden="true" size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
