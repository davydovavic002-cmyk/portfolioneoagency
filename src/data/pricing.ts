export type PricingTier = 'hooks' | 'packages' | 'flagship' | 'retainer'

export interface PricingLineItem {
  id: string
  tier: PricingTier
  label: string
  description: string
  /** Numeric amount for estimate total; use 0 when priceDisplay is fixed/range */
  price: number
  priceDisplay?: string
  timeline?: string
  audience?: string
  deliverables?: string[]
  featured?: boolean
}

export interface PricingTierGroup {
  id: PricingTier
  label: string
  subtitle: string
}

export const PRICING_TIER_GROUPS: PricingTierGroup[] = [
  {
    id: 'hooks',
    label: 'Level 1 · Quick starts',
    subtitle: 'Focused entry points with clear deliverables',
  },
  {
    id: 'packages',
    label: 'Level 2 · Productized services',
    subtitle: 'Websites, stores, bots, and AI products — fixed scope, fixed price',
  },
  {
    id: 'flagship',
    label: 'Level 3 · Flagship',
    subtitle: 'End-to-end delivery for complex multi-module products',
  },
  {
    id: 'retainer',
    label: 'Level 4 · Ongoing partnership',
    subtitle: 'Dedicated capacity for iteration and long-term growth',
  },
]

