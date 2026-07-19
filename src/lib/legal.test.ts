import { describe, expect, it } from 'vitest'
import { msaDocument, msaDocumentMarkdown } from '@/data/legal'
import { parseLegalMarkdown } from '@/lib/parseLegalMarkdown'

describe('msa template', () => {
  it('bundles markdown and parses into sections', () => {
    expect(msaDocumentMarkdown.length).toBeGreaterThan(500)
    expect(msaDocument.length).toBeGreaterThan(5)
    expect(msaDocument.some((s) => /services|what this is/i.test(s.heading))).toBe(true)
  })

  it('keeps paragraphs and lists in document order', () => {
    const ip = msaDocument.find((s) => /intellectual property/i.test(s.heading))
    expect(ip).toBeDefined()

    const types = ip!.blocks.map((b) => b.type)
    expect(types).toContain('paragraph')
    expect(types).toContain('list')
    expect(types.indexOf('list')).toBeGreaterThan(types.indexOf('paragraph'))

    const keepsIndex = ip!.blocks.findIndex(
      (b) => b.type === 'paragraph' && b.text.toLowerCase().startsWith('studio keeps'),
    )
    const listAfterKeeps = ip!.blocks.findIndex(
      (b) => b.type === 'list' && b.items.some((i) => /pre-existing tools/i.test(i)),
    )
    expect(listAfterKeeps).toBeGreaterThan(keepsIndex)
  })

  it('strips markdown emphasis from list items', () => {
    const ip = msaDocument.find((s) => /intellectual property/i.test(s.heading))
    const portfolioItem = ip?.blocks
      .flatMap((b) => (b.type === 'list' ? b.items : []))
      .find((i) => /portfolio/i.test(i))

    expect(portfolioItem).toBeDefined()
    expect(portfolioItem).not.toContain('**')
  })

  it('parses confidentiality section with list before closing paragraph', () => {
    const section = msaDocument.find((s) => /confidentiality/i.test(s.heading))
    expect(section).toBeDefined()

    const staging = section!.blocks.find(
      (b) => b.type === 'paragraph' && /staging may run/i.test(b.text),
    )
    const ndaList = section!.blocks.find(
      (b) => b.type === 'list' && b.items.some((i) => /mutual nda/i.test(i)),
    )

    expect(ndaList).toBeDefined()
    expect(staging).toBeDefined()
    expect(section!.blocks.indexOf(ndaList!)).toBeLessThan(section!.blocks.indexOf(staging!))
  })
})

describe('parseLegalMarkdown', () => {
  it('parses ordered numbered lists', () => {
    const sections = parseLegalMarkdown(`## Process\n\n1. First step\n2. Second step\n`)
    expect(sections[0]?.blocks[0]).toEqual({
      type: 'list',
      ordered: true,
      items: ['First step', 'Second step'],
    })
  })
})
