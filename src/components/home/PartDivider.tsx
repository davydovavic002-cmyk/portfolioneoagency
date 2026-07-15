"use client";

interface PartDividerProps {
  part: string;
  title: string;
  meta?: string;
}

/** Monica ref — full-width section break between major blocks */
export function PartDivider({ part, title, meta }: PartDividerProps) {
  return (
    <div className="part-divider relative overflow-hidden border-y border-line bg-paper py-8 lg:py-10">
      <div className="site-container relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
            {part}
          </p>
          <p className="monica-track max-w-[12rem] text-right text-[11px] text-ink/70">{title}</p>
        </div>

        <div className="part-divider-art relative mt-6 flex items-center justify-center gap-2 py-4" aria-hidden>
          <span className="part-block part-block--lime h-14 w-10 -rotate-6" />
          <span className="font-display text-5xl font-black tracking-tighter text-lime/90 lg:text-6xl">
            NEO
          </span>
          <span className="part-block part-block--pink h-10 w-16 rotate-3" />
          <span className="part-block part-block--yellow h-8 w-8 -rotate-12 rounded-full" />
          <span className="font-display text-5xl font-black tracking-tighter text-pink/80 lg:text-6xl">
            ✦
          </span>
          <span className="part-block part-block--lime h-12 w-14 rotate-6" />
        </div>

        {meta && (
          <div className="mt-4 flex items-center justify-between text-[12px] font-semibold text-muted">
            <span>{meta}</span>
            <span className="text-lg" aria-hidden>
              📣
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
