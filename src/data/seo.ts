/** Shared SEO constants for React, prerender, and static HTML shell. */
export interface RouteSeo {
  path: string
  title?: string
  description: string
  noIndex?: boolean
}

export const SITE_URL = 'https://neostudio.space'
export const SITE_NAME = 'NEO STUDIO SPACE'
export const SITE_SHORT_NAME = 'NEO SPACE'
export const SITE_LOCALE = 'en_US'

export const DEFAULT_DESCRIPTION =
  'Full-stack design-engineering studio — custom web products, AI agents, and fixed-scope packages. No templates.'

export const HOME_HERO_TAGLINE =
  'Full-stack design-engineering studio — we architect and ship custom products from scratch.'

export const OG_IMAGE_PATH = '/og.png'
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = 'NEO STUDIO SPACE — full-stack design-engineering studio'

export const TWITTER_HANDLE = '@neostudio_space'
export const THEME_COLOR = '#fff5e6'

export const STATIC_ROUTE_SEO: RouteSeo[] = [
  {
    path: '/',
    description: DEFAULT_DESCRIPTION,
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
    description: 'Five friendly questions about your project — we reply within 24 hours, usually in writing.',
  },
  {
    path: '/brief/project',
    title: 'Project brief',
    description: 'Design direction, content, and references — the follow-up after you pick packages on Pricing.',
    noIndex: true,
  },
  {
    path: '/revisions',
    title: 'Revisions',
    description: 'Written revision board for active projects — leave staging feedback without a call.',
    noIndex: true,
  },
]

export function buildPageTitle(title?: string): string {
  return title ? `${title} · ${SITE_NAME}` : SITE_NAME
}

export function buildCanonicalUrl(path = '/'): string {
  return `${SITE_URL}${path === '/' ? '' : path}`
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    image: OG_IMAGE_URL,
    description: DEFAULT_DESCRIPTION,
    email: 'neostudiospace@gmail.com',
    sameAs: ['https://t.me/neostudio_space'],
  }
}
