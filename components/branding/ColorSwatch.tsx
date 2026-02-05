"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface ColorSwatchProps {
  name: string;
  hex: string;
  usage: string;
  index: number;
}

export default function ColorSwatch({ name, hex, usage, index }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
        <div
          className="h-32 w-full cursor-pointer relative"
          style={{ backgroundColor: hex }}
          onClick={copyToClipboard}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-700" />
              )}
            </motion.div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 font-mono mb-2">{hex}</p>
          <p className="text-xs text-gray-500">{usage}</p>
        </div>
      </div>
    </motion.div>
  );
}
