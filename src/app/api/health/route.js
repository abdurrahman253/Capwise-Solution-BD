import { pingDatabase } from "@/lib/mongodb";
import { getEmailConfiguration } from "@/lib/resend";
import { noStoreJson } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [database, email] = await Promise.all([
    pingDatabase(),
    Promise.resolve(getEmailConfiguration()),
  ]);

  const ready = database.reachable && email.configured && email.recipientConfigured;

  return noStoreJson(
    {
      ok: true,
      status: ready ? "ready" : "configuration-required",
      checks: {
        database: {
          configured: database.configured,
          reachable: database.reachable,
        },
        email: {
          configured: email.configured,
          recipientConfigured: email.recipientConfigured,
          mode: email.mode,
          acknowledgementEnabled: email.acknowledgementEnabled,
        },
      },
      checkedAt: new Date().toISOString(),
    },
    { status: ready ? 200 : 200 },
  );
}
