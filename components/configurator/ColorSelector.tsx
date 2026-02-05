"use client";

import { motion } from "framer-motion";
import { ProductColor, COLOR_HEX } from "@/lib/product-pricing";

interface ColorSelectorProps {
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
}

const COLORS: { value: ProductColor; label: string }[] = [
  { value: "blanc", label: "Blanc" },
  { value: "noir", label: "Noir" },
  { value: "beige", label: "Beige" },
  { value: "rouge", label: "Rouge" },
];

export default function ColorSelector({
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300">
        Couleur principale
      </label>
      <div className="grid grid-cols-4 gap-3">
        {COLORS.map((color) => (
          <motion.button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedColor === color.value
                ? "border-bordeaux-500 bg-bordeaux-900/20 shadow-lg shadow-bordeaux-900/30"
                : "border-dark-border bg-dark-card/50 hover:border-bordeaux-600/50"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-full h-12 rounded-lg mb-2"
              style={{ backgroundColor: COLOR_HEX[color.value] }}
            />
            <p className="text-xs font-medium text-center text-gray-300">
              {color.label}
            </p>
            {selectedColor === color.value && (
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-bordeaux flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