/** Fixed-scope packages migrated from neo studio portfolio */
export const pricingLineItems: PricingLineItem[] = [
  {
    id: 'aesthetic-micro',
    tier: 'hooks',
    label: 'Aesthetic Micro-Site / Landing Page',
    price: 1600,
    timeline: '6 days',
    audience:
      'Founders and creators who need a launch-ready full-page site — product teaser, waitlist, or landing presence.',
    description:
      'One scrollable page: hero, supporting sections, and footer. Glassmorphism aesthetics, responsive layout, and smooth interactions.',
    deliverables: [
      'Full-page layout (hero + sections + footer)',
      'Framer Motion interactions',
      'Next.js / React build & deploy',
      'Basic SEO',
    ],
  },
  {
    id: 'hero',
    tier: 'hooks',
    label: 'Hero Section',
    price: 1200,
    timeline: '3–5 days',
    description:
      'One above-the-fold block only — design, code, and motion. Expand the site later if needed.',
    deliverables: [
      'One hero section (above the fold)',
      'Next.js + Tailwind implementation',
      'Motion & responsive layout',
    ],
  },
  {
    id: 'landing-page',
    tier: 'packages',
    label: 'Essential Site · up to 3 pages',
    price: 2500,
    timeline: '8–12 days',
    audience:
      'Founders and brands that need a small site with navigation — pricing, FAQ, schedule, or contact on separate pages.',
    description:
      'Compact site with up to 3 linked pages and shared layout. Clear structure, forms, fast load, and deploy included.',
    deliverables: [
      'UX structure & design (up to 3 pages)',
      'Shared navigation and page templates',
      'Next.js + Tailwind implementation',
      'Contact form or CTA on key pages',
      'Responsive layout, basic SEO & deploy',
    ],
  },
  {
    id: 'aesthetic-web',
    tier: 'packages',
    label: 'Aesthetic Web',
    price: 3500,
    timeline: '10–14 days',
    featured: true,
    audience: 'Startups preparing for launch — strong visual identity and motion.',
    description: 'Brand-first site with custom design and micro-interactions — up to 5 pages.',
    deliverables: [
      'Custom design & layout (up to 5 pages)',
      'Next.js / Tailwind frontend',
      'Framer Motion micro-interactions',
      'Responsive layout, basic SEO & deploy',
    ],
  },
  {
    id: 'multi-page-site',
    tier: 'packages',
    label: 'Multi-page Website',
    price: 4200,
    timeline: '12–16 days',
    audience: 'Businesses that need a full company site with room to grow.',
    description: 'Structured company website with navigation, content sections, and blog structure.',
    deliverables: [
      'Site map & design (up to 10 pages)',
      'Next.js frontend with shared layout',
      'Blog or news section',
      'Contact forms, SEO basics, deploy',
    ],
  },
  {
    id: 'telegram-bot',
    tier: 'packages',
    label: 'Telegram AI Bot',
    price: 4500,
    timeline: '10–14 days',
    audience: 'EdTech, support, and SaaS teams that need an AI agent in Telegram.',
    description:
      'Production-ready Telegram bot with LLM agents, dialog flows, and session memory.',
    deliverables: [
      'Conversation design & bot architecture',
      'Python (aiogram) or Node.js implementation',
      'OpenAI / LLM integration with streaming',
      'Redis or database session memory',
      'Deploy, docs & handoff',
    ],
  },
  {
    id: 'web-app',
    tier: 'packages',
    label: 'Web App / Dashboard',
    price: 5200,
    timeline: '14–18 days',
    audience: 'Teams launching a SaaS tool, client portal, or internal dashboard.',
    description: 'Authenticated web application with backend, database, and a functional product UI.',
    deliverables: [
      'UX flows & dashboard/product UI design',
      'Auth (email, OAuth, or magic link)',
      'Supabase / PostgreSQL backend',
      'Core features & admin views',
      'Production deploy & handoff',
    ],
  },
  {
    id: 'ecommerce-store',
    tier: 'packages',
    label: 'E-commerce Store',
    price: 5800,
    timeline: '14–18 days',
    featured: true,
    audience: 'Brands selling physical or digital products — boutique feel with real checkout.',
    description: 'Online store with catalog, cart, and Stripe payments — custom UI, not a template theme.',
    deliverables: [
      'Storefront design & product pages',
      'Cart, checkout & Stripe integration',
      'CMS or admin for products & categories',
      'Order flow, responsive polish, deploy',
    ],
  },
  {
    id: 'ai-core-mvp',
    tier: 'packages',
    label: 'AI Core MVP',
    price: 6000,
    timeline: '14–21 days',
    featured: true,
    audience: 'Teams that need a working product with real AI inside — not just a marketing site.',
    description: 'Fullstack build with AI integration, auth, and payments.',
    deliverables: [
      'Database & backend on Supabase / FastAPI / PostgreSQL',
      'Custom AI tools via API (LLM agents, smart chat)',
      'Auth & Stripe payments',
      'Functional dashboard UI/UX',
    ],
  },
  {
    id: 'neo-venture',
    tier: 'flagship',
    label: 'Neo Venture',
    price: 12000,
    priceDisplay: '$12,000 – $15,000+',
    timeline: '30–45 days',
    featured: true,
    audience: 'EdTech platforms, B2B SaaS, and teams launching a multi-module product from scratch.',
    description: 'Full product build — strategy, design, engineering, and launch.',
    deliverables: [
      'Scope & UX architecture',
      'Custom design (20+ screens)',
      'Fullstack Next.js + Supabase + AI workflows',
      'Production deploy & 1 month post-launch support',
    ],
  },
  {
    id: 'neo-dedicated',
    tier: 'retainer',
    label: 'Neo Dedicated',
    price: 4500,
    priceDisplay: '$4,500 / month',
    featured: true,
    description:
      'Reserved fullstack and design capacity each month. You add tasks to Notion — we ship in priority order.',
    deliverables: [
      'Dedicated development & design capacity',
      'One active task at a time',
      'Small tasks delivered within 24–48 hours',
      'Shared Notion task board',
    ],
  },
]

/** Packages are all-in; no separate base fee */
export const PROJECT_BASE_FEE = 0

export function formatLineItemPrice(item: PricingLineItem): string {
  if (item.priceDisplay) return item.priceDisplay
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(item.price)
}

export function formatPricingQuoteMessage(selectedItems: PricingLineItem[], total: number): string {
  const totalLabel = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(total)

  if (selectedItems.length === 0) {
    return [
      'Hi NEO STUDIO — I\'m looking at your pricing page and would like help picking the right package.',
      '',
      'Can we discuss scope and timeline?',
    ].join('\n')
  }

  const lines = [
    'Hi NEO STUDIO — package quote request from the site:',
    '',
    'SELECTED PACKAGES',
    ...selectedItems.map((item) => {
      const timeline = item.timeline ? ` · ${item.timeline}` : ''
      return `- ${item.label}: ${formatLineItemPrice(item)}${timeline}`
    }),
    '',
    `Estimate from (minimum where ranges apply): ${totalLabel}`,
    '',
    'Happy to jump on a quick call or continue in chat. Final scope after brief.',
  ]

  return lines.join('\n')
}
