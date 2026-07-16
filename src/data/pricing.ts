export type PricingTier = 'sites' | 'upsells' | 'bots' | 'care'

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
    label: 'Sites',
    subtitle: 'Custom builds — animations, multilingual, and SEO included. No templates.',
  },
  {
    id: 'upsells',
    label: 'Upsells',
    subtitle: 'Add CRM, payments, or a full store when the base site isn’t enough.',
  },
  {
    id: 'bots',
    label: 'Bots & agents',
    subtitle: 'SMS, Slack, Discord, RAG — same studio as the website.',
  },
  {
    id: 'care',
    label: 'Care',
    subtitle: 'Two weeks launch support is included. This is ongoing care after that.',
  },
]

/**
 * Fixed packages aligned with Studio offer:
 * landings from $400; base = motion + i18n + SEO; CRM/payments = upsell; support package after 2 weeks.
 */
export const pricingLineItems: PricingLineItem[] = [
  {
    id: 'landing-page',
    tier: 'sites',
    label: 'Landing Page',
    price: 400,
    timeline: '1–2 weeks',
    featured: true,
    audience: 'Founders and local businesses who need a sharp one-pager — not a Tilda clone.',
    description:
      'Custom single-page site. Base includes animations, multilingual, and SEO. Git handoff + deploy to your hosting.',
    deliverables: [
      'Custom layout (hero + sections + footer)',
      'Motion / micro-interactions',
      'Multilingual (up to 2 locales)',
      'SEO basics + analytics hooks',
      'Staging URL, git repo, deploy to your host',
      '2 weeks launch support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'site-essential',
    tier: 'sites',
    label: 'Essential Site · up to 3 pages',
    price: 900,
    timeline: '1–2 weeks',
    audience: 'Brands that need Home + 1–2 inner pages (menu, visit, pricing, FAQ).',
    description:
      'Compact multi-page site with shared navigation. Same base stack: motion, multilingual, SEO — still custom code.',
    deliverables: [
      'Up to 3 pages + shared layout',
      'Animations + multilingual + SEO',
      'Contact / CTA flows',
      'Staging, git, your hosting, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'aesthetic-web',
    tier: 'sites',
    label: 'Brand Site · up to 5 pages',
    price: 1800,
    timeline: '2–3 weeks',
    featured: true,
    audience: 'Studios and products that need a stronger visual system and more room to tell the story.',
    description:
      'Brand-first custom site — richer motion and page set. Still no WordPress. Upsells attach cleanly.',
    deliverables: [
      'Custom design system (up to 5 pages)',
      'Motion-led UI',
      'Multilingual + SEO',
      'Staging, git, your hosting, 2 weeks support',
    ],
    baseIncludesNote: true,
  },
  {
    id: 'upsell-crm',
    tier: 'upsells',
    label: 'CRM / lead pipeline',
    price: 700,
    timeline: '+3–7 days',
    description:
      'Forms → pipeline: HubSpot, Notion, or a lightweight custom admin. Attach to any site package.',
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
    price: 600,
    timeline: '+3–7 days',
    description: 'Checkout or pay links for products, deposits, or bookings — on top of your site package.',
    deliverables: [
      'Stripe checkout or payment links',
      'Success / failure flows',
      'Basic order confirmation emails',
    ],
  },
  {
    id: 'ecommerce-store',
    tier: 'upsells',
    label: 'Store layer',
    price: 2200,
    timeline: '2–4 weeks total with a site package',
    featured: true,
    audience: 'Brands selling products — catalog, cart, Stripe — still custom UI.',
    description:
      'Catalog + cart + Stripe on a custom storefront. Usually paired with Brand Site or Essential Site.',
    deliverables: [
      'Product pages + cart',
      'Stripe checkout',
      'Admin or CMS for products',
      'Order flow + deploy',
    ],
  },
  {
    id: 'bot-ops',
    tier: 'bots',
    label: 'Ops Agent (SMS / Slack / Discord)',
    price: 2200,
    timeline: '2–3 weeks',
    description:
      'Written-first agent for FAQs, lead qualify, or internal ops — Twilio SMS, Slack, or Discord.',
    deliverables: [
      'Conversation design',
      'Channel integration (pick one primary)',
      'Knowledge / FAQ grounding',
      'Handoff + docs',
    ],
  },
  {
    id: 'ai-core-mvp',
    tier: 'bots',
    label: 'AI Product MVP',
    price: 3500,
    timeline: '2–4 weeks',
    featured: true,
    audience: 'Teams that need AI inside a real product — dashboard + agent, not a widget demo.',
    description: 'Fullstack AI slice: auth-ready UI, backend, and an agent grounded in your data.',
    deliverables: [
      'Product UI + API',
      'LLM / RAG integration',
      'Auth-ready architecture',
      'Staging + git handoff',
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
      'Ongoing written support: small fixes, content updates, dependency bumps. Revisions stay on the site board.',
    deliverables: [
      'Written revision board access',
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
    `Estimate from (minimum where ranges apply): ${totalLabel}`,
    '',
    'Prefer to continue in writing — happy to fill the brief next.',
  ]

  return lines.join('\n')
}
