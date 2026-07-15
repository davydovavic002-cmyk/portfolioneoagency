import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const SITE_URL = 'https://neostudio.space'

const STATIC_ROUTES = [
  {
    path: '/',
    title: 'NEO STUDIO SPACE',
    description:
      'Full-stack design-engineering studio — custom web products, AI agents, and fixed-scope packages. No templates.',
  },
  {
    path: '/work',
    title: 'Work · NEO STUDIO SPACE',
    description: 'Selected full-stack, design, and AI projects from NEO STUDIO SPACE.',
  },
  {
    path: '/studio',
    title: 'Studio · NEO STUDIO SPACE',
    description: 'How we work — custom architecture, staging URLs, and end-to-end delivery.',
  },
  {
    path: '/pricing',
    title: 'Pricing · NEO STUDIO SPACE',
    description: 'Fixed-scope packages with clear timelines, deliverables, and transparent pricing.',
  },
  {
    path: '/brief',
    title: 'Brief · NEO STUDIO SPACE',
    description: 'Four quick questions — we match a package and reply within 24 hours.',
  },
]

function caseRoutesFromSource() {
  const casesPath = path.join(root, 'src', 'data', 'cases.ts')
  const source = fs.readFileSync(casesPath, 'utf8')
  const ids = [...source.matchAll(/^\s+id:\s*'([^']+)'/gm)].map((m) => m[1])
  const titles = [...source.matchAll(/^\s+title:\s*'([^']+)'/gm)].map((m) => m[1])
  const taglines = [...source.matchAll(/^\s+tagline:\s*'([^']+)'/gm)].map((m) => m[1])

  return ids.map((id, i) => ({
    path: `/work/${id}`,
    title: `${titles[i] ?? id} · NEO STUDIO SPACE`,
    description: taglines[i] ?? `Case study: ${titles[i] ?? id}`,
  }))
}

function injectMeta(html, { path: routePath, title, description }) {
  const url = `${SITE_URL}${routePath === '/' ? '' : routePath}`
  let out = html
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  if (out.includes('name="description"')) {
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )
  } else {
    out = out.replace(
      '</head>',
      `    <meta name="description" content="${escapeAttr(description)}" />\n  </head>`,
    )
  }

  const extras = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="NEO STUDIO SPACE" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  ].join('\n    ')

  out = out.replace('</head>', `    ${extras}\n  </head>`)
  return out
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;')
}

function writeRoute(routePath, html) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html)
    return
  }
  const dir = path.join(dist, routePath.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

function writeSitemap(routes) {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>
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
  const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  const routes = [...STATIC_ROUTES, ...caseRoutesFromSource()]

  for (const route of routes) {
    writeRoute(route.path, injectMeta(shell, route))
  }

  writeSitemap(routes)
  console.log(`Prerendered ${routes.length} routes + sitemap.xml`)
}

main()
