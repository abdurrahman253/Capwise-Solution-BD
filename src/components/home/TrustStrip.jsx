const trustFacts = [
  { label: "Focus", value: "Bangladesh", detail: "Local operating and compliance context" },
  { label: "Coverage", value: "7 services", detail: "From setup to recurring compliance" },
  { label: "Approach", value: "Connected", detail: "Finance, tax, legal and HR considered together" },
  { label: "Knowledge", value: "Practical", detail: "Concise insights built around real business questions" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-surface" aria-label="Capwise at a glance">
      <dl className="mx-auto grid max-w-[94rem] grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8 2xl:px-10">
        {trustFacts.map((fact, index) => (
          <div key={fact.label} className={`relative min-h-28 px-3 py-6 sm:px-6 lg:min-h-32 lg:py-8 ${index % 2 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-border" : ""}`}>
            <dt className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-brand-blue">{fact.label}</dt>
            <dd className="mt-2 font-display text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">{fact.value}</dd>
            <p className="mt-1 text-[0.68rem] leading-5 text-muted sm:text-xs">{fact.detail}</p>
            <span aria-hidden="true" className="absolute bottom-0 left-3 h-[2px] w-8 bg-brand-gold sm:left-6" />
          </div>
        ))}
      </dl>
    </section>
  );
}
