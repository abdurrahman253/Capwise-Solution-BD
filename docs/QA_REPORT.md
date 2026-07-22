# Static QA Report

Date: 2026-07-22

## Passed in the delivery environment

- Source files checked: 86 JavaScript/JSX files
- Import declarations checked: 240
- JavaScript/JSX syntax diagnostics: 0
- Missing local imports: 0
- Potential unused imports: 0
- Page route patterns: 23
- Literal internal links checked: 59
- Missing internal routes: 0
- Service data: 7 unique slugs
- Industry data: 5 unique slugs
- Business-in-Bangladesh data: 5 unique slugs
- Unknown industry-to-service references: 0
- Consultation HTML/plain-text email template generation: passed
- CSS brace balance: passed
- Placeholder secret-pattern scan: passed

## Not completed here

`npm install --package-lock-only` timed out because the npm registry was not reachable from this environment. Therefore the following must be completed on the owner's machine after `npm install` updates the stale uploaded lockfile:

```bash
npm run lint
npm run build
npm run dev
npm run test:email
```

A successful `npm run test:email` requires a real `RESEND_API_KEY`, a permitted sender and a running local server. The target recipient is configured as `abrahman5676@gmail.com` in `.env.example`.
