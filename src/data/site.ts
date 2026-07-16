export const SITE = {
  email: 'neostudiospace@gmail.com',
  /** Telegram username without @ */
  telegram: 'neostudio_space',
}

export function telegramMessageUrl(text: string): string {
  return `https://t.me/${SITE.telegram}?text=${encodeURIComponent(text)}`
}

export function telegramProfileUrl(): string {
  return `https://t.me/${SITE.telegram}`
}
