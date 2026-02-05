"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface Color {
  name: string;
  hex: string;
  usage: string;
}

interface ColorPaletteProps {
  colors: Color[];
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colors.map((color, index) => (
        <motion.div
          key={color.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="group"
        >
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-500">
            <div
              className="h-40 w-full cursor-pointer relative overflow-hidden"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyToClipboard(color.hex, index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/0 group-hover:from-white/5 group-hover:to-black/5 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-700" />
                  )}
                </motion.div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{color.name}</h3>
              <p className="text-sm text-gray-500 font-mono mb-3">{color.hex}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{color.usage}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
