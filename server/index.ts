import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

export interface BriefPayload {
  type?: string
  goal?: string
  budget?: string
  timeline?: string
  design?: string
  branding?: string
  audience?: string
  content?: string
  languages?: string
  integrations?: string
  pages?: string
  references?: string
  notes?: string
  packages?: string
  estimate?: string
  contact?: string
  source?: string
}

export interface RevisionPayload {
  projectCode?: string
  contact?: string
  pageUrl?: string
  priority?: string
  message?: string
}

const BRIEF_FIELD_LABELS: Record<string, string> = {
  type: 'Project type',
  goal: 'Main goal',
  budget: 'Budget',
  timeline: 'Timeline',
  design: 'Design direction',
  branding: 'Brand assets',
  audience: 'Audience',
  content: 'Content status',
  languages: 'Languages',
  integrations: 'Integrations',
  pages: 'Must-have pages',
  references: 'References',
  notes: 'Extra notes',
  packages: 'Selected packages',
  estimate: 'Estimate',
  contact: 'Contact',
}

function formatBrief(body: BriefPayload): string {
  const title =
    body.source === 'project-brief'
      ? 'New project brief from neostudio.space'
      : 'New brief from neostudio.space'

  const lines = [title, '']
  const skip = new Set(['source', 'contact'])
  const ordered =
    body.source === 'project-brief'
      ? [
          'packages',
          'estimate',
          'design',
          'branding',
          'audience',
          'content',
          'languages',
          'integrations',
          'pages',
          'references',
          'notes',
        ]
      : ['type', 'goal', 'design', 'budget', 'timeline']

  for (const key of ordered) {
    const value = body[key as keyof BriefPayload]
    if (typeof value === 'string' && value.trim() && value.trim() !== '—') {
      lines.push(`${BRIEF_FIELD_LABELS[key] ?? key}: ${value.trim()}`)
    }
  }

  for (const [key, value] of Object.entries(body)) {
    if (skip.has(key) || ordered.includes(key)) continue
    if (typeof value === 'string' && value.trim() && value.trim() !== '—') {
      lines.push(`${BRIEF_FIELD_LABELS[key] ?? key}: ${value.trim()}`)
    }
  }

  if (body.contact?.trim()) {
    lines.push(`${BRIEF_FIELD_LABELS.contact}: ${body.contact.trim()}`)
  }

  lines.push(`Source: ${body.source ?? 'brief-form'}`)
  return lines.join('\n')
}

function formatRevision(body: RevisionPayload): string {
  return [
    'Revision request from neostudio.space/revisions',
    '',
    `Project: ${body.projectCode ?? '—'}`,
    `Contact: ${body.contact ?? '—'}`,
    `Priority: ${body.priority ?? 'normal'}`,
    `Page / screen: ${body.pageUrl?.trim() || '—'}`,
    '',
    'Request:',
    (body.message ?? '').trim() || '—',
  ].join('\n')
}

async function sendTelegram(text: string): Promise<{ ok: boolean; detail?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return { ok: false, detail: 'missing_telegram_env' }
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return { ok: false, detail }
  }
  return { ok: true }
}

