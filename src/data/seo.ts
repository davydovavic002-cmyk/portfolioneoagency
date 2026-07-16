/** Route meta used by <Seo /> and the build-time prerender script. */
export interface RouteSeo {
  path: string
  title?: string
  description: string
}

export const STATIC_ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    description:
      'Full-stack design-engineering studio — custom web products, AI agents, and fixed-scope packages. No templates.',
  },
  {
    path: '/work',
    title: 'Work',
    description: 'Selected full-stack products and US-ready AI/bot systems from NEO STUDIO SPACE.',
  },
  {
    path: '/studio',
    title: 'Studio',
    description: 'How we work — custom architecture, staging URLs, and end-to-end delivery.',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description:
      'Custom-designed sites from $400, online stores, web apps, starter-to-AI bots, and $350/mo Support our project.',
  },
  {
    path: '/brief',
    title: 'Brief',
    description: 'Four quick questions — we match a package and reply within 24 hours.',
  },
  {
    path: '/revisions',
    title: 'Revisions',
    description:
      'Written revision board for active projects — leave staging feedback without a call.',
  },
]
