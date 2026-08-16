export function createReference(prefix = "CAP") {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `${prefix}-${date}-${random}`;
}
