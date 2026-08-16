# Capwise MongoDB Data Model

The website creates collections automatically after a successful write. Do not manually create the MongoDB `admin`, `local` or `oplog.rs` system collections.

## `consultations`

A document contains:

- `reference` — unique Capwise enquiry reference
- `name`, `email`, `phone`, `company`, `service`, `message`
- `emailNormalized` — supports search and deduplication workflows
- `status` — starts as `new`
- `emailStatus` — `pending`, `sent`, `failed` or `not-configured`
- `emailProviderId`, delivery timestamps and acknowledgement status when available
- versioned consent record
- `sourcePath`, privacy-reduced request metadata, `createdAt`, `updatedAt`

Indexes support reference lookup, newest-first queues, status queues and email history.

## `guide_downloads`

Despite the legacy collection name, documents represent approved-guide release notifications—not fake downloads. Requests are updated by email + resource slug to reduce duplicates.

## `newsletter_subscribers`

One current subscription document is maintained per normalized email. Re-submission updates topics, company, consent date and request metadata instead of creating duplicate rows.

## `resend_events`

Verified Resend delivery webhooks are stored by unique Svix event ID. The collection supports delivery, delay, bounce, failure, suppression and complaint audits without storing the full email body.

## Privacy

- Database passwords, Resend keys and user authentication passwords are never stored in these collections.
- Raw client IP addresses are not stored. A one-way hash is recorded for operational security and abuse investigation.
- Add a private `SECURITY_HASH_SALT` in production.
- Retention and deletion periods must be approved before launch.
