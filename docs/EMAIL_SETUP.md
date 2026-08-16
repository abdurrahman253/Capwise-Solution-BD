# Capwise Resend Email Setup

## Why MongoDB works but Gmail receives nothing

MongoDB and email are separate services. A successful MongoDB connection records the lead, but an email is only sent when all three values exist and the dev server has been restarted:

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONSULTATION_TO_EMAIL=
```

## Test configuration

Keep the existing `.env.local` and add:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

RESEND_API_KEY=re_your_real_api_key
RESEND_FROM_EMAIL=Capwise Website <onboarding@resend.dev>
CONSULTATION_TO_EMAIL=your-testing-email@example.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=false
```

Important: `onboarding@resend.dev` is a test sender. It only delivers to the email attached to the Resend account. Therefore the test recipient must match the email address attached to the Resend account, or a Capwise-owned domain must be verified before sending elsewhere.

Restart the server after every `.env.local` change:

```bash
Ctrl + C
npm run dev
```

## Verify configuration

```bash
npm run check:setup
```

Open:

```text
http://localhost:3000/api/health
```

Expected email section:

```json
{
  "configured": true,
  "recipientConfigured": true,
  "mode": "resend-test-domain"
}
```

## Preview the exact template

Open:

```text
http://localhost:3000/email-preview
```

This shows both the team notification and optional visitor acknowledgement without sending an email. The route is disabled in production unless explicitly enabled.

## Real delivery test

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run test:email
```

The script checks `/api/health` before submitting the test. A successful result must include:

```text
deliveryStatus: sent
```

Then check the Inbox, Promotions and Spam folders of the configured test recipient. Also check the Resend dashboard email log for delivered, bounced or rejected status.

## Production

Verify a Capwise-owned domain in Resend, add its DNS records and use:

```env
NEXT_PUBLIC_SITE_URL=https://capwisebd.com
RESEND_FROM_EMAIL=Capwise Solution BD <website@capwisebd.com>
CONSULTATION_TO_EMAIL=info@capwisebd.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=true
RESEND_WEBHOOK_SECRET=whsec_your_real_signing_secret
ENABLE_EMAIL_PREVIEW=false
```

Never put the Resend API key in a `NEXT_PUBLIC_*` variable and never commit `.env.local`.


## Delivery-status webhook

After production deployment, add a Resend webhook for:

```text
https://capwisebd.com/api/webhooks/resend
```

Subscribe to `email.sent`, `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.failed`, `email.suppressed` and `email.complained`. Put the signing secret in `RESEND_WEBHOOK_SECRET` and redeploy. Verified events update the matching MongoDB consultation by Resend provider email ID and are deduplicated in `resend_events`.
