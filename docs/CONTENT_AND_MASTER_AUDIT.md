# Content Intake and Master Prompt Audit

Audit date: 2026-07-22

## Executive result

The uploaded website now covers the main public information architecture and the immediate premium-conversion stage. The implementation follows the master prompt's JavaScript/JSX, App Router, guided-assistant, form-validation, email, accessibility, SEO and evidence-safety direction. The remaining gaps are primarily client approvals, production provider configuration and operational content—not missing placeholder pages.

## Content Intake coverage

| Intake area | Status | Implementation / decision |
| --- | --- | --- |
| Home value proposition and CTAs | Implemented | Premium home architecture, consultation CTA and trust content. |
| About, mission, vision and approach | Implemented | `/about`; language avoids unsupported superiority and government-access claims. |
| Team profiles | Draft implemented | `/team`; initials/placeholders are used until photos and credentials are verified. |
| Business in Bangladesh | Implemented | Overview plus legal structures, incorporation, ongoing compliance, tax/VAT and labour/employment detail routes. |
| Seven service groups | Implemented | Overview plus individual service pages with scope, process, deliverables, FAQs and CTAs. |
| Five industry groups | Implemented | Overview plus working sector-detail routes. |
| FAQs | Implemented as working draft | Visible FAQ data and FAQ structured data stay aligned. Client approval remains required. |
| Downloadable guides | Approval-safe workflow implemented | Interest/release notification flow; no fake PDF download. Final three PDFs remain client-dependent. |
| Contact fields | Implemented | Name, email, phone, company, service and message with consent and protected API delivery. |
| Address, phone, email, WhatsApp | Implemented | Contact and footer use the supplied business details. Production WhatsApp format still needs confirmation. |
| Social links | Pending client input | Random or unverified profiles are not published. |
| Google Maps | Pending exact pin/approval | Address is published; embed should wait for confirmed map location and consent/performance decision. |
| Privacy | Draft implemented | Tailored working draft requiring legal review. |

## Important content conflict resolved

The intake draft contains wording about direct working relationships with NBR/RJSC officials and other claims that could imply privileged access. The master prompt explicitly requires safer, experience-based language unless exact wording receives client and legal approval. The website therefore omits government-access implications and does not guarantee approvals, tax savings, timelines or dispute outcomes.

## Master Prompt alignment

### Implemented now

- JavaScript and JSX only, Next.js App Router and npm-compatible project structure.
- Semantic light/dark design tokens, accessible focus, responsive layouts and reduced-motion paths.
- React-Toastify, React Hook Form, Zod, GSAP, Lenis, Resend and optional MongoDB/Upstash architecture.
- Real server-side form route and validation rather than `mailto:` for the main conversion journey.
- Guided FAQ assistant with approved intent matching and human escalation.
- Legal drafts, sitemap, robots, manifest, OG image, canonical metadata and structured data.
- Error, loading, not-found and noindex thank-you states plus route/import/syntax audits.
- Evidence-safe case study, testimonial and blog architecture.

### Correctly deferred

- Client portal: deferred until roles, consultation status, secure-document handling, retention and admin ownership are approved.
- Real generative AI: not added; the current assistant is approval-safe and deterministic.
- Final downloadable files: not fabricated.
- Testimonials, logos, client names, outcomes and team photography: not fabricated.
- Time-sensitive regulatory bulletins, rates and deadlines: not fabricated or hardcoded.

### Production gates

- Run `npm install`, lint and production build locally.
- Configure and test Resend; verify `capwisebd.com` before using the production sender.
- Add shared rate limiting and persistence for production traffic.
- Complete accessibility, responsive, Core Web Vitals and browser QA on a Vercel preview.
- Obtain client/legal approval for content, evidence, policies and official links.
- Connect domain, Search Console, Bing Webmaster Tools and approved analytics only after preview QA.
