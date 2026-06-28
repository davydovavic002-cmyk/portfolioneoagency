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
          background: "#080808",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="21.6" fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.18" />
          <circle cx="24" cy="24" r="17.4" fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.45" />
          <circle cx="24" cy="24" r="4.6" fill="#60a5fa" opacity="0.55" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
