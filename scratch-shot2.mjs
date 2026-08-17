import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";
const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

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

// Footer dark
for (const vpName of ["desktop", "mobile"]) {
  const context = await browser.newContext({ viewport: viewports[vpName] });
  await withTheme(context, "dark");
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(1000);
  const footer = page.locator("footer").first();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await footer.screenshot({ path: `${OUT}/footer-dark-${vpName}.png` });
  console.log("saved", `footer-dark-${vpName}`);
  await context.close();
}

// Ask Capwise launcher + panel
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, theme);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(1200);
  await shot(page, `support-launcher-${theme}`);
  try {
    const launcher = page.locator('[aria-haspopup="dialog"]').first();
    await launcher.click({ timeout: 5000 });
    await page.waitForTimeout(700);
    await shot(page, `support-panel-${theme}`);
  } catch (e) {
    console.log("support widget interaction failed", theme, e.message);
  }
  await context.close();
}

// Loader - throttle network via CDP, then screenshot mid-navigation
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, theme);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 45000 });
  await page.waitForTimeout(800);
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 1200,
    downloadThroughput: (15 * 1024) / 8,
    uploadThroughput: (15 * 1024) / 8,
  });
  const target = theme === "light" ? "services" : "industries";
  page.goto(`${BASE}/${target}`, { waitUntil: "commit" }).catch(() => {});
  await page.waitForTimeout(250);
  try {
    await shot(page, `loader-${theme}-inflight`);
  } catch (e) {
    console.log("loader shot failed", theme, e.message);
  }
  await context.close();
}

await browser.close();
console.log("DONE2");
