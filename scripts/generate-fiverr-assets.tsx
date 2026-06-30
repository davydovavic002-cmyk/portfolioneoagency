/**
 * Generates Fiverr gig images (1280×769) and case-study PDFs into public/
 * Requires real site screenshots in public/fiverr-screenshots/
 * Run: npx tsx scripts/capture-case-screenshots.ts
 * Then: npx tsx scripts/generate-fiverr-assets.tsx
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { ImageResponse } from "next/og";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const W = 1280;
const H = 769;
const OUT = join(process.cwd(), "public");
const SCREENSHOTS_DIR = join(OUT, "fiverr-screenshots");

function loadScreenshotDataUri(projectId: string): string | null {
  const path = join(SCREENSHOTS_DIR, `${projectId}.png`);
  if (!existsSync(path)) return null;
  const buf = readFileSync(path);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

function SitePreview({ src, background = "#0a0a0a" }: { src: string; background?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background,
      }}
    >
      <img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "top center",
        }}
      />
    </div>
  );
}

function fitInBox(imgW: number, imgH: number, boxW: number, boxH: number) {
  const scale = Math.min(boxW / imgW, boxH / imgH);
  return { width: imgW * scale, height: imgH * scale };
}

function getCaseById(id: string) {
  const project = CASES.find((c) => c.id === id);
  if (!project) throw new Error(`Unknown case id: ${id}`);
  return project;
}

const BG = "#080808";
const MUTED = "#71717a";
const TEXT = "#f4f4f5";

const CASES = [
  {
    id: "aura-hair",
    title: "AURA Hair Space",
    domain: "aurahair.sg",
    role: "Full-stack · AI",
    category: "Beauty · Booking",
    accent: "#b85c6e",
    glow: "rgba(184, 92, 110, 0.35)",
    headline: "Luxury hair, reimagined online",
    tagline: "Premium salon · Singapore",
    description:
      "Single-page editorial experience with stylist discovery, service menu, hair diagnostics, and online booking.",
    stack: "Next.js · Framer Motion · TypeScript",
    metrics: [
      { value: "4", label: "Booking steps" },
      { value: "Dark", label: "Theme modes" },
      { value: "Live", label: "Production site" },
    ],
    challenge:
      "A premium salon needed a digital presence that matches the in-chair experience — not a generic booking widget.",
    solution:
      "Editorial single-page site with multi-step booking, stylist profiles, and hair-care diagnostics in a luxury aesthetic.",
  },
  {
    id: "petcare-ai",
    title: "PetCare AI",
    domain: "petcare.neostudio.space",
    role: "Full-stack · AI",
    category: "HealthTech · B2B",
    accent: "#7cb89a",
    glow: "rgba(124, 184, 154, 0.35)",
    headline: "AI diagnostics for modern vet clinics",
    tagline: "HealthTech · B2B product",
    description:
      "Demo-ready AI ecosystem: diagnostic module, feed analysis, and clinic-facing dashboard.",
    stack: "Next.js · FastAPI · OpenAI · PostgreSQL",
    metrics: [
      { value: "3", label: "Clinic workflows" },
      { value: "AI", label: "Diagnostic core" },
      { value: "MVP", label: "Shipped demo" },
    ],
    challenge:
      "Vet clinics needed a demo-ready AI product without rebuilding their entire stack.",
    solution:
      "Scoped MVP with diagnostic AI, feed analysis, and a clinic dashboard — production-grade UI for partner demos.",
  },
  {
    id: "jewelry-store",
    title: "Jellybead",
    domain: "jellybead.store",
    role: "Full-stack · AI",
    category: "Luxury · Commerce",
    accent: "#c9b896",
    glow: "rgba(201, 184, 150, 0.35)",
    headline: "A boutique that feels bespoke",
    tagline: "Luxury e-commerce",
    description:
      "Custom storefront with Stripe checkout, CMS catalog, and motion-led product storytelling.",
    stack: "Next.js · Stripe · Sanity CMS",
    metrics: [
      { value: "Stripe", label: "Live payments" },
      { value: "CMS", label: "Catalog" },
      { value: "Motion", label: "Product UX" },
    ],
    challenge:
      "Launch a luxury storefront that feels bespoke — not a template — with reliable checkout.",
    solution:
      "Custom Next.js boutique with Stripe, CMS-driven catalog, and tactile micro-interactions around each piece.",
  },
  {
    id: "blessed-angel",
    title: "Blessed Angel",
    domain: "blessedangel.store",
    role: "Full-stack · AI",
    category: "E-commerce · 3D",
    accent: "#d4c4a8",
    glow: "rgba(212, 196, 168, 0.35)",
    headline: "Interactive premium configurator",
    tagline: "Accessories · 3D UX",
    description:
      "Brand-led configurator with Framer Motion, immersive visuals, and checkout-ready flows.",
    stack: "Next.js · Framer Motion · Three.js",
    metrics: [
      { value: "3D", label: "Configurator" },
      { value: "Brand", label: "Visual identity" },
      { value: "Shop", label: "E-commerce ready" },
    ],
    challenge:
      "Premium accessories brand needed an interactive experience, not a static catalog.",
    solution:
      "3D-inspired configurator with motion-led storytelling and a checkout path built for premium buyers.",
  },
  {
    id: "neuro-shpora",
    title: "NeuroShpora",
    domain: "t.me/neuroshpora",
    role: "Full-stack · AI",
    category: "Telegram · NLP",
    accent: "#5b9fd4",
    glow: "rgba(91, 159, 212, 0.35)",
    headline: "Exam prep inside Telegram",
    tagline: "Telegram · AI bot",
    description:
      "Agentic bot with contextual memory, subject flows, SOS kits, and streaming AI tutor responses.",
    stack: "Python · aiogram · OpenAI · Redis",
    metrics: [
      { value: "12+", label: "Exam subjects" },
      { value: "Stream", label: "AI responses" },
      { value: "Native", label: "Telegram UX" },
    ],
    challenge:
      "Students needed exam prep that works inside Telegram — fast, contextual, and always available.",
    solution:
      "Agentic bot with subject flows, SOS kits, streaming tutor, and session memory in Redis.",
  },
] as const;

function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="21.6" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />
      <circle cx="24" cy="24" r="17.4" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="0.75" />
      <circle cx="24" cy="24" r="4.6" fill="#93c5fd" opacity={0.65} />
    </svg>
  );
}

function Glow({ accent = "rgba(96,165,250,0.22)" }: { accent?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: -100,
        right: -60,
        width: 480,
        height: 480,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accent} 0%, transparent 68%)`,
      }}
    />
  );
}

function BrowserChrome({ domain, children }: { domain: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#111",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 32,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#141414",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: 4, background: "#ff5f57" }} />
        <div style={{ width: 8, height: 8, borderRadius: 4, background: "#febc2e" }} />
        <div style={{ width: 8, height: 8, borderRadius: 4, background: "#28c840" }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 10, color: MUTED }}>{domain}</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

/** Primary — main portfolio Work screen */
function PortfolioHomeImage({
  auraScreenshot,
  previewBackground = "#0a0a0a",
}: {
  auraScreenshot: string;
  previewBackground?: string;
}) {
  const projects = CASES.filter((c) =>
    ["aura-hair", "stretch-and-chill", "jewelry-store", "petcare-ai"].includes(c.id),
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: TEXT,
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Glow />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -40,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Left panel */}
      <div
        style={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          padding: "32px 28px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LogoMark size={32} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.04em" }}>NEO</div>
            <div style={{ fontSize: 9, color: MUTED }}>Studio Space</div>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
          Full-stack · AI engineering · Product design
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 36,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Selected Work
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 20 }}>
          {["Brief", "Work", "Services", "About"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 10,
                background: i === 1 ? "#fff" : "rgba(255,255,255,0.04)",
                color: i === 1 ? "#000" : MUTED,
                border: i === 1 ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 20, gap: 4 }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 12px",
                borderRadius: 8,
                borderLeft: i === 0 ? `2px solid ${p.accent}` : "2px solid transparent",
                background: i === 0 ? "rgba(255,255,255,0.04)" : "transparent",
              }}
            >
              <div style={{ fontSize: 13, color: i === 0 ? TEXT : MUTED }}>{p.title}</div>
              <div style={{ fontSize: 10, color: "#52525b", marginTop: 3 }}>{p.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — live preview */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 20, zIndex: 1 }}>
        <BrowserChrome domain="aurahair.sg">
          <SitePreview src={auraScreenshot} background={previewBackground} />
        </BrowserChrome>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>AURA Hair Space</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>Full-stack · AI · Beauty · Booking</div>
          </div>
          <div style={{ fontSize: 10, color: MUTED }}>Live preview</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          padding: "24px 36px 30px",
          background: "linear-gradient(180deg, transparent 0%, rgba(8,8,8,0.9) 40%, rgba(8,8,8,0.98) 100%)",
          zIndex: 2,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.03em" }}>
          Custom Fullstack Web Applications
        </div>
        <div style={{ marginTop: 8, fontSize: 15, color: "#a1a1aa", letterSpacing: "0.05em" }}>
          Next.js / Supabase / AI Integration · Live case studies
        </div>
      </div>
    </div>
  );
}

