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
    description:
      'Custom sites and bots — clear packages from $400, written-first process. Remote studio, Europe / Asia timezone.',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description:
      'Custom-designed sites from $400, stores from $2,000, bots in the same band (you pay AI tokens), and $350/mo care.',
  },
  {
    path: '/brief',
    title: 'Brief',
    description:
      'Five friendly questions about your project — we reply within 24 hours, usually in writing.',
  },
  {
    path: '/brief/project',
    title: 'Project brief',
    description:
      'Design direction, content, and references — the follow-up after you pick packages on Pricing.',
  },
  {
    path: '/revisions',
    title: 'Revisions',
    description:
      'Written revision board for active projects — leave staging feedback without a call.',
  },
]
