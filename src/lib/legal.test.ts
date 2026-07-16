import { describe, expect, it } from 'vitest'
import { msaDocument, msaDocumentMarkdown } from '@/data/legal'

describe('msa template', () => {
  it('bundles markdown and parses into sections', () => {
    expect(msaDocumentMarkdown.length).toBeGreaterThan(500)
    expect(msaDocument.length).toBeGreaterThan(5)
    expect(msaDocument.some((s) => /services|what this is/i.test(s.heading))).toBe(true)
  })
})
