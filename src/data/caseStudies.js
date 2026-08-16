export const CASE_STUDY_CONTENT_VERSION = "case-studies-v1-20260722";

// Publish only evidence-backed entries approved by the client and, where required,
// by the featured client. The structure below is intentionally empty at launch.
export const caseStudies = [];

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
