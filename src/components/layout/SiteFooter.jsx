import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Advisory Team", "/team"],
      ["Case Studies", "/case-studies"],
      ["Client Evidence", "/testimonials"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Services", "/services"],
      ["Doing Business", "/business-in-bangladesh"],
      ["Industries", "/industries"],
      ["Resources", "/resources"],
      ["Insights", "/blog"],
      ["FAQ", "/faq"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#04101d] text-white">
      <div className="mx-auto max-w-[90rem] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Capwise Solution BD home">
              <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/15">
                <svg aria-hidden="true" viewBox="0 0 96 100" className="size-7" fill="none">
                  <path d="M70 18A34 34 0 1 0 70 82" stroke="white" strokeWidth="10" strokeLinecap="round" />
                  <path d="M29 51L42 64L73 32" className="stroke-accent" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block font-display text-lg font-bold tracking-[-0.04em]">CAPWISE</span>
                <span className="block text-[0.55rem] font-bold uppercase tracking-[0.26em] text-accent">Solution BD</span>
              </span>
            </Link>
            <h2 className="mt-8 max-w-[15ch] font-display text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
              Wise choice for your finance.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              Coordinated business compliance, tax and financial advisory for organisations operating in Bangladesh.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/35">{column.title}</p>
              <div className="mt-5 grid gap-3">
                {column.links.map(([label, href]) => (
                  <Link key={href} href={href} className="group inline-flex items-center gap-2 text-sm font-semibold text-white/68 transition hover:text-accent">
                    {label}
                    <ArrowUpRight aria-hidden="true" size={13} className="opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="lg:col-span-3">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/35">Contact</p>
            <div className="mt-5 grid gap-4 text-sm text-white/68">
              <a href="mailto:info@capwisebd.com" className="flex items-start gap-3 transition hover:text-accent"><Mail aria-hidden="true" size={16} className="mt-0.5 shrink-0" /> info@capwisebd.com</a>
              <a href="tel:+8801624000381" className="flex items-start gap-3 transition hover:text-accent"><Phone aria-hidden="true" size={16} className="mt-0.5 shrink-0" /> 01624 000 381</a>
              <p className="flex items-start gap-3"><MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0" /> Level-03, House 76/A, Road 11, Banani, Dhaka-1213</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-[0.7rem] font-medium text-white/38">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Capwise Solution BD. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/privacy-policy" className="transition hover:text-accent">Privacy</Link>
              <Link href="/terms-of-use" className="transition hover:text-accent">Terms</Link>
              <Link href="/professional-disclaimer" className="transition hover:text-accent">Professional disclaimer</Link>
            </div>
          </div>
          <p className="mt-4">Legal drafts, team details, case evidence and social profiles require final client and legal approval before launch.</p>
        </div>
      </div>
    </footer>
  );
}
