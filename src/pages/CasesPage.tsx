import { useMemo, useState } from 'react'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { CategoryFilter } from '@/components/portfolio/CategoryFilter'
import { EditorialGridCard } from '@/components/portfolio/EditorialGridCard'
import { CASE_PILLARS, cases, getCasesByPillar, type CasePillar, type CaseStudy } from '@/data/cases'

function CaseGrid({ projects }: { projects: CaseStudy[] }) {
  return (
    <div className="grid grid-cols-1 divide-y-2 divide-page-text border-2 border-page-text bg-page-surface sm:grid-cols-2 sm:divide-x-2 sm:divide-y-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <EditorialGridCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}

function WorkSection({
  label,
  subtitle,
  projects,
}: {
  label: string
  subtitle: string
  projects: CaseStudy[]
}) {
  if (projects.length === 0) return null

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-page-text pb-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{label}</h2>
          <p className="mt-1 text-sm text-page-muted md:text-base">{subtitle}</p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-page-muted">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
      <CaseGrid projects={projects} />
    </div>
  )
}

export function CasesPage() {
  const [activePillar, setActivePillar] = useState<CasePillar | 'all'>('all')

  const counts = useMemo(
    () =>
      CASE_PILLARS.reduce(
        (acc, pillar) => {
          acc[pillar.id] = cases.filter((c) => c.pillar === pillar.id).length
          return acc
        },
        {} as Record<CasePillar, number>,
      ),
    [],
  )

  const sites = useMemo(() => getCasesByPillar('fullstack'), [])
  const bots = useMemo(() => getCasesByPillar('ai'), [])

  return (
    <PageTransition className="min-h-screen bg-page-bg pt-14">
      <Seo
        title="Work"
        path="/work"
        description="Selected full-stack products and US-ready AI/bot systems from NEO STUDIO SPACE."
      />
      <section className="border-b-2 border-page-text px-4 py-14 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase">Work</span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Projects we built from scratch
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-page-muted md:text-lg">
            Sites and AI agents in two clear lanes — pick a category or browse both.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-[240px_1fr] md:px-10 lg:grid-cols-[280px_1fr]">
        <CategoryFilter
          pillars={CASE_PILLARS}
          active={activePillar}
          onChange={setActivePillar}
          counts={counts}
        />

        <div className="space-y-14">
          {(activePillar === 'all' || activePillar === 'fullstack') && (
            <WorkSection
              label="Sites"
              subtitle="Product UIs, storefronts, and full-stack web builds"
              projects={sites}
            />
          )}
          {(activePillar === 'all' || activePillar === 'ai') && (
            <WorkSection
              label="Bots & agents"
              subtitle="SMS, Slack, Discord, and RAG systems for real ops"
              projects={bots}
            />
          )}
        </div>
      </section>
    </PageTransition>
  )
}
