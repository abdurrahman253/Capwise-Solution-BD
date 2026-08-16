import "server-only";

const serviceReplies = [
  {
    test: /(?:company|registration|incorporat|rjsc|trade licen[cs]e|tin|bin|irc|erc|proprietorship|partnership|কোম্পানি|রেজিস্ট্রেশন|আরজেএসসি|ট্রেড লাইসেন্স|টিন|বিন|কোম্পানি খুল|company khul|company korte|registration korte)/i,
    en: "Capwise can support entity selection, name clearance, RJSC registration and the follow-on registrations that may include trade licence, TIN and BIN. The right route depends on ownership, activity and document readiness. Start by sharing the proposed business activity, ownership and target start date.",
    bn: "Capwise entity selection, name clearance, RJSC registration এবং প্রয়োজন অনুযায়ী trade licence, TIN ও BIN-এর follow-on support দিতে পারে। সঠিক route ownership, business activity ও document readiness-এর ওপর নির্ভর করে। Proposed activity, ownership এবং target start date জানিয়ে consultation শুরু করুন।",
  },
  {
    test: /(?:tax|vat|nbr|withholding|return|audit|notice|dispute|কর|ভ্যাট|এনবিআর|রিটার্ন|ট্যাক্স|vat support|tax support)/i,
    en: "Capwise supports tax and VAT registration, returns, withholding, audits, notices and general NBR compliance. Rates, deadlines and case outcomes can change or depend on documents, so this guided assistant will not guess them. Share the entity type, issue and deadline for adviser review.",
    bn: "Capwise tax ও VAT registration, return, withholding, audit, notice এবং general NBR compliance support করে। Rate, deadline ও outcome document এবং current rule-এর ওপর নির্ভর করতে পারে, তাই এখানে অনুমান করা হবে না। Entity type, issue এবং deadline লিখে adviser review নিন।",
  },
  {
    test: /(?:foreign|investor|market entry|branch|liaison|bida|bangladesh bank|joint venture|বিদেশি|বিনিয়োগ|বিনিয়োগ|বিআইডিএ|লিয়াজোঁ|liaison office)/i,
    en: "For foreign investment, Capwise can help compare a private company, joint venture, branch or liaison-office route and coordinate relevant BIDA, banking and regulatory documentation where applicable. The next step is a short market-entry brief covering ownership, sector, funding and intended activities.",
    bn: "Foreign investment-এর জন্য Capwise private company, joint venture, branch অথবা liaison-office route তুলনা করতে এবং প্রয়োজন অনুযায়ী BIDA, banking ও regulatory documentation coordinate করতে পারে। Ownership, sector, funding ও intended activity নিয়ে একটি short market-entry brief দিন।",
  },
  {
    test: /(?:account|bookkeep|financial statement|ifrs|cfo|budget|forecast|হিসাব|বুককিপিং|ফাইন্যান্সিয়াল|ফাইন্যান্সিয়াল|accounting support)/i,
    en: "Capwise supports bookkeeping, financial statements, management reporting, budgeting, forecasting and Virtual CFO work. A useful first scope includes transaction volume, current records, reporting frequency and the decisions management needs to make.",
    bn: "Capwise bookkeeping, financial statements, management reporting, budgeting, forecasting এবং Virtual CFO support দেয়। Scope করার জন্য transaction volume, current records, reporting frequency এবং management-এর প্রয়োজনীয় decisionগুলো জানানো ভালো।",
  },
  {
    test: /(?:payroll|hr|employee|salary|leave|provident|gratuity|labour|পে-রোল|বেতন|এইচআর|কর্মী|শ্রম|payroll support)/i,
    en: "Capwise supports payroll processing, salary structures, attendance, leave, benefits, HR policies and employment compliance. Share employee count, current payroll method and the main compliance concern so the team can define the right workstream.",
    bn: "Capwise payroll processing, salary structure, attendance, leave, benefits, HR policy এবং employment compliance support করে। Employee count, current payroll method এবং main compliance concern জানালে team সঠিক scope দিতে পারবে।",
  },
  {
    test: /(?:secretarial|annual return|share transfer|resolution|statutory|corporate record|বার্ষিক রিটার্ন|শেয়ার|শেয়ার|রেজল্যুশন|কর্পোরেট ডকুমেন্ট)/i,
    en: "Capwise can support annual returns, resolutions, share transfers, statutory records and corporate documentation. Exact filing requirements depend on the company’s current records and proposed action. Share the requested change and the last completed filing.",
    bn: "Capwise annual return, resolution, share transfer, statutory record এবং corporate documentation support করতে পারে। Exact filing company record ও proposed action-এর ওপর নির্ভর করে। কী change দরকার এবং last filing কী ছিল তা জানান।",
  },
  {
    test: /(?:legal|regulatory|contract|agreement|licen[cs]ing|approval|dispute|data protection|intellectual property|fintech|আইনি|চুক্তি|লাইসেন্স|অনুমোদন|বিরোধ)/i,
    en: "Capwise regulatory and legal support includes contracts, licensing, approvals, employment matters, disputes, data protection and intellectual property. Personalized legal conclusions require document review, so summarize the issue, parties, deadline and desired outcome for a human adviser.",
    bn: "Capwise regulatory ও legal support-এর মধ্যে contract, licensing, approval, employment matter, dispute, data protection এবং IP রয়েছে। Personalized legal conclusion-এর জন্য document review দরকার। Issue, parties, deadline এবং desired outcome সংক্ষেপে জানান।",
  },
  {
    test: /(?:business advisory|strategy|business plan|financial model|process|tender|investor readiness|কৌশল|ব্যবসা পরিকল্পনা|আর্থিক মডেল|দরপত্র)/i,
    en: "Capwise can support strategy, process improvement, investor readiness, business plans, financial models and tender work. Start with the decision to be made, target timeline, available information and who will use the final output.",
    bn: "Capwise strategy, process improvement, investor readiness, business plan, financial model এবং tender support দিতে পারে। Decision, target timeline, available information এবং final output কে ব্যবহার করবে—এই চারটি বিষয় দিয়ে শুরু করুন।",
  },
];

