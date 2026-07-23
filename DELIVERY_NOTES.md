# Capwise Delivery Notes — Operational Polish v2

## Apply

Merge this folder into:

```text
C:\Projects\capwisebd\client-side
```

Preserve your existing `.git` and `.env.local`.

## Install and verify

```bash
cd /c/Projects/capwisebd/client-side
rm -rf node_modules .next
npm install
npm run check:setup
npm run lint
npm run build
npm run audit:routes
npm run dev
```

## Test the email appearance

Preview without sending:

```text
http://localhost:3000/email-preview
```

Real delivery, in a second terminal:

```bash
npm run test:email
```

Your private test recipient belongs only in `.env.local`, not in the public repository:

```env
RESEND_API_KEY=re_your_real_key
RESEND_FROM_EMAIL=Capwise Website <onboarding@resend.dev>
CONSULTATION_TO_EMAIL=your-private-test-email@example.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=false
```

Restart `npm run dev` after changing environment variables.

## Read next

- `docs/EMAIL_SETUP.md`
- `docs/MONGODB_DATA_MODEL.md`
- `docs/OPERATIONAL_POLISH_V2.md`
- `docs/PRE_LAUNCH_CHECKLIST.md`
- `docs/QA_REPORT.md`
