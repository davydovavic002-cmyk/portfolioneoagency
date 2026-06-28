"use client";

import { LogoMark } from "./LogoMark";

interface NeoLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function NeoLogo({
  className = "",
  size = 36,
  showWordmark = false,
}: NeoLogoProps) {
  if (!showWordmark) {
    return (
      <div className={className} role="img" aria-label="Neo Studio Space">
        <LogoMark size={size} />
      </div>
    );
  }

  const titleSize = Math.round(size * 0.54);
  const subtitleSize = Math.max(10, Math.round(size * 0.26));
  const gap = Math.round(size * 0.38);

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
      role="img"
      aria-label="Neo Studio Space"
    >
      <LogoMark size={size} className="shrink-0" />
      <div
        className="flex flex-col justify-center"
        style={{ gap: Math.max(2, Math.round(subtitleSize * 0.15)) }}
      >
        <span
          className="font-sans font-semibold leading-[0.92] tracking-[-0.045em] text-zinc-100"
          style={{ fontSize: titleSize }}
        >
          NEO
        </span>
        <span
          className="font-sans font-light leading-none tracking-[0.01em] text-zinc-500"
          style={{ fontSize: subtitleSize }}
        >
          Studio Space
        </span>
      </div>
    </div>
  );
}
