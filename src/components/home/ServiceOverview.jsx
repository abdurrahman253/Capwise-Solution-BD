import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";

import { serviceGroups, services } from "@/config/navigation";

const groupIcons = {
  establish: Building2,
  operate: ClipboardCheck,
  govern: BriefcaseBusiness,
};

export default function ServiceOverview() {
  return (
    <section
      id="services-overview"
      aria-labelledby="services-overview-title"
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-24 size-80 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.75fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent-strong">
              What we help you solve
            </p>
            <h2
              id="services-overview-title"
              className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,4.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground"
            >
              Specialist support, connected around your business.
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-xl text-base leading-8 text-muted">
              Get the right expertise without managing disconnected advisers.
              Capwise brings your essential finance, compliance and regulatory
              work into one practical relationship.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-strong transition hover:gap-3"
            >
              View all services
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_22px_65px_rgba(11,31,51,0.08)] sm:mt-16 lg:grid lg:grid-cols-3">
          {serviceGroups.map((group, groupIndex) => {
            const Icon = groupIcons[group.id];
            const groupedServices = group.serviceHrefs.map((href) =>
              services.find((service) => service.href === href),
            );

            return (
              <article
                key={group.id}
                className={`flex flex-col p-6 sm:p-8 lg:min-h-[39rem] lg:p-9 ${
                  groupIndex > 0
                    ? "border-t border-border lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-surface-muted text-accent-strong">
                    <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-xs font-bold tracking-[0.18em] text-muted/70">
                    {group.number}
                  </span>
                </div>

                <p className="mt-8 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-accent-strong">
                  {group.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.04em] text-foreground sm:text-[1.7rem]">
                  {group.title}
                </h3>
                <p className="mt-4 min-h-20 text-sm leading-6 text-muted">
                  {group.description}
                </p>

                <ul className="mt-7 border-t border-border">
                  {groupedServices.map((service) => (
                    <li key={service.href} className="border-b border-border">
                      <Link
                        href={service.href}
                        className="group flex items-start justify-between gap-4 py-5"
                      >
                        <span>
                          <span className="block text-sm font-bold leading-5 text-foreground transition group-hover:text-accent-strong">
                            {service.label}
                          </span>
                          <span className="mt-1.5 block text-xs leading-5 text-muted">
                            {service.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-[-0.03em] text-foreground">
              Not sure where your requirement fits?
            </p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Start with the business problem. We will help identify the right
              service path.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-bold text-foreground transition hover:border-accent hover:text-accent-strong"
          >
            Talk to an Adviser
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
