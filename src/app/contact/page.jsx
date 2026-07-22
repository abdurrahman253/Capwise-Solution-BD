import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import ConsultationForm from "@/components/forms/ConsultationForm";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Book a Consultation",
  description:
    "Contact Capwise Solution BD in Banani, Dhaka for business compliance, tax, VAT, accounting, legal and regulatory advisory support.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Phone, label: "Call", value: "01624 000 381", href: "tel:+8801624000381" },
  { icon: MessageCircle, label: "WhatsApp", value: "01624 000 381", href: "https://wa.me/8801624000381?text=Hello%20Capwise%2C%20I%20would%20like%20to%20book%20a%20consultation." },
  { icon: Mail, label: "Email", value: "info@capwisebd.com", href: "mailto:info@capwisebd.com" },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="capwise-consultation relative isolate overflow-hidden border-b border-border py-16 sm:py-24 lg:py-32">
          <div className="capwise-coordinate-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
          <div className="pointer-events-none absolute -right-48 -top-44 -z-10 size-[36rem] rounded-full bg-accent/12 blur-[115px]" />
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-14 lg:px-10">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3"><span className="h-px w-10 bg-accent-strong" /><p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">Book a consultation</p></div>
              <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,7vw,7.2rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-foreground">Start with the business issue, not a generic service package.</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">A focused first conversation helps identify the right workstream, urgency, scope and next information needed.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-[0.66rem] font-bold text-muted"><ShieldCheck aria-hidden="true" size={14} className="text-accent-strong" /> Do not send sensitive documents yet</div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
            <div className="rounded-[1.8rem] border border-border bg-background p-6 sm:p-9 lg:col-span-7 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Enquiry details</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">Prepare a useful first briefing.</h2>
              <p className="mb-8 mt-4 max-w-2xl text-sm leading-7 text-muted">Mention the entity, decision, deadline and the outcome you need. The current development-stage form prepares a direct email; secure CRM delivery follows in the backend stage.</p>
              <ConsultationForm />
            </div>

            <aside className="rounded-[1.8rem] bg-brand p-6 text-white shadow-[0_35px_100px_rgba(11,31,51,0.24)] sm:p-9 lg:col-span-5 lg:p-12">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Direct contact</p>
              <h2 className="mt-4 max-w-[11ch] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-white">Reach the Dhaka advisory team.</h2>
              <div className="mt-9 divide-y divide-white/12 border-y border-white/12">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex items-center justify-between gap-4 py-5">
                    <span className="flex items-center gap-4"><span className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 text-accent"><Icon aria-hidden="true" size={17} /></span><span><span className="block text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/35">{label}</span><span className="mt-1 block text-sm font-bold text-white">{value}</span></span></span>
                    <ArrowUpRight aria-hidden="true" size={17} className="text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                ))}
              </div>
              <div className="mt-8 flex gap-4 border-t border-white/12 pt-7"><MapPin aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-accent" /><p className="text-sm leading-7 text-white/64">Level-03, House 76/A, Road 11, Banani, Dhaka-1213, Bangladesh</p></div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
