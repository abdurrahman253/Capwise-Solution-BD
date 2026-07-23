import { blogPosts } from "@/data/blog";
import { businessBangladeshTopics } from "@/data/businessBangladesh";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";
import { serviceDetails } from "@/data/services";

const baseUrl = "https://capwisebd.com";

function optionalLastModified() {
  const value = process.env.CONTENT_LAST_REVIEWED_AT;
  if (!value) return {};
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? {} : { lastModified: date };
}

export default function sitemap() {
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
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/professional-disclaimer",
  ];

  if (blogPosts.length) staticRoutes.push("/blog");
  if (caseStudies.length) staticRoutes.push("/case-studies");

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
    ...optionalLastModified(),
    changeFrequency:
      route === "" ? "weekly" : route.includes("regulatory") || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.85 : 0.7,
  }));
}
