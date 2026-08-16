# Client Portal Decision Gate

The public site should not display a decorative login or an empty dashboard. Build the portal only after Capwise approves a real operational use case.

## Recommended first release

- Firebase Authentication with approved sign-in methods.
- Server-side token verification with Firebase Admin.
- Roles: client user, Capwise adviser, Capwise administrator.
- Consultation/request status: received, under review, information requested, in progress, completed, closed.
- Secure document-request checklist. Do not accept sensitive records through the public contact form.
- Message history connected to a specific request.
- Audit log for role, status and document actions.
- Admin lead/request queue with ownership and due dates.

## Decisions required before development

1. Who may create a client account?
2. Which documents are permitted, maximum sizes and retention periods?
3. Who can view, download and delete each document?
4. Which status changes trigger email notifications?
5. What is the escalation and response-time policy?
6. What data must be exported or deleted when an engagement closes?

The portal should be scoped as a separate verified stage after the public conversion, content and security foundation is stable.
