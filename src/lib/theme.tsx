import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeId = 'default' | 'grunge' | 'pink' | 'cyber'

export interface ThemeConfig {
  id: ThemeId
  label: string
  bg: string
  surface: string
  accent: string
  accent2: string
  text: string
  muted: string
  borderWidth: string
  stickerSet: 'retro' | 'grunge' | 'bubble' | 'cyber'
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  default: {
    id: 'default',
    label: 'Cream Pop',
    bg: '#fff5e6',
    surface: '#ffffff',
    accent: '#ff2d6b',
    accent2: '#00c2ff',
    text: '#0a0a0a',
    muted: '#5a5a5a',
    borderWidth: '2px',
    stickerSet: 'retro',
  },
  grunge: {
    id: 'grunge',
    label: 'Grunge',
    bg: '#2a2826',
    surface: '#3d3a36',
    accent: '#c4d82e',
    accent2: '#e85d04',
    text: '#f5f0e8',
    muted: '#a39e96',
    borderWidth: '3px',
    stickerSet: 'grunge',
  },
  pink: {
    id: 'pink',
    label: 'Hot Pink',
    bg: '#ff4da6',
    surface: '#ffe0f0',
    accent: '#0a0a0a',
    accent2: '#ffff00',
    text: '#0a0a0a',
    muted: '#4a1030',
    borderWidth: '3px',
    stickerSet: 'bubble',
  },
  cyber: {
    id: 'cyber',
    label: 'Cyber Mode',
    bg: '#0d0221',
    surface: '#1a0a3e',
    accent: '#00ff9f',
    accent2: '#ff00ff',
    text: '#e8e0ff',
    muted: '#8b7cb3',
    borderWidth: '2px',
    stickerSet: 'cyber',
  },
}

const COMMAND_MAP: Array<{ pattern: RegExp; theme: ThemeId }> = [
  { pattern: /grunge|dirty|raw/i, theme: 'grunge' },
  { pattern: /pink|hot|bubble/i, theme: 'pink' },
  { pattern: /cyber|neon|matrix|hacker/i, theme: 'cyber' },
  { pattern: /default|cream|reset|clean/i, theme: 'default' },
]

interface ThemeContextValue {
  theme: ThemeConfig
  setTheme: (id: ThemeId) => void
  parseCommand: (input: string) => ThemeId | null
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyThemeToDOM(theme: ThemeConfig) {
  const root = document.documentElement
  root.style.setProperty('--theme-bg', theme.bg)
  root.style.setProperty('--theme-surface', theme.surface)
  root.style.setProperty('--theme-accent', theme.accent)
  root.style.setProperty('--theme-accent-2', theme.accent2)
  root.style.setProperty('--theme-text', theme.text)
  root.style.setProperty('--theme-muted', theme.muted)
  root.style.setProperty('--theme-border-w', theme.borderWidth)
  root.dataset.theme = theme.id
  root.dataset.stickerSet = theme.stickerSet
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('default')
  const theme = THEMES[themeId]

  useEffect(() => {
    applyThemeToDOM(theme)
  }, [theme])

  const setTheme = useCallback((id: ThemeId) => setThemeId(id), [])

  const parseCommand = useCallback((input: string): ThemeId | null => {
    const trimmed = input.trim()
    if (!trimmed) return null
    for (const { pattern, theme: id } of COMMAND_MAP) {
      if (pattern.test(trimmed)) return id
    }
    return null
  }, [])

  const value = useMemo(() => ({ theme, setTheme, parseCommand }), [theme, setTheme, parseCommand])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
