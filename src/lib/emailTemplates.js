import "server-only";

const brand = {
  navy: "#0B1F33",
  navy2: "#123A56",
  teal: "#14B8A6",
  darkTeal: "#0F766E",
  pale: "#F2F7F5",
  text: "#0F172A",
  muted: "#64748B",
  border: "#D9E3E8",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${brand.border};width:34%;vertical-align:top;font-size:12px;line-height:18px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</td>
      <td style="padding:14px 0;border-bottom:1px solid ${brand.border};vertical-align:top;font-size:14px;line-height:22px;font-weight:600;color:${brand.text};">${escapeHtml(value || "Not provided")}</td>
    </tr>`;
}

function shell({ preheader, eyebrow, title, subtitle, content, reference }) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#EEF4F5;font-family:Arial,Helvetica,sans-serif;color:${brand.text};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#EEF4F5;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;background:#FFFFFF;border:1px solid ${brand.border};border-radius:20px;overflow:hidden;box-shadow:0 24px 70px rgba(11,31,51,.12);">
        <tr>
          <td style="padding:30px 34px;background:${brand.navy};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="font-size:20px;line-height:24px;font-weight:800;letter-spacing:-.03em;color:#FFFFFF;">CAPWISE</div>
                  <div style="margin-top:2px;font-size:9px;line-height:13px;font-weight:700;letter-spacing:.22em;color:${brand.teal};">SOLUTION BD</div>
                </td>
                <td align="right" style="font-size:11px;line-height:16px;color:rgba(255,255,255,.55);">Wise Choice for Your Finance.</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 34px 16px;">
            <div style="font-size:10px;line-height:16px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:${brand.darkTeal};">${escapeHtml(eyebrow)}</div>
            <h1 style="margin:10px 0 0;font-size:30px;line-height:36px;letter-spacing:-.04em;color:${brand.navy};">${escapeHtml(title)}</h1>
            <p style="margin:12px 0 0;font-size:14px;line-height:23px;color:${brand.muted};">${escapeHtml(subtitle)}</p>
            ${reference ? `<div style="display:inline-block;margin-top:18px;padding:8px 12px;border-radius:999px;background:${brand.pale};font-size:11px;line-height:16px;font-weight:800;letter-spacing:.08em;color:${brand.darkTeal};">REFERENCE&nbsp; ${escapeHtml(reference)}</div>` : ""}
          </td>
        </tr>
        <tr><td style="padding:14px 34px 36px;">${content}</td></tr>
        <tr>
          <td style="padding:24px 34px;background:${brand.pale};border-top:1px solid ${brand.border};">
            <p style="margin:0;font-size:12px;line-height:20px;color:${brand.muted};">Capwise Solution BD · Level-03, House 76/A, Road 11, Banani, Dhaka-1213, Bangladesh</p>
            <p style="margin:5px 0 0;font-size:12px;line-height:20px;color:${brand.muted};">01624 000 381 · info@capwisebd.com</p>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-size:10px;line-height:16px;color:#7A8A96;">General information only. Do not send confidential tax, identity, banking or company documents by reply unless a Capwise adviser provides a secure channel.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

export function consultationOwnerEmail({ reference, data, submittedAt }) {
  const message = escapeHtml(data.message).replaceAll("\n", "<br>");
  const replyHref = `mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: ${reference} — Capwise consultation`)}`;
  const phoneHref = data.phone ? `tel:${String(data.phone).replace(/[^+\d]/g, "")}` : null;
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${row("Full name", data.name)}
      ${row("Work email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Company", data.company)}
      ${row("Service interest", data.service)}
      ${row("Submitted", submittedAt)}
      ${row("Source", data.sourcePath || "/contact")}
    </table>
    <div style="margin-top:24px;padding:22px;border:1px solid ${brand.border};border-radius:14px;background:#F8FAFC;">
      <div style="font-size:10px;line-height:16px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${brand.darkTeal};">Client briefing</div>
      <div style="margin-top:10px;font-size:14px;line-height:24px;color:${brand.text};">${message}</div>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;">
      <tr>
        <td style="padding-right:10px;">
          <a href="${replyHref}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:${brand.darkTeal};font-size:12px;line-height:18px;font-weight:800;text-decoration:none;color:#FFFFFF;">Reply to visitor</a>
        </td>
        ${phoneHref ? `<td><a href="${phoneHref}" style="display:inline-block;padding:11px 17px;border:1px solid ${brand.border};border-radius:999px;background:#FFFFFF;font-size:12px;line-height:18px;font-weight:800;text-decoration:none;color:${brand.navy};">Call visitor</a></td>` : ""}
      </tr>
    </table>
    <div style="margin-top:20px;padding:16px 18px;border-left:3px solid ${brand.teal};background:${brand.pale};font-size:12px;line-height:20px;color:${brand.muted};">Replying to the delivered email will also respond to <strong style="color:${brand.text};">${escapeHtml(data.name)}</strong>, because the website sets the visitor email as Reply-To.</div>`;

  const text = [
    `CAPWISE CONSULTATION ENQUIRY`,
    `Reference: ${reference}`,
    `Submitted: ${submittedAt}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Company: ${data.company || "Not provided"}`,
    `Service: ${data.service}`,
    `Source: ${data.sourcePath || "/contact"}`,
    "",
    "Client briefing:",
    data.message,
  ].join("\n");

  return {
    subject: `[${reference}] ${data.service} consultation request — ${data.name}`,
    html: shell({
      preheader: `New ${data.service} enquiry from ${data.name}`,
      eyebrow: "New website enquiry",
      title: "A client has requested a consultation.",
      subtitle: "Review the briefing below, then reply to the visitor from this email thread.",
      content,
      reference,
    }),
    text,
  };
}

export function consultationAcknowledgementEmail({ reference, data }) {
  const content = `
    <div style="padding:22px;border:1px solid ${brand.border};border-radius:14px;background:#F8FAFC;">
      <div style="font-size:10px;line-height:16px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${brand.darkTeal};">What we received</div>
      <p style="margin:10px 0 0;font-size:14px;line-height:23px;color:${brand.text};"><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      <p style="margin:5px 0 0;font-size:14px;line-height:23px;color:${brand.text};"><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
    </div>
    <p style="margin:22px 0 0;font-size:14px;line-height:24px;color:${brand.muted};">A Capwise team member will review the information and respond using the contact details provided. Timing depends on the nature and urgency of the enquiry.</p>
    <p style="margin:14px 0 0;font-size:14px;line-height:24px;color:${brand.muted};">Please do not send confidential records or identity documents until the team confirms an appropriate secure channel.</p>`;

  return {
    subject: `We received your Capwise enquiry — ${reference}`,
    html: shell({
      preheader: `Capwise received your consultation request ${reference}`,
      eyebrow: "Enquiry received",
      title: `Thank you, ${data.name}.`,
      subtitle: "Your initial consultation request is now with the Capwise advisory team.",
      content,
      reference,
    }),
    text: `Thank you, ${data.name}. We received your Capwise consultation request. Reference: ${reference}. Service: ${data.service}. A team member will review it and respond using the contact details you supplied. Please do not send sensitive documents until a secure channel is confirmed.`,
  };
}

export function resourceOwnerEmail({ reference, data, submittedAt }) {
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Company", data.company)}
      ${row("Resource", data.resourceTitle)}
      ${row("Resource ID", data.resourceSlug)}
      ${row("Submitted", submittedAt)}
    </table>
    <div style="margin-top:22px;padding:16px 18px;border-left:3px solid ${brand.teal};background:${brand.pale};font-size:12px;line-height:20px;color:${brand.muted};">This is an interest request only. Do not promise a release date until the guide has completed content, legal and client approval.</div>`;

  return {
    subject: `[${reference}] Guide interest — ${data.resourceTitle}`,
    html: shell({
      preheader: `${data.name} requested release notification for ${data.resourceTitle}`,
      eyebrow: "Resource lead",
      title: "A visitor requested a guide update.",
      subtitle: "Record the interest and notify the visitor only when an approved version is ready.",
      content,
      reference,
    }),
    text: `Resource request ${reference}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nResource: ${data.resourceTitle}\nSubmitted: ${submittedAt}`,
  };
}

export function newsletterOwnerEmail({ reference, data, submittedAt }) {
  const content = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Company", data.company)}
      ${row("Topics", data.topics.join(", "))}
      ${row("Submitted", submittedAt)}
    </table>
    <div style="margin-top:22px;padding:16px 18px;border-left:3px solid ${brand.teal};background:${brand.pale};font-size:12px;line-height:20px;color:${brand.muted};">Only send reviewed regulatory updates with an official source, a visible last-reviewed date and an unsubscribe process.</div>`;

  return {
    subject: `[${reference}] Regulatory update subscription — ${data.email}`,
    html: shell({
      preheader: `${data.name} subscribed to Capwise regulatory updates` ,
      eyebrow: "Update subscription",
      title: "A visitor joined the regulatory update list.",
      subtitle: "The requested topics are listed below for editorial segmentation.",
      content,
      reference,
    }),
    text: `Regulatory subscription ${reference}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nTopics: ${data.topics.join(", ")}\nSubmitted: ${submittedAt}`,
  };
}