export function createApp() {
  const app = new Hono()

  app.use(
    '/api/*',
    cors({
      origin: (origin) => {
        if (!origin) return origin
        if (
          origin === 'https://neostudio.space' ||
          origin === 'https://www.neostudio.space' ||
          origin.startsWith('http://localhost:') ||
          origin.startsWith('http://127.0.0.1:')
        ) {
          return origin
        }
        return ''
      },
      allowMethods: ['POST', 'OPTIONS'],
      allowHeaders: ['Content-Type'],
    }),
  )

  app.get('/api/health', (c) =>
    c.json({
      ok: true,
      telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    }),
  )

  app.post('/api/brief', async (c) => {
    let body: BriefPayload
    try {
      body = await c.req.json()
    } catch {
      return c.json({ ok: false, error: 'invalid_json' }, 400)
    }

    const contact = typeof body.contact === 'string' ? body.contact.trim() : ''
    if (!contact || contact.length > 200) {
      return c.json({ ok: false, error: 'contact_required' }, 400)
    }

    const payload: BriefPayload = {
      type: String(body.type ?? '').slice(0, 120),
      goal: String(body.goal ?? '').slice(0, 120),
      budget: String(body.budget ?? '').slice(0, 80),
      timeline: String(body.timeline ?? '').slice(0, 80),
      design: String(body.design ?? '').slice(0, 120),
      branding: String(body.branding ?? '').slice(0, 120),
      audience: String(body.audience ?? '').slice(0, 120),
      content: String(body.content ?? '').slice(0, 120),
      languages: String(body.languages ?? '').slice(0, 80),
      integrations: String(body.integrations ?? '').slice(0, 120),
      pages: String(body.pages ?? '').slice(0, 500),
      references: String(body.references ?? '').slice(0, 500),
      notes: String(body.notes ?? '').slice(0, 500),
      packages: String(body.packages ?? '').slice(0, 800),
      estimate: String(body.estimate ?? '').slice(0, 80),
      contact: contact.slice(0, 200),
      source: String(body.source ?? 'brief-form').slice(0, 80),
    }

    const text = formatBrief(payload)
    const telegram = await sendTelegram(text)

    if (!telegram.ok && telegram.detail === 'missing_telegram_env') {
      return c.json(
        {
          ok: false,
          error: 'telegram_not_configured',
          fallback: true,
          message: text,
        },
        503,
      )
    }

    if (!telegram.ok) {
      return c.json({ ok: false, error: 'telegram_failed', detail: telegram.detail }, 502)
    }

    return c.json({ ok: true })
  })

  app.post('/api/revision', async (c) => {
    let body: RevisionPayload
    try {
      body = await c.req.json()
    } catch {
      return c.json({ ok: false, error: 'invalid_json' }, 400)
    }

    const projectCode = typeof body.projectCode === 'string' ? body.projectCode.trim() : ''
    const contact = typeof body.contact === 'string' ? body.contact.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!projectCode || projectCode.length > 120) {
      return c.json({ ok: false, error: 'project_code_required' }, 400)
    }
    if (!contact || contact.length > 200) {
      return c.json({ ok: false, error: 'contact_required' }, 400)
    }
    if (!message || message.length > 4000) {
      return c.json({ ok: false, error: 'message_required' }, 400)
    }

    const priority =
      body.priority === 'urgent' || body.priority === 'normal' ? body.priority : 'normal'

    const payload: RevisionPayload = {
      projectCode: projectCode.slice(0, 120),
      contact: contact.slice(0, 200),
      pageUrl: String(body.pageUrl ?? '').slice(0, 500),
      priority,
      message: message.slice(0, 4000),
    }

    const text = formatRevision(payload)
    const telegram = await sendTelegram(text)

    if (!telegram.ok && telegram.detail === 'missing_telegram_env') {
      return c.json(
        {
          ok: false,
          error: 'telegram_not_configured',
          fallback: true,
          message: text,
        },
        503,
      )
    }

    if (!telegram.ok) {
      return c.json({ ok: false, error: 'telegram_failed', detail: telegram.detail }, 502)
    }

    return c.json({ ok: true })
  })

  return app
}

const isMain =
  typeof process.argv[1] === 'string' &&
  /server[/\\]index\.(ts|js)$/.test(process.argv[1].replace(/\\/g, '/'))

if (isMain) {
  const app = createApp()
  const serveDist = process.env.SERVE_DIST === '1'

  if (serveDist) {
    app.use('/*', serveStatic({ root: './dist' }))
    app.notFound(async (c) => {
      const fs = await import('node:fs/promises')
      try {
        const html = await fs.readFile('./dist/index.html', 'utf8')
        return c.html(html)
      } catch {
        return c.text('Not found', 404)
      }
    })
  }

  const port = Number(process.env.PORT ?? 8787)
  console.log(`API listening on http://localhost:${port} (static=${serveDist})`)
  serve({ fetch: app.fetch, port })
}
