import "server-only";
import fs from "node:fs";
import path from "node:path";

export function getInsightMarkdown(slug) {
  const safeSlug = String(slug).replace(/[^a-z0-9-]/g, "");
  const file = path.join(process.cwd(), "src", "content", "insights", `${safeSlug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}
