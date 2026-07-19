import msaTemplateMarkdown from '../../docs/MSA_TEMPLATE.md?raw'
import { parseLegalMarkdown, type LegalContentBlock } from '@/lib/parseLegalMarkdown'

export type { LegalContentBlock }

export interface LegalDocumentSection {
  heading: string
  blocks: LegalContentBlock[]
}

export interface LegalBlock {
  id: string
  code: string
  title: string
  description: string
  action?: {
    label: string
    document: 'msa'
  }
}

export const legalCenterMeta = {
  label: 'Before we start',
  title: 'Contracts, IP, and your data — in plain language',
  subtitle:
    'Nothing hidden behind a sales call. Here is what each document means and what you can expect before the first sprint.',
}

export const legalBlocks: LegalBlock[] = [
  {
    id: 'msa',
    code: '01',
    title: 'Master Service Agreement (MSA)',
    description:
      'The main contract: what we deliver, when, how changes work, and how either side can exit cleanly. Read or download the public draft before you sign.',
    action: {
      label: 'View MSA template',
      document: 'msa',
    },
  },
  {
    id: 'ip',
    code: '02',
    title: 'You own the code',
    description:
      'When a milestone is paid, the source code, designs, and configs for that scope are yours. No vendor lock-in — you can take the repo and leave anytime.',
  },
  {
    id: 'nda',
    code: '03',
    title: 'NDA before sensitive work',
    description:
      'If your brief includes private business logic, customer data, or unreleased product details, we sign an NDA before that material goes into our tools or staging.',
  },
  {
    id: 'data',
    code: '04',
    title: 'Where your data lives',
    description:
      'Staging runs on our infrastructure; production goes on your hosting. We do not sell or reuse your content. AI features use your API keys when applicable.',
  },
  {
    id: 'docs',
    code: '05',
    title: 'Handoff documentation',
    description:
      'At launch you get git access, deploy notes, and a short runbook so your team (or another dev) can maintain the project without guessing.',
  },
]

export const msaDocumentMarkdown = msaTemplateMarkdown

export const msaDocument: LegalDocumentSection[] = parseLegalMarkdown(msaTemplateMarkdown)

export function formatMsaAsPlainText(): string {
  return msaTemplateMarkdown
}

export function downloadMsaTemplate(filename = 'NEO-STUDIO-MSA-TEMPLATE.md'): void {
  const blob = new Blob([formatMsaAsPlainText()], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
