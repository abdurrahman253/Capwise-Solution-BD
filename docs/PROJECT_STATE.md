# Capwise Solution BD — Project State

Last updated: 2026-07-23

## Quality target

Build an agency-grade corporate advisory website with the trust, clarity, accessibility, performance, conversion design and operational reliability expected from a high-value professional engagement. This is a quality benchmark, not a promise of market valuation or commercial results.

## Source of truth

1. `docs/CAPWISE_MASTER_PROMPT.md`
2. `docs/reference/Capwise_Website_Content_Intake_Form_FILLED.docx`
3. The latest explicit instruction from the project owner
4. Existing approved implementation decisions, unless the owner replaces them

## Completed platform stage

- Premium marketing routes for home, about, team, services, industries, Business in Bangladesh, resources, FAQ and contact.
- Seven service-detail routes, five Business-in-Bangladesh detail routes and five industry-detail routes.
- Protected `/api/consultations` workflow with React Hook Form and shared Zod validation, versioned consent, honeypot, completion-time check, origin validation and rate limiting.
- Durable consultation workflow: MongoDB records the enquiry first when configured; Resend sends the team notification separately; a temporary email problem no longer loses the lead.
- Branded responsive HTML/plain-text email, unique reference, visitor Reply-To, optional acknowledgement and local `/email-preview` route.
- MongoDB collections and indexes for consultation leads, guide interests, regulatory-update subscribers and verified Resend delivery events.
- Signed Resend webhook endpoint for delivery, delay, bounce, failure, suppression and complaint status updates.
- Privacy-reduced request metadata: raw client IP addresses are not stored.
- Premium React-Toastify feedback and two-stage consultation form with accurate `sent`, `stored-only` and `email-failed` states.
- Premium GSAP route transition plus App Router loading fallback and reduced-motion support.
- Approved-knowledge guided support with English, Bangla and Banglish matching, quick actions, visible disclaimer and human handoff. It is not presented as unrestricted AI.
- Resource-interest and regulatory-update workflows with deduplication, consent records and approval-safe messaging.
- Case-study, testimonial and blog architecture with noindex empty states instead of fabricated evidence.
- Privacy Policy, Terms of Use and Professional Disclaimer working drafts.
- Sitemap, robots, manifest, dynamic Open Graph image and appropriate structured data.
- Security headers, custom 404/error states, runtime health endpoint, setup diagnostic script and route audit tooling.
- GitHub Actions quality workflow for locked install, lint, build and route audit.
- Client-portal scope document rather than a decorative or insecure portal.

## Current verification state

- Node syntax checks: passed for all modified server/config/script files, including the Resend webhook.
- Source files checked by route audit: 89.
- Local import resolution: passed; 0 missing imports.
- External imports: all represented in `package.json`.
- Page route patterns: 24.
- Literal internal links checked: 59.
- Missing internal routes: 0.
- Consultation owner and acknowledgement templates generated successfully in `docs/previews/`.
- `package.json` and the root dependency sections in `package-lock.json` are synchronized.
- `npm ci --dry-run --ignore-scripts --offline` passed dependency-plan validation.
- Full installation, ESLint and Next.js production build could not be completed in this delivery environment because one npm tarball was not present in the offline cache. Run the local QA commands below before deployment.

## Required local verification

```bash
npm install
npm run check:setup
npm run lint
npm run build
npm run audit:routes
npm run dev
```

With Resend configured and the dev server running, use a second terminal:

```bash
npm run test:email
```

## Launch-blocking client inputs

- Resend API key, verified Capwise sending domain and final sender/recipient addresses.
- Verified team photography, credentials and final biographies.
- Approved case studies, testimonials and logo permissions.
- Final reviewed guide PDFs.
- Exact Facebook and LinkedIn URLs, confirmed WhatsApp format and Google Maps pin.
- Lawyer review of legal pages and time-sensitive tax/legal/regulatory copy.
- Analytics, cookie-consent, retention, unsubscribe and data-deletion decisions.
- Portal roles, secure-document rules and operational ownership if the portal proceeds.
