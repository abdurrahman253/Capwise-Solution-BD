import {
  BadgeCheck,
  Building2,
  MapPin,
  Users,
} from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";

const trustStats = [
  {
    label: "Established",
    value: "2022",
    icon: Building2,
  },
  {
    label: "Clients Served",
    value: "30+",
    icon: Users,
  },
  {
    label: "Leadership Experience",
    value: "15+ Years",
    icon: BadgeCheck,
  },
];

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-accent/15 blur-3xl"
      />

      <section className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col rounded-[1.75rem] border border-border bg-surface p-6 shadow-[var(--card-shadow)] sm:min-h-[calc(100vh-3rem)] sm:p-10 lg:min-h-[calc(100vh-4rem)] lg:p-14">
        <header className="flex items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-extrabold tracking-[-0.04em] text-foreground">
              CAPWISE
            </p>

            <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
              Solution BD
            </p>
          </div>

          <ThemeToggle />
        </header>

        <div className="my-auto grid gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-6 inline-flex rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
              Business Compliance & Advisory
            </p>

            <h1 className="font-display text-[clamp(3rem,7vw,6.75rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              Wise Choice for
              <span className="block text-accent-strong">Your Finance.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Your one-stop partner for business compliance, tax, VAT,
              accounting and financial advisory in Bangladesh.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full bg-action px-6 py-3.5 text-sm font-semibold text-action-foreground shadow-sm">
                Design foundation ready
              </span>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                <MapPin aria-hidden="true" size={17} />
                Banani, Dhaka
              </span>
            </div>
          </div>

          <div
            id="trust-statistics"
            className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {trustStats.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="group rounded-2xl border border-border bg-surface-muted p-5 transition duration-200 hover:-translate-y-1 hover:border-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </p>

                    <p className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-foreground">
                      {value}
                    </p>
                  </div>

                  <span className="rounded-xl border border-border bg-surface p-2.5 text-accent-strong">
                    <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Premium corporate design system foundation</p>
          <p>Next: reusable UI components and website header</p>
        </footer>
      </section>
    </main>
  );
}