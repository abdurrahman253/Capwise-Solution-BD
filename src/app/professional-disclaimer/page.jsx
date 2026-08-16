import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Professional Disclaimer",
  description: "Tax, legal, regulatory and business advisory disclaimer for Capwise Solution BD website content.",
  alternates: { canonical: "/professional-disclaimer" },
};

const sections = [
  {
    title: "General information only",
    paragraphs: [
      "Website pages, guides, FAQs, regulatory notes and guided-support responses are provided for general educational and service-routing purposes. They are not individualized tax, legal, investment, accounting or financial advice.",
      "Do not act or refrain from acting solely on website content where the decision depends on current law, documents, amounts, deadlines, sector rules or personal circumstances.",
    ],
  },
  {
    title: "Tax and VAT",
    paragraphs: [
      "Tax and VAT rates, exemptions, withholding treatment, filing dates and administrative practice may change and can vary by entity, sector and transaction. Any published summary should be checked against current official sources and the actual facts.",
      "No website statement guarantees a tax saving, refund, exemption, audit outcome or dispute resolution.",
    ],
  },
  {
    title: "Legal and regulatory matters",
    paragraphs: [
      "Company, employment, licensing, contract, data protection, intellectual-property and dispute matters require review of the applicable law, facts and documents. General content does not create a lawyer-client relationship.",
      "Government or regulator approval is outside Capwise's control. The site must not imply government endorsement or guaranteed access to officials.",
    ],
  },
  {
    title: "Timelines, fees and estimates",
    paragraphs: [
      "Any timeline, scope or fee discussed before document review is preliminary. Authority processing, client readiness, third-party dependencies and changes in requirements may affect delivery.",
      "A confirmed engagement scope should identify assumptions, exclusions, responsibilities and the basis of fees.",
    ],
  },
  {
    title: "Guided support and automated workflows",
    paragraphs: [
      "The Phase 1 support widget uses approved predefined information and simple intent matching. It is not represented as unrestricted artificial intelligence and should hand uncertain or personalised matters to a human adviser.",
      "Form confirmations indicate that a request was recorded or delivered; they do not indicate professional acceptance, approval or a guaranteed response time.",
    ],
  },
  {
    title: "Professional review",
    paragraphs: [
      "Contact Capwise for a scoped review before relying on information for a filing, transaction, dispute, employment decision, investment or other material business action.",
      "This disclaimer should be reviewed with the final service engagement documents and approved by Capwise's legal adviser before launch.",
    ],
  },
];

export default function ProfessionalDisclaimerPage() {
  return (
    <LegalDocumentPage
      eyebrow="Professional limitations"
      title="Professional Disclaimer"
      intro="Capwise translates complex business requirements into practical next steps, but website information cannot replace a review of the actual facts, records and current rules."
      reviewNote="This is a working draft and requires legal approval before production publication."
      sections={sections}
    />
  );
}
