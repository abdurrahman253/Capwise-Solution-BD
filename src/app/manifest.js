export default function manifest() {
  return {
    name: "Capwise Solution BD",
    short_name: "Capwise",
    description: "Business compliance, tax and financial advisory in Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0B1F33",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
