import { ImageResponse } from "next/og";

export const alt = "Capwise Solution BD — Business compliance, tax and financial advisory in Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#071A2C",
          color: "white",
          padding: "72px 82px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
        <div style={{ position: "absolute", right: -120, top: -160, width: 520, height: 520, borderRadius: 999, background: "rgba(45,212,191,.20)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 66, height: 66, borderRadius: 999, border: "2px solid rgba(255,255,255,.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: "#2DD4BF" }}>✓</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>CAPWISE</div>
              <div style={{ marginTop: 4, fontSize: 12, fontWeight: 800, letterSpacing: 5, color: "#2DD4BF" }}>SOLUTION BD</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 4, color: "#D6B15A", textTransform: "uppercase" }}>Wise Choice for Your Finance.</div>
            <div style={{ marginTop: 22, fontSize: 64, lineHeight: 1.02, fontWeight: 750, letterSpacing: -3.6 }}>Business compliance, tax and financial advisory in Bangladesh.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.58)", fontSize: 17 }}>
            <div>Dhaka · Bangladesh</div>
            <div>capwisebd.com</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
