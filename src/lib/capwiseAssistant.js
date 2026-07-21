import "server-only";

export const capwiseAssistantInstructions = `
You are the public website assistant for Capwise Solution BD, a multidisciplinary business advisory firm based in Banani, Dhaka, Bangladesh.

Your outcome:
- Help visitors understand which Capwise service fits their business need.
- Give a short and practical next step.
- Escalate sensitive, uncertain, personalized or time-sensitive matters to a human adviser.

Approved Capwise services:
1. Company Formation & Registration: company, partnership and proprietorship setup, trade licence, TIN, BIN, IRC/ERC, joint ventures and foreign investment support.
2. Accounting & Bookkeeping: bookkeeping, financial statements, management reporting, budgeting, forecasting, profitability analysis and Virtual CFO support.
3. Tax Advisory & Compliance: tax and VAT registration, returns, withholding, planning, notices, disputes, audits and general compliance.
4. Payroll & HR Compliance: payroll, salary structures, attendance, leave, benefits, HR policies and employment compliance.
5. Corporate Secretarial: statutory records, resolutions, share transfers, annual returns, filings and corporate documentation.
6. Regulatory & Legal Advisory: company and employment law, contracts, licensing, approvals, disputes, data protection, intellectual property and fintech compliance.
7. Business Advisory: process improvement, strategy, market entry, investor readiness, business plans, financial models and tender support.

Business contact:
- Location: Banani, Dhaka, Bangladesh.
- Phone and WhatsApp: +880 1624 000 381.
- Email: info@capwisebd.com.

Safety boundaries:
- Never invent tax or VAT rates, fees, deadlines, processing times, legal requirements, regulator decisions, client outcomes or government relationships.
- Never provide individualized legal, tax, investment or financial advice.
- Never request passwords, identity numbers, bank details, tax files or confidential documents.
- If an answer depends on current law, documents, pricing or regulator decisions, explain that a Capwise adviser must confirm it.
- Never guarantee a filing, licence, approval, refund or outcome.
- Use only the approved information above.

Response style:
- Keep most answers below 120 words.
- Sound calm, clear, warm and professionally human.
- Reply in English by default.
- If the visitor writes in Bangla or Banglish, reply naturally in Bangla or simple Banglish.
- End with one useful next step.
`;

const containsBangla = (value) => /[\u0980-\u09ff]/.test(value);

const containsBanglish = (value) =>
  /\b(?:ami|amar|amader|chai|chaisi|lagbe|dorkar|korte|korbo|kivabe|ki bhabe|khulte|kholte|hishab|hisab|beton|khoroch|khroch|shomoy|somoy|poramorsho|byabsha|kompani)\b/i.test(
    value,
  );

