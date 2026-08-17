import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
fs.mkdirSync(OUT, { recursive: true });

const BASE = "http://localhost:3000";

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 820, height: 1180 },
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

for (const theme of ["light", "dark"]) {
  for (const [vpName, vp] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport: vp });
    await withTheme(context, theme);
    const page = await context.newPage();

    // Home page - header/logo focus
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await shot(page, `home-${theme}-${vpName}`);

    // Header close-up (logo + tagline)
    const header = page.locator("header").first();
    if (await header.count()) {
      await header.screenshot({ path: `${OUT}/header-${theme}-${vpName}.png` });
      console.log("saved", `header-${theme}-${vpName}`);
    }

    await context.close();
  }
}

// CTA close-ups on desktop (light + dark) for the pages that had the navy-on-navy bug
const ctaPages = ["team", "faq", "about", "business-in-bangladesh", "services", "industries"];
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, theme);
  const page = await context.newPage();
  for (const slug of ctaPages) {
    await page.goto(`${BASE}/${slug}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const link = page.getByRole("link", { name: /Book a Free Consultation/i }).last();
    try {
      await link.scrollIntoViewIfNeeded({ timeout: 3000 });
      await page.waitForTimeout(200);
      await link.screenshot({ path: `${OUT}/cta-${slug}-${theme}.png` });
      console.log("saved", `cta-${slug}-${theme}`);
    } catch (e) {
      console.log("CTA not found on", slug, theme, e.message);
    }
  }
  await context.close();
}

// Footer close-up
for (const theme of ["light", "dark"]) {
  for (const vpName of ["desktop", "mobile"]) {
    const context = await browser.newContext({ viewport: viewports[vpName] });
    await withTheme(context, theme);
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    const footer = page.locator("footer").first();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await footer.screenshot({ path: `${OUT}/footer-${theme}-${vpName}.png` });
    console.log("saved", `footer-${theme}-${vpName}`);
    await context.close();
  }
}

// Ask Capwise launcher + panel
for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, theme);
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await shot(page, `support-launcher-${theme}`);
  const launcher = page.getByRole("button", { name: /ask capwise/i }).first();
  const launcherAlt = page.locator('[aria-haspopup="dialog"]').first();
  try {
    if (await launcher.count()) {
      await launcher.click();
    } else {
      await launcherAlt.click();
    }
    await page.waitForTimeout(600);
    await shot(page, `support-panel-${theme}`);
  } catch (e) {
    console.log("support widget interaction failed", theme, e.message);
  }
  await context.close();
}

// Loader - throttle network to catch the transition
{
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, "light");
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: (50 * 1024) / 8,
    uploadThroughput: (50 * 1024) / 8,
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 800,
    downloadThroughput: (20 * 1024) / 8,
    uploadThroughput: (20 * 1024) / 8,
  });
  const navPromise = page.goto(`${BASE}/services`, { waitUntil: "commit" });
  await page.waitForTimeout(150);
  try {
    await shot(page, "loader-light-inflight");
  } catch (e) {
    console.log("loader light shot failed", e.message);
  }
  await navPromise;
  await context.close();
}
{
  const context = await browser.newContext({ viewport: viewports.desktop });
  await withTheme(context, "dark");
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 400,
    downloadThroughput: (50 * 1024) / 8,
    uploadThroughput: (50 * 1024) / 8,
  });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 800,
    downloadThroughput: (20 * 1024) / 8,
    uploadThroughput: (20 * 1024) / 8,
  });
  const navPromise = page.goto(`${BASE}/industries`, { waitUntil: "commit" });
  await page.waitForTimeout(150);
  try {
    await shot(page, "loader-dark-inflight");
  } catch (e) {
    console.log("loader dark shot failed", e.message);
  }
  await navPromise;
  await context.close();
}

await browser.close();
console.log("DONE");
