export const RESOURCE_CONTENT_VERSION = "resources-v1-20260722";

export const guideResources = [
  {
    slug: "company-registration-checklist-bangladesh",
    number: "01",
    category: "Company formation",
    title: "Company Registration Checklist for Bangladesh",
    summary:
      "A practical preparation guide covering the decisions, documents and post-incorporation registrations businesses should organize before starting the process.",
    topics: ["Entity choice", "Core documents", "TIN, BIN & trade license"],
    status: "Editorial draft",
    accent: "teal",
    featured: true,
  },
  {
    slug: "vat-tax-compliance-calendar",
    number: "02",
    category: "Tax & VAT",
    title: "VAT & Tax Compliance Calendar",
    summary:
      "A maintenance-focused planning resource designed to help teams assign responsibilities, prepare records and review recurring compliance obligations.",
    topics: ["Planning rhythm", "Record readiness", "Internal ownership"],
    status: "Editorial draft",
    accent: "gold",
  },
  {
    slug: "foreign-investor-market-entry-guide",
    number: "03",
    category: "Market entry",
    title: "Foreign Investor’s Market Entry Guide",
    summary:
      "A structured overview of the early decisions foreign investors should assess when considering a company, joint venture, branch or liaison presence in Bangladesh.",
    topics: ["Entry structure", "Approvals", "Operational setup"],
    status: "Editorial draft",
    accent: "navy",
  },
];

export const regulatoryWatchTopics = [
  {
    slug: "tax-vat",
    label: "Tax & VAT",
    title: "Finance Act, NBR guidance and filing practice",
    description:
      "Track changes that may affect tax planning, VAT administration, withholding obligations and supporting documentation.",
    sourceLabel: "Official source verification required",
  },
  {
    slug: "corporate-rjsc",
    label: "Corporate",
    title: "RJSC filings and statutory records",
    description:
      "Review procedural changes affecting incorporation, annual filings, amendments, share matters and corporate records.",
    sourceLabel: "Official source verification required",
  },
  {
    slug: "investment-regulation",
    label: "Investment",
    title: "BIDA and Bangladesh Bank market-entry guidance",
    description:
      "Monitor regulatory developments relevant to foreign investment, branch or liaison structures, banking documentation and approvals.",
    sourceLabel: "Official source verification required",
  },
  {
    slug: "labour-payroll",
    label: "People",
    title: "Labour, payroll and employment compliance",
    description:
      "Surface material changes that may affect employment documentation, payroll administration, benefits and workforce obligations.",
    sourceLabel: "Official source verification required",
  },
];

export const resourcePublicationPrinciples = [
  "Use official regulator or legislation sources before publication.",
  "Show a visible last-reviewed date on time-sensitive content.",
  "Separate general information from client-specific professional advice.",
  "Update or withdraw material when the underlying rule changes.",
];