/** Case study screen — reusable layout */
function CaseStudyImage({
  project,
  screenshot,
}: {
  project: (typeof CASES)[number];
  screenshot: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: TEXT,
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Glow accent={project.glow} />

      <div
        style={{
          width: 340,
          display: "flex",
          flexDirection: "column",
          padding: "28px 24px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark size={28} />
          <div style={{ fontSize: 11, color: MUTED }}>Neo Studio Space · Case Study</div>
        </div>
        <div style={{ marginTop: 20, fontSize: 10, color: project.accent, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          {project.category}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 28,
            fontFamily: "Georgia, serif",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
          }}
        >
          {project.title}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: MUTED }}>{project.role}</div>
        <div style={{ marginTop: 14, fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
          {project.description}
        </div>

        <div style={{ marginTop: 16, fontSize: 10, color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Challenge
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: "#d4d4d8", lineHeight: 1.45 }}>{project.challenge}</div>

        <div style={{ marginTop: 12, fontSize: 10, color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Solution
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: "#d4d4d8", lineHeight: 1.45 }}>{project.solution}</div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                flex: 1,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600, color: project.accent }}>{m.value}</div>
              <div style={{ fontSize: 9, color: MUTED, marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, fontSize: 10, color: "#52525b" }}>{project.stack}</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 20px 20px 12px", zIndex: 1, minWidth: 0 }}>
        <BrowserChrome domain={project.domain}>
          <SitePreview
            src={screenshot}
            background={
              project.id === "jewelry-store"
                ? "#f5e8f0"
                : project.id === "petcare-ai"
                  ? "#f3efe7"
                  : "#0a0a0a"
            }
          />
        </BrowserChrome>
      </div>
    </div>
  );
}

