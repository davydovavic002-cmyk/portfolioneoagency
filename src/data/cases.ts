export type CasePillar = 'fullstack' | 'ai'

export interface CasePillarMeta {
  id: CasePillar
  label: string
  subtitle: string
}

export const CASE_PILLARS: CasePillarMeta[] = [
  {
    id: 'fullstack',
    label: 'Sites',
    subtitle: 'Web apps, storefronts, product UIs',
  },
  {
    id: 'ai',
    label: 'Bots',
    subtitle: 'SMS, Slack, Discord, RAG agents',
  },
]

export interface CaseStudy {
  id: string
  title: string
  pillar: CasePillar
  tagline: string
  description: string
  year: string
  client: string
  duration: string
  team: string
  stack: string[]
  /** Live site for iframe preview — omit when not public yet */
  previewUrl?: string
  coverImage?: string
  relatedPackageId?: string
  overview: string
  challenge: string
  approach: { title: string; body: string }[]
  outcomes: string[]
}

export const cases: CaseStudy[] = [
  {
    id: 'doodle-drip',
    title: 'Doodle & Drip',
    pillar: 'fullstack',
    tagline:
      'Specialty coffee brand site for Gent — bold hand-drawn vibe, bilingual shop, events, and checkout-ready flows.',
    description:
      'Custom UX/UI: hand-drawn brand system with brutal borders and coffee-blue accents, EN/NL locale switch, mobile-first menu and shop flows, motion on product cards, and checkout-ready cart patterns — not a generic café template.',
    year: '2026',
    client: 'Doodle & Drip · Gent',
    duration: '12–16 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    previewUrl: 'https://drip.neostudio.space/',
    coverImage: '/cases/doodle-drip.webp',
    relatedPackageId: 'ecommerce-store',
    overview:
      'Doodle & Drip needed a site that feels like the brand: small-batch coffee with a loud doodle personality — not another beige café template. We designed a bilingual UX with clear menu → shop → events paths, thumb-friendly navigation, and motion that supports the hand-drawn identity. Built in Next.js and live at drip.neostudio.space.',
    challenge:
      'A Gent specialty roastery needed ecommerce + vibe in one place: café story, shop, events, and NL/EN without a bloated theme.',
    approach: [
      {
        title: 'Brand-first UI system',
        body: 'Brutal borders, coffee-blue accents, doodle motifs, and motion tuned for mobile thumbs — readable type scale, sticky shop CTAs, and hover states that feel hand-made, not template polish.',
      },
      {
        title: 'Bilingual storefront',
        body: 'EN/NL locale routing with shared product and content models so Gent regulars and visitors get the same flow.',
      },
      {
        title: 'Menu, shop & events',
        body: 'Café menu, beans shop, cupping events, and visit page wired as one product — not five disconnected landing pages.',
      },
      {
        title: 'Ship & stage',
        body: 'Next.js standalone deploy on studio infrastructure at drip.neostudio.space with cart and checkout-ready architecture.',
      },
    ],
    outcomes: [
      'Live at drip.neostudio.space with EN/NL experience',
      'Shop + menu + events in one cohesive brand system',
      '12–16 day build from scope to production subdomain',
    ],
  },
  {
    id: 'stretch-and-chill',
    title: 'Stretch and Chill',
    pillar: 'fullstack',
    tagline:
      'Premium pilates studio site for Belgrade — dreamy aesthetics, magnetic interactions, notebook-style schedule.',
    description:
      'UX/UI-led landing: glassmorphism panels, soft gradients, magnetic button interactions, class slider and team cards on home, plus a notebook-style schedule page — dreamy pilates aesthetic, mobile-first layout.',
    year: '2026',
    client: 'Stretch and Chill · Belgrade',
    duration: '8–12 days',
    team: 'NEO Studio SPACE',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    previewUrl: 'https://pilates.neostudio.space/',
    coverImage: '/cases/stretch-and-chill.webp',
    relatedPackageId: 'landing-page',
    overview:
      'Stretch and Chill needed a brand-first web presence that feels dreamy and tactile — not a generic fitness template. We designed magnetic micro-interactions, a glass UI kit, and two focused pages: an editorial home scroll and a schedule view that reads like a studio notebook on phone and desktop.',
    challenge:
      'A pilates studio in Belgrade needed a brand-first site that feels dreamy and tactile — not a generic fitness template.',
    approach: [
      {
        title: 'Visual language & motion',
        body: 'Glassmorphism panels, soft gradients, and magnetic buttons with spring physics — every tap gives feedback without cluttering the calm pilates mood.',
      },
      {
        title: 'Home experience',
        body: 'Class slider with snap points, team cards with portrait crops, and editorial type hierarchy — one scroll, clear book CTAs, no hamburger maze.',
      },
      {
        title: 'Schedule page',
        body: 'Notebook-style weekly grid: day tabs on mobile, time blocks with enough contrast for studio lighting, easy to screenshot and share in Instagram DMs.',
      },
      {
        title: 'Deploy & handoff',
        body: 'Landing Page package scope: React build on neostudio staging, performance pass, and deploy to production URL.',
      },
    ],
    outcomes: [
      'Live at pilates.neostudio.space with Landing Page scope',
      'Magnetic micro-interactions and motion-led brand feel',
      '8–12 day package timeline from brief to deploy',
    ],
  },
  {
    id: 'aura-hair',
    title: 'AURA Hair Space',
    pillar: 'fullstack',
    tagline:
      'Premium Singapore salon — stylist discovery, service menu, diagnostics, and online booking.',
    description:
      'Editorial single-page UX: dark luxury theme, photography-led sections, stylist cards, service menu hierarchy, and a 4-step booking flow with clear progress — salon-grade UI, not a widget bolt-on.',
    year: '2026',
    client: 'AURA Hair · Singapore',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'TypeScript'],
    previewUrl: 'https://aura.neostudio.space/',
    coverImage: '/cases/aura-hair.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium salon needed a digital presence that matches the in-chair experience — not a generic booking widget. We designed a dark editorial layout, stylist discovery patterns, a scannable service menu, and a four-step booking UI with visible progress and mobile-friendly inputs.',
    challenge:
      'A premium salon needed a digital presence that matches in-chair experience — not a generic booking widget.',
    approach: [
      {
        title: 'Editorial single-page layout',
        body: 'Dark-mode luxury aesthetic, large serif headlines, full-bleed photography, and section rhythm that mirrors a lookbook — scroll tells the salon story before booking.',
      },
      {
        title: 'Multi-step booking',
        body: 'Four-step flow with step indicator: stylist → services → diagnostics questionnaire → confirm. Large tap targets, inline validation, no dead-end modals on mobile.',
      },
      {
        title: 'Service & stylist discovery',
        body: 'Price cues inline with treatments; stylist cards with specialty tags and portrait crops so clients pick a person, not just a time slot.',
      },
      {
        title: 'Aesthetic Web delivery',
        body: 'Up to 5 pages worth of content on a cohesive one-page architecture — motion, SEO, and deploy included.',
      },
    ],
    outcomes: [
      '4-step booking flow on a single editorial page',
      'Dark mode theme support throughout',
      'Aesthetic Web package · 10–14 day timeline',
    ],
  },
  {
    id: 'petcare-ai',
    title: 'PetCare AI',
    pillar: 'fullstack',
    tagline: 'Vet clinic ecosystem — diagnostic AI, feed analysis, and clinic-facing dashboard.',
    description:
      'Product UI for clinics: intake forms, pet profile cards, nutrition plan views, and a dashboard with three clear workflows — dense information made scannable, not enterprise clutter.',
    year: '2025',
    client: 'PetCare AI',
    duration: '14–21 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    previewUrl: 'https://petcare.neostudio.space/',
    coverImage: '/cases/petcare-ai-cover.webp',
    relatedPackageId: 'ai-core-mvp',
    overview:
      'Vet clinics needed a demo-ready AI product without rebuilding their entire stack. We designed clinic-facing screens: intake wizards, feed analysis results, nutrition plan layouts, and a dashboard that surfaces three workflows with clear status chips and readable medical-adjacent typography.',
    challenge:
      'Vet clinics needed a demo-ready AI product without rebuilding their entire stack.',
    approach: [
      {
        title: 'AI diagnostic module',
        body: 'LLM-powered intake and analysis flows designed for clinic demos and partner presentations.',
      },
      {
        title: 'Feed & nutrition engine',
        body: 'Composition analysis and personalized plan generation tied to pet profiles.',
      },
      {
        title: 'Clinic dashboard',
        body: 'Authenticated UI with sidebar nav, patient/pet cards, workflow tabs, and empty states that guide staff — built for clarity on iPad and desktop, not enterprise bloat.',
      },
      {
        title: 'AI Core MVP delivery',
        body: 'Fullstack with Supabase/FastAPI backend, auth, Stripe-ready architecture, and production deploy.',
      },
    ],
    outcomes: [
      '3 clinic workflows in a shippable MVP',
      'AI Core MVP package · 14–21 day timeline',
      'Live demo environment at petcare.neostudio.space',
    ],
  },
  {
    id: 'blessed-angel',
    title: 'Blessed Angel',
    pillar: 'fullstack',
    tagline:
      'Premium accessory configurator — 3D-inspired UX, brand visuals, checkout-ready flows.',
    description:
      'Interactive configurator UX: real-time option picker, 3D-inspired product preview, premium motion system, and mobile-friendly customization flow — luxury accessories, not a static catalog grid.',
    year: '2024',
    client: 'Blessed Angel',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'Three.js'],
    previewUrl: 'https://blessedangel.store',
    coverImage: '/cases/blessed-angel.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium accessories brand needed an interactive experience, not a static catalog. We designed a configurator with live visual feedback, option chips, price updates, WebGL product accents, and motion that feels tactile on mobile and desktop — checkout-ready flows included.',
    challenge:
      'Premium accessories brand needed an interactive experience, not a static catalog.',
    approach: [
      {
        title: 'Configurator UX',
        body: 'Step-less option picker with instant preview, selected-state chips, and price summary sticky on mobile — users see the product change as they tap, not after a page reload.',
      },
      {
        title: 'Brand motion system',
        body: 'Framer Motion on transitions, cart drawer, and hero reveals — easing tuned to feel high-end, not bouncy SaaS.',
      },
      {
        title: 'Three.js visual layer',
        body: 'WebGL product spins and material highlights with fallbacks on low-end phones — beauty first, but scroll and tap stay responsive.',
      },
      {
        title: 'Aesthetic Web scope',
        body: 'Custom design, Next.js frontend, responsive polish, and deploy to blessedangel.store.',
      },
    ],
    outcomes: [
      'Interactive configurator live on blessedangel.store',
      '3D-inspired UX on Aesthetic Web package',
      '10–14 day timeline from scope to launch',
    ],
  },

  // ——— AI & Bots (US-market oriented; live demos coming) ———
  {
    id: 'relaydesk',
    title: 'RelayDesk',
    pillar: 'ai',
    tagline:
      'SMS + staff inbox AI for US boutique hotels — guest FAQs, late checkout, and local recommendations in under 60 seconds.',
    description:
      'Ops UI + SMS UX: React staff inbox with live guest threads, handoff queue, suggested replies, and quiet-hours states — guests stay in SMS, staff get a calm console.',
    year: '2026',
    client: 'NEO Lab · Hospitality agents',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Twilio SMS', 'OpenAI', 'FastAPI', 'React', 'Postgres'],
    coverImage: '/cases/relaydesk.webp',
    relatedPackageId: 'bot-ops',
    overview:
      'US boutique hotels still lose evenings to repetitive texts: parking, wifi, late checkout, “what’s open nearby?”. RelayDesk is an SMS concierge that knows the property playbook, answers in brand voice, and routes sticky cases into a shared staff inbox with suggested replies.',
    challenge:
      'Front desks drown in after-hours SMS. Chat widgets don’t travel with guests who already have the hotel number saved.',
    approach: [
      {
        title: 'Property knowledge pack',
        body: 'Ingest house rules, amenity hours, and neighborhood tips into a RAG store — one source of truth per property.',
      },
      {
        title: 'Twilio SMS conversation layer',
        body: 'Threaded guest numbers, quiet hours, and safe fallbacks when confidence is low — no hallucinated policies.',
      },
      {
        title: 'Staff inbox console',
        body: 'React ops UI: split thread list + conversation pane, confidence badges, one-click takeover, and suggested replies — designed for front-desk speed on tablet or laptop.',
      },
      {
        title: 'US-ready ops defaults',
        body: 'Timezone-aware quiet hours, English-first copy templates, and webhook logging built for multi-property portfolios.',
      },
    ],
    outcomes: [
      'Guest texts answered in under a minute for routine asks',
      'Human handoff without losing thread context',
      'Playbook that clones across properties with new knowledge packs',
    ],
  },
  {
    id: 'lotscout',
    title: 'LotScout',
    pillar: 'ai',
    tagline:
      'Real-estate lead qualifier over SMS for US brokerages — budgets, timelines, and showing slots without burning agent hours.',
    description:
      'Conversation UX for SMS leads: short qualification script, calendar booking prompts, and CRM-friendly summaries — speed-to-lead without agent inbox chaos.',
    year: '2026',
    client: 'NEO Lab · PropTech agents',
    duration: '12–16 days',
    team: 'NEO Studio SPACE',
    stack: ['Twilio', 'OpenAI', 'Google Calendar API', 'Node.js', 'HubSpot'],
    coverImage: '/cases/lotscout.webp',
    relatedPackageId: 'bot-ops',
    overview:
      'Most US listing ads dump cold traffic onto phone numbers. LotScout greets new leads on SMS, runs a short qualification script (budget, pre-approval, timeline, preferred zip), books a showing into the agent’s calendar, and only wakes a human when the lead is hot.',
    challenge:
      'Agents lose evenings to “just looking” texts. Speed-to-lead wins deals — but scripts and CRM hygiene break when volume spikes.',
    approach: [
      {
        title: 'Qualification graph',
        body: 'Structured conversation states for buyer vs seller paths — no free-form rabbit holes, clear exit criteria.',
      },
      {
        title: 'Calendar + CRM sync',
        body: 'Google Calendar booking with buffer times; HubSpot/Realtor.com-ready lead write with tags and source tracking.',
      },
      {
        title: 'Spam & compliance gates',
        body: 'STOP handling, quiet hours, and rate limits aligned with US SMS expectations — opt-outs actually opt out.',
      },
      {
        title: 'Agent digest',
        body: 'Morning Slack/email summary of warm leads and missed handoffs so the team starts ahead, not behind the phone.',
      },
    ],
    outcomes: [
      'Cold traffic filtered before it hits agent phones',
      'Showings booked without back-and-forth phone tag',
      'CRM notes that agents actually trust',
    ],
  },
  {
    id: 'cartreply',
    title: 'CartReply',
    pillar: 'ai',
    tagline:
      'Shopify support agent for US DTC brands — order status, returns, and sizing via Discord + on-site chat, grounded in store data.',
    description:
      'Dual-surface support UX: embeddable storefront chat widget + Discord ops view, grounded in live order data — consistent tone, clear escalation when policy blocks auto-reply.',
    year: '2025',
    client: 'NEO Lab · Commerce agents',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Shopify Admin API', 'OpenAI', 'Discord.js', 'Next.js', 'pgvector'],
    coverImage: '/cases/cartreply.webp',
    relatedPackageId: 'ai-core-mvp',
    overview:
      'US DTC brands burn support seats on “where’s my order?” and size charts. CartReply answers from live Shopify orders + a product RAG index, offers return labels when policy allows, and escalates billing/legal edge cases to humans with a full transcript.',
    challenge:
      'Intercom macros drift from the real catalog. Discord is where ops hangs out — shoppers are on the storefront. Two channels, zero shared memory.',
    approach: [
      {
        title: 'Shopify-grounded answers',
        body: 'Order lookup by email/order number with live tracking links — no guessed ETAs.',
      },
      {
        title: 'Dual surface',
        body: 'Minimal chat widget on the storefront (order lookup, sizing, returns) plus Discord alerts for ops — shared thread history, same voice, different layouts per channel.',
      },
      {
        title: 'Returns playbook',
        body: 'Policy-aware return windows and SKU exceptions; when automatic is unsafe, draft a human reply instead of guessing.',
      },
      {
        title: 'Eval harness',
        body: 'Golden-question set for sizing, shipping, and refund scenarios so updates don’t quietly regress support quality.',
      },
    ],
    outcomes: [
      'Routine WISMO tickets deflected without losing tone',
      'Ops team gets Discord alerts only on escalations',
      'One knowledge base feeding storefront + internal chat',
    ],
  },
]

export function getCaseById(id: string): CaseStudy | undefined {
  return cases.find((c) => c.id === id)
}

export function getCasesByPillar(pillar: CasePillar): CaseStudy[] {
  return cases.filter((c) => c.pillar === pillar)
}
