# Capwise Resend Email Setup

## Local environment

Keep the existing `.env.local` file. Add:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

RESEND_API_KEY=re_your_real_api_key
RESEND_FROM_EMAIL=Capwise Website <onboarding@resend.dev>

CONSULTATION_TO_EMAIL=abrahman5676@gmail.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=false

MONGODB_URI=
MONGODB_DB_NAME=capwisebd

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Restart `npm run dev` after changing environment variables.

## Real delivery test

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run test:email
```

Check `abrahman5676@gmail.com`. The message should contain the Capwise layout, enquiry reference, visitor details, service, briefing, time and Reply-To behavior.

## Production

Verify `capwisebd.com` in Resend, then use a domain sender such as:

```env
NEXT_PUBLIC_SITE_URL=https://capwisebd.com
RESEND_FROM_EMAIL=Capwise Solution BD <website@capwisebd.com>
CONSULTATION_TO_EMAIL=info@capwisebd.com
CONSULTATION_REPLY_TO=info@capwisebd.com
SEND_CLIENT_ACKNOWLEDGEMENT=true
```

Do not place the Resend key in a `NEXT_PUBLIC_*` variable or commit `.env.local`.
