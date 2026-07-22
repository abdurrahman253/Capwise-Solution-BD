import "server-only";

import { Resend } from "resend";

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export async function sendTransactionalEmail({ to, subject, html, text, replyTo }) {
  if (!isResendConfigured()) {
    const error = new Error("Transactional email is not configured.");
    error.code = "EMAIL_NOT_CONFIGURED";
    throw error;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    replyTo,
  });

  if (result.error) {
    const error = new Error(result.error.message || "Email delivery failed.");
    error.code = result.error.name || "EMAIL_DELIVERY_FAILED";
    throw error;
  }

  return result.data;
}
