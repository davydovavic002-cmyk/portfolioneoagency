import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
          <defs>
            <linearGradient id="g" x1="8" y1="6" x2="40" y2="42">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <path
            d="M15 34V14l9 12 9-12v20"
            stroke="url(#g)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="14" r="3.5" fill="url(#g)" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
