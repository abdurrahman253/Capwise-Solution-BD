import { ArrowUpRight, MapPin, Navigation, Phone } from "lucide-react";
import { primaryContact } from "@/config/contacts";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.797154694343!2d90.40757704045313!3d23.790236578732138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7302532b98d%3A0x2ae0056ef129cb1f!2sCodesk!5e0!3m2!1sen!2sbd!4v1787248212584!5m2!1sen!2sbd";

const DIRECTIONS_HREF = "https://maps.app.goo.gl/BzS5LSut7HRGAq7j9";

export default function LocationSection() {
  return (
    <section className="bg-background py-section-lg">
      <div className="mx-auto max-w-[90rem] px-gutter">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-accent-strong" />
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-accent-strong">Find us</p>
        </div>
        <h2 className="mt-4 max-w-[16ch] font-display text-h2 font-semibold text-foreground">Visit the Dhaka advisory office.</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8 sm:mt-12">
          <div className="relative overflow-hidden rounded-[1.8rem] border border-border h-80 sm:h-[360px] md:h-[420px] lg:col-span-7 lg:h-[480px] xl:h-[560px]">
            <iframe
              src={MAP_EMBED_SRC}
              title="CAPWISE Solution BD office location map"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ border: 0 }}
              className="absolute inset-0 size-full"
            />
          </div>

          <aside className="rounded-[1.8rem] border border-border bg-surface p-6 sm:p-9 lg:col-span-5 lg:p-12">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent-strong">Office address</p>

            <div className="mt-5 flex items-start gap-3">
              <MapPin aria-hidden="true" size={19} className="mt-0.5 shrink-0 text-accent-strong" />
              {/* TODO: CAPWISE address — confirm with client */}
              <p className="text-sm italic leading-7 text-muted">Address to be confirmed.</p>
            </div>

            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-between gap-4 rounded-full bg-action px-6 text-sm font-bold text-action-foreground transition duration-200 hover:-translate-y-0.5 hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Get Directions
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-7 text-sm text-muted">
              <Navigation aria-hidden="true" size={16} className="shrink-0 text-accent-strong" />
              Prefer to call ahead?
              <a href={`tel:${primaryContact.tel}`} className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-accent-strong">
                <Phone aria-hidden="true" size={14} />
                {primaryContact.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
