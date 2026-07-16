export interface BriefOption {
  label: string
  hint?: string
}

export interface BriefStep {
  id: string
  question: string
  help: string
  type: 'choice' | 'text'
  options?: BriefOption[]
  placeholder?: string
  optional?: boolean
}

const DESIGN_OPTIONS: BriefOption[] = [
  { label: 'Clean & minimal', hint: 'Lots of space, sharp type, calm palette' },
  { label: 'Bold & colorful', hint: 'Strong accents, energy, personality' },
  { label: 'Luxury / refined', hint: 'Premium feel, subtle motion, detail' },
  { label: 'Playful & fun', hint: 'Rounded shapes, stickers, lighter tone' },
  { label: 'Match my existing brand', hint: 'You have colors / logo to follow' },
  { label: 'Open to your direction', hint: 'Trust the studio’s taste' },
]

/** General intro brief — no pricing tie-in */
export const MAIN_BRIEF_STEPS: BriefStep[] = [
  {
    id: 'type',
    question: 'What do you need?',
    help: 'Pick the closest fit — we’ll shape the scope together.',
    type: 'choice',
    options: [
      { label: 'Landing page', hint: 'One focused page for a product or offer' },
      { label: 'Small site (up to 3 pages)', hint: 'Home + a few key sections' },
      { label: 'Brand site or store', hint: 'Full presence or e-commerce' },
      { label: 'Bot or AI agent', hint: 'Telegram, support, or workflow automation' },
      { label: 'Site + bot together', hint: 'Web product with a bot layer' },
      { label: 'Not sure yet', hint: 'Describe the goal — we’ll guide' },
    ],
  },
  {
    id: 'goal',
    question: 'What’s the main goal?',
    help: 'Helps us focus on what actually matters for launch.',
    type: 'choice',
    options: [
      { label: 'Get leads or bookings', hint: 'Forms, CTAs, clear next step' },
      { label: 'Sell products or services', hint: 'Store, catalog, or checkout flow' },
      { label: 'Explain what we do', hint: 'Credibility, story, portfolio' },
      { label: 'Automate support or ops', hint: 'Bot handles repeat questions' },
      { label: 'Launch an MVP', hint: 'Ship fast, iterate after' },
      { label: 'Something else', hint: 'We’ll ask follow-ups in chat' },
    ],
  },
  {
    id: 'design',
    question: 'What design vibe are you going for?',
    help: 'Every site is custom-designed — even a rough direction helps.',
    type: 'choice',
    options: DESIGN_OPTIONS,
  },
  {
    id: 'timeline',
    question: 'When would you like to launch?',
    help: 'Rough timing is enough — we’ll confirm after scope is clear.',
    type: 'choice',
    options: [
      { label: '1–2 weeks', hint: 'Tight but doable for a clear landing' },
      { label: '2–4 weeks', hint: 'Multi-page, store, or bot build' },
      { label: '1–2 months', hint: 'Heavier product or custom features' },
      { label: 'Flexible', hint: 'No hard deadline' },
    ],
  },
  {
    id: 'contact',
    question: 'Where can we reply?',
    help: 'Email or Telegram — whichever you check most.',
    type: 'text',
    placeholder: 'you@email.com or @neostudio_space',
  },
]

/** Follow-up brief after pricing — design, content, references */
export const PROJECT_BRIEF_STEPS: BriefStep[] = [
  {
    id: 'design',
    question: 'What design direction feels right?',
    help: 'We custom-design every site — this sets the starting mood.',
    type: 'choice',
    options: DESIGN_OPTIONS,
  },
  {
    id: 'branding',
    question: 'Brand assets — where are you at?',
    help: 'Logo, colors, fonts — or we start from mood and references.',
    type: 'choice',
    options: [
      { label: 'Full kit ready', hint: 'Logo, colors, fonts locked in' },
      { label: 'Logo only', hint: 'Need palette and type direction' },
      { label: 'Starting from scratch', hint: 'No assets yet — we shape it' },
      { label: 'Have moodboards / refs', hint: 'Pinterest, Figma, or competitor sites' },
    ],
  },
  {
    id: 'audience',
    question: 'Who is this mainly for?',
    help: 'Audience shapes tone, layout, and how much we explain upfront.',
    type: 'choice',
    options: [
      { label: 'Business clients (B2B)', hint: 'Services, SaaS, agencies' },
      { label: 'Consumers (B2C)', hint: 'Shops, creators, local services' },
      { label: 'Personal brand', hint: 'Portfolio, coach, artist, expert' },
      { label: 'Internal team / ops', hint: 'Dashboard, bot, or internal tool' },
      { label: 'Mixed / not sure', hint: 'We’ll refine in chat' },
    ],
  },
  {
    id: 'content',
    question: 'Content — what’s ready?',
    help: 'Copy and visuals affect timeline more than design style.',
    type: 'choice',
    options: [
      { label: 'Copy & images ready', hint: 'We plug in and polish' },
      { label: 'Have copy — need visuals', hint: 'Stock, icons, or light art direction' },
      { label: 'Need help with both', hint: 'We can draft structure + placeholders' },
      { label: 'Placeholder OK for now', hint: 'Launch structure, refine content later' },
    ],
  },
  {
    id: 'languages',
    question: 'Languages on the site?',
    help: 'Affects structure, navigation, and copy workflow.',
    type: 'choice',
    options: [
      { label: 'One language', hint: 'Single market for launch' },
      { label: 'Two languages', hint: 'e.g. EN + local language' },
      { label: 'Three or more', hint: 'Multi-region or multilingual brand' },
      { label: 'Not decided yet', hint: 'We’ll recommend after scope' },
    ],
  },
  {
    id: 'integrations',
    question: 'Integrations needed at launch?',
    help: 'Pick the closest — we can phase extras after v1.',
    type: 'choice',
    options: [
      { label: 'Contact form / email only', hint: 'Simple lead capture' },
      { label: 'Booking or calendar', hint: 'Calendly, Cal.com, custom slots' },
      { label: 'Payments / Stripe', hint: 'Checkout, deposits, or subscriptions' },
      { label: 'CRM or newsletter', hint: 'HubSpot, Mailchimp, Telegram CRM' },
      { label: 'Bot + site connected', hint: 'Shared flows between web and chat' },
      { label: 'None yet / discuss later', hint: 'Structure first, hooks later' },
    ],
  },
  {
    id: 'pages',
    question: 'Must-have pages or sections?',
    help: 'Even a short list helps us map the build — optional.',
    type: 'text',
    placeholder: 'e.g. Home, Pricing, About, FAQ, Blog',
    optional: true,
  },
  {
    id: 'references',
    question: 'Sites or styles you like?',
    help: 'Links, brand names, or a short description — optional.',
    type: 'text',
    placeholder: 'e.g. linear.app vibe, or @competitor on Instagram',
    optional: true,
  },
  {
    id: 'notes',
    question: 'Anything else we should know?',
    help: 'Legal pages, analytics, hosting prefs — optional.',
    type: 'text',
    placeholder: 'e.g. GDPR cookie banner, Google Analytics, Vercel',
    optional: true,
  },
  {
    id: 'contact',
    question: 'Where can we reply?',
    help: 'Email or Telegram — whichever you check most.',
    type: 'text',
    placeholder: 'you@email.com or @neostudio_space',
  },
]
