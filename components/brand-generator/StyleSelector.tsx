"use client";

import { motion } from "framer-motion";
import { BrandStyle, STYLE_INFO } from "@/lib/nameGenerator";

interface StyleSelectorProps {
  selectedStyle: BrandStyle;
  onStyleChange: (style: BrandStyle) => void;
}

export default function StyleSelector({
  selectedStyle,
  onStyleChange,
}: StyleSelectorProps) {
  return (
    <div className="space-y-6">
      <label className="text-xs font-light text-gray-400 uppercase tracking-wider">
        Style de marque
      </label>
      <div className="flex flex-wrap gap-4">
        {(Object.keys(STYLE_INFO) as BrandStyle[]).map((style, index) => {
          const info = STYLE_INFO[style];
          const isSelected = selectedStyle === style;

          return (
            <motion.button
              key={style}
              onClick={() => onStyleChange(style)}
              className={`px-8 py-3 border transition-all text-sm font-light uppercase tracking-wider ${
                isSelected
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {info.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
