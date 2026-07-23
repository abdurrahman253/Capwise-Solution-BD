import { Eye, MailCheck, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import {
  consultationAcknowledgementEmail,
  consultationOwnerEmail,
} from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Consultation Email Preview",
  description: "Local preview of the Capwise consultation email templates.",
  robots: { index: false, follow: false },
};

const sampleData = {
  name: "Capwise Email Test",
  email: "test@capwisebd.com",
  phone: "+880 1624 000 381",
  company: "Capwise Solution BD",
  service: "Business Advisory",
  message:
    "This is a preview of the branded consultation email. It shows the enquiry reference, client details, service interest, briefing and Reply-To guidance exactly as the team email will display.",
  sourcePath: "/contact",
};

export default function EmailPreviewPage() {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_EMAIL_PREVIEW !== "true") {
    notFound();
  }

  const reference = "CAP-PREVIEW-260723";
  const owner = consultationOwnerEmail({
    reference,
    data: sampleData,
    submittedAt: "23 Jul 2026, 15:30",
  });
  const acknowledgement = consultationAcknowledgementEmail({ reference, data: sampleData });

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="bg-background">
        <section className="border-b border-border bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-3 text-accent-strong">
              <Eye aria-hidden="true" size={18} />
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Local delivery preview</p>
            </div>
            <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-foreground">
              Review the exact email experience before sending.
            </h1>
            <div className="mt-7 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold/25 bg-gold/8 p-4 text-sm leading-7 text-muted">
              <ShieldCheck aria-hidden="true" size={18} className="mt-1 shrink-0 text-gold" />
              This route is available locally. It is hidden in production unless ENABLE_EMAIL_PREVIEW=true is explicitly configured.
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-[96rem] gap-8 px-4 sm:px-6 xl:grid-cols-2">
            <article className="overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[0_24px_80px_rgba(11,31,51,.09)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-7">
                <MailCheck aria-hidden="true" size={18} className="text-accent-strong" />
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Team notification</h2>
                  <p className="text-xs text-muted">Delivered to CONSULTATION_TO_EMAIL</p>
                </div>
              </div>
              <iframe
                title="Capwise team consultation email preview"
                srcDoc={owner.html}
                sandbox=""
                className="h-[58rem] w-full bg-white"
              />
            </article>

            <article className="overflow-hidden rounded-[1.6rem] border border-border bg-surface shadow-[0_24px_80px_rgba(11,31,51,.09)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-7">
                <MailCheck aria-hidden="true" size={18} className="text-accent-strong" />
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Visitor acknowledgement</h2>
                  <p className="text-xs text-muted">Sent only when SEND_CLIENT_ACKNOWLEDGEMENT=true</p>
                </div>
              </div>
              <iframe
                title="Capwise visitor acknowledgement email preview"
                srcDoc={acknowledgement.html}
                sandbox=""
                className="h-[58rem] w-full bg-white"
              />
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
