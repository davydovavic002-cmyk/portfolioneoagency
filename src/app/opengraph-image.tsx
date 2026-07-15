import { ImageResponse } from "next/og";

export const alt = "Neo Studio Space — Product engineering & AI";
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
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F4F2EC",
          color: "#111111",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 68%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 8, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.02em",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="21.6" fill="none" stroke="#111111" strokeWidth="0.7" opacity="0.12" />
              <circle cx="24" cy="24" r="17.4" fill="none" stroke="#111111" strokeWidth="0.75" opacity="0.28" />
              <circle cx="24" cy="24" r="4.6" fill="#0047FF" opacity="0.85" />
            </svg>
            <div style={{ fontSize: 32, fontWeight: 500, color: "#111111" }}>
              Neo Studio Space
            </div>
          </div>
          <div style={{ fontSize: 16, color: "#5c5c5c", paddingLeft: 2 }}>
            Full-stack · AI engineering · Product design
          </div>
        </div>

        <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 900,
              fontFamily: "Georgia, serif",
            }}
          >
            Build products that feel inevitable.
          </div>
          <div style={{ fontSize: 22, color: "#0047FF" }}>neostudio.space</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
