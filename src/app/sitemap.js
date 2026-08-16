import { businessBangladeshTopics } from "@/data/businessBangladesh";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";
import { insights } from "@/data/insights";
import { serviceDetails } from "@/data/services";

const baseUrl = "https://capwisebd.com";
function optionalLastModified() { const value=process.env.CONTENT_LAST_REVIEWED_AT; if(!value)return{}; const date=new Date(value); return Number.isNaN(date.getTime())?{}:{lastModified:date}; }

export default function sitemap(){
  const routes=["","/about","/team","/services","/insights","/careers","/contact","/privacy-policy","/terms-of-use","/professional-disclaimer",
    ...serviceDetails.map(s=>`/services/${s.slug}`),
    ...insights.map(i=>`/insights/${i.slug}`),
    ...businessBangladeshTopics.map(t=>`/business-in-bangladesh/${t.slug}`),
    ...industries.map(i=>`/industries/${i.slug}`),
    ...caseStudies.map(c=>`/case-studies/${c.slug}`),
  ];
  return routes.map(route=>({url:`${baseUrl}${route}`,...optionalLastModified(),changeFrequency:route===""||route==="/insights"?"weekly":"monthly",priority: route === "" ? 1 : (route.startsWith("/services/") || route.startsWith("/insights/") ? 0.85 : 0.7)}));
}
