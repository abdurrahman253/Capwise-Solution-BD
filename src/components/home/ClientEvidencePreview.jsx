import { ArrowRight, BadgeCheck, FileSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";

const proofTypes = [
  { icon: BadgeCheck, label: "Approved client attribution" },
  { icon: FileSearch, label: "Documented scope and outcome" },
  { icon: ShieldCheck, label: "Consent and confidentiality review" },
];

export default function ClientEvidencePreview() {
  return (
    <section className="bg-brand py-16 text-white sm:py-24 lg:py-28" aria-labelledby="evidence-preview-title">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
        <div className="lg:col-span-7">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent">
            Client evidence
          </p>
          <h2 id="evidence-preview-title" className="mt-5 max-w-[13ch] font-display text-[clamp(2.6rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
            Trust should be evidenced, not invented.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/64 sm:text-base sm:leading-8">
            Capwise will publish testimonials and case evidence only after the client,
            wording, permissions and confidentiality boundaries are verified.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="grid gap-3">
            {proofTypes.map(({ icon: Icon, label }, index) => (
              <div key={label} className="flex items-center gap-4 border-t border-white/12 py-4 text-sm font-semibold text-white/76">
                <span className="font-display text-[0.65rem] font-bold text-white/30">{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" size={17} className="text-accent" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <Link href="/testimonials" className="group mt-5 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-accent">
            View the evidence standard
            <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
