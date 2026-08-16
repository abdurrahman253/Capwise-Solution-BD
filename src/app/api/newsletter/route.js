import { newsletterOwnerEmail } from "@/lib/emailTemplates";
import { isMongoConfigured, upsertOptional } from "@/lib/mongodb";
import { createReference } from "@/lib/references";
import { getEmailConfiguration, sendTransactionalEmail } from "@/lib/resend";
import {
  checkRateLimit,
  getClientIp,
  getRequestMeta,
  hasHumanCompletionTime,
  isAllowedOrigin,
  noStoreJson,
} from "@/lib/security";
import { newsletterSchema } from "@/schemas/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return noStoreJson({ error: "This request origin is not allowed." }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = await checkRateLimit({
    namespace: "newsletter",
    identifier: ip,
    limit: 6,
    windowSeconds: 3600,
  });
  if (!limit.allowed) {
    return noStoreJson({ error: "Too many subscription attempts. Please try again later." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return noStoreJson({ error: "Please submit valid subscription details." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return noStoreJson(
      { error: parsed.error.issues[0]?.message || "Please review the form." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) return noStoreJson({ ok: true });
  if (!hasHumanCompletionTime(data.startedAt, 1200)) {
    return noStoreJson({ error: "Please review the form before subscribing." }, { status: 400 });
  }

  const emailConfig = getEmailConfiguration();
  if (!emailConfig.configured && !isMongoConfigured()) {
    return noStoreJson(
      {
        error:
          "This workflow is not configured yet. Add Resend email delivery or MongoDB persistence, then restart the server.",
        code: "WORKFLOW_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const reference = createReference("UPDATE");
  const now = new Date();
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(now);
  const emailNormalized = data.email.trim().toLowerCase();

  let emailStatus = "not-configured";
  if (emailConfig.configured) {
    try {
      const template = newsletterOwnerEmail({ reference, data, submittedAt });
      await sendTransactionalEmail({
        to: process.env.CONSULTATION_TO_EMAIL || "info@capwisebd.com",
        ...template,
        replyTo: data.email,
      });
      emailStatus = "sent";
    } catch (error) {
      emailStatus = "failed";
      console.error("[Capwise] Newsletter email failed", {
        reference,
        name: error?.name,
        message: error?.message,
        code: error?.code,
      });
    }
  }

  const persistence = await upsertOptional(
    "newsletter_subscribers",
    { emailNormalized },
    {
      $set: {
        reference,
        name: data.name,
        email: data.email,
        emailNormalized,
        company: data.company || "",
        topics: data.topics,
        status: "subscribed-pending-editorial-list",
        emailStatus,
        consent: {
          accepted: data.consent,
          version: "regulatory-updates-consent-v1-20260723",
          acceptedAt: now,
        },
        requestMeta: getRequestMeta(request, ip),
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
  );

  if (emailStatus === "failed" && !persistence.persisted) {
    return noStoreJson(
      { error: "We could not record the subscription right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return noStoreJson(
    {
      ok: true,
      reference,
      message: "Your update preferences have been recorded.",
      deliveryStatus: emailStatus,
      persisted: persistence.persisted,
    },
    { status: emailStatus === "sent" ? 201 : 202 },
  );
}
