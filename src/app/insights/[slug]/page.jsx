import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import SiteHeader from "@/components/layout/SiteHeader";
import JsonLd from "@/components/seo/JsonLd";
import { getInsight, insights } from "@/data/insights";
import { getInsightMarkdown } from "@/lib/insights";

export const dynamicParams = false;
export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.description,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: { type: "article", title: insight.title, description: insight.description, url: `/insights/${insight.slug}`, images: [{ url: insight.image }] },
    twitter: { card: "summary_large_image", title: insight.title, description: insight.description, images: [insight.image] },
  };
}

const markdownComponents = {
  h2: ({ children }) => <h2 className="mt-11 scroll-mt-28 font-display text-h2 font-semibold text-foreground">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 scroll-mt-28 font-display text-h3 font-semibold text-foreground">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-[1.02rem] leading-8 text-muted">{children}</p>,
  strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
  ul: ({ children }) => <ul className="mt-5 grid gap-2 pl-5 text-[1rem] leading-7 text-muted marker:text-brand-gold">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 grid list-decimal gap-2 pl-6 text-[1rem] leading-7 text-muted marker:font-bold marker:text-brand-blue">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => <blockquote className="mt-7 border-l-2 border-brand-gold bg-brand-navy/[0.04] px-5 py-4 text-foreground">{children}</blockquote>,
  table: ({ children }) => <div className="mt-6 overflow-x-auto rounded-xl border border-border"><table className="w-full min-w-[42rem] border-collapse text-left text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-brand-navy text-white">{children}</thead>,
  th: ({ children }) => <th className="border-b border-white/10 px-4 py-3 font-bold">{children}</th>,
  td: ({ children }) => <td className="border-b border-border px-4 py-3 align-top leading-6 text-muted">{children}</td>,
  a: ({ href, children }) => <a href={href} className="font-bold text-brand-blue underline decoration-brand-gold/50 underline-offset-4">{children}</a>,
};

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  const markdown = getInsightMarkdown(slug);
  if (!insight || !markdown) notFound();
  const content = markdown.replace(/^# .+\n+/, "");
  const related = insights.filter((item) => item.slug !== slug && (item.category === insight.category || item.category === "Industries")).slice(0, 3);
  const url = `https://capwisebd.com/insights/${insight.slug}`;
  const articleSchema = { "@context":"https://schema.org", "@type":"Article", headline: insight.title, description: insight.description, image: insight.image, mainEntityOfPage: url, author: { "@type":"Organization", name:"Capwise Solution BD" }, publisher: { "@type":"Organization", name:"Capwise Solution BD" } };
  const breadcrumbSchema = { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
    {"@type":"ListItem", position:1, name:"Home", item:"https://capwisebd.com/"},
    {"@type":"ListItem", position:2, name:"Insights", item:"https://capwisebd.com/insights"},
    {"@type":"ListItem", position:3, name:insight.title, item:url},
  ]};

  return (
    <>
      <SiteHeader /><JsonLd data={articleSchema} /><JsonLd data={breadcrumbSchema} />
      <main id="main-content" className="bg-background">
        <article>
          <header className="border-b border-border bg-surface py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.68rem] font-bold text-muted"><Link href="/">Home</Link><ChevronRight size={13}/><Link href="/insights">Insights</Link><ChevronRight size={13}/><span className="text-brand-blue">{insight.category}</span></nav>
              <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7"><p className="text-[0.62rem] font-extrabold uppercase tracking-[0.19em] text-brand-blue">{insight.category}</p><h1 className="mt-4 max-w-[16ch] font-display text-h1 font-semibold text-foreground">{insight.heading || insight.title}</h1><p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg sm:leading-9">{insight.description}</p></div>
                <div className="lg:col-span-5"><div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-brand-navy"><Image src={insight.image} alt={insight.imageAlt || ""} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-brand-navy/35 to-transparent"/></div></div>
              </div>
            </div>
          </header>

          <div className="mx-auto grid max-w-[94rem] gap-12 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8 lg:py-20 2xl:px-10">
            <div className="lg:col-span-3">
              <aside className="sticky top-28 rounded-2xl border border-border bg-surface p-5"><p className="flex items-center gap-2 text-[0.6rem] font-extrabold uppercase tracking-[.16em] text-brand-blue"><ShieldCheck size={14} className="text-brand-gold"/> General information</p><p className="mt-3 text-xs leading-6 text-muted">Legal, tax and regulatory requirements can change. Confirm the current position for the actual business and transaction before acting.</p></aside>
            </div>
            <div className="min-w-0 lg:col-span-7"><div className="capwise-article max-w-[48rem]"><ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown></div>
              <div className="mt-14 rounded-[1.5rem] bg-brand-navy p-7 text-white sm:p-9"><p className="text-[0.6rem] font-extrabold uppercase tracking-[.18em] text-brand-gold">One practical next step</p><h2 className="mt-4 font-display text-h3 font-semibold">Need help applying this to your business?</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">Capwise can review your current position and help identify the registrations, filings or decisions that need attention first.</p><Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-gold px-6 text-sm font-extrabold text-brand-navy transition hover:-translate-y-0.5 hover:bg-brand-gold-soft">Book a Free Consultation <ArrowRight size={16}/></Link></div>
            </div>
          </div>
        </article>

        {related.length > 0 && <section className="border-t border-border bg-surface-muted/55 py-14 sm:py-18"><div className="mx-auto max-w-[94rem] px-5 sm:px-6 lg:px-8 2xl:px-10"><div className="flex items-end justify-between gap-6"><div><p className="text-[0.6rem] font-extrabold uppercase tracking-[.18em] text-brand-blue">Continue reading</p><h2 className="mt-3 font-display text-h2 font-semibold text-foreground">Related insights</h2></div><Link href="/insights" className="hidden text-sm font-extrabold text-brand-blue sm:inline-flex">All insights</Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map((item)=><Link key={item.slug} href={`/insights/${item.slug}`} className="group rounded-[1.2rem] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-brand-blue/30"><p className="text-[0.58rem] font-extrabold uppercase tracking-[.15em] text-brand-blue">{item.category}</p><h3 className="mt-3 font-display text-h3 font-semibold text-foreground group-hover:text-brand-blue">{item.title}</h3><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-foreground">Read <ArrowRight size={14} className="text-brand-gold"/></span></Link>)}</div></div></section>}
      </main>
    </>
  );
}
