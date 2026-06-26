"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { DeviceType, ProjectId } from "@/lib/types";
import { getProjectMeta } from "@/lib/projects";
import { getProjectTheme } from "@/lib/project-themes";
import { isDesktopSiteProject } from "@/lib/types";

interface DeviceFrameProps {
  device: DeviceType;
  projectId: ProjectId;
  isMobile?: boolean;
  openSiteLabel?: string;
  openSiteUrl?: string;
  children: React.ReactNode;
}

export function DeviceFrame({
  device,
  projectId,
  isMobile = false,
  openSiteLabel,
  openSiteUrl,
  children,
}: DeviceFrameProps) {
  const meta = getProjectMeta(projectId);
  const isPhone = device === "phone";
  const isDesktopSite = isDesktopSiteProject(meta);
  const theme = getProjectTheme(projectId);

  if (isDesktopSite) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
        <motion.div
          className={`flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#1a1a1a] ring-1 ring-white/[0.08] ${
            isMobile ? "rounded-xl" : "rounded-lg"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          key={projectId}
          style={{
            boxShadow: isMobile
              ? "0 12px 32px -16px rgba(0,0,0,0.8)"
              : "0 20px 50px -20px rgba(0,0,0,0.7)",
          }}
        >
          <div
            className={`flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#141414] ${
              isMobile ? "h-9 px-3" : "h-8 gap-3 px-4"
            }`}
          >
            <div className="flex gap-1.5">
              <span className="h-[8px] w-[8px] rounded-full bg-[#ff5f57] lg:h-[10px] lg:w-[10px]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#febc2e] lg:h-[10px] lg:w-[10px]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#28c840] lg:h-[10px] lg:w-[10px]" />
            </div>
            <div className="flex h-5 min-w-0 flex-1 items-center justify-center rounded-md bg-black/50 px-2">
              <span className="truncate text-[10px] text-zinc-500 lg:text-[11px]">
                {meta.browserLabel}
              </span>
            </div>
            {openSiteUrl && openSiteLabel && (
              <a
                href={openSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.08] px-2 py-1 text-[10px] text-zinc-400 transition-colors hover:text-zinc-200"
              >
                {openSiteLabel}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col bg-[#0a0a0a]">
            {children}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center perspective-[1200px]">
      <motion.div
        className={`relative ${
          isPhone
            ? "h-[min(56dvh,560px)] w-[min(270px,92vw)] lg:h-[min(76vh,660px)] lg:w-[min(300px,80%)]"
            : "h-[min(60vh,480px)] w-full max-w-full lg:h-[min(68vh,560px)] lg:max-w-[860px]"
        }`}
        initial={{ opacity: 0, y: 24, rotateX: 2 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        key={`${device}-${projectId}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute -inset-8 -z-10 rounded-[3rem] blur-3xl transition-all duration-700"
          style={{ backgroundColor: theme.glow }}
        />

        <div
          className={`relative flex h-full flex-col overflow-hidden bg-[#0e0e0e] ${
            isPhone ? "rounded-[2.25rem]" : "rounded-xl"
          }`}
          style={{
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.08),
              0 2px 4px rgba(0,0,0,0.2),
              0 24px 48px -12px rgba(0,0,0,0.65),
              0 48px 96px -24px rgba(0,0,0,0.4)
            `,
          }}
        >
          {isPhone ? (
            <>
              <div className="flex h-10 shrink-0 items-center justify-center">
                <div className="h-[22px] w-[72px] rounded-full bg-black" />
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
                {children}
              </div>
              <div className="flex h-7 shrink-0 items-center justify-center">
                <div className="h-[4px] w-[100px] rounded-full bg-white/25" />
              </div>
            </>
          ) : (
            <>
              <div className="flex h-9 shrink-0 items-center border-b border-white/[0.05] px-4">
                <div className="flex gap-[7px]">
                  <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
                {children}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
