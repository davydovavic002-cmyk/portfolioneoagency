# NEO STUDIO SPACE

Vite + React portfolio for [neostudio.space](https://neostudio.space).

## Stack

- Vite 8 + React 19 + TypeScript + React Router
- Tailwind CSS v4 + Framer Motion + Lenis
- Hono API (`/api/brief` → Telegram)
- Vitest + GitHub Actions CI
- Build-time prerender + `sitemap.xml` for SEO

## Scripts

```bash
npm install --legacy-peer-deps
npm run dev          # SPA on :5173 (proxies /api → :8787)
npm run dev:api      # Brief API on :8787
npm run test
npm run build        # tsc + vite + prerender routes
npm start            # serve dist + API (SERVE_DIST=1)
```

## Env (brief API)

Copy `.env.example` → `.env`:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `PORT` (default `8787`)

Without Telegram env, the brief form falls back to a manual Telegram deep link.

## Git backup

Previous Next.js site: branch `backup/next-portfolio-2026-07-16` (also `old-next-portfolio`).
