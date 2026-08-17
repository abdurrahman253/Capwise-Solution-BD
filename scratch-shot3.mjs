import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";
const mobile = { width: 390, height: 844 };
const desktop = { width: 1440, height: 900 };

async function withTheme(context, theme) {
  await context.addInitScript((t) => {
    window.localStorage.setItem("capwise-theme", t);
  }, theme);
}
async function shot(page, name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("saved", name);
}

const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: mobile });
  await withTheme(context, theme);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(600);

  // open mobile menu
  const hamburger = page.getByRole("button", { name: /open navigation menu/i });
  await hamburger.click();
  await page.waitForTimeout(500);
  await shot(page, `mobile-menu-${theme}`);
  await context.close();
}

// footer mobile + desktop after stacked tagline change
for (const theme of ["light", "dark"]) {
  for (const [vpName, vp] of [["mobile", mobile], ["desktop", desktop]]) {
    const context = await browser.newContext({ viewport: vp });
    await withTheme(context, theme);
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await footer.screenshot({ path: `${OUT}/footer2-${theme}-${vpName}.png` });
    console.log("saved", `footer2-${theme}-${vpName}`);
    await context.close();
  }
}

// main mobile header, unchanged (should still be logo-only, no overflow)
{
  const context = await browser.newContext({ viewport: mobile });
  await withTheme(context, "light");
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(500);
  const header = page.locator("header").first();
  await header.screenshot({ path: `${OUT}/header2-mobile-light.png` });
  console.log("saved header2-mobile-light");
  // check horizontal overflow
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log("horizontal overflow px (should be 0):", overflow);
  await context.close();
}

await browser.close();
console.log("DONE3");