export function getGuidedAssistantReply(rawMessage = "") {
  const safeMessage =
    typeof rawMessage === "string" ? rawMessage.trim() : "";

  const message = safeMessage.toLowerCase();

  const inBangla =
    containsBangla(safeMessage) || containsBanglish(safeMessage);

  if (
    /\b(?:company formation|company registration|form a company|register (?:a |my )?(?:company|business)|rjsc|trade licen[cs]e|startup|incorporat(?:e|ion)|business setup|(?:company|business|kompani|byabsha) (?:register|registration|setup|khul\w*|khol\w*))\b/.test(
      message,
    ) ||
    /(?:কোম্পানি|ব্যবসা).{0,28}(?:রেজিস্টার|রেজিস্ট্রেশন|নিবন্ধন|খুলতে|খোলা|শুরু|ট্রেড লাইসেন্স)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Company setup-এর জন্য business structure, ownership, proposed activities এবং প্রয়োজনীয় registrations আগে map করা ভালো। Capwise company formation, trade licence, TIN, BIN ও related setup support coordinate করতে পারে। Exact documents ও timeline case অনুযায়ী adviser confirm করবেন। Proposed business details নিয়ে একটি consultation request পাঠাতে পারেন।"
      : "The first step is to map the proposed business structure, ownership, activities and required registrations. Capwise can coordinate company formation, trade licence, TIN, BIN and related setup support. Exact documents and timelines depend on the case, so an adviser should confirm them. The best next step is to request a consultation with your proposed business details.";
  }

  if (
    /\b(?:tax|vat|bin|tin|withholding|nbr|tax return|vat return|tax audit)\b/.test(
      message,
    ) ||
    /(?:ট্যাক্স|ভ্যাট|আয়কর|আয়কর|টিন|বিন|এনবিআর|কর রিটার্ন|ভ্যাট রিটার্ন|উৎসে কর)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Tax বা VAT requirement business type, transaction এবং current rules-এর ওপর নির্ভর করে। এখানে specific rate বা deadline অনুমান করা reliable হবে না। Capwise registration, returns, withholding, notices, disputes ও general compliance support করে। আপনার situation review করার জন্য adviser-এর সঙ্গে consultation নিন।"
      : "Tax and VAT requirements depend on the business, transaction and current rules, so I should not guess a rate or deadline. Capwise supports registrations, returns, withholding, notices, disputes and general compliance. A Capwise adviser should review your situation before recommending the next action.";
  }

  if (
    /account|bookkeep|financial statement|reporting|budget|forecast|cfo|\b(?:hishab|hisab)\b/.test(
      message,
    ) ||
    /(?:হিসাব|হিসাবরক্ষণ|বুককিপিং|আর্থিক বিবরণী|ম্যানেজমেন্ট রিপোর্ট|বাজেট|পূর্বাভাস|সিএফও)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Capwise bookkeeping, financial statements, management reporting, budgeting, forecasting এবং Virtual CFO support দিতে পারে। প্রথমে current records, reporting frequency এবং decision needs বুঝতে হবে। Consultation-এ আপনার বর্তমান accounting setup সংক্ষেপে বলুন।"
      : "Capwise can support bookkeeping, financial statements, management reporting, budgeting, forecasting and Virtual CFO needs. The first step is to understand your current records, reporting frequency and decision requirements. Share a short overview of your present accounting setup during a consultation.";
  }

  if (
    /payroll|salary|employee|hr|leave|benefit|provident|gratuity|\b(?:beton|kormochari)\b/.test(
      message,
    ) ||
    /(?:পেরোল|বেতন|কর্মচারী|এইচআর|ছুটি|কর্মী সুবিধা|প্রভিডেন্ট|গ্র্যাচুইটি)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Capwise payroll processing, salary structure, attendance, leave, benefits, HR policy এবং employment compliance support করে। Employee count ও current process বুঝে scope ঠিক করতে হবে। Consultation-এ এই দুইটি তথ্য দিয়ে শুরু করুন।"
      : "Capwise supports payroll processing, salary structures, attendance, leave, benefits, HR policies and employment compliance. Scope depends on your employee count and current process. Start by sharing those two details with an adviser.";
  }

  if (
    /\b(?:corporate secretarial|company secretarial|annual return|share transfer|resolution|statutory record|corporate document)\b/.test(
      message,
    ) ||
    /(?:কর্পোরেট সেক্রেটারিয়াল|কর্পোরেট সেক্রেটারিয়াল|বার্ষিক রিটার্ন|শেয়ার হস্তান্তর|শেয়ার হস্তান্তর|রেজল্যুশন|স্ট্যাটুটরি রেকর্ড|কর্পোরেট ডকুমেন্ট)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Capwise annual returns, resolutions, share transfers, statutory records এবং corporate documentation support করতে পারে। Exact filing requirement company-এর records ও proposed action-এর ওপর নির্ভর করবে। Adviser-কে প্রয়োজনটি এবং last completed filing সংক্ষেপে জানান।"
      : "Capwise can support annual returns, resolutions, share transfers, statutory records and corporate documentation. Exact requirements depend on the company’s current records and proposed action. Tell an adviser what needs to change and the last filing completed.";
  }

  if (
    /\b(?:legal|regulatory|contract|agreement|licen[cs]ing|approval|dispute|data protection|intellectual property|fintech|ain|chukti)\b/.test(
      message,
    ) ||
    /(?:আইনি|রেগুলেটরি|চুক্তি|লাইসেন্সিং|অনুমোদন|বিরোধ|ডেটা সুরক্ষা|মেধাস্বত্ব|ফিনটেক)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Capwise regulatory ও legal support-এর মধ্যে contracts, licensing, approvals, employment matters, disputes এবং data protection রয়েছে। Personalized legal conclusion chat-এ দেওয়া ঠিক হবে না। Adviser-এর review-এর জন্য issue এবং desired outcome সংক্ষেপে লিখুন।"
      : "Capwise regulatory and legal support includes contracts, licensing, approvals, employment matters, disputes and data protection. A personalized legal conclusion should not be provided in chat. Summarize the issue and desired outcome for an adviser’s review.";
  }

  if (
    /\b(?:business advisory|strategy|market entry|investor|business plan|financial model|process improvement|tender|poramorsho)\b/.test(
      message,
    ) ||
    /(?:ব্যবসায়িক পরামর্শ|ব্যব)\b/.test(
      message,
    ) ||
    /(?:ব্যবসায়িক পরামর্শসায়িক পরামর্শ|কৌশল|বাজারে প্রবেশ|বিনিয়োগকারী|বিনিয়োগকারী|ব্যবসা পরিকল্পনা|আর্থিক মডেল|প্রক্রিয়া উন্নয়ন|প্রক্রিয়া উন্নয়ন|দরপত্র)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Capwise strategy, market entry, investor readiness, business plans, financial models, process improvement ও tender support দিতে পারে। প্রথমে decision, target timeline এবং available information clear করা দরকার। Consultation-এ এই তিনটি point দিয়ে শুরু করুন।"
      : "Capwise can support strategy, market entry, investor readiness, business plans, financial models, process improvement and tenders. First clarify the decision, target timeline and information already available. Start a consultation with those three points.";
  }

  if (
    /price|pricing|fee|cost|charge|timeline|how long|\b(?:khoroch|khroch|shomoy|somoy|koto taka|kotodin)\b/.test(
      message,
    ) ||
    /(?:মূল্য|ফি|খরচ|চার্জ|কত টাকা|কতদিন|কত দিন|সময় লাগবে|সময় লাগবে)/.test(
      message,
    )
  ) {
    return inBangla
      ? "Fee ও timeline service scope, business structure এবং document readiness-এর ওপর নির্ভর করে। তাই chat-এ fixed amount বলা reliable হবে না। Capwise team brief review করে clear scope ও next step জানাতে পারবে। একটি consultation request পাঠান।"
      : "Fees and timelines depend on the service scope, business structure and document readiness, so a fixed answer in chat would not be reliable. The Capwise team can review a short brief and confirm the scope and next step. Please request a consultation.";
  }

  return inBangla
    ? "আমি approved Capwise service information-এর ভিত্তিতে general guidance দিতে পারি। বিষয়টি company formation, accounting, tax/VAT, payroll, corporate secretarial, legal/regulatory অথবা business advisory—কোনটির সঙ্গে সম্পর্কিত তা এক লাইনে বলুন। Personalized বা time-sensitive advice-এর জন্য adviser consultation প্রয়োজন হবে।"
    : "I can provide general guidance on Capwise services: company formation, accounting, tax and VAT, payroll, corporate secretarial, regulatory and legal support, or business advisory. Tell me the business problem in one sentence. Personalized or time-sensitive advice will require a consultation with a Capwise adviser.";
}