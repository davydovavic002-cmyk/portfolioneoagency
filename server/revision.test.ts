import { describe, expect, it } from 'vitest'
import { createApp } from './index.ts'

describe('revision API', () => {
  it('rejects missing fields', async () => {
    const app = createApp()
    const res = await app.request('/api/revision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectCode: 'AURA' }),
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
    const res = await app.request('/api/revision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectCode: 'AURA',
        contact: 'hello@company.com',
        pageUrl: 'https://staging.example/home',
        priority: 'normal',
        message: 'Hero headline should be shorter.',
      }),
    })

    expect(res.status).toBe(503)
    const json = await res.json()
    expect(json.fallback).toBe(true)
    expect(json.message).toContain('AURA')
    expect(json.message).toContain('Hero headline')

    if (prevToken) process.env.TELEGRAM_BOT_TOKEN = prevToken
    if (prevChat) process.env.TELEGRAM_CHAT_ID = prevChat
  })
})
