"use client";

import { useId } from "react";

interface NeoLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function NeoLogo({
  className = "",
  size = 32,
  showWordmark = false,
}: NeoLogoProps) {
  const gradientId = useId();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={showWordmark ? undefined : true}
        role={showWordmark ? "img" : undefined}
        aria-label={showWordmark ? "Neo Studio" : undefined}
      >
        <defs>
          <linearGradient id={gradientId} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="14" fill="#111111" />
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="13.5"
          stroke={`url(#${gradientId})`}
          strokeOpacity="0.35"
        />
        <path
          d="M15 34V14l9 12 9-12v20"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="14" r="3" fill={`url(#${gradientId})`} />
      </svg>
      {showWordmark && (
        <span className="font-display text-[1.05rem] tracking-[-0.02em] text-zinc-100">
          Neo Studio
        </span>
      )}
    </div>
  );
}
