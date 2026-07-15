import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PricingLineItem, PricingTierGroup } from '@/data/pricing'
import { formatLineItemPrice } from '@/data/pricing'
import { cn } from '@/lib/utils'
import { ProjectTotal } from '@/components/pricing/ProjectTotal'

interface PricingMatrixProps {
  groups: PricingTierGroup[]
  items: PricingLineItem[]
  baseFee: number
}

export function PricingMatrix({ groups, items, baseFee }: PricingMatrixProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const selectedItems = useMemo(
    () => items.filter((item) => selected.has(item.id)),
    [items, selected],
  )

  const total = useMemo(() => {
    let sum = baseFee
    for (const item of selectedItems) {
      sum += item.price
    }
    return sum
  }, [baseFee, selectedItems])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const totalProps = {
    value: total,
    itemCount: selected.size,
    baseFee,
    selectedItems,
  }

  return (
    <>
      <div
        className={cn(
          'grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]',
          selected.size > 0 && 'pb-28 lg:pb-0',
        )}
      >
        <div className="min-w-0 space-y-10">
          {groups.map((group, groupIndex) => {
            const tierItems = items.filter((item) => item.tier === group.id)
            if (tierItems.length === 0) return null

            return (
              <section key={group.id}>
                <div className="mb-4">
                  <span className="text-xs font-medium text-page-muted">Level {groupIndex + 1}</span>
                  <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{group.label}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-page-muted">{group.subtitle}</p>
                </div>

                <div className="grid gap-3">
                  {tierItems.map((item) => {
                    const checked = selected.has(item.id)
                    return (
                      <motion.label
                        key={item.id}
                        className={cn(
                          'block cursor-pointer rounded-2xl p-5 ring-1 transition-all md:p-6',
                          checked
                            ? 'bg-page-text text-page-bg ring-page-text shadow-lg'
                            : 'bg-page-surface/90 ring-page-text/10 hover:shadow-md hover:ring-page-text/20',
                          item.featured && !checked && 'ring-page-accent/30',
                        )}
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(item.id)}
                            className="mt-1 h-4 w-4 shrink-0 accent-page-accent"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                              <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <span className="font-semibold leading-snug">{item.label}</span>
                                {item.featured && (
                                  <span
                                    className={cn(
                                      'rounded-full px-2 py-0.5 text-[10px] font-medium',
                                      checked
                                        ? 'bg-page-bg/20 text-page-bg'
                                        : 'bg-page-accent/15 text-page-accent',
                                    )}
                                  >
                                    Popular
                                  </span>
                                )}
                              </div>
                              <div className="shrink-0 sm:text-right">
                                <span className="font-semibold tabular-nums">
                                  {formatLineItemPrice(item)}
                                </span>
                                {item.timeline && (
                                  <p
                                    className={cn(
                                      'mt-0.5 text-xs',
                                      checked ? 'text-page-bg/70' : 'text-page-muted',
                                    )}
                                  >
                                    {item.timeline}
                                  </p>
                                )}
                              </div>
                            </div>

                            {item.audience && (
                              <p
                                className={cn(
                                  'mt-2 text-xs font-medium leading-relaxed',
                                  checked ? 'text-page-bg/80' : 'text-page-accent',
                                )}
                              >
                                For: {item.audience}
                              </p>
                            )}

                            <p
                              className={cn(
                                'mt-2 text-sm leading-relaxed',
                                checked ? 'text-page-bg/75' : 'text-page-muted',
                              )}
                            >
                              {item.description}
                            </p>

                            {item.deliverables && item.deliverables.length > 0 && (
                              <ul
                                className={cn(
                                  'mt-3 space-y-1 text-xs leading-relaxed',
                                  checked ? 'text-page-bg/70' : 'text-page-muted',
                                )}
                              >
                                {item.deliverables.map((d) => (
                                  <li key={d} className="flex gap-2">
                                    <span className={checked ? 'text-page-bg/50' : 'text-page-accent'}>
                                      ·
                                    </span>
                                    <span>{d}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </motion.label>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <aside className="hidden lg:block lg:sticky lg:top-20 lg:w-full lg:max-w-[320px] lg:justify-self-end">
          <ProjectTotal {...totalProps} />
        </aside>
      </div>

      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 14 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-page-text/10 bg-page-bg/95 px-4 py-3 backdrop-blur-md lg:hidden"
          >
            <ProjectTotal {...totalProps} compact />
          </motion.div>
        )}
      </AnimatePresence>

      {selected.size === 0 && (
        <div className="mt-10 lg:hidden">
          <ProjectTotal {...totalProps} />
        </div>
      )}
    </>
  )
}
