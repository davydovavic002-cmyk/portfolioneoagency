import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

export interface BriefPayload {
  type?: string
  budget?: string
  timeline?: string
  contact?: string
  source?: string
}

function formatBrief(body: BriefPayload): string {
  return [
    'New brief from neostudio.space',
    '',
    `Project type: ${body.type ?? '—'}`,
    `Budget: ${body.budget ?? '—'}`,
    `Timeline: ${body.timeline ?? '—'}`,
    `Contact: ${body.contact ?? '—'}`,
    `Source: ${body.source ?? 'brief-form'}`,
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
      budget: String(body.budget ?? '').slice(0, 80),
      timeline: String(body.timeline ?? '').slice(0, 80),
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
