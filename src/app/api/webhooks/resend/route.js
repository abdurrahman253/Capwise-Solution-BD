import { Resend } from "resend";

import { getDatabase, isMongoConfigured, updateOptional } from "@/lib/mongodb";
import { noStoreJson } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const deliveryStatusByEvent = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.delivery_delayed": "delayed",
  "email.bounced": "bounced",
  "email.failed": "failed",
  "email.suppressed": "suppressed",
  "email.complained": "complained",
};

export async function POST(request) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!webhookSecret || !isMongoConfigured()) {
    return noStoreJson(
      { error: "Resend webhook processing is not configured." },
      { status: 503 },
    );
  }

  const eventId = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");

  if (!eventId || !timestamp || !signature) {
    return noStoreJson({ error: "Missing webhook signature headers." }, { status: 400 });
  }

  const payload = await request.text();
  let event;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY || "re_webhook_verification_only");
    event = await resend.webhooks.verify({
      payload,
      headers: { id: eventId, timestamp, signature },
      webhookSecret,
    });
  } catch {
    return noStoreJson({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const emailProviderId = event?.data?.email_id || null;
  const eventDate = new Date(event?.created_at || Date.now());
  const database = await getDatabase();

  try {
    await database.collection("resend_events").insertOne({
      eventId,
      type: event?.type || "unknown",
      emailProviderId,
      recipientCount: Array.isArray(event?.data?.to) ? event.data.to.length : null,
      providerCreatedAt: eventDate,
      createdAt: new Date(),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return noStoreJson({ ok: true, duplicate: true });
    }
    console.error("[Capwise] Resend webhook event persistence failed", {
      name: error?.name,
      message: error?.message,
    });
    return noStoreJson({ error: "Webhook event could not be recorded." }, { status: 500 });
  }

  const deliveryStatus = deliveryStatusByEvent[event?.type];
  if (emailProviderId && deliveryStatus) {
    const statusField = {
      "email.delivered": "emailDeliveredAt",
      "email.delivery_delayed": "emailDelayedAt",
      "email.bounced": "emailBouncedAt",
      "email.failed": "emailFailedAt",
      "email.suppressed": "emailSuppressedAt",
      "email.complained": "emailComplainedAt",
    }[event.type];

    await updateOptional(
      "consultations",
      { emailProviderId },
      {
        $set: {
          emailStatus: deliveryStatus,
          latestEmailEvent: event.type,
          latestEmailEventAt: eventDate,
          ...(statusField ? { [statusField]: eventDate } : {}),
          updatedAt: new Date(),
        },
      },
    );
  }

  return noStoreJson({ ok: true });
}
