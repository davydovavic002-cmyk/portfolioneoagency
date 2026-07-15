import type { CasePillar, CasePillarMeta } from '@/data/cases'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  pillars: CasePillarMeta[]
  active: CasePillar | 'all'
  onChange: (pillar: CasePillar | 'all') => void
  counts: Record<CasePillar, number>
}

export function CategoryFilter({ pillars, active, onChange, counts }: CategoryFilterProps) {
  return (
    <aside className="md:sticky md:top-20 md:self-start">
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase">Categories</p>
      <nav className="mt-4 flex flex-col gap-0 border-2 border-page-text">
        <button
          type="button"
          onClick={() => onChange('all')}
          className={cn(
            'border-b-2 border-page-text px-4 py-4 text-left transition-colors',
            active === 'all' ? 'bg-page-text text-page-bg' : 'bg-page-surface hover:bg-page-accent-2/20',
          )}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">All projects</span>
        </button>
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            onClick={() => onChange(pillar.id)}
            className={cn(
              'border-b-2 border-page-text px-4 py-4 text-left transition-colors last:border-b-0',
              active === pillar.id ? 'bg-page-text text-page-bg' : 'bg-page-surface hover:bg-page-accent-2/20',
            )}
          >
            <span className="block font-mono text-[10px] tracking-widest uppercase">{pillar.label}</span>
            <span className={cn('mt-1 block text-xs', active === pillar.id ? 'text-page-bg/70' : 'text-page-muted')}>
              {pillar.subtitle}
            </span>
            <span className="mt-2 block font-mono text-[9px] tracking-wider uppercase">
              {counts[pillar.id]} projects
            </span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
