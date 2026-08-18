export default function manifest() {
  return {
    name: "Capwise Solution BD",
    short_name: "Capwise",
    description: "Business compliance, tax and financial advisory in Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#1B1464",
    icons: [
      { src: "/brand/capwise-icon.png", sizes: "512x512", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
