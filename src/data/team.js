export const TEAM_CONTENT_VERSION = "team-v2-20260816";

export const teamMembers = [
  {
    slug: "fahim-khan-chowdhury",
    initials: "FKC",
    name: "Fahim Khan Chowdhury",
    role: "Consultant",
    specialty: "Income Tax Law, Corporate Affairs & Company Formation",
    experience: "8+ years",
    credential: "BBA, MBA, LLB, ITP",
    summary: "Advises on income tax returns, NBR/BIDA/RJSC corporate affairs, ITES exemption, RJSC company formation and DTAA certification. Member, Dhaka Taxes Bar Association and Bangladesh Company Law Practitioners Society.",
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
    initials: "BU",
    name: "Borhan Uddin",
    role: "Advisor",
    specialty: "Co-Working Space Business & Industrial Operations",
    experience: "9+ years",
    credential: "B.I.M.T",
    summary: "CEO of Codesk LTD, a co-working space based in Banani, Dhaka, and Industrial Engineer at Epyllion Group.",
  },
];

export const featuredTeamMembers = teamMembers.filter((member) => member.featured);
export const featuredTeamMember = featuredTeamMembers[0];
export const supportingTeamMembers = teamMembers.filter((member) => !member.featured);
