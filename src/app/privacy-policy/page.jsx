import LegalDocumentPage from "@/components/legal/LegalDocumentPage";

export const metadata = {
  title: "Privacy Policy",
  description: "Working privacy policy for Capwise Solution BD's website forms, resource requests, guided support and future account services.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "Information the website may collect",
    paragraphs: [
      "The website may collect contact details, company information, service interests, enquiry messages, guide-release requests, update preferences and technical request information such as time, browser details and IP-derived security signals.",
      "Capwise should not request passwords, bank credentials, national identity details, tax files or confidential company documents through the public contact form or guided support widget.",
    ],
  },
  {
    title: "How information is used",
    paragraphs: [
      "Information may be used to respond to enquiries, route requests to an appropriate adviser, maintain enquiry records, manage approved resource notifications, prevent abuse, improve the website and meet legal or operational obligations.",
      "Where acknowledgement emails or reviewed update communications are enabled, they should be sent only for the purpose described at collection and with an appropriate unsubscribe or preference process where required.",
    ],
  },
  {
    title: "Email, storage and service providers",
    paragraphs: [
      "The website may use a transactional email provider to deliver enquiries and optional acknowledgements. MongoDB or another approved database may be used to retain leads, subscription preferences and audit information. Hosting, analytics and security providers may process limited technical data as part of operating the site.",
      "Production providers, retention periods, international transfers and contractual safeguards must be confirmed before launch and reflected in the final policy.",
    ],
  },
  {
    title: "Cookies, themes and local storage",
    paragraphs: [
      "The site may use essential browser storage for theme preference, interface state and security or consent choices. Analytics or marketing cookies should not be enabled until Capwise approves the tools, purpose and consent approach.",
      "A future client portal may use additional authentication storage. Its privacy terms must be updated before the portal is released.",
    ],
  },
  {
    title: "Retention, security and sharing",
    paragraphs: [
      "Capwise should keep personal information only for a documented business, legal or security purpose and remove or anonymise it when no longer required. Reasonable access controls, validation, rate limits, secure environment variables and provider security features should be used.",
      "Information should not be sold. It may be shared with authorised Capwise personnel, approved processors, professional advisers or authorities where lawfully required.",
    ],
  },
  {
    title: "Choices and contact",
    paragraphs: [
      "Individuals may contact Capwise to ask about their information, request correction or raise a privacy concern, subject to applicable law and legitimate retention requirements.",
      "Privacy enquiries may be sent to info@capwisebd.com or delivered to Level-03, House 76/A, Road 11, Banani, Dhaka-1213, Bangladesh.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      eyebrow="Working legal draft"
      title="Privacy Policy"
      intro="This draft explains the website data flows currently planned for Capwise Solution BD. It must be updated to match the final production providers and internal practices."
      reviewNote="Client management and a qualified lawyer should review and approve this policy before launch. It is not a substitute for legal advice."
      sections={sections}
    />
  );
}
