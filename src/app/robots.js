export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/portal/"],
      },
    ],
    sitemap: "https://capwisebd.com/sitemap.xml",
    host: "https://capwisebd.com",
  };
}
