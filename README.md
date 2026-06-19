# Living Simulator — Developer Portfolio

Personal portfolio with a "Living Simulator" aesthetic — dark brutalism / Cyber-Laboratory.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **Framer Motion** — animations
- **Lucide React** — icons
- **i18n** — RU / EN / AM

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

> Port 3000 is reserved for the Neuro-Engineering Academy project. This portfolio runs on **3001**.

## Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, fonts (Geist + Noto Armenian)
│   ├── page.tsx         # Main page with activeProject + language state
│   └── globals.css      # Tailwind + brutalist styles
├── components/
│   ├── layout/
│   │   ├── LeftPanel.tsx
│   │   ├── RightPanel.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── simulator/
│   │   ├── DeviceFrame.tsx
│   │   └── SimulatorView.tsx
│   └── projects/
│       ├── NeuroAcademySim.tsx    # iframe → live site
│       ├── NeuroShporaSim.tsx     # Telegram bot UI
│       ├── BlessedAngelSim.tsx    # 2D configurator
│       ├── JewelryStoreSim.tsx    # luxury e-commerce
│       └── PetCareSim.tsx         # AI vet dashboard
└── lib/
    ├── types.ts
    ├── projects.ts
    └── i18n/dictionary.ts
```

## Projects

| # | Case | Device | Status |
|---|------|--------|--------|
| 1 | Neuro-Engineering Academy | Monitor | Live iframe |
| 2 | AI Telegram Bot (NeuroShpora) | Phone | Interactive chat |
| 3 | Blessed Angel | Monitor | Configurator stub |
| 4 | Jewelry Luxury Store | Monitor | E-commerce stub |
| 5 | PetCare AI | Phone | Diagnostic stub |
