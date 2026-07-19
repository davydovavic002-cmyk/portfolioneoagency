import { describe, expect, it } from 'vitest'
import {
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  buildCanonicalUrl,
  buildPageTitle,
  organizationJsonLd,
} from '@/data/seo'

describe('seo config', () => {
  it('uses brand title and og image', () => {
    expect(SITE_NAME).toBe('NEO STUDIO SPACE')
    expect(buildPageTitle()).toBe('NEO STUDIO SPACE')
    expect(buildPageTitle('Work')).toBe('Work · NEO STUDIO SPACE')
    expect(buildCanonicalUrl('/')).toBe(`${SITE_URL}`)
    expect(OG_IMAGE_URL).toBe(`${SITE_URL}/og.png`)
  })

  it('emits organization json-ld', () => {
    const json = organizationJsonLd()
    expect(json.name).toBe('NEO STUDIO SPACE')
    expect(json.url).toBe(SITE_URL)
    expect(json.logo).toContain('apple-touch-icon.png')
  })
})
