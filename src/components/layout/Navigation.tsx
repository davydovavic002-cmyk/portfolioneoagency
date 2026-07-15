import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/brief', label: 'Brief' },
]

/** Matches hero body / CTA tone — Space Grotesk, readable small size */
const navLinkClass =
  'relative px-3 py-1.5 text-sm leading-relaxed tracking-tight transition-colors md:text-[15px]'

export function Navigation() {
  const location = useLocation()

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b-2 border-page-text bg-page-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <NavLink to="/" className="font-mono text-[10px] tracking-[0.35em] uppercase">
          NEO / SPACE
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)
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
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <NavLink
          to="/brief"
          className="brutal-border bg-page-accent px-4 py-2 text-sm font-medium leading-relaxed tracking-tight text-page-bg transition-transform hover:scale-95 active:scale-90 md:text-[15px]"
        >
          Start
        </NavLink>
      </div>
    </header>
  )
}
