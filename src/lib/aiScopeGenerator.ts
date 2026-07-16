export interface ScopePhase {
  name: string
  days: number
}

export interface ScopeBreakdown {
  stack: string[]
  deployment: string[]
  pipeline: string[]
  phases: ScopePhase[]
  estimatedDays: number
}

const BASE_STACK = ['React 19', 'TypeScript', 'Tailwind CSS v4']

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term))
}

export function generateScopeFromIdea(idea: string): ScopeBreakdown {
  const text = idea.toLowerCase().trim()

  const stack = new Set<string>(BASE_STACK)
  const deployment = new Set<string>(['Vercel / Railway staging URL', 'GitHub Actions CI'])
  const pipeline = new Set<string>(['48h interactive prototype sprint'])
  const phases: ScopePhase[] = [{ name: 'Discovery + wireframe', days: 2 }]

  if (includesAny(text, ['telegram', 'bot', 'discord', 'slack'])) {
    stack.add('Python')
    stack.add('FastAPI')
    stack.add('aiogram / webhook gateway')
    pipeline.add('Bot command router + session memory')
    phases.push({ name: 'Bot core + messaging layer', days: 4 })
  }

  if (includesAny(text, ['vector', 'search', 'rag', 'embedding', 'semantic'])) {
    stack.add('PostgreSQL + pgvector')
    stack.add('OpenAI / local embeddings')
    pipeline.add('RAG ingestion + chunking pipeline')
    pipeline.add('Hybrid vector + keyword retrieval')
    phases.push({ name: 'Vector index + retrieval layer', days: 5 })
  }

  if (includesAny(text, ['dashboard', 'admin', 'panel', 'analytics'])) {
    stack.add('React Router')
    stack.add('Recharts / custom data viz')
    pipeline.add('Auth middleware + role gates')
    pipeline.add('Admin CRUD modules')
    phases.push({ name: 'Dashboard UI + data contracts', days: 4 })
  }

  if (includesAny(text, ['mobile', 'ios', 'android', 'app'])) {
    stack.add('React Native / Expo')
    deployment.add('TestFlight / internal APK channel')
    phases.push({ name: 'Mobile shell + API bridge', days: 6 })
  }

  if (includesAny(text, ['ai', 'agent', 'llm', 'gpt', 'chat'])) {
    stack.add('LangChain / custom agent orchestrator')
    pipeline.add('Tool-calling agent loop')
    pipeline.add('Prompt guardrails + eval harness')
    phases.push({ name: 'Agent runtime + tool registry', days: 5 })
  }

  if (includesAny(text, ['ecommerce', 'shop', 'store', 'payment', 'stripe'])) {
    stack.add('Stripe Checkout')
    stack.add('PostgreSQL transactional schema')
    pipeline.add('Cart + inventory service')
    phases.push({ name: 'Commerce flows + webhooks', days: 5 })
  }

  if (includesAny(text, ['api', 'backend', 'microservice', 'saas'])) {
    stack.add('FastAPI / Node service layer')
    stack.add('Redis cache + rate limiting')
    deployment.add('Docker + managed Postgres')
    phases.push({ name: 'API surface + auth', days: 4 })
  }

  if (stack.size <= BASE_STACK.length + 1) {
    stack.add('FastAPI or Node API layer')
    stack.add('PostgreSQL')
    pipeline.add('Core feature module + staging deploy')
    phases.push({ name: 'MVP feature build', days: 5 })
  }

  phases.push({ name: 'QA, polish, handoff', days: 2 })

  const estimatedDays = phases.reduce((sum, phase) => sum + phase.days, 0)

  return {
    stack: [...stack],
    deployment: [...deployment],
    pipeline: [...pipeline],
    phases,
    estimatedDays,
  }
}

export function scopeRefFromPrompt(prompt: string): string {
  const hash = Math.abs(
    prompt.split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0),
  )
  return `NEO-${hash.toString(16).toUpperCase().slice(0, 6).padStart(6, '0')}`
}

export function formatScopeReport(prompt: string, result: ScopeBreakdown): string {
  const scopeId = scopeRefFromPrompt(prompt)

  return [
    `SCOPE REF: ${scopeId}`,
    `IDEA: ${prompt}`,
    '',
    'STACK',
    ...result.stack.map((item) => `- ${item}`),
    '',
    'DEPLOYMENT',
    ...result.deployment.map((item) => `- ${item}`),
    '',
    'PIPELINE',
    ...result.pipeline.map((item) => `- ${item}`),
    '',
    'PHASES',
    ...result.phases.map((p) => `- ${p.name} — ${p.days}d`),
    '',
    `ESTIMATED TIME: ${result.estimatedDays} days`,
  ].join('\n')
}
