"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "@/lib/types";

interface BlessedAngelSimProps {
  language: Language;
}

const ITEMS: Record<
  Language,
  { name: string; tag: string; price: string }[]
> = {
  ru: [
    { name: "Кристальный Ангел", tag: "SIGNATURE", price: "₽ 12 400" },
    { name: "Neon Halo Charm", tag: "LIMITED", price: "₽ 8 900" },
    { name: "Void Chain Link", tag: "CORE", price: "₽ 6 200" },
    { name: "Prism Drop", tag: "NEW", price: "₽ 9 600" },
  ],
  en: [
    { name: "Crystal Angel", tag: "SIGNATURE", price: "$148" },
    { name: "Neon Halo Charm", tag: "LIMITED", price: "$106" },
    { name: "Void Chain Link", tag: "CORE", price: "$74" },
    { name: "Prism Drop", tag: "NEW", price: "$115" },
  ],
  am: [
    { name: "Բյուրեղային Հրեշտակ", tag: "SIGNATURE", price: "₽ 12 400" },
    { name: "Neon Halo Charm", tag: "LIMITED", price: "₽ 8 900" },
    { name: "Void Chain Link", tag: "CORE", price: "₽ 6 200" },
    { name: "Prism Drop", tag: "NEW", price: "₽ 9 600" },
  ],
};

const COLORS = ["#ffffff", "#c0c0c0", "#10b981", "#a78bfa", "#f43f5e"];

export function BlessedAngelSim({ language }: BlessedAngelSimProps) {
  const items = ITEMS[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  const labels =
    language === "ru"
      ? { brand: "BLESSED ANGEL", subtitle: "Digital Accessories", configure: "Конфигуратор", material: "Материал", add: "Добавить в коллекцию" }
      : language === "am"
        ? { brand: "BLESSED ANGEL", subtitle: "Թվային աքսեսուարներ", configure: "Կոնֆիգուրատոր", material: "Նյութ", add: "Ավելացնել հավաքածուին" }
        : { brand: "BLESSED ANGEL", subtitle: "Digital Accessories", configure: "Configurator", material: "Material", add: "Add to Collection" };

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <div className="flex h-full flex-col bg-black text-white">
      <header className="flex items-center justify-between border-b border-zinc-900 px-6 py-5">
        <div>
          <p className="font-serif text-lg tracking-[0.2em]">{labels.brand}</p>
          <p className="font-mono text-[9px] tracking-[0.4em] text-zinc-500 uppercase mt-0.5">
            {labels.subtitle}
          </p>
        </div>
        <Sparkles className="h-4 w-4 text-zinc-600" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center"
          >
            <span className="mb-4 font-mono text-[9px] tracking-[0.3em] text-emerald-500">
              {items[activeIndex].tag}
            </span>

            {/* Abstract accessory shape */}
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full border border-zinc-800"
              style={{ boxShadow: `0 0 60px ${COLORS[activeColor]}22` }}
            >
              <motion.div
                className="h-28 w-28 rounded-full border-2"
                style={{ borderColor: COLORS[activeColor] }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="absolute h-16 w-16 rounded-full"
                style={{ backgroundColor: `${COLORS[activeColor]}33` }}
              />
              <div
                className="absolute h-6 w-6 rounded-full"
                style={{ backgroundColor: COLORS[activeColor] }}
              />
            </div>

            <h2 className="mt-6 font-serif text-xl tracking-wide">
              {items[activeIndex].name}
            </h2>
            <p className="mt-1 font-mono text-sm text-zinc-400">
              {items[activeIndex].price}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-6">
          <button onClick={prev} className="text-zinc-500 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 transition-all ${
                  i === activeIndex ? "w-6 bg-white" : "w-2 bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="text-zinc-500 hover:text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <footer className="border-t border-zinc-900 px-6 py-5 space-y-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase mb-3">
            {labels.material}
          </p>
          <div className="flex gap-3">
            {COLORS.map((color, i) => (
              <motion.button
                key={color}
                onClick={() => setActiveColor(i)}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  i === activeColor ? "border-white scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
        <motion.button
          className="w-full border border-white py-3 font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {labels.add}
        </motion.button>
      </footer>
    </div>
  );
}
