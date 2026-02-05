"use client";

import { motion } from "framer-motion";
import { BrandStyle, STYLE_INFO } from "@/lib/nameGenerator";
import NameCard from "./NameCard";
import { RefreshCw } from "lucide-react";

interface ResultsGridProps {
  names: string[];
  style: BrandStyle;
  onRegenerate: () => void;
}

export default function ResultsGrid({ names, style, onRegenerate }: ResultsGridProps) {
  const styleColor = STYLE_INFO[style].color;

  if (names.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-xs font-light text-gray-400 uppercase tracking-wider mb-2">
            Résultats
          </h2>
          <p className="text-sm text-white/60 font-light">
            {names.length} nom{names.length > 1 ? "s" : ""} généré{names.length > 1 ? "s" : ""}
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all text-xs font-light uppercase tracking-wider"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRegenerate}
        >
          <RefreshCw size={14} />
          Régénérer
        </motion.button>
      </div>
      <div className="space-y-0">
        {names.map((name, index) => (
          <NameCard
            key={`${name}-${index}`}
            name={name}
            index={index}
            styleColor={styleColor}
          />
        ))}
      </div>
    </motion.div>
  );
}
