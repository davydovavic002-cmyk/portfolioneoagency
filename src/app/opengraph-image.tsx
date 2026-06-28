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
          background: "#080808",
          color: "#f4f4f5",
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
            background: "radial-gradient(circle, rgba(96,165,250,0.22) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 8, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="21.6" fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.18" />
              <circle cx="24" cy="24" r="17.4" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.48" />
              <circle cx="24" cy="24" r="4.6" fill="#93c5fd" opacity="0.6" />
            </svg>
            <div style={{ display: "flex", alignItems: "baseline", fontSize: 34 }}>
              <span style={{ fontWeight: 600, color: "#f4f4f5" }}>NEO</span>
              <span style={{ fontWeight: 300, color: "#71717a" }}> Studio Space</span>
            </div>
          </div>
          <div style={{ fontSize: 18, color: "#a1a1aa", paddingLeft: 2 }}>
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
            }}
          >
            Build products that feel inevitable.
          </div>
          <div style={{ fontSize: 24, color: "#a1a1aa" }}>neostudio.space</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
