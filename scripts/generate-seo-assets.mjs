import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const ogHtml = path.join(__dirname, 'seo', 'og-image.html')
const appleHtml = path.join(__dirname, 'seo', 'apple-touch-icon.html')
const faviconHtml = path.join(__dirname, 'seo', 'favicon-32.html')

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]

function findChrome() {
  for (const candidate of chromePaths) {
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

function toFileUrl(filePath) {
  return `file:///${filePath.replace(/\\/g, '/')}`
}

function screenshot(chrome, input, output, size) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${size}`,
    `--screenshot=${output}`,
    input.startsWith('http') ? input : toFileUrl(input),
  ]

  const result = spawnSync(chrome, args, { encoding: 'utf8' })
  if (result.error) throw result.error
  if (result.status !== 0) {
    throw new Error(result.stderr || `Chrome failed for ${output}`)
  }
  if (!fs.existsSync(output)) {
    throw new Error(`Screenshot missing: ${output}`)
  }
}

function main() {
  const chrome = findChrome()
  if (!chrome) {
    const required = ['og.png', 'apple-touch-icon.png', 'favicon-32.png'].every((file) =>
      fs.existsSync(path.join(publicDir, file)),
    )
    if (required) {
      console.log('Chrome not found — using existing SEO PNG assets in public/.')
      return
    }
    console.warn('Chrome not found and SEO PNG assets are missing — skipping generation.')
    return
  }

  fs.mkdirSync(publicDir, { recursive: true })

  screenshot(chrome, ogHtml, path.join(publicDir, 'og.png'), '1200,630')
  screenshot(chrome, appleHtml, path.join(publicDir, 'apple-touch-icon.png'), '512,512')
  screenshot(chrome, faviconHtml, path.join(publicDir, 'favicon-32.png'), '32,32')

  console.log('Generated SEO assets → public/og.png, apple-touch-icon.png, favicon-32.png')
}

main()
