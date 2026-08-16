import "server-only";

import { Resend } from "resend";

function getSenderAddress() {
  const value = process.env.RESEND_FROM_EMAIL?.trim() || "";
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim().toLowerCase();
}

export function getEmailConfiguration() {
  const sender = getSenderAddress();
  const apiKeyConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
  const senderConfigured = Boolean(sender);
  const recipientConfigured = Boolean(process.env.CONSULTATION_TO_EMAIL?.trim());

  return {
    configured: apiKeyConfigured && senderConfigured,
    apiKeyConfigured,
    senderConfigured,
    recipientConfigured,
    mode: sender.endsWith("@resend.dev") ? "resend-test-domain" : sender ? "verified-domain" : "not-configured",
    acknowledgementEnabled: process.env.SEND_CLIENT_ACKNOWLEDGEMENT === "true",
  };
}

export function isResendConfigured() {
  return getEmailConfiguration().configured;
}

export async function sendTransactionalEmail({ to, subject, html, text, replyTo }) {
  if (!isResendConfigured()) {
    const error = new Error("Transactional email is not configured.");
    error.code = "EMAIL_NOT_CONFIGURED";
    throw error;
  }

  const recipients = (Array.isArray(to) ? to : [to])
    .map((value) => String(value || "").trim())
    .filter(Boolean);

  if (!recipients.length) {
    const error = new Error("No email recipient was configured.");
    error.code = "EMAIL_RECIPIENT_MISSING";
    throw error;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: recipients,
    subject,
    html,
    text,
    replyTo: replyTo || undefined,
  });

  if (result.error) {
    const error = new Error(result.error.message || "Email delivery failed.");
    error.code = result.error.name || "EMAIL_DELIVERY_FAILED";
    error.details = result.error;
    throw error;
  }

  return result.data;
}
