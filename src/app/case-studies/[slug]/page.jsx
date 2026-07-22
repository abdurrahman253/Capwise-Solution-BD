import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary, alternates: { canonical: `/case-studies/${study.slug}` } };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="bg-background py-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-strong">Approved case study</p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.06em] text-foreground">{study.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{study.summary}</p>
        </article>
      </main>
    </>
  );
}
