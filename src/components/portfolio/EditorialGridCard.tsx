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
    >
      <Link
        to={`/work/${project.id}`}
        className={cn(
          'group flex flex-col border-b-2 border-r-2 border-page-text bg-page-surface text-left',
          'transition-colors hover:bg-page-accent-2/10',
        )}
      >
        <div className="flex aspect-[4/3] items-end border-b-2 border-page-text bg-page-bg p-4">
          <div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-page-muted">
              {project.client} — {project.year}
            </span>
            <h3 className="mt-1 text-xl font-bold tracking-tight">{project.title}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <p className="text-sm leading-relaxed text-page-muted">{project.description}</p>
          <span className="mt-4 font-mono text-[9px] tracking-[0.25em] uppercase opacity-0 transition-opacity group-hover:opacity-100">
            Read case study →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
