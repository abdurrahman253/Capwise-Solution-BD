import "server-only";

const localRateStore = globalThis.__capwiseRateStore || new Map();
if (!globalThis.__capwiseRateStore) globalThis.__capwiseRateStore = localRateStore;

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function getAllowedOrigins(request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const requestOrigin = new URL(request.url).origin;
  const vercelHost = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

  return new Set(
    [configured, requestOrigin, vercelHost, "http://localhost:3000", "http://127.0.0.1:3000"]
      .filter(Boolean)
      .map((value) => value.replace(/\/$/, "")),
  );
}

export function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  return getAllowedOrigins(request).has(origin.replace(/\/$/, ""));
}

export function hasHumanCompletionTime(startedAt, minimumMs = 1800, maximumMs = 86_400_000) {
  const elapsed = Date.now() - Number(startedAt);
  return Number.isFinite(elapsed) && elapsed >= minimumMs && elapsed <= maximumMs;
}

function localRateLimit(key, limit, windowSeconds) {
  const now = Date.now();
  const existing = localRateStore.get(key);

  if (!existing || existing.resetAt <= now) {
    localRateStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: Math.max(0, limit - 1) };
  }

  existing.count += 1;
  localRateStore.set(key, existing);
  return { allowed: existing.count <= limit, remaining: Math.max(0, limit - existing.count) };
}

async function upstashRateLimit(key, limit, windowSeconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, windowSeconds, "NX"],
      ]),
      cache: "no-store",
    });

    if (!response.ok) return null;
    const result = await response.json();
    const count = Number(result?.[0]?.result);
    if (!Number.isFinite(count)) return null;
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
  } catch (error) {
    console.error("[Capwise] Shared rate limiter unavailable", {
      name: error?.name,
      message: error?.message,
    });
    return null;
  }
}

export async function checkRateLimit({ namespace, identifier, limit = 5, windowSeconds = 600 }) {
  const key = `capwise:${namespace}:${identifier}`;
  const shared = await upstashRateLimit(key, limit, windowSeconds);
  return shared || localRateLimit(key, limit, windowSeconds);
}

export function noStoreJson(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...init.headers,
    },
  });
}
