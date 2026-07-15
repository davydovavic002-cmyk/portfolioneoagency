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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background: "#F4F2EC",
          fontFamily: "Georgia, serif",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="21.6" fill="none" stroke="#111111" strokeWidth="0.7" opacity="0.12" />
          <circle cx="24" cy="24" r="17.4" fill="none" stroke="#111111" strokeWidth="0.75" opacity="0.28" />
          <circle cx="24" cy="24" r="4.6" fill="#0047FF" opacity="0.85" />
        </svg>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#111111",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 150,
          }}
        >
          Neo Studio Space
        </span>
      </div>
    ),
    { ...size },
  );
}