async function renderPng(element: React.ReactElement, filename: string) {
  const res = new ImageResponse(element, { width: W, height: H });
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(join(OUT, filename), buf);
  console.log(`✓ ${filename}`);
}

async function buildPortfolioPdf(primaryPng: Buffer) {
  const pdf = await PDFDocument.create();
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const pageW = 595;
  const pageH = 842;
  const margin = 48;
  const contentW = pageW - margin * 2;
  const dark = rgb(0.03, 0.03, 0.03);
  const light = rgb(0.95, 0.95, 0.96);
  const muted = rgb(0.63, 0.63, 0.67);

  const cover = pdf.addPage([pageW, pageH]);
  cover.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: dark });
  cover.drawText("NEO STUDIO SPACE", { x: margin, y: pageH - 72, size: 26, font: bold, color: light });
  cover.drawText("Selected Work — Case Studies", {
    x: margin,
    y: pageH - 98,
    size: 14,
    font: regular,
    color: muted,
  });
  cover.drawText("Full-stack · AI engineering · Product design", {
    x: margin,
    y: pageH - 118,
    size: 11,
    font: regular,
    color: muted,
  });

  const intro = [
    "Live portfolio with embedded site previews — each project is a shipped product, not a mockup.",
    "Beauty, EdTech, luxury commerce, HealthTech AI, Telegram bots, and premium e-commerce.",
    "Stack: Next.js, TypeScript, Supabase, Stripe, OpenAI, Framer Motion, FastAPI.",
    "neostudio.space · t.me/neostudio_space",
  ];
  intro.forEach((line, i) => {
    cover.drawText(line, {
      x: margin,
      y: pageH - 148 - i * 18,
      size: 10,
      font: regular,
      color: rgb(0.72, 0.72, 0.75),
      maxWidth: contentW,
    });
  });

  const introBottom = pageH - 148 - (intro.length - 1) * 18 - 24;
  const coverImg = await pdf.embedPng(primaryPng);
  const coverFit = fitInBox(coverImg.width, coverImg.height, contentW, introBottom - margin);
  cover.drawImage(coverImg, {
    x: margin + (contentW - coverFit.width) / 2,
    y: introBottom - coverFit.height,
    width: coverFit.width,
    height: coverFit.height,
  });

  for (const c of CASES) {
    const page = pdf.addPage([pageW, pageH]);
    page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: dark });
    page.drawText(c.title.toUpperCase(), {
      x: margin,
      y: pageH - 56,
      size: 10,
      font: regular,
      color: muted,
    });
    page.drawText(c.title, { x: margin, y: pageH - 78, size: 20, font: bold, color: light });
    page.drawText(`${c.role} · ${c.category}`, {
      x: margin,
      y: pageH - 96,
      size: 10,
      font: regular,
      color: muted,
    });
    page.drawText(c.description, {
      x: margin,
      y: pageH - 118,
      size: 10,
      font: regular,
      color: rgb(0.75, 0.75, 0.78),
      maxWidth: contentW,
      lineHeight: 14,
    });

    page.drawText("CHALLENGE", { x: margin, y: pageH - 158, size: 9, font: bold, color: muted });
    page.drawText(c.challenge, {
      x: margin,
      y: pageH - 172,
      size: 9,
      font: regular,
      color: rgb(0.8, 0.8, 0.82),
      maxWidth: contentW,
      lineHeight: 12,
    });

    page.drawText("SOLUTION", { x: margin, y: pageH - 220, size: 9, font: bold, color: muted });
    page.drawText(c.solution, {
      x: margin,
      y: pageH - 234,
      size: 9,
      font: regular,
      color: rgb(0.8, 0.8, 0.82),
      maxWidth: contentW,
      lineHeight: 12,
    });

    page.drawText("STACK", { x: margin, y: pageH - 282, size: 9, font: bold, color: muted });
    page.drawText(c.stack, { x: margin, y: pageH - 296, size: 9, font: regular, color: muted });

    c.metrics.forEach((m, i) => {
      const x = margin + i * 160;
      page.drawText(m.value, { x, y: pageH - 326, size: 16, font: bold, color: light });
      page.drawText(m.label, { x, y: pageH - 342, size: 8, font: regular, color: muted });
    });

    const screenshotPath = join(SCREENSHOTS_DIR, `${c.id}.png`);
    const textBottom = pageH - 360;
    const screenshotBoxH = textBottom - margin - 12;

    if (existsSync(screenshotPath)) {
      const shotBuf = readFileSync(screenshotPath);
      const shot = await pdf.embedPng(shotBuf);
      const shotFit = fitInBox(shot.width, shot.height, contentW, screenshotBoxH);
      page.drawImage(shot, {
        x: margin + (contentW - shotFit.width) / 2,
        y: margin,
        width: shotFit.width,
        height: shotFit.height,
      });
    }

    page.drawText(c.domain, { x: margin, y: 16, size: 8, font: regular, color: rgb(0.45, 0.45, 0.48) });
  }

  writeFileSync(join(OUT, "fiverr-portfolio-neo-studio.pdf"), await pdf.save());
  console.log("✓ fiverr-portfolio-neo-studio.pdf");
}