const banglaPattern = /[\u0980-\u09ff]|\b(?:ami|amar|amader|chai|lagbe|korte|kivabe|ki vabe|koto|somoy|shomoy|khroch|khoroch|bolen|janan)\b/i;

export function getGuidedAssistantReply(rawMessage) {
  const message = String(rawMessage || "").trim();
  const inBangla = banglaPattern.test(message);

  if (!message) {
    return inBangla
      ? "আপনার প্রয়োজনটি এক লাইনে লিখুন।"
      : "Describe the business need in one sentence.";
  }

  if (/(?:talk to|expert|human|consult|call me|contact|adviser|advisor|মানুষ|এক্সপার্ট|পরামর্শক|কথা বলতে|যোগাযোগ)/i.test(message)) {
    return inBangla
      ? "একজন Capwise adviser-এর সঙ্গে কথা বলাই সঠিক next step। Consultation form-এ business issue, entity, deadline ও desired outcome লিখুন, অথবা +880 1624 000 381 নম্বরে call/WhatsApp করুন।"
      : "A Capwise adviser is the right next step. Use the consultation form with the business issue, entity, deadline and desired outcome, or call/WhatsApp +880 1624 000 381.";
  }

  if (/(?:price|pricing|fee|cost|charge|timeline|how long|কত টাকা|ফি|খরচ|কতদিন|কত দিন|সময়|সময়)/i.test(message)) {
    return inBangla
      ? "Fee ও timeline service scope, entity structure এবং document readiness-এর ওপর নির্ভর করে। Fixed amount বা guaranteed timeline বলা reliable হবে না। Short consultation brief দিলে team scope ও next step confirm করতে পারবে।"
      : "Fees and timelines depend on scope, entity structure and document readiness. A fixed amount or guaranteed timeline would not be reliable here. Send a short consultation brief so the team can confirm the scope and next step.";
  }

  const match = serviceReplies.find((item) => item.test.test(message));
  if (match) return inBangla ? match.bn : match.en;

  return inBangla
    ? "এটি Capwise-এর approved service information ভিত্তিক guided support। আপনার বিষয়টি Company Registration, Tax & VAT, Foreign Investment, Accounting, Payroll, Legal/Regulatory অথবা Business Advisory—কোনটির সঙ্গে বেশি সম্পর্কিত তা বলুন। Personalized বা time-sensitive advice-এর জন্য human consultation লাগবে।"
    : "This guided support uses approved Capwise service information. Tell me whether the need is closest to Company Registration, Tax & VAT, Foreign Investment, Accounting, Payroll, Legal/Regulatory or Business Advisory. Personalized or time-sensitive advice requires a human consultation.";
}
