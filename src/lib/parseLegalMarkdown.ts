export type LegalContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }

export interface LegalDocumentSection {
  heading: string
  blocks: LegalContentBlock[]
  /** @deprecated Use blocks — kept for backwards compatibility during migration */
  paragraphs?: string[]
  bullets?: string[]
}

function cleanInline(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
}

function parseSectionBody(body: string): LegalContentBlock[] {
  const blocks: LegalContentBlock[] = []
  let paragraphLines: string[] = []
  let listItems: string[] = []
  let listOrdered = false

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return
    blocks.push({ type: 'paragraph', text: cleanInline(paragraphLines.join(' ')) })
    paragraphLines = []
  }

  const flushList = () => {
    if (listItems.length === 0) return
    blocks.push({ type: 'list', items: listItems, ordered: listOrdered })
    listItems = []
    listOrdered = false
  }

  for (const line of body.split('\n')) {
    const trimmed = line.trim()

    if (!trimmed || trimmed === '---') {
      flushParagraph()
      flushList()
      continue
    }

    if (/^\|/.test(trimmed) || trimmed.startsWith('*Draft template')) {
      flushParagraph()
      flushList()
      continue
    }

    if (/^#{1,6}\s/.test(trimmed)) {
      flushParagraph()
      flushList()
      continue
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/)
    if (bulletMatch) {
      flushParagraph()
      if (listItems.length > 0 && listOrdered) flushList()
      listOrdered = false
      listItems.push(cleanInline(bulletMatch[1]))
      continue
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      flushParagraph()
      if (listItems.length > 0 && !listOrdered) flushList()
      listOrdered = true
      listItems.push(cleanInline(orderedMatch[1]))
      continue
    }

    flushList()
    paragraphLines.push(trimmed)
  }

  flushParagraph()
  flushList()

  return blocks
}

export function parseLegalMarkdown(markdown: string): LegalDocumentSection[] {
  const sections: LegalDocumentSection[] = []
  const bodyStart = markdown.search(/^## /m)
  const normalized = bodyStart >= 0 ? markdown.slice(bodyStart) : markdown
  const chunks = normalized.split(/^## /m).filter((chunk) => chunk.trim())

  for (const chunk of chunks) {
    const lines = chunk.trim().split('\n')
    const heading = cleanInline(lines[0]?.trim() ?? 'Section')
    const body = lines.slice(1).join('\n').trim()
    const blocks = body ? parseSectionBody(body) : []

    sections.push({ heading, blocks })
  }

  return sections
}
