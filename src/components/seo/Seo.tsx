import { useEffect } from 'react'

const SITE_URL = 'https://neostudio.space'
const DEFAULT_TITLE = 'NEO STUDIO SPACE'
const DEFAULT_DESCRIPTION =
  'Full-stack design-engineering studio — custom web products, AI agents, and fixed-scope packages. No templates.'

export interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

/** Per-route document title + Open Graph / Twitter meta for SPA + prerender shells. */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = `${SITE_URL}/og.png`,
  noIndex = false,
}: SeoProps) {
  const fullTitle = title ? `${title} · ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const url = `${SITE_URL}${path === '/' ? '' : path}`

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', DEFAULT_TITLE)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setCanonical(url)
  }, [fullTitle, description, url, image, noIndex])

  return null
}

export const SEO_DEFAULTS = {
  siteUrl: SITE_URL,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
}
