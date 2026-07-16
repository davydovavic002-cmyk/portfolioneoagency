import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { studioIntro, studioWhy, studioBuild, studioAfterLaunch, processSteps } from '@/data/studio'
import { modernPanel, modernPill } from '@/components/ui/modernSurface'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

export function StudioBento() {
  return (
    <div className="relative">
      {/* Key points — numbers with breathing room */}
      <section className="relative px-4 pt-2 pb-14 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {studioIntro.points.map((point, index) => (
              <motion.li
                key={point.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.04 }}
                className={cn(modernPanel, 'flex gap-5 p-6 md:p-7')}
              >
                <span
                  className={cn(
                    modernPill,
                    'h-fit shrink-0 tabular-nums',
                    index % 2 === 0 ? 'bg-page-accent-2/15 text-page-text' : 'bg-page-accent/15 text-page-text',
                  )}
                >
                  {point.label}
                </span>
                <p className="text-sm leading-relaxed text-page-muted md:text-[15px]">{point.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process — primary flow, right after hero facts */}
      <section
        className="relative px-4 pb-14 md:px-10 md:pb-16"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--theme-bg) 92%, var(--theme-accent) 8%) 100%)',
        }}
      >
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">How a project runs</h2>
              <p className="mt-2 max-w-xl text-base text-page-muted md:text-lg">
                Written-first. Staging early. Your hosting and git at the end.
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
                transition={{ ...SPRING, delay: index * 0.06 }}
                className={cn(modernPanel, 'flex flex-col p-6 md:p-7')}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={cn(modernPill, 'bg-page-text/8 text-page-muted tabular-nums')}>
                    Step {step.id}
                  </span>
                  {step.timing && (
                    <span
                      className={cn(
                        modernPill,
                        index === 0 ? 'bg-page-accent/15 text-page-accent' : 'bg-page-accent-2/15 text-page-text',
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

      {/* Why — three cards, not four + pains + bento */}
      <section className="relative px-4 pb-14 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{studioWhy.headline}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
                <p className="mt-3 text-sm leading-relaxed text-page-muted md:text-[15px]">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build — compact 2×2 */}
      <section className="relative px-4 pb-14 md:px-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{studioBuild.headline}</h2>
              <p className="mt-2 max-w-lg text-base text-page-muted">{studioBuild.lead}</p>
            </div>
            <Link
              to="/pricing"
              className="text-sm text-page-accent underline-offset-2 hover:underline"
            >
              See all packages →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {studioBuild.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.04 }}
                className={cn(modernPanel, 'p-6 md:p-7')}
              >
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-page-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After launch */}
      <section className="relative px-4 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{studioAfterLaunch.headline}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {studioAfterLaunch.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.05 }}
                className={cn(
                  modernPanel,
                  'p-6 md:p-8',
                  item.id === 'care' && 'ring-1 ring-page-accent/20',
                )}
              >
                <h3 className="font-semibold tracking-tight md:text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-page-muted md:text-[15px]">{item.body}</p>
                {item.id === 'care' && (
                  <Link
                    to="/pricing"
                    className="mt-5 inline-flex rounded-full bg-page-text px-5 py-2.5 text-sm font-medium text-page-bg"
                  >
                    See care package
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
