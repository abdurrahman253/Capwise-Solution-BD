import { getGuidedAssistantReply } from "@/lib/capwiseAssistant";
import { checkRateLimit, getClientIp, noStoreJson } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return noStoreJson({
    ok: true,
    mode: "approved-guided-faq",
    message: "Capwise guided support is available through POST requests.",
  });
}

export async function POST(request) {
  const rate = await checkRateLimit({
    namespace: "guided-assistant",
    identifier: getClientIp(request),
    limit: 20,
    windowSeconds: 300,
  });

  if (!rate.allowed) {
    return noStoreJson(
      { error: "Too many messages in a short time. Please wait and try again." },
      { status: 429, headers: { "Retry-After": "300" } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return noStoreJson({ error: "Please send a valid question." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages.slice(-8) : [];
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message?.role === "user" && typeof message?.content === "string")
    ?.content.trim()
    .slice(0, 700);

  if (!latestUserMessage) {
    return noStoreJson({ error: "Please enter a question before sending." }, { status: 400 });
  }

  return noStoreJson({
    ok: true,
    mode: "approved-guided-faq",
    reply: getGuidedAssistantReply(latestUserMessage),
  });
}
