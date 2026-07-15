import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { RubberText, StickerBadge } from '@/components/ui/RubberText'
import { DraggableSticker, ArtBlob, StarBurst } from '@/components/ui/DraggableSticker'
import { ConversionZone } from '@/components/hero/ConversionZone'
import { randomBetween } from '@/lib/utils'

const stickers = [
  { className: 'left-[6%] top-[20%]', rot: -10, el: <StarBurst /> },
  { className: 'right-[8%] top-[14%]', rot: 12, el: <ArtBlob color="#ff6eb0" /> },
  { className: 'right-[12%] top-[48%]', rot: -8, el: <StarBurst /> },
  { className: 'left-[10%] top-[55%]', rot: 14, el: <ArtBlob color="#ff2d6b" /> },
  { className: 'left-[42%] top-[22%]', rot: 6, el: <StarBurst /> },
  { className: 'right-[28%] bottom-[18%]', rot: -5, el: <ArtBlob color="#ffc4dd" /> },
]

export function HomePage() {
  return (
    <PageTransition className="bg-page-bg pt-14">
      <Seo path="/" />

      <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="absolute top-6 right-6 z-20 hidden md:block">
          <StickerBadge color="#ffc4dd">Est. 2021</StickerBadge>
        </div>

        {stickers.map((sticker, i) => (
          <DraggableSticker
            key={i}
            initialX={randomBetween(-16, 16)}
            initialY={randomBetween(-16, 16)}
            rotation={sticker.rot}
            zIndex={20 + i}
            className={sticker.className}
          >
            <div className="scale-75 md:scale-90">{sticker.el}</div>
          </DraggableSticker>
        ))}

        <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-end px-4 pb-10 md:px-10">
          <RubberText text="NEO STUDIO SPACE" />

          <div className="mt-10 max-w-xl">
            <p className="text-lg leading-relaxed md:text-xl">
              Full-stack design-engineering studio — we architect and ship custom products from
              scratch, tailored to your business logic. No templates, no cookie-cutter builds: every
              stack, interface, and AI agent system is scoped and built individually for your project.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="brutal-border bg-page-accent px-6 py-3 font-mono text-xs tracking-widest text-page-bg uppercase transition-transform hover:scale-95 active:scale-90"
              >
                View Work
              </Link>
              <Link
                to="/studio"
                className="brutal-border bg-page-surface px-6 py-3 font-mono text-xs tracking-widest uppercase transition-transform hover:scale-95"
              >
                Studio Matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConversionZone />
    </PageTransition>
  )
}
