import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const widths = [360, 375, 390, 412, 430];
const pages = [
  "/", "/about", "/business-in-bangladesh", "/careers", "/case-studies", "/contact",
  "/faq", "/industries", "/insights", "/resources", "/resources/guides",
  "/resources/regulatory-updates", "/services", "/team", "/testimonials", "/thank-you",
  "/privacy-policy", "/terms-of-use", "/professional-disclaimer",
  "/services/company-formation-registration", "/industries/smes-startups",
  "/insights/sme-sector-bangladesh", "/business-in-bangladesh/legal-structures",
];

const browser = await chromium.launch();
const results = [];

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  for (const path of pages) {
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      if (overflow > 2) {
        const culprits = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const offenders = [];
          document.querySelectorAll("*").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 2 && el.children.length < 3) {
              offenders.push({
                tag: el.tagName,
                cls: (el.className || "").toString().slice(0, 80),
                right: Math.round(r.right),
                width: Math.round(r.width),
              });
            }
          });
          return offenders.slice(0, 5);
        });
        results.push({ width, path, overflow, culprits });
      }
    } catch (err) {
      results.push({ width, path, error: String(err.message || err).slice(0, 150) });
    }
  }
  await context.close();
}

await browser.close();
console.log("ISSUES FOUND:", results.length);
for (const r of results) console.log(JSON.stringify(r));
console.log("SWEEP-DONE");
