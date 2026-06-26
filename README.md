# Neo Studio — Portfolio

Product studio portfolio with live project previews, transparent pricing, and tri-lingual UI (EN / RU / AM).

**Live:** [neostudio.space](https://neostudio.space)

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **Framer Motion**
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

> Port **3001** in production/PM2. Port 3000 is used by Neuro-Engineering Academy preview on the same server.

## Structure

```
src/
├── app/                    # Layout, page, OG image, icon
├── components/
│   ├── about/              # About tab
│   ├── brand/              # NeoLogo
│   ├── layout/             # LeftPanel, RightPanel, nav
│   ├── pricing/            # Services / packages
│   ├── projects/           # Case study strip, simulators
│   └── simulator/          # Device frame, iframe previews
├── config/site.ts          # Telegram, brand
└── lib/
    ├── i18n/               # dictionary, services, about, case-studies
    ├── projects.ts         # Project list + preview URLs
    └── project-packages.ts # Project ↔ pricing package map
```

## Projects (live previews)

| Project | Preview |
|---------|---------|
| AURA Hair Space | aura.neostudio.space |
| Jellybead | jelly.neostudio.space |
| PetCare AI | petcare.neostudio.space |
| Neuro-Engineering Academy | academy.neostudio.space |
| NeuroShpora | In-app Telegram sim |
| Blessed Angel | blessedangel.store |

Preview subdomains are proxied via nginx — see `deploy/nginx/preview-sites.conf`.

## Deploy

```bash
git pull
npm run build
pm2 restart portfolio
```
