export const SITE = {
  email: 'hello@neostudio.space',
  telegram: 'neostudiospace',
}

export function telegramMessageUrl(text: string): string {
  return `https://t.me/${SITE.telegram}?text=${encodeURIComponent(text)}`
}
