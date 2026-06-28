import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 50%, #101010 0%, #080808 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="68" height="68" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="21.6" fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.18" />
            <circle cx="24" cy="24" r="17.4" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.48" />
            <circle cx="24" cy="24" r="4.6" fill="#93c5fd" opacity="0.6" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 600, color: "#e4e4e7", letterSpacing: "-0.045em", lineHeight: 0.92 }}>
              NEO
            </span>
            <span style={{ fontSize: 15, fontWeight: 300, color: "#71717a", letterSpacing: "0.01em", lineHeight: 1 }}>
              Studio Space
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
