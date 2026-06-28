"use client";

import { useId } from "react";

interface LogoMarkGraphicProps {
  idPrefix?: string;
}

/**
 * Three-layer mark matching brand prototype:
 * 1. outer semi-transparent ring
 * 2. white neon glow ring
 * 3. glowing blue center orb
 */
export function LogoMarkGraphic({ idPrefix = "" }: LogoMarkGraphicProps) {
  const uid = useId().replace(/:/g, "");
  const p = idPrefix || uid;

  const blueCore = `${p}-blue-core`;
  const whiteGlow = `${p}-white-glow`;
  const whiteNeon = `${p}-white-neon`;
  const blueBloom = `${p}-blue-bloom`;

  return (
    <>
      <defs>
        <radialGradient id={blueCore} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#93c5fd" stopOpacity="0.42" />
          <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={whiteGlow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0.36" />
          <stop offset="68%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="82%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <filter
          id={whiteNeon}
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id={blueBloom}
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1 — outer semi-transparent ring */}
      <circle
        cx="24"
        cy="24"
        r="21.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.7"
        opacity="0.18"
      />

      {/* 2 — white glow ring */}
      <circle
        cx="24"
        cy="24"
        r="17.4"
        fill={`url(#${whiteGlow})`}
        filter={`url(#${whiteNeon})`}
        opacity="0.62"
      />
      <circle
        cx="24"
        cy="24"
        r="17.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.75"
        opacity="0.52"
        filter={`url(#${whiteNeon})`}
      />

      {/* 3 — glowing blue center orb */}
      <circle
        cx="24"
        cy="24"
        r="4.6"
        fill={`url(#${blueCore})`}
        filter={`url(#${blueBloom})`}
        opacity="0.88"
      />
    </>
  );
}

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 48, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <LogoMarkGraphic />
    </svg>
  );
}
