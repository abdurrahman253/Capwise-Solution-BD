import { ImageResponse } from "next/og";

export const alt = "Capwise Solution BD — Accounting, tax, legal and compliance advisory in Bangladesh";
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
          background: "#0A0D2A",
          color: "white",
          padding: "72px 82px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 0.11, backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
        <div style={{ position: "absolute", right: -120, top: -180, width: 560, height: 560, borderRadius: 999, background: "rgba(27,100,170,.32)" }} />
        <div style={{ position: "absolute", left: -120, bottom: -250, width: 540, height: 540, borderRadius: 999, background: "rgba(212,175,55,.13)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img
              src="https://capwisebd.com/brand/capwise-official.png"
              alt=""
              width="306"
              height="138"
              style={{ objectFit: "contain", background: "white", borderRadius: 16, padding: "10px 14px" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 4, color: "#D4AF37", textTransform: "uppercase" }}>Bangladesh business insight & advisory</div>
            <div style={{ marginTop: 22, fontSize: 62, lineHeight: 1.02, fontWeight: 760, letterSpacing: -3.6 }}>Accounting, tax, legal and compliance — connected.</div>
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
