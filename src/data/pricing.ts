export type PricingTier = 'sites' | 'upsells' | 'bots' | 'care'

export interface PricingLineItem {
  id: string
  tier: PricingTier
  label: string
  description: string
  /** Numeric amount for estimate total (minimum when priceDisplay is “from …”) */
  price: number
  priceDisplay?: string
  /** When true, quote math treats price as a floor */
  fromPrice?: boolean
  timeline?: string
  audience?: string
  deliverables?: string[]
  featured?: boolean
  /** Shown as “included in base site packages” note */
  baseIncludesNote?: boolean
}

export interface PricingTierGroup {
  id: PricingTier
  label: string
  subtitle: string
}

export const PRICING_TIER_GROUPS: PricingTierGroup[] = [
  {
    id: 'sites',
    label: 'Sites & products',
    subtitle:
      'Custom design every time — from refs or from scratch, same price. No templates. Two languages in every site package.',
  },
  {
    id: 'upsells',
    label: 'Add-ons',
    subtitle: 'Bolt onto a site or bot when you need one more capability — not a new package.',
  },
  {
    id: 'bots',
    label: 'Bots & agents',
    subtitle:
      'Priced in the same band as sites. You pay AI token usage on your own OpenAI (or similar) key — not included in our fee.',
  },
  {
    id: 'care',
    label: 'Care',
    subtitle: 'Two weeks launch support is included. This is ongoing care after that.',
  },
]

/**
 * Dump-friendly packages. Site ladder: $400 → from $500 → from $1000 → from $2000 → from $3500.
 * Bots mirror that band. Client pays LLM tokens separately.
 */
