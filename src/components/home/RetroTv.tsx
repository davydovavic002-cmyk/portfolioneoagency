"use client";

import { Play } from "lucide-react";

interface RetroTvProps {
  onOpenWork: () => void;
  livePreviewLabel: string;
}

/** CSS retro TV — Monica ref centerpiece, opens work preview on click */
export function RetroTv({ onOpenWork, livePreviewLabel }: RetroTvProps) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[280px] lg:max-w-[320px]">
      <div className="tv-float relative">
      <div className="absolute -left-6 top-2 z-20 hidden w-14 -rotate-12 rounded-sm bg-white p-1 shadow-lg ring-1 ring-black/10 sm:block lg:-left-10 lg:w-16">
        <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-yellow/60 to-pink/40" />
      </div>
      <div className="absolute -right-4 top-0 z-20 w-16 rotate-6 rounded-sm bg-white p-1 shadow-lg ring-1 ring-black/10 lg:-right-8 lg:w-20">
        <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-pink/30 to-lime/40" />
      </div>

      <button
        type="button"
        onClick={onOpenWork}
        className="group relative mx-auto mt-6 block w-full text-left transition-transform hover:scale-[1.02] active:scale-[0.99] lg:mt-8"
        aria-label={livePreviewLabel}
      >
        <div className="absolute -left-3 top-8 z-10 h-24 w-8 rounded-l-lg bg-[#ff4d9e]/80 shadow-inner transition group-hover:bg-[#ff4d9e]" />
        <div className="absolute -right-3 top-8 z-10 h-24 w-8 rounded-r-lg bg-[#ff4d9e]/80 shadow-inner transition group-hover:bg-[#ff4d9e]" />

        <div className="relative rounded-2xl bg-gradient-to-b from-[#ff6eb4] to-[#ff4d9e] p-4 shadow-[0_20px_40px_-12px_rgba(255,77,158,0.55)] group-hover:shadow-[0_24px_48px_-10px_rgba(255,77,158,0.65)]">
          <div className="tv-screen relative overflow-hidden rounded-lg border-4 border-[#ff85c0] bg-[#1a1a2e] px-4 py-8 text-center shadow-inner">
            <div className="tv-scanline pointer-events-none absolute inset-0 z-10 opacity-30" />
            <p className="relative z-20 font-display text-2xl font-bold tracking-tight text-white/95 lg:text-3xl">
              Portfolio
            </p>
            <p className="relative z-20 mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-pink/90">
              <Play className="h-3 w-3 fill-current" />
              {livePreviewLabel}
            </p>
          </div>
          <div className="mx-auto mt-3 h-2 w-12 rounded-full bg-[#ff85c0]/60 transition group-hover:w-16" />
        </div>

        <div className="mx-auto -mt-1 h-6 w-32 rounded-b-lg bg-white shadow-md ring-1 ring-black/5" />
        <div className="mx-auto h-3 w-44 rounded-full bg-black/8" />
      </button>

      <div className="absolute -left-2 bottom-4 text-2xl lg:-left-6 lg:text-3xl" aria-hidden>
        🌵
      </div>
      <div className="absolute -right-1 bottom-8 text-xl lg:text-2xl" aria-hidden>
        🌸
      </div>
      </div>
    </div>
  );
}
