import { consultationAcknowledgementEmail, consultationOwnerEmail } from "@/lib/emailTemplates";
import { insertOptional, isMongoConfigured, updateOptional } from "@/lib/mongodb";
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
import { consultationSchema } from "@/schemas/consultation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validationPayload(error) {
  return error.issues.reduce((fields, issue) => {
    const key = issue.path[0] || "form";
    if (!fields[key]) fields[key] = issue.message;
    return fields;
  }, {});
}

function formatDhakaTime(date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

export async function GET() {
  const email = getEmailConfiguration();
  return noStoreJson({
    ok: true,
    route: "consultations",
    emailConfigured: email.configured,
    emailMode: email.mode,
    recipientConfigured: email.recipientConfigured,
    persistenceConfigured: isMongoConfigured(),
  });
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return noStoreJson({ error: "This request origin is not allowed." }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = await checkRateLimit({
    namespace: "consultations",
    identifier: ip,
    limit: 5,
    windowSeconds: 900,
  });

  if (!limit.allowed) {
    return noStoreJson(
      { error: "Too many enquiries were submitted from this connection. Please wait and try again." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return noStoreJson({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return noStoreJson(
      { error: "Please review the highlighted fields.", fields: validationPayload(parsed.error) },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.capwiseFormCheck) {
    return noStoreJson({ ok: true, ignored: true });
  }

  if (!hasHumanCompletionTime(data.startedAt)) {
    return noStoreJson(
      { error: "The form was submitted too quickly. Please review the details and try again." },
      { status: 400 },
    );
  }

  const emailConfig = getEmailConfiguration();
  const persistenceConfigured = isMongoConfigured();

  if (!emailConfig.configured && !persistenceConfigured) {
    return noStoreJson(
      {
        error:
          "Consultation delivery is not configured yet. Add MongoDB persistence or Resend email delivery, then restart the server.",
        code: "CONSULTATION_WORKFLOW_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const reference = createReference("CAP");
  const now = new Date();
  const submittedAt = formatDhakaTime(now);
  const { capwiseFormCheck, startedAt, consent, ...leadData } = data;
  const emailNormalized = data.email.trim().toLowerCase();

  const persistence = await insertOptional("consultations", {
    reference,
    ...leadData,
    emailNormalized,
    status: "new",
    emailStatus: emailConfig.configured ? "pending" : "not-configured",
    acknowledgementStatus:
      emailConfig.acknowledgementEnabled && emailConfig.configured ? "pending" : "not-requested",
    consent: {
      accepted: consent,
      version: "consultation-consent-v1-20260723",
      acceptedAt: now,
    },
    source: "website-consultation",
    requestMeta: getRequestMeta(request, ip),
    createdAt: now,
    updatedAt: now,
  });

  if (!emailConfig.configured) {
    if (!persistence.persisted) {
      return noStoreJson(
        { error: "We could not record the enquiry right now. Please call or WhatsApp Capwise." },
        { status: 502 },
      );
    }

    return noStoreJson(
      {
        ok: true,
        reference,
        deliveryStatus: "stored-only",
        persisted: true,
        acknowledgementSent: false,
        message:
          "Your consultation request has been recorded. Email notification is still being configured, so please keep the reference for follow-up.",
      },
      { status: 202 },
    );
  }

  const ownerRecipient = process.env.CONSULTATION_TO_EMAIL || "info@capwisebd.com";
  const ownerTemplate = consultationOwnerEmail({ reference, data, submittedAt });

  try {
    const delivery = await sendTransactionalEmail({
      to: ownerRecipient,
      ...ownerTemplate,
      replyTo: data.email,
    });

    let acknowledgementSent = false;
    let acknowledgementStatus = "not-requested";

    if (emailConfig.acknowledgementEnabled) {
      acknowledgementStatus = "pending";
      try {
        const acknowledgement = consultationAcknowledgementEmail({ reference, data });
        await sendTransactionalEmail({
          to: data.email,
          ...acknowledgement,
          replyTo: process.env.CONSULTATION_REPLY_TO || "info@capwisebd.com",
        });
        acknowledgementSent = true;
        acknowledgementStatus = "sent";
      } catch (error) {
        acknowledgementStatus = "failed";
        console.error("[Capwise] Client acknowledgement failed", {
          reference,
          name: error?.name,
          message: error?.message,
          code: error?.code,
        });
      }
    }

    await updateOptional(
      "consultations",
      { reference },
      {
        $set: {
          emailStatus: "sent",
          emailProviderId: delivery?.id || null,
          emailSentAt: new Date(),
          acknowledgementSent,
          acknowledgementStatus,
          updatedAt: new Date(),
        },
      },
    );

    return noStoreJson(
      {
        ok: true,
        reference,
        deliveryStatus: "sent",
        message: "Your consultation request has been sent to the Capwise team.",
        acknowledgementSent,
        persisted: persistence.persisted,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Capwise] Consultation email failed", {
      reference,
      name: error?.name,
      message: error?.message,
      code: error?.code,
    });

    await updateOptional(
      "consultations",
      { reference },
      {
        $set: {
          emailStatus: "failed",
          emailErrorCode: error?.code || "EMAIL_DELIVERY_FAILED",
          emailFailedAt: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    if (persistence.persisted) {
      return noStoreJson(
        {
          ok: true,
          reference,
          deliveryStatus: "email-failed",
          persisted: true,
          acknowledgementSent: false,
          message:
            "Your request was recorded, but the email notification is delayed. Keep the reference or contact Capwise directly if the matter is urgent.",
        },
        { status: 202 },
      );
    }

    return noStoreJson(
      {
        error:
          "We could not deliver or record the enquiry right now. Please call or WhatsApp Capwise, or try again shortly.",
        reference,
      },
      { status: 502 },
    );
  }
}
