# Capwise Premium Redesign — Implementation Notes

## What was upgraded

- Replaced the previous green/teal-led visual system with a Capwise navy, blue and gold brand system derived from the supplied official logo.
- Replaced the previous brand mark with the supplied Capwise logo and added a restrained motion treatment.
- Rebuilt the desktop header around About, Services, SME, Startup, Industries, Blogs, Careers and Contact.
- Added hover-open desktop dropdowns/mega menus with delayed close, keyboard access and mobile tap accordions.
- Removed the old "Practical compliance guidance for Bangladesh" homepage strip.
- Rebuilt the homepage hero as a seven-service Swiper carousel with relevant Pexels photography, autoplay, keyboard support and manual navigation.
- Simplified the homepage into an editorial, article-led structure with concise About, Services, Industries, Team and Insights sections.
- Featured Fahim Khan Chowdhury and Md Minhajul Islam more prominently in the team experience, while retaining the supporting team and adding Borhan Sarkar without inventing credentials.
- Added a new Insights architecture at `/insights` and `/insights/[slug]`, including 15 article pages, category filtering/search, related content, one CTA per article, Article schema and Breadcrumb schema.
- Added permanent redirects from legacy `/blog` routes to the new Insights routes.
- Added `/careers` without inventing vacancies.
- Added the required SME / Non-SME field to the consultation flow, including validation, API payload persistence and email templates.
- Added service-to-insight internal links and updated sitemap coverage.
- Reworked the footer, route progress indicator, metadata, manifest, Open Graph artwork and favicons around the official brand.
- Retained Lenis smooth scrolling and existing GSAP infrastructure, and added Motion plus Swiper for the upgraded interaction system.

## Added dependencies

- `motion`
- `swiper`
- `react-markdown`
- `remark-gfm`

## Local setup

The dependency lockfile was intentionally removed because the supplied lockfile no longer matched the upgraded dependency graph, and this execution environment could not reach the npm registry to safely regenerate it.

Run once on a machine with normal internet access:

```bash
npm install
npm run qa
```

`npm install` will generate a fresh `package-lock.json`. Commit that regenerated lockfile with the project before deployment.

## QA completed in this environment

- Route audit: passed — 0 missing internal routes.
- JavaScript/JSX/TypeScript syntax transpile audit: passed — 0 syntax errors.
- Internal source import resolution audit: passed — 0 unresolved internal imports.
- Source search for the removed homepage strip, old consultation CTA wording, retired logo references and old teal naming: clean.

## QA limitation

A full `npm install`, ESLint run and Next.js production build could not be executed in this sandbox because outbound DNS access to the npm registry is unavailable. This is an environment/network limitation, not a reported successful production build. Please run `npm install && npm run qa` before deployment.

## Client information still needed

Borhan Sarkar was added as requested, but no verified role, qualification, biography or specialty was supplied. The UI therefore uses a neutral placeholder rather than fabricating credentials. Replace it once the client confirms his professional details.
