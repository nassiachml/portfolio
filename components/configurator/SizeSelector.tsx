"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

const SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46];

export default function SizeSelector({
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300">Taille</label>
      <div className="grid grid-cols-5 gap-2">
        {SIZES.map((size) => (
          <motion.button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
              selectedSize === size
                ? "border-cyan-500 bg-cyan-900/20 text-cyan-400 shadow-lg shadow-cyan-900/30"
                : "border-dark-border bg-dark-card/50 text-gray-300 hover:border-cyan-600/50 hover:text-cyan-400"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {size}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
