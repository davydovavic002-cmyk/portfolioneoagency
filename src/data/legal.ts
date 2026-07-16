import msaTemplateMarkdown from '../../docs/MSA_TEMPLATE.md?raw'
import { parseLegalMarkdown } from '@/lib/parseLegalMarkdown'

export interface LegalDocumentSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
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
  label: 'Legal & handoff',
  title: 'Contracts, IP, and how we protect your data',
  subtitle:
    'Procurement-friendly docs published upfront — so legal and engineering can review before the first sprint, not after.',
}

export const legalBlocks: LegalBlock[] = [
  {
    id: '01',
    code: '01',
    title: 'Open-Source Master Service Agreement (MSA)',
    description:
      'Our transparent, balance-protected client contract. Explicitly outlines iterative bi-weekly sprint deliverables, milestones, and flexible change-order protocols.',
    action: {
      label: 'VIEW NDA/MSA TEMPLATE',
      document: 'msa',
    },
  },
  {
    id: '02',
    code: '02',
    title: 'Intellectual Property (IP) Guarantee',
    description:
      '100% immediate transfer of all source code, design systems, configurations, and AI architectures upon automated milestone completion. Zero vendor lock-in, zero hidden maintenance clauses.',
  },
  {
    id: '03',
    code: '03',
    title: 'Local Data & Infrastructure Privacy (NDA Protocol)',
    description:
      'Strict multi-tenant security architecture standards. We execute custom non-disclosure agreements before a single line of your business logic or dataset touches our local staging LLM clusters.',
  },
  {
    id: '04',
    code: '04',
    title: 'Post-Handoff System Sovereignty & Documentation',
    description:
      'Every product is deployed alongside fully typed TypeScript API specs, automated CI/CD pipeline documentation, and comprehensive architectural runbooks for your in-house team. See RUNBOOK.md in repository root.',
  },
]

export const msaDocumentMarkdown = msaTemplateMarkdown

export const msaDocument: LegalDocumentSection[] = parseLegalMarkdown(msaTemplateMarkdown)

export function formatMsaAsPlainText(): string {
  return msaTemplateMarkdown
}
