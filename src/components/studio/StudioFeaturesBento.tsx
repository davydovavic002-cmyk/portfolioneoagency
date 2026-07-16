import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { StudioFeature } from '@/data/studio'
import { studioFeatures } from '@/data/studio'
import { modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

function BentoCardShell({
  feature,
  index,
  children,
  className,
  style,
}: {
  feature: StudioFeature
  index: number
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...SPRING, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      style={style}
      className={cn(
        modernPanel,
        'group relative flex flex-col overflow-hidden transition-shadow hover:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.22)]',
        feature.className,
        className,
      )}
    >
      {children}
    </motion.article>
  )
}

function HeroFeature({ feature, index }: { feature: StudioFeature; index: number }) {
  return (
    <BentoCardShell
      feature={feature}
      index={index}
      className="min-h-[280px] justify-end p-7 text-page-bg md:min-h-[340px] md:p-9"
      style={{
        background:
          'linear-gradient(145deg, #0a0a0a 0%, color-mix(in srgb, var(--theme-text) 88%, var(--theme-accent) 12%) 55%, color-mix(in srgb, var(--theme-text) 80%, var(--theme-accent-2) 20%) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
        style={{ background: 'var(--theme-accent-2)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-8 -left-8 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--theme-accent)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(var(--theme-bg) 1px, transparent 1px), linear-gradient(90deg, var(--theme-bg) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <span className={cn(modernPill, 'relative mb-auto w-fit bg-page-bg/15 text-page-bg/90')}>
        Core promise
      </span>
      <div className="relative mt-6">
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{feature.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-page-bg/75 md:text-base">
          {feature.description}
        </p>
      </div>
    </BentoCardShell>
  )
}

function StatFeature({ feature, index }: { feature: StudioFeature; index: number }) {
  return (
    <BentoCardShell feature={feature} index={index} className="min-h-[160px] p-6 md:p-7">
      <div
        className="pointer-events-none absolute -right-4 -bottom-6 select-none text-[7rem] leading-none font-bold tracking-tighter text-page-accent/10 md:text-[8rem]"
        aria-hidden
      >
        {feature.stat}
      </div>
      <span
        className={cn(
          modernPill,
          'relative w-fit bg-gradient-to-r from-page-accent/20 to-page-accent-2/20 font-semibold text-page-accent',
        )}
      >
        {feature.stat}
      </span>
      <h3 className="relative mt-4 text-lg font-semibold tracking-tight">{feature.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-page-muted">{feature.description}</p>
      {feature.statLabel && (
        <p className="relative mt-3 text-xs font-medium text-page-accent">{feature.statLabel}</p>
      )}
    </BentoCardShell>
  )
}

function StackFeature({ feature, index }: { feature: StudioFeature; index: number }) {
  return (
    <BentoCardShell feature={feature} index={index} className="min-h-[160px] p-6 md:p-7">
      <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-page-muted">{feature.description}</p>
      {feature.tags && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-page-bg/80 px-2 py-0.5 text-[10px] font-medium text-page-muted ring-1 ring-page-text/8"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </BentoCardShell>
  )
}

function TintFeature({
  feature,
  index,
  tint,
}: {
  feature: StudioFeature
  index: number
  tint: string
}) {
  return (
    <BentoCardShell feature={feature} index={index} className="min-h-[148px] p-6 md:p-7">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: tint }}
        aria-hidden
      />
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-page-surface/80 text-lg shadow-sm ring-1 ring-page-text/10">
        {feature.id === 'ai' && '◈'}
        {feature.id === 'edtech' && '▣'}
        {feature.id === 'design' && '◎'}
      </div>
      <h3 className="relative mt-4 font-semibold tracking-tight">{feature.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-page-muted">{feature.description}</p>
    </BentoCardShell>
  )
}

function WideFeature({ feature, index }: { feature: StudioFeature; index: number }) {
  return (
    <BentoCardShell
      feature={feature}
      index={index}
      className="min-h-[140px] flex-row items-center gap-6 p-6 md:flex md:p-8"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-page-accent-2/15 text-xl">
        ↳
      </div>
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-page-muted md:text-base">{feature.description}</p>
      </div>
    </BentoCardShell>
  )
}

function CtaFeature({ feature, index }: { feature: StudioFeature; index: number }) {
  return (
    <BentoCardShell
      feature={feature}
      index={index}
      className="min-h-[140px] justify-between p-6 md:flex-row md:items-end md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'linear-gradient(120deg, color-mix(in srgb, var(--theme-accent) 15%, transparent), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="relative flex-1">
        <h3 className="text-lg font-semibold tracking-tight">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-page-muted">{feature.description}</p>
      </div>
      <Link
        to="/pricing"
        className="relative mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg transition-opacity hover:opacity-90 md:mt-0"
      >
        See care package
        <span aria-hidden>→</span>
      </Link>
    </BentoCardShell>
  )
}

function FeatureTile({ feature, index }: { feature: StudioFeature; index: number }) {
  switch (feature.variant) {
    case 'hero':
      return <HeroFeature feature={feature} index={index} />
    case 'stat':
      return <StatFeature feature={feature} index={index} />
    case 'stack':
      return <StackFeature feature={feature} index={index} />
    case 'tint-cyan':
      return (
        <TintFeature
          feature={feature}
          index={index}
          tint="linear-gradient(135deg, color-mix(in srgb, var(--theme-accent-2) 18%, transparent), transparent 70%)"
        />
      )
    case 'tint-pink':
      return (
        <TintFeature
          feature={feature}
          index={index}
          tint="linear-gradient(135deg, color-mix(in srgb, var(--theme-accent) 16%, transparent), transparent 70%)"
        />
      )
    case 'tint-neutral':
      return (
        <TintFeature
          feature={feature}
          index={index}
          tint="linear-gradient(135deg, color-mix(in srgb, var(--theme-text) 6%, transparent), transparent 70%)"
        />
      )
    case 'wide':
      return <WideFeature feature={feature} index={index} />
    case 'cta':
      return <CtaFeature feature={feature} index={index} />
    default:
      return null
  }
}

export function StudioFeaturesBento() {
  return (
    <section className="relative px-4 pb-12 md:px-10 md:pb-16">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What we do</h2>
            <p className="mt-2 max-w-lg text-base text-page-muted">
              Clear packages, custom design, and a process that stays in writing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Custom design', 'From $400', 'Written-first'].map((chip) => (
              <span
                key={chip}
                className={cn(modernPill, 'bg-page-surface/90 text-page-muted ring-1 ring-page-text/10')}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid auto-rows-auto grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
          {studioFeatures.map((feature, index) => (
            <FeatureTile key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
