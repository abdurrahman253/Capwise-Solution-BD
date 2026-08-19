import { chromium } from "playwright";
const OUT = "C:/Users/USER/AppData/Local/Temp/capwise-shots";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 45000 });
await page.waitForTimeout(500);

const heading = page.getByText("Understand the issue before it becomes urgent.");
await heading.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/mobile-zoom-insights-preview.png` });
console.log("saved 1");

await page.mouse.wheel(0, 500);
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/mobile-zoom-insights-preview-2.png` });
console.log("saved 2");

await browser.close();
console.log("DONE");