async function buildCasesHighlightPdf(
  petcareShot: Buffer,
  jewelryShot: Buffer,
  petcareGigPng: Buffer,
  jewelryGigPng: Buffer,
) {
  const pdf = await PDFDocument.create();
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const pageW = 595;
  const pageH = 842;
  const margin = 48;
  const contentW = pageW - margin * 2;
  const dark = rgb(0.03, 0.03, 0.03);
  const light = rgb(0.95, 0.95, 0.96);
  const muted = rgb(0.63, 0.63, 0.67);

  const cases = [
    {
      title: "Case Study — PetCare AI",
      subtitle: "HealthTech · AI Product · B2B demo-ready MVP",
      raw: petcareShot,
      gig: petcareGigPng,
    },
    {
      title: "Case Study — Jellybead",
      subtitle: "Luxury commerce · Stripe · CMS catalog",
      raw: jewelryShot,
      gig: jewelryGigPng,
    },
  ];

  for (const item of cases) {
    const page = pdf.addPage([pageW, pageH]);
    page.drawRectangle({ x: 0, y: 0, width: pageW, height: pageH, color: dark });
    page.drawText(item.title, { x: margin, y: pageH - 56, size: 16, font: bold, color: light });
    page.drawText(item.subtitle, {
      x: margin,
      y: pageH - 74,
      size: 10,
      font: regular,
      color: muted,
    });

    const headerBottom = pageH - 92;
    const halfH = (headerBottom - margin * 2 - 16) / 2;

    const rawImg = await pdf.embedPng(item.raw);
    const rawFit = fitInBox(rawImg.width, rawImg.height, contentW, halfH);
    page.drawText("Live site screenshot", {
      x: margin,
      y: headerBottom - 12,
      size: 8,
      font: regular,
      color: muted,
    });
    page.drawImage(rawImg, {
      x: margin + (contentW - rawFit.width) / 2,
      y: headerBottom - 24 - rawFit.height,
      width: rawFit.width,
      height: rawFit.height,
    });

    const gigImg = await pdf.embedPng(item.gig);
    const gigFit = fitInBox(gigImg.width, gigImg.height, contentW, halfH);
    page.drawText("Portfolio case card", {
      x: margin,
      y: margin + halfH + 8,
      size: 8,
      font: regular,
      color: muted,
    });
    page.drawImage(gigImg, {
      x: margin + (contentW - gigFit.width) / 2,
      y: margin,
      width: gigFit.width,
      height: gigFit.height,
    });
  }

  writeFileSync(join(OUT, "fiverr-cases-selected-work.pdf"), await pdf.save());
  console.log("✓ fiverr-cases-selected-work.pdf");

  try {
    const { unlinkSync } = await import("node:fs");
    unlinkSync(join(OUT, "fiverr-services-pricing.pdf"));
    console.log("✓ removed fiverr-services-pricing.pdf");
  } catch {
    /* already gone */
  }
}

