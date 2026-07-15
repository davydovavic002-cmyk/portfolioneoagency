import type { LegalDocumentSection } from '@/data/legal'

export function parseLegalMarkdown(markdown: string): LegalDocumentSection[] {
  const sections: LegalDocumentSection[] = []
  const bodyStart = markdown.search(/^## /m)
  const normalized = bodyStart >= 0 ? markdown.slice(bodyStart) : markdown
  const chunks = normalized.split(/^## /m).filter((chunk) => chunk.trim())

  for (const chunk of chunks) {
    const lines = chunk.trim().split('\n')
    const heading = lines[0]?.trim() ?? 'Section'
    const body = lines.slice(1).join('\n').trim()

    if (!body) {
      sections.push({ heading, paragraphs: [] })
      continue
    }

    const paragraphs: string[] = []
    const bullets: string[] = []
    let currentParagraph: string[] = []

    const flushParagraph = () => {
      if (!currentParagraph.length) return
      const text = currentParagraph.join(' ').replace(/\s+/g, ' ').trim()
      if (text) paragraphs.push(text)
      currentParagraph = []
    }

    for (const line of body.split('\n')) {
      const trimmed = line.trim()

      if (!trimmed || trimmed === '---') {
        flushParagraph()
        continue
      }

      if (/^[-*]\s+/.test(trimmed)) {
        flushParagraph()
        bullets.push(trimmed.replace(/^[-*]\s+/, ''))
        continue
      }

      if (/^#{1,6}\s/.test(trimmed)) {
        flushParagraph()
        continue
      }

      if (/^\|/.test(trimmed) || trimmed.startsWith('**Document ID:**')) {
        flushParagraph()
        continue
      }

      currentParagraph.push(trimmed.replace(/\*\*/g, ''))
    }

    flushParagraph()

    sections.push({
      heading,
      paragraphs,
      bullets: bullets.length > 0 ? bullets : undefined,
    })
  }

  return sections
}
