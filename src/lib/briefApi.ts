export type BriefAnswers = Record<string, string>

export type BriefSubmitResult =
  | { status: 'delivered' }
  | { status: 'fallback'; message: string }
  | { status: 'error'; message: string }

const FIELD_LABELS: Record<string, string> = {
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

const MAIN_FIELD_ORDER = ['type', 'goal', 'design', 'timeline', 'contact']
const PROJECT_FIELD_ORDER = [
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
  'contact',
]

function orderedFields(answers: BriefAnswers, source: string): string[] {
  const known = source === 'project-brief' ? PROJECT_FIELD_ORDER : MAIN_FIELD_ORDER
  const extras = Object.keys(answers).filter((k) => !known.includes(k))
  return [...known, ...extras].filter((k) => answers[k]?.trim())
}

export function formatBriefMessage(answers: BriefAnswers, source = 'brief-form'): string {
  const title =
    source === 'project-brief'
      ? 'Hi NEO STUDIO — project brief from pricing:'
      : 'Hi NEO STUDIO — brief from the site:'

  const lines = [title, '']

  for (const key of orderedFields(answers, source)) {
    const value = answers[key]?.trim()
    if (!value || value === '—') continue
    const label = FIELD_LABELS[key] ?? key
    lines.push(`${label}: ${value}`)
  }

  lines.push('', 'Looking forward to hearing from you.')
  return lines.join('\n')
}

/** POST /api/brief — Telegram delivery with deep-link fallback. */
export async function submitBrief(
  answers: BriefAnswers,
  source = 'brief-form',
): Promise<BriefSubmitResult> {
  try {
    const res = await fetch('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...answers, source }),
    })

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean
      fallback?: boolean
      message?: string
      error?: string
    }

    if (res.ok && data.ok) {
      return { status: 'delivered' }
    }

    if (data.fallback && data.message) {
      return { status: 'fallback', message: data.message }
    }

    return {
      status: 'fallback',
      message: formatBriefMessage(answers, source),
    }
  } catch {
    return {
      status: 'fallback',
      message: formatBriefMessage(answers, source),
    }
  }
}
