"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import type { Language } from "@/lib/types";

interface JewelryStoreSimProps {
  language: Language;
}

const PRODUCTS: Record<
  Language,
  { name: string; material: string; price: string }[]
> = {
  ru: [
    { name: "Арка Вечности", material: "18K White Gold · Diamond 1.2ct", price: "₽ 284 000" },
    { name: "Линия Бесконечности", material: "Platinum · Emerald 0.8ct", price: "₽ 196 000" },
    { name: "Тень Луны", material: "18K Rose Gold · Onyx", price: "₽ 142 000" },
    { name: "Пульс Света", material: "White Gold · Sapphire 1.5ct", price: "₽ 318 000" },
  ],
  en: [
    { name: "Arch of Eternity", material: "18K White Gold · Diamond 1.2ct", price: "$3,400" },
    { name: "Line of Infinity", material: "Platinum · Emerald 0.8ct", price: "$2,350" },
    { name: "Moon Shadow", material: "18K Rose Gold · Onyx", price: "$1,700" },
    { name: "Pulse of Light", material: "White Gold · Sapphire 1.5ct", price: "$3,800" },
  ],
  am: [
    { name: "Հավերժության Շուք", material: "18K White Gold · Diamond 1.2ct", price: "₽ 284 000" },
    { name: "Անսահմանության Գիծ", material: "Platinum · Emerald 0.8ct", price: "₽ 196 000" },
    { name: "Լուսնի Ստվեր", material: "18K Rose Gold · Onyx", price: "₽ 142 000" },
    { name: "Լույսի Պուլս", material: "White Gold · Sapphire 1.5ct", price: "₽ 318 000" },
  ],
};

export function JewelryStoreSim({ language }: JewelryStoreSimProps) {
  const products = PRODUCTS[language];
  const [hovered, setHovered] = useState<number | null>(null);

  const labels =
    language === "ru"
      ? { brand: "Jellybead", collection: "Коллекция SS26", view: "Смотреть" }
      : language === "am"
        ? { brand: "Jellybead", collection: "SS26 Հավաքածու", view: "Դիտել" }
        : { brand: "Jellybead", collection: "SS26 Collection", view: "View" };

  return (
    <div className="h-full overflow-y-auto bg-[#050505] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-900/80 bg-[#050505]/90 px-8 py-6 backdrop-blur-sm">
        <div>
          <p className="font-serif text-2xl tracking-[0.15em]">{labels.brand}</p>
          <p className="font-mono text-[9px] tracking-[0.4em] text-zinc-600 uppercase mt-1">
            {labels.collection}
          </p>
        </div>
        <Diamond className="h-5 w-5 text-zinc-700" />
      </header>

      <div className="grid grid-cols-2 gap-px bg-zinc-900 p-px">
        {products.map((product, index) => (
          <motion.article
            key={product.name}
            className="group relative bg-[#050505] p-6 cursor-pointer"
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ backgroundColor: "#0a0a0a" }}
          >
            {/* Geometric product placeholder */}
            <div className="relative mb-6 flex h-36 items-center justify-center overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: hovered === index ? 1.08 : 1,
                  rotate: hovered === index ? 5 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="h-24 w-24 rotate-45 border border-zinc-700" />
                <div className="absolute h-16 w-16 rotate-45 border border-zinc-600" />
                <div className="absolute h-8 w-8 bg-zinc-800" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"
                animate={{ opacity: hovered === index ? 0.5 : 1 }}
              />
            </div>

            <h3 className="font-serif text-sm tracking-wide">{product.name}</h3>
            <p className="mt-1 font-mono text-[9px] text-zinc-600 tracking-wide">
              {product.material}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-300">{product.price}</span>
              <motion.span
                className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: hovered === index ? 0 : -4 }}
              >
                {labels.view} →
              </motion.span>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-px bg-white"
              initial={{ width: 0 }}
              animate={{ width: hovered === index ? "100%" : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.article>
        ))}
      </div>
    </div>
  );
}