export const pricingLineItems: PricingLineItem[] = [
  {
    id: 'landing-page',
    tier: 'sites',
    label: 'Landing Page',
    price: 400,
    timeline: '1–2 weeks',
    featured: true,
    audience: 'Sharp one-pager — custom UI, not a theme with a logo swap.',
    description:
      'Custom-designed single page (from your refs or from scratch). Motion, 2 languages, SEO basics, and copy — yours or ours. Git + your hosting.',
    deliverables: [
      'Custom design (refs or blank slate — same package)',
      'Hero + sections + footer, with motion',
      'Copy: you provide or we write',
      '2 languages included',
      'SEO basics + analytics hooks',
      'Staging, git, deploy to your host, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'site-essential',
    tier: 'sites',
    label: 'Essential Site · up to 3 pages',
    price: 500,
    fromPrice: true,
    priceDisplay: 'from $500',
    timeline: '1–2 weeks',
    audience: 'Home + 1–2 inner pages (menu, visit, pricing, FAQ).',
    description:
      'Compact multi-page site, still fully custom-designed. Same base: motion, 2 languages, SEO, copy included.',
    deliverables: [
      'Custom design · up to 3 pages + shared nav',
      'Motion + 2 languages + SEO',
      'Copy: you or us',
      'Contact / CTA flows',
      'Staging, git, your hosting, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'aesthetic-web',
    tier: 'sites',
    label: 'Brand Site · up to 5 pages',
    price: 1000,
    fromPrice: true,
    priceDisplay: 'from $1,000',
    timeline: '2–3 weeks',
    featured: true,
    audience: 'Brands that need more room and a stronger visual system.',
    description:
      'Custom brand site — richer motion and page set. Design from refs or from zero at the same rate.',
    deliverables: [
      'Custom design system · up to 5 pages',
      'Motion-led UI',
      'Copy: you or us · 2 languages · SEO',
      'Staging, git, your hosting, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'ecommerce-store',
    tier: 'sites',
    label: 'Online Store',
    price: 2000,
    fromPrice: true,
    priceDisplay: 'from $2,000',
    timeline: '2–4 weeks',
    featured: true,
    audience: 'Product brands — catalog, cart, Stripe, custom storefront.',
    description:
      'Full custom store package: product pages, cart, Stripe, light admin. Final quote after we see catalog size.',
    deliverables: [
      'Custom storefront design',
      'Catalog + cart + Stripe checkout',
      'Admin / CMS for products',
      '2 languages · SEO basics',
      'Staging, git, your hosting, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'web-app',
    tier: 'sites',
    label: 'Web App / dashboard',
    price: 3500,
    fromPrice: true,
    priceDisplay: 'from $3,500',
    timeline: '1–2 months',
    audience: 'SaaS slices, client portals, internal tools — not a marketing site.',
    description:
      'Custom product UI + backend starting point. Scope locked in writing after brief; timeline typically 1–2 months.',
    deliverables: [
      'Custom product UI',
      'Auth-ready architecture',
      'API / data model for the MVP slice',
      'Staging + git handoff',
      '2 weeks launch support',
    ],
  },
  {
    id: 'upsell-crm',
    tier: 'upsells',
    label: 'CRM / lead pipeline',
    price: 400,
    timeline: '+3–7 days',
    description: 'Forms → HubSpot, Notion, or a light custom admin. Attach to any site.',
    deliverables: [
      'Lead capture wired to CRM or admin',
      'Statuses / tags for follow-up',
      'Handoff notes for your team',
    ],
  },
  {
    id: 'upsell-payments',
    tier: 'upsells',
    label: 'Payments (Stripe)',
    price: 350,
    timeline: '+3–7 days',
    description: 'Checkout or pay links for deposits, bookings, or simple products — on top of a site package.',
    deliverables: [
      'Stripe checkout or payment links',
      'Success / failure flows',
      'Basic confirmation emails',
    ],
  },
  {
    id: 'upsell-locale',
    tier: 'upsells',
    label: 'Extra language',
    price: 150,
    timeline: '+2–5 days',
    description: 'Site packages include 2 languages. Each additional locale is this add-on.',
    deliverables: [
      'Extra locale wiring',
      'Translated UI paths (copy you provide or we write in scope)',
      'Language switcher update',
    ],
  },
  {
    id: 'upsell-page',
    tier: 'upsells',
    label: 'Extra page',
    price: 150,
    timeline: '+2–5 days',
    description: 'One more page beyond the package limit (e.g. 4th page on Essential, 6th on Brand).',
    deliverables: ['One additional custom page', 'Wired into nav + SEO basics'],
  },
  {
    id: 'upsell-booking',
    tier: 'upsells',
    label: 'Booking / calendar',
    price: 400,
    timeline: '+3–7 days',
    description: 'Appointment or reservation flow wired to Google Calendar or a simple booking UI.',
    deliverables: [
      'Booking UI or calendar link flow',
      'Confirmation message / email',
      'Handoff notes',
    ],
  },
  {
    id: 'upsell-bot-channel',
    tier: 'upsells',
    label: 'Extra bot channel',
    price: 250,
    timeline: '+3–7 days',
    description: 'Bot packages include one primary channel. Add Telegram, SMS, widget, or Discord as a second channel.',
    deliverables: ['Second channel connected to the same brain', 'Smoke-tested handoff'],
  },
  {
    id: 'bot-starter',
    tier: 'bots',
    label: 'Starter Bot',
    price: 400,
    timeline: '1–2 weeks',
    featured: true,
    audience: 'FAQ / simple flows — same price band as a Landing.',
    description:
      'One primary channel (Telegram, SMS, site widget, or Discord). Scripted FAQ answers. AI token usage bills to your key — not included.',
    deliverables: [
      '1 channel: Telegram · SMS · site widget · or Discord',
      'Conversation script + FAQ brain',
      'Handoff to human / contact when needed',
      'You connect & pay your own AI API key',
      'Docs + 2 weeks support',
    ],
  },
  {
    id: 'bot-ops',
    tier: 'bots',
    label: 'Ops Bot',
    price: 500,
    fromPrice: true,
    priceDisplay: 'from $500',
    timeline: '1–3 weeks',
    audience: 'Lead qualify, booking, or intake — same band as Essential Site.',
    description:
      'Beyond FAQ: collect fields, qualify, ping CRM/calendar. Token usage on your AI key — not in our fee.',
    deliverables: [
      '1 primary channel',
      'Qualify / intake flow',
      'CRM or calendar hook (one integration)',
      'You connect & pay your own AI API key',
      'Handoff + docs + 2 weeks support',
    ],
  },
  {
    id: 'ai-core-mvp',
    tier: 'bots',
    label: 'AI Agent',
    price: 1000,
    fromPrice: true,
    priceDisplay: 'from $1,000',
    timeline: '2–4 weeks',
    featured: true,
    audience: 'Answers from your docs / store — same band as Brand Site.',
    description:
      'Bot grounded in your materials (docs, FAQ, catalog). Smarter than a fixed FAQ list. You pay AI tokens on your own key.',
    deliverables: [
      'Connected to your knowledge sources',
      '1–2 channels or embedded chat',
      'Escalation to human with transcript',
      'You connect & pay your own AI API key',
      'Staging + git · 2 weeks support',
    ],
  },
  {
    id: 'support-project',
    tier: 'care',
    label: 'Support our project',
    price: 350,
    priceDisplay: '$350 / month',
    timeline: 'Monthly',
    featured: true,
    audience: 'After the included 2-week launch window — keep a written care channel open.',
    description:
      'Ongoing written support via the revisions board: small fixes, content updates, dependency bumps.',
    deliverables: [
      'Written revision board access (/revisions)',
      'Up to 4 hours / month of fixes & content',
      'Priority reply within 2 business days',
      'Cancel anytime — month to month',
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

  const hasFrom = selectedItems.some((item) => item.fromPrice)
  const hasBot = selectedItems.some((item) => item.tier === 'bots')

  if (selectedItems.length === 0) {
    return [
      "Hi NEO STUDIO — I'm looking at your pricing page and would like help picking the right package.",
      '',
      'Can we continue in writing (brief + chat)?',
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
    hasFrom
      ? `Estimate (floors where “from” applies): ${totalLabel}`
      : `Package total: ${totalLabel}`,
  ]

  if (hasBot) {
    lines.push(
      '',
      'Note: AI token / API usage is billed to the client’s own key — not included in studio fees.',
    )
  }

  lines.push('', 'Prefer to continue in writing — happy to fill the brief next.')

  return lines.join('\n')
}
