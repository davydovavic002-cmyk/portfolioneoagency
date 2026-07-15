import { useMemo, useState } from 'react'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { CategoryFilter } from '@/components/portfolio/CategoryFilter'
import { EditorialGridCard } from '@/components/portfolio/EditorialGridCard'
import { CASE_PILLARS, cases, type CasePillar } from '@/data/cases'

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

  const filtered = useMemo(
    () => (activePillar === 'all' ? cases : cases.filter((c) => c.pillar === activePillar)),
    [activePillar],
  )

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
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Projects we built from scratch</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-page-muted md:text-lg">
            Full-stack product builds and AI agents scoped for real ops — SMS, Slack, Discord, and
            the storefront. Pick a category or browse everything.
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

        <div className="grid grid-cols-1 gap-0 border-2 border-page-text sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <EditorialGridCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
