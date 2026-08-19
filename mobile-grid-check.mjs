import { chromium } from "playwright";
const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
const BASE = "http://localhost:3000";
const browser = await chromium.launch();

const checks = [
  { path: "/services", scrolls: [600, 1200] },
  { path: "/industries", scrolls: [600, 1200] },
  { path: "/team", scrolls: [500, 1100] },
  { path: "/case-studies", scrolls: [500] },
  { path: "/careers", scrolls: [400] },
  { path: "/faq", scrolls: [500] },
  { path: "/contact", scrolls: [700] },
];

for (const { path, scrolls } of checks) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(500);
  const name = path.replace(/\//g, "_").replace(/^_/, "");
  await page.screenshot({ path: `${OUT}/grid-${name}-0.png` });
  let cumulative = 0;
  for (let i = 0; i < scrolls.length; i++) {
    await page.mouse.wheel(0, scrolls[i] - cumulative);
    cumulative = scrolls[i];
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/grid-${name}-${i + 1}.png` });
  }
  console.log("saved", name);
  await context.close();
}

await browser.close();
console.log("DONE");
