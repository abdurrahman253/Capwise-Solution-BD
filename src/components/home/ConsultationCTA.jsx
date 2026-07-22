import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import ConsultationForm from "@/components/forms/ConsultationForm";

const contactDetails = [
  { icon: MapPin, label: "Banani, Dhaka", detail: "Level-03, House 76/A, Road 11" },
  { icon: Phone, label: "01624 000 381", detail: "Call or WhatsApp during business hours" },
  { icon: Mail, label: "info@capwisebd.com", detail: "For consultation and service enquiries" },
  { icon: Clock3, label: "Focused first conversation", detail: "Scope, urgency and the right workstream" },
];

export default function ConsultationCTA() {
  return (
    <section className="capwise-consultation py-16 sm:py-24 lg:py-32" aria-labelledby="consultation-title">
      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="rounded-[1.8rem] bg-brand p-6 text-white shadow-[0_35px_100px_rgba(11,31,51,0.24)] sm:p-9 lg:col-span-5 lg:p-12">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent">Consultation</p>
          <h2 id="consultation-title" className="mt-5 max-w-[10ch] font-display text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
            Bring the issue. Leave with a clearer next step.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/64 sm:text-base sm:leading-8">
            Share the business context, the decision in front of you and any deadline. Capwise will identify the most relevant advisory path before substantive work begins.
          </p>

          <div className="mt-10 grid gap-3">
            {contactDetails.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex gap-4 border-t border-white/12 py-4">
                <Icon aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(11,31,51,0.09)] sm:p-9 lg:col-span-7 lg:p-12">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Start with context</p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">Request a focused conversation.</h3>
          <p className="mb-8 mt-4 max-w-2xl text-sm leading-7 text-muted">No obligation, no guaranteed outcome claims and no need to send sensitive documents before scope and security are agreed.</p>
          <ConsultationForm compact />
        </div>
      </div>
    </section>
  );
}
