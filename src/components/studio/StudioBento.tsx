import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StudioFeaturesBento } from '@/components/studio/StudioFeaturesBento'
import { studioIntro, studioWhy, studioPains, processSteps } from '@/data/studio'
import { modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

export function StudioBento() {
  return (
    <div className="relative">
      <section className="relative px-4 pt-4 pb-12 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={SPRING}
            className={cn(modernPanel, 'relative overflow-hidden p-8 md:p-10')}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  'linear-gradient(135deg, color-mix(in srgb, var(--theme-accent-2) 12%, transparent), transparent 50%, color-mix(in srgb, var(--theme-accent) 8%, transparent))',
              }}
            />
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                <span className={cn(modernPill, 'bg-page-accent-2/15 text-page-text')}>
                  Studio team
                </span>
                <span className={cn(modernPill, 'bg-page-bg/80 text-page-muted ring-1 ring-page-text/8')}>
                  Remote · Europe / Asia timezone
                </span>
                <span className={cn(modernPill, 'bg-page-bg/80 text-page-muted ring-1 ring-page-text/8')}>
                  Est. 2021
                </span>
              </div>
              <p className="mt-6 text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                {studioIntro.headline}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-page-muted md:text-lg">
                {studioIntro.lead}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {studioIntro.points.map((point, i) => (
                  <li
                    key={point.slice(0, 28)}
                    className="rounded-xl bg-page-bg/70 p-5 text-sm leading-relaxed ring-1 ring-page-text/8 backdrop-blur-sm md:text-[15px]"
                  >
                    <span
                      className={cn(
                        modernPill,
                        'mb-3',
                        i % 2 === 0 ? 'bg-page-accent-2/15 text-page-text' : 'bg-page-accent/15 text-page-text',
                      )}
                    >
                      0{i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-12 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{studioWhy.headline}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {studioWhy.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.05 }}
                className={cn(modernPanel, 'p-6 md:p-7')}
              >
                <h3 className="font-semibold tracking-tight md:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-page-muted md:text-[15px]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-12 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">The pains we actually solve</h2>
          <p className="mt-2 max-w-xl text-base text-page-muted md:text-lg">
            Expensive agencies, risky freelancers, cheap-looking templates, silent post-launch — pick your poison.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {studioPains.map((pain, index) => (
              <motion.div
                key={pain.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.05 }}
                className={cn(modernPanel, 'p-5 md:p-6')}
              >
                <h3 className="text-sm font-semibold tracking-tight md:text-base">{pain.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-page-muted">{pain.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StudioFeaturesBento />

      <section
        className="relative px-4 py-12 md:px-10 md:py-16"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--theme-bg) 85%, var(--theme-accent) 15%) 100%)',
        }}
      >
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">How a project runs</h2>
              <p className="mt-2 max-w-xl text-base text-page-muted md:text-lg">
                Written-first. Staging early. Your hosting + git at the end.
              </p>
            </div>
            <Link
              to="/brief"
              className="rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
            >
              Start with the brief
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ ...SPRING, delay: index * 0.07 }}
                whileHover={{ y: -2 }}
                className={cn(
                  modernPanel,
                  'flex flex-col p-6 transition-shadow hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.16)] md:p-7',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cn(modernPill, 'bg-page-text/8 text-page-muted tabular-nums')}>
                    Step {step.id}
                  </span>
                  {step.timing && (
                    <span
                      className={cn(
                        modernPill,
                        index === 0
                          ? 'bg-page-accent/15 text-page-accent'
                          : 'bg-page-accent-2/15 text-page-text',
                      )}
                    >
                      {step.timing}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-semibold tracking-tight md:text-lg">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-page-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
