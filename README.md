# Capwise Solution BD

Premium Next.js App Router website for Capwise Solution BD, covering business compliance, company formation, accounting, tax, VAT, payroll, legal, regulatory and business advisory services in Bangladesh.

## Stack

- Next.js App Router, React and JavaScript/JSX
- Tailwind CSS design system with light/dark themes
- React Hook Form + Zod
- MongoDB Atlas using the official Node.js driver
- Resend transactional email
- GSAP, Lenis, Headless UI, Lucide and React-Toastify

## Local setup

```bash
cd /c/Projects/capwisebd/client-side
npm install
cp .env.example .env.local
npm run check:setup
npm run dev
```

Open `http://localhost:3000`.

Never commit `.env.local`. The repository only contains `.env.example` with empty credentials.

## MongoDB data

The public workflows create or update these collections only when used:

- `consultations` — consultation briefs, workflow status, email delivery status, consent version and privacy-reduced request metadata
- `guide_downloads` — guide release-notification interests, deduplicated by email and guide
- `newsletter_subscribers` — reviewed regulatory-update preferences, deduplicated by email
- `resend_events` — verified, deduplicated provider delivery-status events

Indexes are prepared automatically on the first successful database connection. The consultation record is saved before provider delivery is attempted, so a temporary email failure does not lose the lead. Passwords and authentication credentials are never stored in MongoDB.

## Consultation email test

1. Create a Resend API key.
2. Add the Resend and recipient variables to `.env.local`.
3. Restart the dev server.
4. Preview the exact HTML locally at `http://localhost:3000/email-preview`.
5. Run the real delivery test in a second terminal:

```bash
npm run test:email
```

During testing:

```env
RESEND_FROM_EMAIL=Capwise Website <onboarding@resend.dev>
CONSULTATION_TO_EMAIL=your-testing-email@example.com
SEND_CLIENT_ACKNOWLEDGEMENT=false
```

The `resend.dev` test sender can only deliver to the email attached to the Resend account. For production, verify a Capwise-owned domain and use a sender such as `website@capwisebd.com`.

## Health and QA

```bash
npm run check:setup
npm run audit:routes
npm run lint
npm run build
```

The runtime workflow health endpoint is:

```text
http://localhost:3000/api/health
```

GitHub Actions runs locked installation, lint, production build and internal-route audit on pushes and pull requests.

## Production environment

Configure the same server-only values in Vercel Project Settings → Environment Variables, then redeploy. At minimum:

```env
NEXT_PUBLIC_SITE_URL=https://capwisebd.com
MONGODB_URI=
MONGODB_DB_NAME=capwisebd
RESEND_API_KEY=
RESEND_FROM_EMAIL=Capwise Solution BD <website@capwisebd.com>
CONSULTATION_TO_EMAIL=info@capwisebd.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=true
RESEND_WEBHOOK_SECRET=
SECURITY_HASH_SALT=
```

## Launch gates

Do not launch unverified client evidence, team photos, credentials, time-sensitive rates, social URLs or legal copy. Final guide PDFs, case studies, testimonials, Google Maps pin, domain email authentication and legal review remain client-controlled launch inputs.
