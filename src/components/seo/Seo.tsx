import { useEffect, useMemo } from 'react'
import {
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  buildCanonicalUrl,
  buildPageTitle,
  DEFAULT_DESCRIPTION,
  organizationJsonLd,
} from '@/data/seo'

export interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
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

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[] | undefined) {
  const existing = document.head.querySelector('script[data-seo-jsonld="true"]')
  existing?.remove()
  if (!data) return

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', 'true')
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/** Per-route document title + social meta for SPA + prerender shells. */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = OG_IMAGE_URL,
  imageAlt = OG_IMAGE_ALT,
  noIndex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = buildPageTitle(title)
  const url = buildCanonicalUrl(path)
  const structuredData = useMemo(
    () => jsonLd ?? (path === '/' ? organizationJsonLd() : undefined),
    [jsonLd, path],
  )

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'application-name', SITE_NAME)
    setMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large')
    setMeta('property', 'og:locale', SITE_LOCALE)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:image:secure_url', image)
    setMeta('property', 'og:image:type', 'image/png')
    setMeta('property', 'og:image:width', String(OG_IMAGE_WIDTH))
    setMeta('property', 'og:image:height', String(OG_IMAGE_HEIGHT))
    setMeta('property', 'og:image:alt', imageAlt)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:site', TWITTER_HANDLE)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setMeta('name', 'twitter:image:alt', imageAlt)
    setCanonical(url)
    setJsonLd(structuredData)
  }, [fullTitle, description, url, image, imageAlt, noIndex, structuredData])

  return null
}

export const SEO_DEFAULTS = {
  siteUrl: SITE_URL,
  title: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  ogImage: OG_IMAGE_URL,
}
