import OpenAI from "openai";

import {
  capwiseAssistantInstructions,
  getGuidedAssistantReply,
} from "@/lib/capwiseAssistant";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REQUEST_WINDOW_MS = 60_000;
const REQUEST_LIMIT = 8;
const MAX_MESSAGES = 8;
const MAX_MESSAGE_LENGTH = 700;

const rateLimitStore =
  globalThis.__capwiseAssistantRateLimitStore || new Map();

if (!globalThis.__capwiseAssistantRateLimitStore) {
  globalThis.__capwiseAssistantRateLimitStore = rateLimitStore;
}

function getClientKey(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(clientKey) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + REQUEST_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(clientKey, current);

  return current.count > REQUEST_LIMIT;
}

function sanitizeMessages(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .slice(-MAX_MESSAGES)
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0);
}

function textResponse(body, init = {}) {
  return new Response(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      ...init.headers,
    },
  });
}





export function GET() {
  const isAiConfigured = Boolean(process.env.OPENAI_API_KEY);

  return Response.json(
    {
      ok: true,
      mode: isAiConfigured ? "ai-configured" : "guided",
      message: "Capwise Assistant route is running. Use POST to send messages.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request) {
  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      {
        error:
          "Too many messages in a short time. Please wait a minute and try again.",
      },
      {
        status: 429,
        headers: { "Cache-Control": "no-store", "Retry-After": "60" },
      },
    );
  }

  let requestBody;

  try {
    requestBody = await request.json();
  } catch {
    return Response.json(
      { error: "Please send a valid message." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const messages = sanitizeMessages(requestBody?.messages);
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  if (!latestUserMessage) {
    return Response.json(
      { error: "Please enter a question before sending." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return textResponse(getGuidedAssistantReply(latestUserMessage), {
      headers: { "X-Capwise-Assistant-Mode": "guided" },
    });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await openai.responses.create({
      model: process.env.OPENAI_ASSISTANT_MODEL || "gpt-5.6-terra",
      instructions: capwiseAssistantInstructions,
      input: messages,
      reasoning: { effort: "none" },
      text: { verbosity: "low" },
      max_output_tokens: 500,
      store: false,
      stream: true,
    });

    const encoder = new TextEncoder();
    const fallbackReply = getGuidedAssistantReply(latestUserMessage);

    const responseStream = new ReadableStream({
      async start(controller) {
        let emittedText = false;

        try {
          for await (const event of stream) {
            if (
              event.type === "response.output_text.delta" &&
              typeof event.delta === "string"
            ) {
              emittedText = true;
              controller.enqueue(encoder.encode(event.delta));
            }

            if (
              event.type === "response.refusal.delta" &&
              typeof event.delta === "string"
            ) {
              emittedText = true;
              controller.enqueue(encoder.encode(event.delta));
            }
          }

          if (!emittedText) {
            controller.enqueue(encoder.encode(fallbackReply));
          }
        } catch {
          if (!emittedText) {
            controller.enqueue(encoder.encode(fallbackReply));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Capwise-Assistant-Mode": "ai",
      },
    });
  } catch {
    return textResponse(getGuidedAssistantReply(latestUserMessage), {
      headers: { "X-Capwise-Assistant-Mode": "guided-fallback" },
    });
  }
}