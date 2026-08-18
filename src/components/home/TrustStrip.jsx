import { BookOpen, LayoutGrid, Link2, MapPin } from "lucide-react";

const trustFacts = [
  { label: "Focus", value: "Bangladesh", detail: "Local operating and compliance context", icon: MapPin },
  { label: "Coverage", value: "7 services", detail: "From setup to recurring compliance", icon: LayoutGrid },
  { label: "Approach", value: "Connected", detail: "Finance, tax, legal and HR considered together", icon: Link2 },
  { label: "Knowledge", value: "Practical", detail: "Concise insights built around real business questions", icon: BookOpen },
];

export default function TrustStrip() {
  return (
    <section className="capwise-trust-strip border-b border-border bg-surface py-8 sm:py-12" aria-label="Capwise at a glance">
      <dl className="mx-auto grid max-w-[94rem] grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-6 lg:grid-cols-4 lg:px-8 2xl:px-10">
        {trustFacts.map(({ label, value, detail, icon: Icon }) => (
          <div
            key={label}
            className="capwise-trust-card group relative overflow-hidden rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 sm:p-5"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue sm:size-9">
              <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
            </span>
            <dt className="mt-3 text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue sm:mt-4">{label}</dt>
            <dd className="mt-1.5 font-display text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">{value}</dd>
            <p className="mt-1 text-[0.66rem] leading-4 text-muted sm:text-xs sm:leading-5">{detail}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
