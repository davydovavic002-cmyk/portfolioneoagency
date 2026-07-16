import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'docs', 'MSA_TEMPLATE.md')
const dest = path.join(root, 'public', 'legal', 'msa-template.md')

fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.copyFileSync(src, dest)
console.log('Synced MSA template → public/legal/msa-template.md')
