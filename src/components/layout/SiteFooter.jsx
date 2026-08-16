import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";
import { services } from "@/config/navigation";
import { pickYourIndustryOptions } from "@/data/pickYourIndustry";

const columns = [
  { title:"Firm", links:[["Our Firm","/about"],["Our Team","/team"],["Careers","/careers"],["Contact","/contact"]] },
  { title:"Insights", links:[["SME","/insights/sme-sector-bangladesh"],["Startup","/insights/startups-in-bangladesh"],["All Insights","/insights"],["Company Registration","/insights/company-registration-bangladesh"]] },
  { title:"Industries", links: pickYourIndustryOptions.map((item) => [item.label, item.href]) },
];

export default function SiteFooter() {
  return <footer className="border-t border-white/10 bg-[#090d23] text-white"><div className="mx-auto max-w-[94rem] px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 2xl:px-10">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4"><BrandLogo compact light /><h2 className="mt-7 max-w-[14ch] font-display text-3xl font-semibold leading-tight tracking-[-.05em] sm:text-4xl">Accounting, tax, legal and compliance—connected.</h2><p className="mt-4 max-w-md text-sm leading-7 text-white/55">Professional advisory support for businesses operating in Bangladesh.</p></div>
      <div className="lg:col-span-2"><p className="text-[.6rem] font-extrabold uppercase tracking-[.18em] text-white/35">Services</p><div className="mt-5 grid gap-2.5">{services.map(item=><Link key={item.href} href={item.href} className="text-xs font-semibold leading-5 text-white/65 transition hover:text-brand-gold">{item.label}</Link>)}</div></div>
      {columns.map(col=><div key={col.title} className="lg:col-span-2"><p className="text-[.6rem] font-extrabold uppercase tracking-[.18em] text-white/35">{col.title}</p><div className="mt-5 grid gap-2.5">{col.links.map(([label,href])=><Link key={href} href={href} className="group inline-flex items-center gap-2 text-xs font-semibold leading-5 text-white/65 transition hover:text-brand-gold">{label}<ArrowUpRight size={12} className="opacity-0 transition group-hover:opacity-100"/></Link>)}</div></div>)}
    </div>
    <div className="mt-12 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3"><a href="mailto:info@capwisebd.com" className="flex items-center gap-3 text-xs text-white/62 hover:text-brand-gold"><Mail size={15}/>info@capwisebd.com</a><a href="tel:+8801624000381" className="flex items-center gap-3 text-xs text-white/62 hover:text-brand-gold"><Phone size={15}/>01624 000 381</a><p className="flex items-start gap-3 text-xs leading-5 text-white/62"><MapPin size={15} className="shrink-0"/>Level-03, House 76/A, Road 11, Banani, Dhaka-1213</p></div>
    <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 text-[.68rem] font-medium text-white/38 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Capwise Solution BD. All rights reserved.</p><div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/privacy-policy" className="hover:text-brand-gold">Privacy</Link><Link href="/terms-of-use" className="hover:text-brand-gold">Terms</Link><Link href="/professional-disclaimer" className="hover:text-brand-gold">Professional disclaimer</Link></div></div>
  </div></footer>;
}
