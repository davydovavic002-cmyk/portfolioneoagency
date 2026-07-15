import { describe, expect, it } from 'vitest'
import { generateScopeFromIdea, formatScopeReport } from './aiScopeGenerator'
import { getCaseById, getCasesByPillar, cases } from '@/data/cases'
import { STATIC_ROUTE_SEO } from '@/data/seo'

describe('generateScopeFromIdea', () => {
  it('returns base stack for a plain idea', () => {
    const result = generateScopeFromIdea('marketing site for a cafe')
    expect(result.stack).toContain('React 19')
    expect(result.estimatedDays).toBeGreaterThan(0)
    expect(result.phases.length).toBeGreaterThan(0)
  })

  it('detects telegram bot + RAG keywords', () => {
    const result = generateScopeFromIdea('Telegram bot with vector search and RAG')
    expect(result.stack.some((s) => /telegram|aiogram|bot/i.test(s) || s === 'Python')).toBe(true)
    expect(result.pipeline.some((p) => /RAG|vector/i.test(p))).toBe(true)
  })

  it('formatScopeReport includes idea and estimate', () => {
    const result = generateScopeFromIdea('dashboard admin panel')
    const report = formatScopeReport('dashboard admin panel', result)
    expect(report).toContain('dashboard admin panel')
    expect(report).toMatch(/days/i)
  })
})

describe('cases data', () => {
  it('has unique ids and valid preview URLs', () => {
    const ids = cases.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of cases) {
      expect(c.previewUrl).toMatch(/^https:\/\//)
      expect(c.coverImage).toMatch(/^\/cases\/.+\.webp$/)
      expect(getCaseById(c.id)?.title).toBe(c.title)
    }
  })

  it('does not include neuro-shpora', () => {
    expect(getCaseById('neuro-shpora')).toBeUndefined()
    expect(cases.some((c) => /neuro/i.test(c.id))).toBe(false)
  })

  it('filters by pillar', () => {
    expect(getCasesByPillar('ai').every((c) => c.pillar === 'ai')).toBe(true)
  })
})

describe('seo routes', () => {
  it('covers primary nav pages', () => {
    const paths = STATIC_ROUTE_SEO.map((r) => r.path)
    expect(paths).toEqual(expect.arrayContaining(['/', '/work', '/studio', '/pricing', '/brief']))
  })
})
