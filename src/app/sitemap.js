import { blogPosts } from "@/data/blog";
import { businessBangladeshTopics } from "@/data/businessBangladesh";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";
import { serviceDetails } from "@/data/services";

const baseUrl = "https://capwisebd.com";

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/services",
    "/business-in-bangladesh",
    "/industries",
    "/resources",
    "/resources/guides",
    "/resources/regulatory-updates",
    "/blog",
    "/faq",
    "/contact",
    "/case-studies",
    "/testimonials",
    "/privacy-policy",
    "/terms-of-use",
    "/professional-disclaimer",
  ];

  const entries = [
    ...staticRoutes,
    ...serviceDetails.map((service) => `/services/${service.slug}`),
    ...businessBangladeshTopics.map((topic) => `/business-in-bangladesh/${topic.slug}`),
    ...industries.map((industry) => `/industries/${industry.slug}`),
    ...caseStudies.map((study) => `/case-studies/${study.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];

  return entries.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : route.includes("regulatory") || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.85 : 0.7,
  }));
}
