"use client";



import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

import type { ServiceItem } from "@/lib/i18n/services";

import type { ServicesCopy } from "@/lib/i18n/services";



interface ServiceCardProps {

  item: ServiceItem;

  copy: ServicesCopy;

  accent: string;

  featured?: boolean;

}



export function ServiceCard({

  item,

  copy,

  accent,

  featured = false,

}: ServiceCardProps) {

  return (

    <motion.article

      layout

      className={`bento-cell flex flex-col p-6 lg:p-7 ${

        featured ? "bento-pink" : "bento-white"

      }`}

    >

      <div className="flex items-start justify-between gap-4">

        <h3 className={`text-lg font-bold tracking-[-0.02em] ${featured ? "text-white" : "text-ink"}`}>

          {item.name}

        </h3>

        <p className={`shrink-0 text-xl font-bold ${featured ? "text-white" : ""}`} style={featured ? undefined : { color: accent }}>

          {item.price}

        </p>

      </div>



      {item.audience && (

        <p className={`mt-2 text-[13px] ${featured ? "text-white/70" : "text-muted"}`}>

          {item.audience}

        </p>

      )}



      <p className={`mt-4 flex-1 text-[14px] leading-relaxed ${featured ? "text-white/80" : "text-muted"}`}>

        {item.description}

      </p>



      {item.timeline && (

        <p className={`mt-3 text-[12px] font-semibold ${featured ? "text-white/50" : "text-faint"}`}>

          {copy.timeline}: {item.timeline}

        </p>

      )}



      <ul className={`mt-4 space-y-1.5 text-[13px] ${featured ? "text-white/85" : "text-muted"}`}>

        {item.deliverables.slice(0, 4).map((line) => (

          <li key={line} className="flex gap-2">

            <span className="text-accent">·</span>

            {line}

          </li>

        ))}

      </ul>



      <a

        href={SITE_CONFIG.bookingUrl}

        target="_blank"

        rel="noopener noreferrer"

        className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${

          featured

            ? "bg-white text-accent hover:bg-white/95"

            : "btn-outline !px-4 !py-2"

        }`}

      >

        {copy.bookCall}

        <ArrowUpRight className="h-3.5 w-3.5" />

      </a>

    </motion.article>

  );

}


