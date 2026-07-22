export const TEAM_CONTENT_VERSION = "team-v1-20260722";

export const teamMembers = [
  {
    slug: "shib-shanker-dey",
    initials: "SSD",
    name: "Shib Shanker Dey, FCA",
    role: "Senior Advisor",
    specialty: "Financial Reporting & Audit Compliance",
    experience: "15+ years",
    credential: "Fellow Chartered Accountant",
    summary:
      "Advises on statutory audit readiness, internal controls, IFRS-based reporting and compliance diagnostics.",
    featured: true,
  },
  {
    slug: "fahim-khan-chowdhury",
    initials: "FKC",
    name: "Fahim Khan Chowdhury",
    role: "Consultant",
    specialty: "Audit, VAT, Tax & Regulatory Affairs",
    experience: "8+ years",
    credential: "BBA, MBA, LLB",
    summary:
      "Supports corporate compliance, direct and indirect taxation, RJSC matters and business establishment.",
  },
  {
    slug: "md-minhajul-islam",
    initials: "MMI",
    name: "Md Minhajul Islam",
    role: "Consultant",
    specialty: "Financial Operations & Business Support",
    experience: "12+ years",
    credential: "BBA, MBA",
    summary:
      "Works across financial advisory, business formation, banking documentation, import-export operations and tender support.",
  },
  {
    slug: "advocate-tanmoy-mitra",
    initials: "ATM",
    name: "Advocate Tanmoy Mitra",
    role: "Legal Advisor",
    specialty: "Supreme Court of Bangladesh",
    experience: "Practicing lawyer",
    credential: "Corporate & regulatory law",
    summary:
      "Advises on company law, tax litigation, writ matters and regulatory compliance.",
  },
  {
    slug: "alamin-hossain",
    initials: "AH",
    name: "Alamin Hossain",
    role: "Legal Associate",
    specialty: "Dhaka Judge Court",
    experience: "Legal practice",
    credential: "Corporate documentation",
    summary:
      "Supports company incorporation, agreement drafting, dispute resolution and RJSC filings.",
  },
];

export const featuredTeamMember = teamMembers.find((member) => member.featured);
export const supportingTeamMembers = teamMembers.filter(
  (member) => !member.featured,
);
