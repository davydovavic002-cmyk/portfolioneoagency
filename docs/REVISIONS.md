# Revisions board — paused

The `/revisions` route and nav link are **temporarily removed** from the public site (July 2026).

## Why

The written revision board added friction without enough uptake. Feedback works better for now through:

- **Telegram** — [@neostudio_space](https://t.me/neostudio_space)
- **Email** — neostudiospace@gmail.com
- **Staging link** — comments tied to a URL or screen in one message

## What still exists in the repo

| Piece | Status |
|-------|--------|
| `src/pages/RevisionsPage.tsx` | Kept — route `/revisions` still works if linked directly |
| `POST /api/revision` | Kept — server endpoint for future reuse |
| `src/lib/revisionApi.ts` | Kept |

## Ongoing care package

Renamed in copy from “Support our project” to **Ongoing project care** ($350/mo) — support for the **client’s** live product, not the studio.

## To re-enable later

1. Add `{ to: '/revisions', label: 'Revisions' }` back to `src/components/layout/Navigation.tsx`
2. Restore CTAs in `StudioBento`, `PricingPage`, and `BriefPage` as needed
3. Remove or soften the paused notice on `RevisionsPage`
