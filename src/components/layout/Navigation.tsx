import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/brief', label: 'Brief' },
]

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 }

/** Matches hero body / CTA tone — Space Grotesk, readable small size */
const navLinkClass =
  'relative px-3 py-1.5 text-sm leading-relaxed tracking-tight transition-colors md:text-[15px]'

function isLinkActive(pathname: string, to: string) {
  return to === '/'
    ? pathname === '/'
    : pathname === to || pathname.startsWith(`${to}/`)
}

export function Navigation() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <header className="safe-top fixed top-0 right-0 left-0 z-50 border-b-2 border-page-text bg-page-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-4 lg:px-8">
          <NavLink to="/" className="shrink-0 font-mono text-[10px] tracking-[0.35em] uppercase">
            NEO / SPACE
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isLinkActive(location.pathname, link.to)
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={cn(
                    navLinkClass,
                    active ? 'font-medium text-page-accent' : 'text-page-muted hover:text-page-text',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border-2 border-page-text bg-page-accent-2/30"
                      transition={SPRING}
                    />
                  )}
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
              className="brutal-border flex h-11 w-11 items-center justify-center bg-page-surface transition-transform hover:scale-95 active:scale-90 lg:hidden"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="flex w-4 flex-col justify-center gap-1">
                <span
                  className={cn(
                    'block h-0.5 w-full bg-page-text transition-transform duration-200',
                    menuOpen && 'translate-y-1.5 rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full bg-page-text transition-opacity duration-200',
                    menuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-full bg-page-text transition-transform duration-200',
                    menuOpen && '-translate-y-1.5 -rotate-45',
                  )}
                />
              </span>
            </button>

            <NavLink
              to="/brief"
              className="brutal-border inline-flex min-h-11 items-center bg-page-accent px-4 py-2.5 text-sm font-medium leading-relaxed tracking-tight text-page-bg transition-transform hover:scale-95 active:scale-90 lg:text-[15px]"
            >
              Start
            </NavLink>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="safe-bottom fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t-2 border-page-text bg-page-bg lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1600px] flex-col px-4 py-4 pb-6">
              {links.map((link, index) => {
                const active = isLinkActive(location.pathname, link.to)
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'border-b-2 border-page-text px-4 py-4 text-lg font-medium tracking-tight transition-colors last:border-b-0',
                      active ? 'bg-page-accent-2/20 text-page-accent' : 'bg-page-surface hover:bg-page-accent-2/10',
                      index === 0 && 'border-t-2',
                    )}
                  >
                    {link.label}
                  </NavLink>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
