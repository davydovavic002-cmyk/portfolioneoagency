import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { StickerBadge } from '@/components/ui/RubberText'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

const startSteps = [
  {
    id: 'brief',
    label: '01',
    title: 'Fill the brief',
    body: 'Five questions on the site — type, goal, design, timeline, contact. About two minutes.',
  },
  {
    id: 'scope',
    label: '02',
    title: 'Scope in writing',
    body: 'We confirm package, price, and timeline before any build starts. No surprise invoices.',
  },
  {
    id: 'staging',
    label: '03',
    title: 'Staging early',
    body: 'You get a real link to click through — site or bot draft — while we iterate in writing.',
  },
]

function BrutalCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING, delay }}
      className={cn('brutal-border bg-page-surface', className)}
    >
      {children}
    </motion.div>
  )
}

function ExecutionManifesto() {
  return (
    <BrutalCard className="flex flex-col justify-between p-6 md:p-8 lg:min-h-full">
      <div>
        <StickerBadge color="#00c2ff">How we start</StickerBadge>

        <h2 className="mt-6 text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl">
          Every project begins with working software — not slide decks.
        </h2>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-page-muted md:text-lg">
          Custom design in real code — no templates, no off-the-shelf skins. Brief on the site, scope
          locked in writing, staging link early. Calls only if you want them.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {['Brief on site', 'Custom design', 'Staging early'].map((chip) => (
          <span
            key={chip}
            className="brutal-border bg-page-bg px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase"
          >
            {chip}
          </span>
        ))}
      </div>
    </BrutalCard>
  )
}

function StartPath() {
  return (
    <BrutalCard delay={0.08} className="flex flex-col p-6 md:p-8">
      <StickerBadge color="#ffc4dd">Your move</StickerBadge>

      <h2 className="mt-6 text-xl font-bold tracking-tight md:text-2xl">Three steps, then we build</h2>
      <p className="mt-2 text-sm leading-relaxed text-page-muted md:text-base">
        Landings from $400 · small sites from $500 · bots in the same band.
      </p>

      <ol className="mt-6 divide-y-2 divide-page-text border-2 border-page-text">
        {startSteps.map((step) => (
          <li key={step.id} className="flex gap-4 bg-page-bg p-4 md:gap-5 md:p-5">
            <span className="font-mono text-[10px] tracking-[0.35em] text-page-muted">{step.label}</span>
            <div className="min-w-0">
              <p className="font-semibold tracking-tight">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-page-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/brief"
          className="brutal-border bg-page-accent px-6 py-3 font-mono text-xs tracking-widest text-page-bg uppercase transition-transform hover:scale-95 active:scale-90"
        >
          Start brief
        </Link>
        <Link
          to="/pricing"
          className="brutal-border bg-page-surface px-6 py-3 font-mono text-xs tracking-widest uppercase transition-transform hover:scale-95 active:scale-90"
        >
          See pricing
        </Link>
      </div>
    </BrutalCard>
  )
}

export function ConversionZone() {
  return (
    <section className="border-t-2 border-page-text bg-page-bg px-4 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 md:mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-page-muted">Start here</span>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            From brief to working preview
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-page-muted">
            Same process as on Studio — just the short version before you scroll the rest of the site.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <ExecutionManifesto />
          <StartPath />
        </div>
      </div>
    </section>
  )
}
