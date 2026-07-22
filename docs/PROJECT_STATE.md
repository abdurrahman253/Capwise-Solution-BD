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
- Homepage Industries Served section and `/industries` overview
- Premium homepage Team Preview and `/team` route
- Homepage Guides & Regulatory Insights Preview
- Working `/resources`, `/resources/guides`, and `/resources/regulatory-updates` routes
- Resource dark-card contrast correction across light and dark themes
- Premium global route-transition loader and App Router `loading.jsx` fallback
- Premium global `not-found.jsx` and recoverable `error.jsx`
- Premium homepage Client Evidence preview without fabricated testimonials
- Professional `/testimonials` evidence-standard page with approval-safe empty state
- Premium homepage FAQ Preview and full `/faq` route with matching FAQ JSON-LD
- Premium homepage Consultation CTA and working `/contact` route
- Consultation form prepares a transparent direct email without pretending data was stored
- New `/about` and `/business-in-bangladesh` routes
- Global premium footer with only working internal links
- All currently published literal internal links resolve to a real route

## Current verification state

- JavaScript/JSX syntax parsing: passed across 54 source files
- Local import resolution: passed
- Literal internal route audit: 0 missing routes
- `npm run lint` and `npm run build`: required on the owner's local machine before commit

## Important content safeguards

- FAQ, guides, team details and all business copy remain draft content until client approval.
- Testimonials, client logos, case outcomes and identities must not be published without written approval and confidentiality review.
- Tax, VAT, legal and regulatory information requires current official-source verification and visible review dates.
- The contact form currently opens the visitor's email application. A secure server endpoint, validation schema, persistence, spam protection and notification workflow must be added before final production.

## Technical alignment backlog

The current codebase predates the final master-prompt library decisions in two areas:

- It uses `motion` instead of the preferred GSAP strategy.
- It uses `react-hot-toast` instead of the preferred React-Toastify strategy.

Do not perform a rushed library migration inside a content stage. Reconcile these deliberately after route/content completion, with regression testing for animation, theme, accessibility and bundle size.

The approved production form stack (`react-hook-form`, `zod`, `@hookform/resolvers`) and secure backend persistence are also pending the dedicated forms/API stage.

## Remaining major stages

- Comprehensive footer legal links after legal drafts are created and reviewed
- Newsletter/resource subscription
- Business in Bangladesh detail routes
- Blog and regulatory article architecture
- Privacy Policy, Terms of Use and Professional Disclaimer
- Secure form API, validation, MongoDB persistence, spam protection and rate limiting
- Guided FAQ assistant knowledge review and human escalation workflow
- Approved WhatsApp/Messenger configuration and official social links
- Technical SEO files, structured data expansion, sitemap, robots and OG assets
- Selective motion-system reconciliation and final animation polish
- Accessibility, performance, responsive, security and production-build QA
- Vercel preview, client review, domain connection and handover documentation
