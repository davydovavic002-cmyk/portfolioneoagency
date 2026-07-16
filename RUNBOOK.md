# NEO STUDIO SPACE — System Architecture Runbook

**Document ID:** NEO-RUNBOOK-2026-001  
**Classification:** Internal / Client Handoff — Engineering Operations  
**Stack:** React 19 · TypeScript 6 · Vite 8 · Tailwind CSS v4  
**Maintainer:** NEO STUDIO SPACE Engineering

---

## 1. Executive Summary

This runbook documents the architecture, environment configuration, and deployment procedures for the **NEO STUDIO SPACE** portfolio platform — a multi-page single-page application (SPA) engineered for brutalist editorial presentation, enterprise-grade transparency disclosures, and high-performance client-facing interactions.

The system is intentionally **framework-native and dependency-minimal**: no server runtime is required for the public site. All routing, animation, theme orchestration, and interactive modules execute client-side with strict TypeScript contracts and production-optimized Vite bundling.

---

## 2. System Architecture

### 2.1 High-Level Topology

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  React 19 SPA                                               │
│  ├── React Router 7 (client-side routing)                   │
│  ├── ThemeProvider (CSS custom property agent)              │
│  ├── Lenis (smooth scroll RAF loop)                         │
│  ├── Framer Motion (layout / spring physics)                │
│  └── Page modules (Home, Work, Studio, Pricing, Brief)      │
├─────────────────────────────────────────────────────────────┤
│  Static assets (Vite build → dist/)                         │
│  └── CDN / edge host (Vercel, Netlify, Cloudflare Pages)    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Directory Structure

| Path | Responsibility |
|------|----------------|
| `src/App.tsx` | Root composition: ThemeProvider, Router, SmoothScroll, global footer |
| `src/pages/` | Route-level page components (thin orchestration layer) |
| `src/components/layout/` | Navigation, PageTransition, SmoothScroll |
| `src/components/hero/` | Home conversion zone, status ticker, AI scope sandbox |
| `src/components/studio/` | Studio transparency matrix, legal center, pipeline |
| `src/components/portfolio/` | Editorial case study grid, category filter |
| `src/components/pricing/` | Modular pricing matrix, project total widget |
| `src/components/ui/` | Shared primitives: RubberText, DraggableSticker, OSWindow |
| `src/data/` | Typed content contracts: cases, pricing, studio, legal |
| `src/lib/` | Theme agent, utilities, AI scope generator, markdown parsers |
| `docs/` | Published legal templates (MSA) for client preview |
| `dist/` | Production build output (generated, not committed) |

### 2.3 Routing Contract

| Route | Page Component | Purpose |
|-------|----------------|---------|
| `/` | `HomePage` | Hero, conversion manifesto, AI scope sandbox |
| `/work` | `CasesPage` | Editorial portfolio grid + OS viewport expansion |
| `/portfolio` | Redirect → `/work` | Legacy alias |
| `/studio` | `StudioPage` | Transparency matrix, legal center |
| `/pricing` | `PricingPage` | Granular estimate builder |
| `/brief` | `BriefPage` | Multi-step intake + theme aesthetic agent |

Route transitions use `AnimatePresence` with `mode="wait"` for deterministic exit-before-enter sequencing.

### 2.4 State & Data Architecture

- **Content layer:** Static TypeScript modules in `src/data/` — no runtime CMS dependency
- **Theme state:** React Context (`ThemeProvider`) driving CSS custom properties on `:root`
- **Page-local state:** React `useState` / `useCallback` for forms, modals, filters
- **Animation state:** Framer Motion `layout`, `AnimatePresence`, spring configs (`stiffness: 350`, `damping: 14`)
- **No global store:** Redux/Zustand intentionally omitted — state surface area is bounded per route

### 2.5 Design System

Theme tokens are defined in `src/index.css` via `@theme` and runtime CSS variables:

| Token | Purpose |
|-------|---------|
| `--theme-bg` | Page background |
| `--theme-surface` | Elevated panels |
| `--theme-accent` / `--theme-accent-2` | Primary / secondary accent |
| `--theme-text` / `--theme-muted` | Body / secondary text |

Themes (`default`, `grunge`, `pink`, `cyber`) are switched via `src/lib/theme.tsx` with fluid CSS transitions. Typography pairs **Space Grotesk** (display) and **JetBrains Mono** (technical labels).

---

## 3. Environment Setup

### 3.1 Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 20 LTS or later |
| npm | 10+ |
| Git | 2.40+ |

### 3.2 Installation

```bash
git clone <repository-url>
cd neo-studio-space
npm install --legacy-peer-deps
```

> **Note:** `--legacy-peer-deps` resolves peer dependency alignment between React 19 and select ecosystem packages. This flag is documented for reproducible CI installs.

### 3.3 Development Server

```bash
npm run dev
```

Default Vite dev server: `http://127.0.0.1:5173`

