export const BLOG_CONTENT_VERSION = "blog-v1-20260722";

// Add only reviewed articles with a named reviewer, source references and last-reviewed date.
export const blogPosts = [];

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
