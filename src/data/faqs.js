export const FAQ_CONTENT_VERSION = "faq-draft-v1-20260722";

export const faqCategories = [
  {
    id: "starting",
    label: "Starting a business",
    description:
      "Common first questions about structure, registration and market entry in Bangladesh.",
  },
  {
    id: "compliance",
    label: "Ongoing compliance",
    description:
      "Practical guidance on recurring corporate, tax, VAT, accounting and people obligations.",
  },
  {
    id: "engagement",
    label: "Working with Capwise",
    description:
      "What to prepare, how an engagement starts and when specialist advice is appropriate.",
  },
];

export const faqs = [
  {
    id: "company-registration-timeline",
    category: "starting",
    question: "How long does it take to register a company in Bangladesh?",
    answer:
      "Timelines depend on the entity type, document readiness, name clearance and the relevant authority's processing time. Capwise coordinates the registration sequence and post-incorporation steps, but does not promise a fixed approval date.",
  },
  {
    id: "foreign-investor-local-partner",
    category: "starting",
    question: "Does a foreign investor always need a local partner?",
    answer:
      "Not always. Depending on the sector and investment plan, options may include a wholly foreign-owned private limited company, a joint venture, or an approved branch or liaison office. The right structure should be reviewed against current sector rules and the investor's objectives.",
  },
  {
    id: "registration-documents",
    category: "starting",
    question: "Which documents are usually needed before incorporation begins?",
    answer:
      "The exact list varies by structure and shareholder profile. It commonly includes proposed names, identity and address documents, shareholder and director information, business activities, capital details and draft constitutional documents. Capwise provides a tailored checklist before filing.",
  },
  {
    id: "post-incorporation-registrations",
    category: "starting",
    question: "What usually follows the certificate of incorporation?",
    answer:
      "Post-incorporation work may include tax identification, VAT or BIN registration where applicable, trade licensing, banking documentation, import or export permissions and other sector-specific approvals. Not every business requires every registration.",
  },
  {
    id: "ongoing-obligations",
    category: "compliance",
    question: "What ongoing compliance is required after incorporation?",
    answer:
      "Typical obligations can include annual corporate filings, tax returns, VAT submissions where applicable, statutory records, financial reporting, audit requirements and labour compliance. The exact calendar depends on the entity, activities and regulatory status.",
  },
  {
    id: "tax-vat-rates",
    category: "compliance",
    question: "Can the website provide the current tax or VAT rate for my business?",
    answer:
      "Rates and treatments can change and may differ by entity, sector and transaction. The website therefore provides general information only. A current review of the Finance Act, NBR guidance and the specific facts is required before relying on a rate or filing position.",
  },
  {
    id: "outsourced-accounting",
    category: "compliance",
    question: "Can Capwise manage bookkeeping and recurring reporting?",
    answer:
      "Yes. The service scope can cover day-to-day bookkeeping, management reporting, financial statement preparation, budgeting support and a recurring compliance calendar. The final scope is agreed after reviewing transaction volume, systems and reporting needs.",
  },
  {
    id: "statutory-audit",
    category: "compliance",
    question: "Does every business need a statutory audit?",
    answer:
      "Audit requirements depend on the legal form, applicable law and the business's circumstances. Capwise can assess the requirement, prepare records for audit and coordinate with an appropriately qualified independent auditor where necessary.",
  },
  {
    id: "payroll-labour",
    category: "compliance",
    question: "Can Capwise support payroll and labour-law compliance?",
    answer:
      "Yes. Support may include payroll processing, salary structures, attendance and leave administration, HR policies, employee handbooks and review of provident fund or gratuity obligations where applicable.",
  },
  {
    id: "nbr-notice-dispute",
    category: "engagement",
    question: "What should we do after receiving an NBR notice?",
    answer:
      "Preserve the notice, note the response deadline and avoid submitting an unreviewed reply. Capwise can review the facts and documents, explain the available response path and help coordinate specialist representation when required.",
  },
  {
    id: "engagement-process",
    category: "engagement",
    question: "How does a Capwise engagement begin?",
    answer:
      "It begins with a short discovery conversation. Capwise then identifies the relevant workstream, requests only the documents needed for scoping, confirms responsibilities and provides a written scope before substantive work starts.",
  },
  {
    id: "consultation-pricing",
    category: "engagement",
    question: "How is consultation or retainer pricing determined?",
    answer:
      "Pricing depends on complexity, urgency, transaction volume, number of entities and whether the work is one-off or recurring. Capwise confirms the scope and commercial terms before starting billable work.",
  },
];

export const featuredFaqs = [
  faqs[0],
  faqs[1],
  faqs[4],
  faqs[9],
  faqs[10],
];
