import { consultationOwnerEmail, consultationAcknowledgementEmail } from "@/lib/emailTemplates";
import { insertOptional } from "@/lib/mongodb";
import { createReference } from "@/lib/references";
import { sendTransactionalEmail } from "@/lib/resend";
import {
  checkRateLimit,
  getClientIp,
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

export async function GET() {
  return noStoreJson({
    ok: true,
    route: "consultations",
    emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
    persistenceConfigured: Boolean(process.env.MONGODB_URI),
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
  if (data.website) return noStoreJson({ ok: true });

  if (!hasHumanCompletionTime(data.startedAt)) {
    return noStoreJson(
      { error: "The form was submitted too quickly. Please review the details and try again." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return noStoreJson(
      {
        error:
          "Email delivery is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to .env.local, then restart the dev server.",
        code: "EMAIL_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  const reference = createReference("CAP");
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  const ownerRecipient = process.env.CONSULTATION_TO_EMAIL || "info@capwisebd.com";
  const ownerTemplate = consultationOwnerEmail({ reference, data, submittedAt });

  try {
    const delivery = await sendTransactionalEmail({
      to: ownerRecipient,
      ...ownerTemplate,
      replyTo: data.email,
    });

    let acknowledgementSent = false;
    if (process.env.SEND_CLIENT_ACKNOWLEDGEMENT === "true") {
      try {
        const acknowledgement = consultationAcknowledgementEmail({ reference, data });
        await sendTransactionalEmail({
          to: data.email,
          ...acknowledgement,
          replyTo: process.env.CONSULTATION_REPLY_TO || "info@capwisebd.com",
        });
        acknowledgementSent = true;
      } catch (error) {
        console.error("[Capwise] Client acknowledgement failed", {
          reference,
          name: error?.name,
          message: error?.message,
        });
      }
    }

    const persistence = await insertOptional("consultations", {
      reference,
      ...data,
      website: undefined,
      emailStatus: "sent",
      emailProviderId: delivery?.id || null,
      acknowledgementSent,
      submittedAt: new Date(),
      source: "website",
      requestMeta: {
        ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) || null,
      },
    });

    return noStoreJson(
      {
        ok: true,
        reference,
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

    await insertOptional("consultations", {
      reference,
      ...data,
      website: undefined,
      emailStatus: "failed",
      submittedAt: new Date(),
      source: "website",
    });

    return noStoreJson(
      {
        error:
          "We could not deliver the enquiry right now. Please call or WhatsApp Capwise, or try again shortly.",
        reference,
      },
      { status: 502 },
    );
  }
}
