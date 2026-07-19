import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CaseStudy } from '@/data/cases'
import { cn } from '@/lib/utils'

interface EditorialGridCardProps {
  project: CaseStudy
  index: number
}

export function EditorialGridCard({ project, index }: EditorialGridCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 15 }}
      className="h-full min-h-0 bg-page-surface"
    >
      <Link
        to={`/work/${project.id}`}
        className={cn(
          'group flex h-full flex-col overflow-hidden bg-page-surface text-left',
          'outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-page-accent/40',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-page-bg">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  project.pillar === 'ai'
                    ? 'linear-gradient(145deg, color-mix(in srgb, var(--theme-accent-2) 45%, var(--theme-bg)), color-mix(in srgb, var(--theme-text) 12%, var(--theme-bg)))'
                    : 'linear-gradient(145deg, color-mix(in srgb, var(--theme-accent) 30%, var(--theme-bg)), var(--theme-bg))',
              }}
              aria-hidden
            />
          )}
          {!project.coverImage && (
            <span className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.3em] uppercase text-page-muted">
              {project.pillar === 'ai' ? 'Agent build' : 'Case study'}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-page-muted">
              {project.client} — {project.year}
            </span>
            <h3 className="mt-1 text-xl font-bold tracking-tight">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-page-muted">{project.description}</p>
          </div>
          <span className="mt-4 font-mono text-[9px] tracking-[0.25em] uppercase text-page-muted opacity-100 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
            Read case study →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
