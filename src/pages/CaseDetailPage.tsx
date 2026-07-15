import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { CasePreviewViewport } from '@/components/portfolio/CasePreviewViewport'
import { getCaseById, CASE_PILLARS } from '@/data/cases'
import { cn } from '@/lib/utils'

const SPRING = { type: 'spring' as const, stiffness: 350, damping: 14 }

interface CaseDetailPageProps {
  caseId: string
}

export function CaseDetailPage({ caseId }: CaseDetailPageProps) {
  const project = getCaseById(caseId)
  const pillarMeta = project ? CASE_PILLARS.find((p) => p.id === project.pillar) : undefined

  if (!project) {
    return (
      <PageTransition className="min-h-screen bg-page-bg pt-14">
        <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-10">
          <p className="text-lg text-page-muted">Project not found.</p>
          <Link to="/work" className="mt-4 inline-block font-mono text-xs tracking-widest uppercase underline">
            ← Back to work
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title={project.title}
        description={project.tagline}
        path={`/work/${project.id}`}
      />
      <article>
        <header className="border-b-2 border-page-text">
          <div className="mx-auto max-w-[900px] px-4 py-10 md:px-10 md:py-16">
            <Link
              to="/work"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-page-muted transition-colors hover:text-page-text"
            >
              ← All projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING}
              className="mt-8"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-page-muted">
                <span>{project.client}</span>
                <span>·</span>
                <span>{project.year}</span>
                <span>·</span>
                <span>{project.duration}</span>
                {pillarMeta && (
                  <>
                    <span>·</span>
                    <span className="text-page-accent">{pillarMeta.label}</span>
                  </>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
              <p className="mt-4 text-lg leading-relaxed text-page-muted md:text-xl">{project.tagline}</p>
            </motion.div>
          </div>
        </header>

        {project.previewUrl ? (
          <section
            className="border-b-2 border-page-text"
            style={{
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--theme-bg) 92%, var(--theme-accent-2) 8%) 0%, var(--theme-bg) 100%)',
            }}
          >
            <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-10 md:py-12">
              <p className="mb-6 text-center text-sm font-medium text-page-muted">Live preview</p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.1 }}
              >
                <CasePreviewViewport url={project.previewUrl} title={project.title} />
              </motion.div>
            </div>
          </section>
        ) : (
          <section className="border-b-2 border-page-text bg-page-bg px-4 py-10 md:px-10">
            <div className="mx-auto max-w-[900px] rounded-2xl bg-page-surface/80 px-6 py-8 text-center ring-1 ring-page-text/10">
              <p className="text-sm font-medium text-page-text">Interactive demo coming soon</p>
              <p className="mt-2 text-sm text-page-muted">
                Architecture and outcomes below — live staging URL ships with the next client build.
              </p>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-[900px] px-4 py-12 md:px-10 md:py-16">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={SPRING}
          >
            <h2 className="font-mono text-[10px] tracking-[0.35em] uppercase">Overview</h2>
            <p className="mt-4 text-base leading-relaxed md:text-lg">{project.overview}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="mt-14 border-t border-page-text pt-14"
          >
            <h2 className="font-mono text-[10px] tracking-[0.35em] uppercase">The problem</h2>
            <p className="mt-4 text-base leading-relaxed text-page-muted md:text-lg">{project.challenge}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...SPRING, delay: 0.05 }}
            className="mt-14 border-t border-page-text pt-14"
          >
            <h2 className="font-mono text-[10px] tracking-[0.35em] uppercase">What we did</h2>
            <ol className="mt-8 space-y-8">
              {project.approach.map((step, i) => (
                <li key={step.title} className="grid gap-2 md:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-sm text-page-muted">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-page-muted md:text-base">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={SPRING}
            className="mt-14 border-t border-page-text pt-14"
          >
            <h2 className="font-mono text-[10px] tracking-[0.35em] uppercase">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border border-page-text px-3 py-1 font-mono text-[10px] tracking-wide uppercase"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] tracking-wide text-page-muted uppercase">
              Team: {project.team}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={SPRING}
            className="mt-14 border-t border-page-text pt-14"
          >
            <h2 className="font-mono text-[10px] tracking-[0.35em] uppercase">Results</h2>
            <ul className="mt-6 space-y-3">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-base leading-relaxed md:text-lg">
                  <span className="text-page-accent">—</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.footer
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={SPRING}
            className={cn(
              'mt-16 flex flex-wrap items-center gap-4 border-t-2 border-page-text pt-10',
            )}
          >
            <Link
              to="/brief"
              className="brutal-border bg-page-accent px-6 py-3 font-mono text-xs tracking-widest text-page-bg uppercase transition-transform hover:scale-95"
            >
              Start a similar project
            </Link>
            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border bg-page-surface px-6 py-3 font-mono text-xs tracking-widest uppercase transition-transform hover:scale-95"
              >
                Open preview ↗
              </a>
            )}
            <Link
              to="/work"
              className="font-mono text-[10px] tracking-widest uppercase text-page-muted underline-offset-4 hover:text-page-text hover:underline"
            >
              More projects
            </Link>
          </motion.footer>
        </div>
      </article>
    </PageTransition>
  )
}
