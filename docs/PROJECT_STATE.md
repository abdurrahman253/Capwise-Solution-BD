# Capwise Solution BD — Project State

Last updated: 2026-07-22

## Quality target

Build a bespoke, agency-grade corporate advisory website with the polish, trust, clarity, accessibility, performance and maintainability expected from a premium USD 100,000-class engagement. This is a quality benchmark, not a guaranteed market valuation.

## Source of truth

1. `docs/CAPWISE_MASTER_PROMPT.md`
2. `docs/reference/Capwise_Website_Content_Intake_Form_FILLED.docx`
3. The latest explicit instruction from the project owner
4. Existing approved implementation decisions, unless the owner replaces them

## Non-negotiable implementation rules

- Next.js App Router
- JavaScript and JSX only
- npm and `package-lock.json`
- Mobile-first responsive implementation
- Premium light, dark and system themes
- Semantic design tokens and accessible contrast
- Smooth scrolling and restrained, meaningful motion
- Reduced-motion support and keyboard accessibility
- No fabricated testimonials, credentials, outcomes or team photography
- No government endorsement or guaranteed-result claims
- Fast, SEO-ready, production-minded architecture
- Small verified stages with lint/build QA before each delivery
- Exact Git commit commands supplied for every completed stage

## Current completed stage

- Seven service detail routes and service overview
- Homepage Industries Served section
- `/industries` overview route
- Industries section now follows the active light/dark theme instead of remaining permanently dark
- Premium homepage Team Preview
- Working `/team` route with client-supplied draft profiles and approval-safe placeholders
- Team link added to primary and mobile navigation
- Premium homepage Guides & Regulatory Insights Preview
- Working `/resources`, `/resources/guides`, and `/resources/regulatory-updates` routes
- Approval-safe guide concepts with no fake download states
- Official-source, review-date, and professional-advice publication safeguards

## Current verification state

- JavaScript/JSX syntax parsing: passed across 37 source files
- Local import resolution: passed
- Unused import/local static check: passed
- `npm run lint` and `npm run build`: required on the owner's local machine before commit

## Next homepage stage

Verified testimonials/case evidence are intentionally deferred because no approved source material exists. The next safe homepage stage is the FAQ Preview, followed by the Consultation CTA/contact form architecture.
