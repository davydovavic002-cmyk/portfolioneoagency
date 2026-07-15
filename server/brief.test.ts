import { describe, expect, it } from 'vitest'
import { createApp } from './index.ts'

describe('brief API', () => {
  it('rejects missing contact', async () => {
    const app = createApp()
    const res = await app.request('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'Web Platform' }),
    })
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.ok).toBe(false)
  })

  it('returns telegram_not_configured without env', async () => {
    const prevToken = process.env.TELEGRAM_BOT_TOKEN
    const prevChat = process.env.TELEGRAM_CHAT_ID
    delete process.env.TELEGRAM_BOT_TOKEN
    delete process.env.TELEGRAM_CHAT_ID

    const app = createApp()
    const res = await app.request('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'Web Platform',
        budget: '$6K – $12K',
        timeline: '3–4 months',
        contact: 'hello@company.com',
      }),
    })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json.fallback).toBe(true)
    expect(json.message).toContain('hello@company.com')

    if (prevToken) process.env.TELEGRAM_BOT_TOKEN = prevToken
    if (prevChat) process.env.TELEGRAM_CHAT_ID = prevChat
  })

  it('health reports configuration', async () => {
    const app = createApp()
    const res = await app.request('/api/health')
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(typeof json.telegramConfigured).toBe('boolean')
  })
})
