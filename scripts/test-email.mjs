const baseUrl = process.env.CAPWISE_TEST_URL || "http://localhost:3000";

const payload = {
  name: "Capwise Email Test",
  email: process.env.CAPWISE_TEST_REPLY_TO || "abrahman5676@gmail.com",
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

console.log(`Sending Capwise test enquiry to ${baseUrl}/api/consultations ...`);

try {
  const response = await fetch(`${baseUrl}/api/consultations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl,
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Email test failed:", result || response.statusText);
    process.exitCode = 1;
  } else {
    console.log("Email test succeeded:", result);
    console.log("Check CONSULTATION_TO_EMAIL and verify the Reply-To address by replying to the message.");
  }
} catch (error) {
  console.error("Could not reach the local website. Run `npm run dev` in another terminal first.");
  console.error(error.message);
  process.exitCode = 1;
}
