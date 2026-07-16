export interface RevisionPayload {
  projectCode: string
  contact: string
  pageUrl?: string
  priority?: 'normal' | 'urgent'
  message: string
}

export type RevisionSubmitResult =
  | { status: 'delivered' }
  | { status: 'fallback'; message: string }
  | { status: 'error'; message: string }

export function formatRevisionMessage(payload: RevisionPayload): string {
  return [
    'Revision request from neostudio.space/revisions',
    '',
    `Project: ${payload.projectCode}`,
    `Contact: ${payload.contact}`,
    `Priority: ${payload.priority ?? 'normal'}`,
    `Page / screen: ${payload.pageUrl?.trim() || '—'}`,
    '',
    'Request:',
    payload.message.trim(),
  ].join('\n')
}

/** POST /api/revision — Telegram delivery with deep-link fallback. */
export async function submitRevision(payload: RevisionPayload): Promise<RevisionSubmitResult> {
  try {
    const res = await fetch('/api/revision', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean
      fallback?: boolean
      message?: string
    }

    if (res.ok && data.ok) return { status: 'delivered' }
    if (data.fallback && data.message) return { status: 'fallback', message: data.message }
    return { status: 'fallback', message: formatRevisionMessage(payload) }
  } catch {
    return { status: 'fallback', message: formatRevisionMessage(payload) }
  }
}
