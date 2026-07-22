# Stage Delivery — FAQ, Consultation, Evidence & Route UX

Date: 2026-07-22

## Immediate objectives completed

1. Correct dark-card text contrast on Resources surfaces.
2. Add a premium custom 404 and recoverable error state.
3. Add a branded route-transition loader and App Router loading fallback.
4. Add homepage FAQ Preview and full FAQ page with matching FAQ schema.
5. Add homepage Consultation CTA and full contact page.
6. Add a professional testimonial/client-evidence page without fabricated quotes.
7. Remove current linked-route 404s by adding About and Doing Business overview pages.
8. Add a global premium footer using only working routes.

## Local verification commands

```bash
cd /c/Projects/capwisebd/client-side
npm run lint
npm run build
npm run dev
```

## Routes to verify

- `/`
- `/about`
- `/business-in-bangladesh`
- `/contact`
- `/faq`
- `/testimonials`
- `/resources`
- `/resources/guides`
- `/resources/regulatory-updates`
- `/this-route-does-not-exist` (custom 404)

## Important production note

The contact form currently prepares a direct email in the visitor's email application. It does not claim to persist data. Secure API submission, shared validation, persistence, abuse protection and notifications belong to the dedicated backend/forms stage.
