"use client";

import { LogoMark } from "./LogoMark";

interface NeoLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  inverted?: boolean;
}

export function NeoLogo({
  className = "",
  size = 36,
  showWordmark = false,
  inverted = false,
}: NeoLogoProps) {
  if (!showWordmark) {
    return (
      <div className={className} role="img" aria-label="Neo Studio Space">
        <LogoMark size={size} className={inverted ? "brightness-0 invert" : undefined} />
      </div>
    );
  }

  const titleSize = Math.round(size * 0.48);
  const gap = Math.round(size * 0.38);

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      role="img"
      aria-label="Neo Studio Space"
    >
      <LogoMark size={size} className={`shrink-0 ${inverted ? "brightness-0 invert" : ""}`} />
      <span
        className={`font-display font-medium leading-[0.95] tracking-[-0.02em] ${
          inverted ? "text-white" : "text-ink"
        }`}
        style={{ fontSize: titleSize }}
      >
        Neo Studio Space
      </span>
    </div>
  );
}