**Disk space constraint (Windows):** If `npm install` fails with `ENOSPC`, redirect npm cache to the project volume:

```powershell
$env:NPM_CONFIG_CACHE = "D:\portfolio vol 2\.npm-cache"
$env:TMP = "D:\portfolio vol 2\.tmp"
$env:TEMP = "D:\portfolio vol 2\.tmp"
npm install --legacy-peer-deps
```

Or execute `start-dev.ps1` if configured in the repository.

### 3.4 Environment Variables

This SPA requires **no secrets** for local development or static deployment. Optional variables for future CI integration:

| Variable | Scope | Description |
|----------|-------|-------------|
| `NODE_ENV` | Build | `production` during `npm run build` |
| `VITE_SITE_URL` | Optional | Canonical URL for meta / OG tags (future) |

No `.env` file is mandatory for current functionality.

### 3.5 Quality Gates

```bash
npm run build    # TypeScript project references + Vite production bundle
npm run lint     # oxlint static analysis
npm run preview  # Serve dist/ locally for pre-deploy verification
```

**Build pipeline:** `tsc -b` (strict mode) → `vite build` (tree-shaken ESM output).

---

## 4. Deployment Guidelines

### 4.1 Build Artifact

```bash
npm run build
```

Output directory: `dist/`

| Asset | Description |
|-------|-------------|
| `dist/index.html` | SPA entry shell |
| `dist/assets/*.js` | Code-split JavaScript bundles |
| `dist/assets/*.css` | Tailwind-compiled stylesheet |

### 4.2 Static Hosting (Recommended)

Deploy `dist/` to any static edge host:

| Platform | Configuration |
|----------|---------------|
| **Vercel** | Framework preset: Vite. Output: `dist`. SPA fallback: `index.html` |
| **Netlify** | Build: `npm run build`. Publish: `dist`. Add `_redirects`: `/* /index.html 200` |
| **Cloudflare Pages** | Build command: `npm run build`. Output: `dist` |

### 4.3 SPA Routing Fallback

All hosts **must** rewrite unknown paths to `index.html` so React Router handles client-side navigation. Without this, direct loads to `/studio`, `/work`, etc. will return 404.

**Netlify `_redirects` example:**

```
/*    /index.html   200
```

**Vercel `vercel.json` example:**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 4.4 Post-Deploy Verification Checklist

- [ ] All routes resolve: `/`, `/work`, `/studio`, `/pricing`, `/brief`
- [ ] `/portfolio` redirects to `/work`
- [ ] Lenis smooth scroll initializes without console errors
- [ ] Case study OSWindow iframe viewports load with sandbox attributes
- [ ] Legal MSA modal opens and downloads from `/studio`
- [ ] Theme agent on `/brief` switches global CSS variables
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on production URL

### 4.5 CI/CD Reference Pipeline

```yaml
# Conceptual GitHub Actions workflow
name: Production Deploy
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci --legacy-peer-deps
      - run: npm run build
      - run: npm run lint
      # Deploy dist/ via platform-specific action
```

---

## 5. Operational Modules

### 5.1 Smooth Scroll (Lenis)

`SmoothScroll.tsx` initializes a Lenis instance with `requestAnimationFrame` loop. **Single instance** at App root. Do not nest secondary Lenis instances — this causes scroll conflict.

### 5.2 Legal Document Preview

MSA content is sourced from `docs/MSA_TEMPLATE.md`, imported at build time via Vite `?raw` and parsed into modal sections. Download exports the canonical markdown file.

### 5.3 AI Scope Sandbox

`src/lib/aiScopeGenerator.ts` provides deterministic, client-side scope estimation from keyword heuristics. **No external API calls.** Suitable for demonstration; production client engagements require human architectural review.

### 5.4 OSWindow Iframe Viewport

Case study expansion uses sandboxed iframes:

```
sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
```

Review CSP and target site `X-Frame-Options` before adding external URLs to `src/data/cases.ts`.

---

## 6. Security Considerations

- No authentication surface on public portfolio routes
- No PII collection without explicit Brief form backend (form is presently client-side demo)
- Iframe sandbox restricts elevated privileges
- Dependencies audited via `npm audit` in CI
- Legal documents are static markdown — no server-side injection surface

---

## 7. Handoff Protocol

Upon client project completion, deliver:

1. This `RUNBOOK.md` (updated for client-specific fork)
2. Repository with branch protection rules documented
3. Typed API specs for any integrated backends
4. Environment variable matrix (secrets via secure channel)
5. `docs/MSA_TEMPLATE.md` or executed agreement reference

---

## 8. Support & Escalation

| Tier | Channel | Response SLA |
|------|---------|--------------|
| Engineering | neostudiospace@gmail.com · @neostudio_space | 1 business day |
| Production incident | As defined in executed SOW | Per agreement |

---

**Document Control:** Update this runbook on every material architecture change. Version increments shall be noted in commit messages referencing `NEO-RUNBOOK-YYYY-NNN`.
