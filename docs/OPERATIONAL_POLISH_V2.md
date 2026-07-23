# Capwise Operational Polish v2

This delivery focuses on the gap between a visually premium marketing website and a production-grade advisory platform: reliable lead capture, observable email delivery, privacy-aware storage, safe evidence publishing and repeatable QA.

## What changed

### Consultation pipeline

`browser form → validated API → MongoDB lead record → branded Resend notification → optional visitor acknowledgement → signed delivery webhook → MongoDB delivery status`

A provider outage no longer discards a valid enquiry. The UI displays the real state and always provides a reference.

### MongoDB

- `consultations`: lead, consent, workflow and email status
- `guide_downloads`: deduplicated guide-release interest
- `newsletter_subscribers`: deduplicated reviewed-update subscriptions
- `resend_events`: signed, idempotent email delivery audit events

Collections and indexes are created automatically after successful use.

### Email test path

1. Configure Resend in `.env.local`.
2. Restart the dev server.
3. Open `/email-preview` to inspect the exact responsive template without sending.
4. Run `npm run check:setup`.
5. Run `npm run test:email` from a second terminal.
6. Confirm `deliveryStatus: sent`, the Resend log and the Gmail inbox.

### Release controls

- Empty/unapproved case studies, testimonials and blog content are not indexed.
- Unknown dynamic slugs return 404.
- Official social links appear only after configuration.
- Time-sensitive content has no fabricated automatic review date.
- GitHub Actions blocks obvious lint/build/route regressions.

## Remaining business inputs

The next material increase in perceived and real value depends on evidence and operations rather than more decorative UI: verified team photography, approved case studies, client testimonials, finished lead-magnet PDFs, domain-authenticated email, regulatory editorial ownership, a confirmed map/social presence and a defined consultation response process.
