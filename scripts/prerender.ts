import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cases } from '../src/data/cases.ts'
import {
  OG_IMAGE_URL,
  SITE_NAME,
  STATIC_ROUTE_SEO,
  buildCanonicalUrl,
  buildPageTitle,
} from '../src/data/seo.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

interface RouteMeta {
  path: string
  title: string
  description: string
  noIndex?: boolean
}

function caseRoutes(): RouteMeta[] {
  return cases.map((project) => ({
    path: `/work/${project.id}`,
    title: buildPageTitle(project.title),
    description: project.tagline,
  }))
}

function allRoutes(): RouteMeta[] {
  const staticRoutes = STATIC_ROUTE_SEO.map((route) => ({
    path: route.path,
    title: buildPageTitle(route.title),
    description: route.description,
    noIndex: route.noIndex,
  }))

  return [...staticRoutes, ...caseRoutes()]
}

function injectMeta(html: string, route: RouteMeta) {
  const url = buildCanonicalUrl(route.path)
  const robots = route.noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'
  let out = html

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
  )
  out = out.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, `<meta name="robots" content="${robots}" />`)
  out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)

  const replacements: Record<string, string> = {
    'property="og:title"': route.title,
    'property="og:description"': route.description,
    'property="og:url"': url,
    'name="twitter:title"': route.title,
    'name="twitter:description"': route.description,
  }

  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`(<meta\\s+${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+content=")([^"]*)(")`, 'g')
    out = out.replace(pattern, `$1${escapeAttr(value)}$3`)
  }

  if (route.noIndex && !out.includes('name="robots"')) {
    out = out.replace('</head>', `    <meta name="robots" content="${robots}" />\n  </head>`)
  }

  return out
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(s: string) {
  return escapeHtml(s).replace(/"/g, '&quot;')
}

function writeRoute(routePath: string, html: string) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html)
    return
  }
  const dir = path.join(dist, routePath.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

function writeSitemap(routes: RouteMeta[]) {
  const indexable = routes.filter((route) => !route.noIndex)
  const urls = indexable
    .map(
      (route) => `  <url>
    <loc>${buildCanonicalUrl(route.path)}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)
}

function main() {
  const shellPath = path.join(dist, 'index.html')
  if (!fs.existsSync(shellPath)) {
    throw new Error('dist/index.html not found — run vite build first')
  }

  const shell = fs.readFileSync(shellPath, 'utf8')
  const routes = allRoutes()

  for (const route of routes) {
    writeRoute(route.path, injectMeta(shell, route))
  }

  writeSitemap(routes)
  console.log(`Prerendered ${routes.length} routes + sitemap.xml (${SITE_NAME}, ${OG_IMAGE_URL})`)
}

main()
