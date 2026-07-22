# Capwise Solution BD — Project State

Last updated: 2026-07-22

## Quality target

Build a bespoke, agency-grade corporate advisory website with the polish, trust, clarity, accessibility, performance and maintainability associated with a high-value professional engagement. This is a quality benchmark, not a promise of market valuation or commercial results.

## Source of truth

1. `docs/CAPWISE_MASTER_PROMPT.md`
2. `docs/reference/Capwise_Website_Content_Intake_Form_FILLED.docx`
3. The latest explicit instruction from the project owner
4. Existing approved implementation decisions, unless the owner replaces them

## Completed platform stage

- Premium marketing routes for home, about, team, services, industries, Business in Bangladesh, resources, FAQ and contact.
- Seven service-detail routes, five Business-in-Bangladesh detail routes and five industry-detail routes.
- Real `/api/consultations` backend with React Hook Form and shared Zod validation, consent, honeypot, human-completion check, origin validation and rate limiting.
- Resend transactional email with branded HTML/plain-text templates, unique reference, visitor Reply-To and optional acknowledgement.
- Optional MongoDB lead persistence and optional Upstash REST rate limiting.
- Premium React-Toastify feedback and two-stage consultation form.
- Premium GSAP route transition plus App Router loading fallback and reduced-motion support.
- Approved-knowledge guided support with English, Bangla and Banglish matching, quick actions, visible disclaimer and human handoff. It is not presented as unrestricted AI.
- Resource-interest and regulatory-update workflows with approval-safe messaging and no fake download or bulletin.
- Case-study, testimonial and blog architecture with empty states instead of fabricated evidence.
- Privacy Policy, Terms of Use and Professional Disclaimer working drafts.
- Sitemap, robots, manifest, dynamic Open Graph image and appropriate structured data.
- Security headers, custom 404/error states and static route/import/syntax audit tooling.
- Client-portal scope document rather than a decorative or insecure portal.

## Current verification state

- JavaScript/JSX syntax diagnostics: passed across 86 source files.
- Local import resolution: passed; 0 missing imports.
- Potential unused-import audit: 0.
- Literal internal route audit: 0 missing routes across 23 page patterns.
- HTML and plain-text consultation email preview generated in `docs/previews/`.
- ZIP integrity: must be checked after packaging.
- Full `npm install`, ESLint and Next.js production build could not be run in this delivery environment because the npm registry was not reachable. Run them locally before commit or deployment.

## Required local verification

```bash
npm install
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

- Resend verification for `capwisebd.com` and final sender/recipient addresses.
- Verified team photography, credentials and final biographies.
- Approved case studies, testimonials and logo permissions.
- Final reviewed guide PDFs.
- Exact Facebook and LinkedIn URLs, confirmed WhatsApp format and Google Maps pin.
- Lawyer review of legal pages and time-sensitive tax/legal/regulatory copy.
- Analytics, cookie-consent, retention and unsubscribe decisions.
- Portal roles, secure-document rules and operational ownership if the portal proceeds.

## Package-lock note

`package.json` reflects the approved dependency migration. The existing `package-lock.json` is from the uploaded repository and is intentionally preserved, but it is stale because registry access was unavailable here. Run `npm install` locally once; npm will resolve the new packages and update the lockfile. Commit the updated lockfile with the code.
