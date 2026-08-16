export const BUSINESS_CONTENT_VERSION = "business-bangladesh-v2-20260722";

export const businessBangladeshTopics = [
  {
    slug: "legal-structures",
    eyebrow: "Choose the structure",
    title: "Legal structures for operating in Bangladesh",
    description:
      "Compare common entry structures before documents, approvals and operating registrations are prepared.",
    intro:
      "The right structure depends on ownership, liability, activity, funding, tax position and the intended operating model. Capwise helps clients frame those decisions before the filing sequence begins.",
    sections: [
      {
        title: "Sole proprietorship",
        body: "A straightforward route for an individual entrepreneur, typically organized around the owner and relevant local registrations. It does not create the same separation between owner and business as a limited company.",
      },
      {
        title: "Partnership",
        body: "A structure for two or more owners sharing capital and management under an agreed partnership framework. The deed, responsibilities and exit arrangements should be clear before registration.",
      },
      {
        title: "Private limited company",
        body: "A common structure for SMEs, growth businesses and foreign investment because it creates a separate legal entity and can support a clearer ownership and governance framework.",
      },
      {
        title: "Branch or liaison office",
        body: "A foreign company may consider a branch or liaison presence where appropriate. The permitted activities, approvals, banking and ongoing reporting requirements must be reviewed for the proposed use case.",
      },
    ],
    checklist: [
      "Ownership and control expectations",
      "Activities and revenue model",
      "Funding and banking needs",
      "Liability and governance preferences",
      "Foreign investment or sector restrictions",
    ],
  },
  {
    slug: "incorporation-procedures",
    eyebrow: "Build the sequence",
    title: "Company incorporation and operational registrations",
    description:
      "Understand the preparation path from structure and name clearance through post-incorporation registrations.",
    intro:
      "A reliable incorporation project is more than a certificate. The process should connect entity documents, ownership information, RJSC filings and the registrations needed for the business to operate.",
    sections: [
      {
        title: "Preparation and name clearance",
        body: "Confirm the proposed structure, shareholders or partners, directors, activities, capital position and suitable names before the filing package is drafted.",
      },
      {
        title: "Constitutional documents and filing",
        body: "Prepare the applicable memorandum, articles, partnership deed or supporting documents, then complete the relevant filing and respond to any document questions through the proper channel.",
      },
      {
        title: "Certificate and corporate records",
        body: "After incorporation, organize the certificate, constitutional documents, registers, resolutions and ownership records so later banking and compliance work starts from a controlled file.",
      },
      {
        title: "Post-incorporation registrations",
        body: "Depending on the activity and location, the next workstream may include trade licence, TIN, BIN, sector licences, import/export registrations, banking and employment setup.",
      },
    ],
    checklist: [
      "Founders, directors and ownership documents",
      "Registered office information",
      "Proposed activities and capital",
      "Name options",
      "Operational licences and registrations map",
    ],
  },
  {
    slug: "ongoing-compliance",
    eyebrow: "Stay operational",
    title: "Ongoing compliance after incorporation",
    description:
      "Create a clear ownership and review rhythm for statutory, tax, VAT, accounting and people obligations.",
    intro:
      "A company can be incorporated and still become exposed through missed filings, weak records or unclear responsibility. Capwise helps businesses turn recurring obligations into an operating calendar with accountable owners.",
    sections: [
      {
        title: "Corporate and RJSC records",
        body: "Maintain statutory records and prepare applicable annual returns, financial statements, resolutions, share matters and changes in corporate information.",
      },
      {
        title: "Accounting and financial reporting",
        body: "Keep complete books, supporting records, reconciliations and financial statements so management decisions, audits and filings are supported by reliable information.",
      },
      {
        title: "Tax and VAT workflow",
        body: "Assign responsibility for returns, withholding, supporting documents, notices and review checkpoints. Exact obligations and dates should be confirmed against current rules and the entity profile.",
      },
      {
        title: "People and labour compliance",
        body: "Maintain employment records, payroll controls, policies, benefits administration and applicable labour-law documentation as the workforce grows.",
      },
    ],
    checklist: [
      "Named owner for each obligation",
      "Calendar and review date",
      "Supporting-document standard",
      "Escalation process for notices",
      "Periodic compliance health check",
    ],
  },
  {
    slug: "tax-vat",
    eyebrow: "Plan and maintain",
    title: "Tax and VAT considerations for businesses",
    description:
      "Build a tax and VAT workstream around the entity, transactions, records and current law rather than generic rates.",
    intro:
      "Tax and VAT treatment can vary by entity, sector, transaction and the current Finance Act or regulatory guidance. This page provides a planning framework, not a list of hardcoded rates or individualized advice.",
    sections: [
      {
        title: "Registration position",
        body: "Confirm the entity’s TIN, BIN and other registrations that may be relevant to its activity, turnover, transaction profile and location.",
      },
      {
        title: "Returns and recurring records",
        body: "Define the return calendar, accounting cut-off, invoice and withholding records, supporting schedules and internal review process before filing dates approach.",
      },
      {
        title: "Withholding and transaction review",
        body: "Assess payments and transactions that may create deduction, collection, documentation or reporting responsibilities. Current treatment should be verified for the actual transaction.",
      },
      {
        title: "Notices, audits and disputes",
        body: "Preserve records, understand the notice, assign a responsible adviser and respond through a controlled process. Outcomes should never be promised before the facts and documents are reviewed.",
      },
    ],
    checklist: [
      "Entity and sector profile",
      "Registration and filing status",
      "Transaction and withholding map",
      "Record gaps and notice history",
      "Visible last-reviewed date for guidance",
    ],
  },
  {
    slug: "labour-employment",
    eyebrow: "Build responsible operations",
    title: "Labour, employment and payroll foundations",
    description:
      "Connect employment documentation, payroll controls and HR policies to the realities of the workforce.",
    intro:
      "People compliance should be designed around the workforce, workplace, payroll process and applicable legal requirements. Capwise supports the operating documentation and control framework while personalized legal questions are escalated for review.",
    sections: [
      {
        title: "Employment documentation",
        body: "Use clear appointment terms, role information, compensation records, policies and acknowledgements that reflect the employment arrangement and approved company practice.",
      },
      {
        title: "Payroll and attendance controls",
        body: "Define payroll inputs, approvals, attendance, leave, benefits, deductions and reconciliation responsibilities so payments are accurate and reviewable.",
      },
      {
        title: "Policies and employee handbook",
        body: "Create practical policies for working arrangements, conduct, leave, benefits, confidentiality, discipline and grievance processes, subject to legal review where required.",
      },
      {
        title: "Change and exit management",
        body: "Promotions, transfers, performance issues, disciplinary action and exits should be documented and reviewed against the relevant facts and current legal requirements.",
      },
    ],
    checklist: [
      "Employee count and categories",
      "Current contracts and policies",
      "Payroll and approval workflow",
      "Benefits and leave administration",
      "High-risk cases for legal review",
    ],
  },
];

export function getBusinessTopic(slug) {
  return businessBangladeshTopics.find((topic) => topic.slug === slug);
}
