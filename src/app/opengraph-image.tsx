import { ImageResponse } from "next/og";

export const alt = "Neo Studio — Product engineering & AI";
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

        <div style={{ display: "flex", alignItems: "center", gap: 24, zIndex: 1 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
              <defs>
                <linearGradient id="g" x1="8" y1="6" x2="40" y2="42">
                  <stop stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <path
                d="M15 34V14l9 12 9-12v20"
                stroke="url(#g)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="36" cy="14" r="3" fill="url(#g)" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, letterSpacing: "-0.03em" }}>Neo Studio</div>
            <div style={{ fontSize: 18, color: "#a1a1aa" }}>
              Full-stack · AI engineering · Product design
            </div>
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
