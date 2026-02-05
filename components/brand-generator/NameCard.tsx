"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface NameCardProps {
  name: string;
  index: number;
  styleColor: string;
}

export default function NameCard({ name, index, styleColor }: NameCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="group relative"
    >
      <div
        className="p-8 border-b border-white/10 transition-all cursor-pointer hover:border-white/30"
        onClick={handleCopy}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-light text-white tracking-wide">
            {name}
          </h3>
          <motion.button
            className="p-2 text-white/40 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            {copied ? (
              <Check className="text-white" size={18} />
            ) : (
              <Copy size={18} />
            )}
          </motion.button>
        </div>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-4 right-16 text-xs text-white/60 font-light uppercase tracking-wider"
          >
            Copié
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
