import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const appRoot = path.join(sourceRoot, "app");

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const info = await stat(fullPath);
    if (info.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

const sourceFiles = (await walk(sourceRoot)).filter((file) => /\.(js|jsx)$/.test(file));
const pageFiles = sourceFiles.filter((file) => /[\\/]app[\\/].*[\\/]page\.jsx$/.test(file) || file.endsWith(`${path.sep}app${path.sep}page.jsx`));

function pageToRoute(file) {
  let relative = path.relative(appRoot, path.dirname(file)).replaceAll(path.sep, "/");
  relative = relative.replace(/\([^/]+\)\/?/g, "");
  return relative ? `/${relative}` : "/";
}

const pagePatterns = pageFiles.map(pageToRoute);
const allText = await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")));
const hrefs = [...allText.join("\n").matchAll(/href=["'`]([^"'`]+)["'`]/g)]
  .map((match) => match[1])
  .filter((href) => href.startsWith("/") && !href.includes("${") && !href.includes("["));

function matchesRoute(href) {
  const clean = href.split("#")[0].split("?")[0] || "/";
  return pagePatterns.some((pattern) => {
    if (pattern === clean) return true;
    const regex = new RegExp(`^${pattern.replace(/\[\.\.\.([^\]]+)\]/g, ".+").replace(/\[([^\]]+)\]/g, "[^/]+")}$`);
    return regex.test(clean);
  });
}

const missing = [...new Set(hrefs.filter((href) => !matchesRoute(href)))].sort();

console.log(`Source files checked:      ${String(sourceFiles.length).padStart(4)}`);
console.log(`Page route patterns:       ${String(pagePatterns.length).padStart(4)}`);
console.log(`Literal internal links:    ${String(hrefs.length).padStart(4)}`);
console.log(`Missing internal routes:   ${String(missing.length).padStart(4)}`);

if (missing.length) {
  console.log("\nPotential missing routes:");
  missing.forEach((route) => console.log(`- ${route}`));
  process.exitCode = 1;
}
