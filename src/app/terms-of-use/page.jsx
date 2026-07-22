import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Terms of Use",
  description: "Working website terms for Capwise Solution BD.",
  alternates: { canonical: "/terms-of-use" },
};

const sections = [
  {
    title: "Website purpose",
    paragraphs: [
      "This website presents general information about Capwise Solution BD, its service areas and business topics relevant to Bangladesh. Website content does not create a client, lawyer-client, tax-adviser or fiduciary relationship.",
      "A professional engagement begins only after Capwise confirms the scope, responsibilities, commercial terms and any required engagement documentation.",
    ],
  },
  {
    title: "No guarantee of outcomes",
    paragraphs: [
      "Capwise does not guarantee registrations, licences, approvals, tax savings, dispute outcomes, financing, regulator decisions or completion dates through website content or an initial enquiry.",
      "Timelines, fees and outcomes depend on facts, documents, third parties, authorities and current law or procedure.",
    ],
  },
  {
    title: "Acceptable use",
    paragraphs: [
      "Users must not misuse the site, attempt unauthorised access, submit malicious content, impersonate another person, interfere with operation or use forms to distribute spam or unlawful material.",
      "Capwise may restrict requests or access where abuse, fraud, security risk or unlawful activity is reasonably suspected.",
    ],
  },
  {
    title: "Content accuracy and changes",
    paragraphs: [
      "Capwise aims to maintain useful information but regulations, rates, deadlines and procedures can change. Time-sensitive material should include a review date and appropriate source trail where published.",
      "Content may be corrected, updated, withdrawn or reorganised without notice. Users should obtain current advice for their actual circumstances.",
    ],
  },
  {
    title: "Intellectual property and links",
    paragraphs: [
      "Unless stated otherwise, the website design, original copy, graphics and materials are owned by or licensed to Capwise. They may not be copied or republished for commercial use without permission.",
      "External regulator or third-party links are provided for convenience. Capwise does not control those sites and is not responsible for their availability or content.",
    ],
  },
  {
    title: "Liability and governing terms",
    paragraphs: [
      "To the extent permitted by applicable law, Capwise is not liable for decisions made solely from general website information or for losses caused by unavailable third-party systems, unauthorised use or matters outside reasonable control.",
      "The final governing law, dispute terms and limitation wording must be confirmed by Capwise's lawyer before publication.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocumentPage
      eyebrow="Working legal draft"
      title="Terms of Use"
      intro="These terms set expectations for using the public Capwise website, forms, resources and guided support."
      reviewNote="A qualified lawyer must review the governing-law, liability and enforcement language before production launch."
      sections={sections}
    />
  );
}
