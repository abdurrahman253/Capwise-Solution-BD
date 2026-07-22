import { notFound } from "next/navigation";

import SiteHeader from "@/components/layout/SiteHeader";
import { blogPosts, getBlogPost } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="bg-background py-24">
        <article className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-strong">{post.category}</p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.06em] text-foreground">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{post.excerpt}</p>
        </article>
      </main>
    </>
  );
}
