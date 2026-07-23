const baseUrl = process.env.CAPWISE_TEST_URL || "http://localhost:3000";

const payload = {
  name: "Capwise Email Test",
  email: process.env.CAPWISE_TEST_REPLY_TO || "test@capwisebd.com",
  phone: "+880 1624 000 381",
  company: "Capwise Solution BD",
  service: "Business Advisory",
  message:
    "This is a real delivery test from the Capwise project. Please confirm that the branded layout, enquiry reference, client details, service interest, submitted time and Reply-To behavior appear correctly.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
  sourcePath: "/scripts/test-email",
};

async function readJson(response) {
  return response.json().catch(() => null);
}

try {
  const healthResponse = await fetch(`${baseUrl}/api/health`, { cache: "no-store" });
  const health = await readJson(healthResponse);
  console.log("Capwise workflow health:", JSON.stringify(health, null, 2));

  if (!health?.checks?.email?.configured || !health?.checks?.email?.recipientConfigured) {
    console.error("\nEmail delivery is not configured. Add RESEND_API_KEY, RESEND_FROM_EMAIL and CONSULTATION_TO_EMAIL to .env.local, restart npm run dev, then retry.");
    process.exit(1);
  }

  console.log(`\nSending Capwise test enquiry through ${baseUrl}/api/consultations ...`);
  const response = await fetch(`${baseUrl}/api/consultations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl,
    },
    body: JSON.stringify(payload),
  });
  const result = await readJson(response);

  if (!response.ok) {
    console.error("Email test failed:", result || response.statusText);
    process.exitCode = 1;
  } else if (result?.deliveryStatus !== "sent") {
    console.error("The lead was recorded, but email delivery did not complete:", result);
    process.exitCode = 1;
  } else {
    console.log("Email test succeeded:", result);
    console.log("Check CONSULTATION_TO_EMAIL and verify Reply-To by replying to the message.");
  }
} catch (error) {
  console.error("Could not reach the local website. Run `npm run dev` in another terminal first.");
  console.error(error.message);
  process.exitCode = 1;
}
