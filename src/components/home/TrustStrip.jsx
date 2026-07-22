const TRUST_STRIP_VERSION = "real-trust-strip-v10-20260722";

const trustFacts = [
  {
    label: "Founded",
    value: "2022",
    detail: "Established in Dhaka",
  },
  {
    label: "Clients served",
    value: "30+",
    detail: "Businesses supported",
  },
  {
    label: "Combined leadership",
    value: "15+ years",
    detail: "Tax, audit & regulatory advisory",
  },
  {
    label: "Local support",
    value: "Dhaka",
    detail: "Bangladesh-focused guidance",
  },
];

export default function TrustStrip() {
  return (
    <section
      data-trust-strip-version={TRUST_STRIP_VERSION}
      aria-labelledby="capwise-trust-strip-title"
      className="capwise-proof-strip relative isolate overflow-hidden border-b"
    >
      <h2 id="capwise-trust-strip-title" className="sr-only">
        Capwise at a glance
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
      />

      <dl className="mx-auto grid max-w-[90rem] grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-10">
        {trustFacts.map(({ label, value, detail }, index) => (
          <div
            key={label}
            className={`capwise-proof-border relative flex min-h-[8.25rem] flex-col justify-center px-4 py-5 sm:min-h-[9rem] sm:px-6 sm:py-6 lg:min-h-[10.25rem] lg:px-8 ${
              index % 2 === 1 ? "border-l" : ""
            } ${index > 1 ? "border-t" : ""} ${
              index > 0 ? "lg:border-l" : "lg:border-l-0"
            } lg:border-t-0`}
          >
            <dt className="flex items-center justify-between gap-3 text-[0.58rem] font-bold uppercase tracking-[0.19em] text-accent-strong sm:text-[0.64rem]">
              <span>{label}</span>
              <span
                aria-hidden="true"
                className="capwise-proof-muted font-display text-[0.6rem] font-semibold tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </dt>

            <dd className="mt-2.5">
              <span className="block font-display text-[clamp(1.65rem,3.2vw,2.55rem)] font-semibold leading-none tracking-[-0.055em]">
                {value}
              </span>
              <span className="capwise-proof-muted mt-2 block max-w-[17rem] text-[0.67rem] leading-5 sm:text-xs">
                {detail}
              </span>
            </dd>

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-4 h-px w-8 bg-[color:var(--hero-gold)] sm:left-6 lg:left-8"
            />
          </div>
        ))}
      </dl>
    </section>
  );
}
