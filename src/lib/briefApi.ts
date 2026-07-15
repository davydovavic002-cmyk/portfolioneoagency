export interface BriefAnswers {
  type?: string
  budget?: string
  timeline?: string
  contact?: string
}

export type BriefSubmitResult =
  | { status: 'delivered' }
  | { status: 'fallback'; message: string }
  | { status: 'error'; message: string }

export function formatBriefMessage(answers: BriefAnswers): string {
  return [
    'Hi NEO STUDIO — brief from the site:',
    '',
    `Project type: ${answers.type ?? '—'}`,
    `Budget: ${answers.budget ?? '—'}`,
    `Timeline: ${answers.timeline ?? '—'}`,
    `Contact: ${answers.contact ?? '—'}`,
    '',
    'Looking forward to hearing from you.',
  ].join('\n')
}

/** POST /api/brief — Telegram delivery with deep-link fallback. */
export async function submitBrief(answers: BriefAnswers): Promise<BriefSubmitResult> {
  try {
    const res = await fetch('/api/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...answers, source: 'brief-form' }),
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
      message: formatBriefMessage(answers),
    }
  } catch {
    return {
      status: 'fallback',
      message: formatBriefMessage(answers),
    }
  }
}
