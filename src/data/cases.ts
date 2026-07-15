export type CasePillar = 'fullstack' | 'ai'

export interface CasePillarMeta {
  id: CasePillar
  label: string
  subtitle: string
}

export const CASE_PILLARS: CasePillarMeta[] = [
  {
    id: 'fullstack',
    label: 'Full-Stack',
    subtitle: 'Web apps, APIs, and product UIs',
  },
  {
    id: 'ai',
    label: 'AI & Bots',
    subtitle: 'SMS, Slack, Discord, RAG agents — US-ready',
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
      'Next.js storefront with EN/NL locales, menu, beans shop, cupping events, and a playful brand system.',
    year: '2026',
    client: 'Doodle & Drip · Gent',
    duration: '12–16 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    previewUrl: 'https://drip.neostudio.space/',
    coverImage: '/cases/doodle-drip.webp',
    relatedPackageId: 'ecommerce-store',
    overview:
      'Doodle & Drip needed a site that feels like the brand: small-batch coffee with a loud doodle personality — not another beige café template. We built a bilingual Next.js experience covering menu, retail beans, events, visit, and checkout paths, live at drip.neostudio.space.',
    challenge:
      'A Gent specialty roastery needed ecommerce + vibe in one place: café story, shop, events, and NL/EN without a bloated theme.',
    approach: [
      {
        title: 'Brand-first UI system',
        body: 'Brutal borders, coffee-blue accents, and motion that matches the hand-drawn identity — readable on mobile, loud on desktop.',
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
      'Two-page React SPA with glassmorphism, class slider, team cards, and a tactile schedule page.',
    year: '2026',
    client: 'Stretch and Chill · Belgrade',
    duration: '8–12 days',
    team: 'NEO Studio SPACE',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    previewUrl: 'https://pilates.neostudio.space/',
    coverImage: '/cases/stretch-and-chill.webp',
    relatedPackageId: 'landing-page',
    overview:
      'Stretch and Chill needed a brand-first web presence that feels dreamy and tactile — not a generic fitness template. We shipped a compact two-page experience: a magnetic home page and a notebook-style schedule view.',
    challenge:
      'A pilates studio in Belgrade needed a brand-first site that feels dreamy and tactile — not a generic fitness template.',
    approach: [
      {
        title: 'Visual language & motion',
        body: 'Glassmorphism panels, soft gradients, and magnetic button interactions that match the in-studio atmosphere.',
      },
      {
        title: 'Home experience',
        body: 'Class slider, team cards, and editorial typography — everything in one scroll with clear CTAs to book.',
      },
      {
        title: 'Schedule page',
        body: 'Notebook-style weekly layout for classes — readable on mobile, easy for the studio to point clients to.',
      },
      {
        title: 'Deploy & handoff',
        body: 'Essential Site package scope: React build on neostudio staging, performance pass, and deploy to production URL.',
      },
    ],
    outcomes: [
      'Live at pilates.neostudio.space with 2-page Essential Site scope',
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
      'Single-page editorial salon site with multi-step booking and dark-mode luxury aesthetic.',
    year: '2026',
    client: 'AURA Hair · Singapore',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'TypeScript'],
    previewUrl: 'https://aura.neostudio.space/',
    coverImage: '/cases/aura-hair.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium salon needed a digital presence that matches the in-chair experience — not a generic booking widget. We built a single-page editorial site with stylist profiles, service menu, hair diagnostics, and a four-step booking flow.',
    challenge:
      'A premium salon needed a digital presence that matches in-chair experience — not a generic booking widget.',
    approach: [
      {
        title: 'Editorial single-page layout',
        body: 'Dark-mode luxury aesthetic with strong typography and photography-led sections.',
      },
      {
        title: 'Multi-step booking',
        body: 'Four-step flow: stylist selection, services, diagnostics questionnaire, and confirmation.',
      },
      {
        title: 'Service & stylist discovery',
        body: 'Structured menu of treatments and individual stylist profiles with clear pricing cues.',
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
      'Demo-ready AI product with clinic workflows, nutrition plans, and a functional dashboard UI.',
    year: '2025',
    client: 'PetCare AI',
    duration: '14–21 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    previewUrl: 'https://petcare.neostudio.space/',
    coverImage: '/cases/petcare-ai.webp',
    relatedPackageId: 'ai-core-mvp',
    overview:
      'Vet clinics needed a demo-ready AI product without rebuilding their entire stack. We scoped an MVP with diagnostic AI, feed composition analysis, personalized nutrition plans, and a clinic-facing dashboard.',
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
        body: 'Authenticated UI for three core clinic workflows — built for clarity, not enterprise bloat.',
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
      'Interactive configurator with Framer Motion and Three.js — not a static catalog.',
    year: '2024',
    client: 'Blessed Angel',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Next.js', 'Framer Motion', 'Three.js'],
    previewUrl: 'https://blessedangel.store',
    coverImage: '/cases/blessed-angel.webp',
    relatedPackageId: 'aesthetic-web',
    overview:
      'A premium accessories brand needed an interactive experience, not a static catalog. We delivered a 3D-inspired configurator with Framer Motion, brand-led visuals, and flows ready for checkout integration.',
    challenge:
      'Premium accessories brand needed an interactive experience, not a static catalog.',
    approach: [
      {
        title: 'Configurator UX',
        body: '3D-inspired product customization with real-time visual feedback and premium segment positioning.',
      },
      {
        title: 'Brand motion system',
        body: 'Framer Motion throughout — transitions that feel tactile and high-end.',
      },
      {
        title: 'Three.js visual layer',
        body: 'WebGL accents for product presentation without sacrificing performance on mobile.',
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
      'Twilio SMS agent with a React ops console. Guests text the hotel number; the bot answers policy questions and escalates edge cases to humans.',
    year: '2026',
    client: 'NEO Lab · Hospitality agents',
    duration: '10–14 days',
    team: 'NEO Studio SPACE',
    stack: ['Twilio SMS', 'OpenAI', 'FastAPI', 'React', 'Postgres'],
    coverImage: '/cases/relaydesk.webp',
    relatedPackageId: 'ai-core-mvp',
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
        body: 'React ops UI: live threads, handoff queue, and one-click “take over” without the guest switching channels.',
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
      'Inbound SMS agent that qualifies buyers/sellers, syncs Google Calendar, and pushes warm leads into the CRM.',
    year: '2026',
    client: 'NEO Lab · PropTech agents',
    duration: '12–16 days',
    team: 'NEO Studio SPACE',
    stack: ['Twilio', 'OpenAI', 'Google Calendar API', 'Node.js', 'HubSpot'],
    coverImage: '/cases/lotscout.webp',
    relatedPackageId: 'ai-core-mvp',
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
      'RAG support bot wired to Shopify Admin API. Same brain on Discord for ops and a chat widget for shoppers.',
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
        body: 'Discord bot for the ops channel + embeddable Next.js chat widget for the storefront, one tool layer underneath.',
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
