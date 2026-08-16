import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");

function parseEnv(content) {
  return content.split(/\r?\n/).reduce((values, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return values;
    const separator = trimmed.indexOf("=");
    if (separator < 1) return values;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
    return values;
  }, {});
}

if (!existsSync(envPath)) {
  console.error("Missing .env.local. Copy .env.example to .env.local and add the real server credentials.");
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, "utf8"));
const checks = [
  ["MongoDB URI", Boolean(env.MONGODB_URI)],
  ["MongoDB database name", Boolean(env.MONGODB_DB_NAME)],
  ["Resend API key", Boolean(env.RESEND_API_KEY)],
  ["Resend sender", Boolean(env.RESEND_FROM_EMAIL)],
  ["Consultation recipient", Boolean(env.CONSULTATION_TO_EMAIL)],
  ["Public site URL", Boolean(env.NEXT_PUBLIC_SITE_URL)],
];

console.log("Capwise local configuration\n");
for (const [label, ready] of checks) {
  console.log(`${ready ? "✓" : "✗"} ${label}`);
}

const resendTestDomain = (env.RESEND_FROM_EMAIL || "").includes("@resend.dev");
if (resendTestDomain) {
  console.log("\nNote: onboarding@resend.dev is a test sender and only delivers to the email attached to the Resend account.");
}

if (env.SEND_CLIENT_ACKNOWLEDGEMENT === "true") {
  console.log("Visitor acknowledgement: enabled");
} else {
  console.log("Visitor acknowledgement: disabled for testing");
}

const missingRequired = checks.slice(0, 5).filter(([, ready]) => !ready);
if (missingRequired.length) {
  console.log("\nMongoDB-only submissions can still be recorded, but real team email delivery requires all Resend checks above.");
  process.exitCode = 1;
} else {
  console.log("\nConfiguration looks ready. Restart npm run dev after every .env.local change.");
}