function requireScreenshot(projectId: string): string {
  const uri = loadScreenshotDataUri(projectId);
  if (!uri) {
    throw new Error(
      `Missing screenshot for ${projectId}. Run: npx tsx scripts/capture-case-screenshots.ts`,
    );
  }
  return uri;
}

async function main() {
  console.log("Generating Fiverr case-study assets → public/\n");

  const auraScreenshot = requireScreenshot("aura-hair");
  const petcareScreenshot = requireScreenshot("petcare-ai");
  const jewelryScreenshot = requireScreenshot("jewelry-store");
  const jewelryCase = getCaseById("jewelry-store");
  const petcareCase = getCaseById("petcare-ai");

  await renderPng(
    <PortfolioHomeImage auraScreenshot={auraScreenshot} />,
    "fiverr-gig-primary.png",
  );

  const auraLightScreenshot = requireScreenshot("aura-hair-light");
  await renderPng(
    <PortfolioHomeImage auraScreenshot={auraLightScreenshot} previewBackground="#faf7f2" />,
    "fiverr-gig-primary-light.png",
  );
  await renderPng(
    <CaseStudyImage project={petcareCase} screenshot={petcareScreenshot} />,
    "fiverr-gig-case-petcare.png",
  );
  await renderPng(
    <CaseStudyImage project={jewelryCase} screenshot={jewelryScreenshot} />,
    "fiverr-gig-case-jewelry.png",
  );

  const primaryBuf = readFileSync(join(OUT, "fiverr-gig-primary.png"));
  const casePetcareBuf = readFileSync(join(OUT, "fiverr-gig-case-petcare.png"));
  const caseJewelryBuf = readFileSync(join(OUT, "fiverr-gig-case-jewelry.png"));
  const petcareShotBuf = readFileSync(join(SCREENSHOTS_DIR, "petcare-ai.png"));
  const jewelryShotBuf = readFileSync(join(SCREENSHOTS_DIR, "jewelry-store.png"));

  await buildPortfolioPdf(primaryBuf);
  await buildCasesHighlightPdf(petcareShotBuf, jewelryShotBuf, casePetcareBuf, caseJewelryBuf);

  for (const old of [
    "fiverr-gig-glass-ui.png",
    "fiverr-gig-portfolio-mock.png",
    "fiverr-gig-cases-grid.png",
    "fiverr-gig-case-aura.png",
  ]) {
    try {
      const { unlinkSync } = await import("node:fs");
      unlinkSync(join(OUT, old));
      console.log(`✓ removed ${old}`);
    } catch {
      /* ok */
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
