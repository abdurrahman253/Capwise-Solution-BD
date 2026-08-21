export const TEAM_CONTENT_VERSION = "team-v2-20260816";

export const teamMembers = [
  {
    slug: "fahim-khan-chowdhury",
    initials: "FKC",
    name: "Fahim Khan Chowdhury",
    role: "Consultant",
    specialty: "Audit, VAT, Tax & Regulatory Affairs",
    experience: "8+ years",
    credential: "BBA, MBA, LLB",
    summary: "Supports corporate compliance, direct and indirect taxation, RJSC matters and business establishment.",
    featured: true,
  },
  {
    slug: "md-minhajul-islam",
    initials: "MMI",
    name: "Md Minhajul Islam",
    role: "Consultant",
    specialty: "Financial Operations & Business Support",
    experience: "12+ years",
    credential: "BBA, MBA",
    summary: "Works across financial advisory, business formation, banking documentation, import-export operations and tender support.",
    featured: true,
  },
  {
    slug: "shib-shanker-dey",
    initials: "SSD",
    name: "Shib Shanker Dey, FCA",
    role: "Advisor",
    specialty: "Financial Reporting & Audit Compliance",
    experience: "15+ years",
    credential: "Fellow Chartered Accountant",
    summary: "Advises on statutory audit readiness, internal controls, IFRS-based reporting and compliance diagnostics.",
  },
  {
    slug: "advocate-tanmoy-mitra",
    initials: "ATM",
    name: "Advocate Tanmoy Mitra",
    role: "Advisor",
    specialty: "Corporate & Regulatory Law",
    experience: "Practicing lawyer",
    credential: "Supreme Court of Bangladesh",
    summary: "Advises on company law, tax litigation, writ matters and regulatory compliance.",
  },
  {
    slug: "alamin-hossain",
    initials: "AH",
    name: "Alamin Hossain",
    role: "Advisor",
    specialty: "Corporate Documentation & Filing Support",
    experience: "Legal practice",
    credential: "Dhaka Judge Court",
    summary: "Supports company incorporation, agreement drafting, dispute resolution and RJSC filings.",
  },
  {
    slug: "borhan-sarkar",
    initials: "BS",
    name: "Borhan Sarkar",
    role: "Advisor",
    specialty: "Professional profile pending client confirmation",
    experience: "Details to be confirmed",
    credential: "Credentials to be confirmed",
    summary: "Included in the Capwise team roster. Professional title, specialty and credentials should be updated once verified by the client.",
  },
];

export const featuredTeamMembers = teamMembers.filter((member) => member.featured);
export const featuredTeamMember = featuredTeamMembers[0];
export const supportingTeamMembers = teamMembers.filter((member) => !member.featured);
