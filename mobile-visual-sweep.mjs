import { chromium } from "playwright";
const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
const BASE = "http://localhost:3000";
const browser = await chromium.launch();

const pages = [
  "/", "/about", "/services", "/industries", "/contact", "/team",
  "/faq", "/careers", "/case-studies", "/resources", "/business-in-bangladesh",
  "/insights",
];

for (const path of pages) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(500);
  const name = path === "/" ? "home" : path.replace(/\//g, "_").replace(/^_/, "");
  await page.screenshot({ path: `${OUT}/mobile-full-${name}.png`, fullPage: true });
  console.log("saved", name);
  await context.close();
}

await browser.close();
console.log("DONE");
