"use client";

import { motion } from "framer-motion";

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
}

export default function KeywordInput({
  value,
  onChange,
  onGenerate,
}: KeywordInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onGenerate();
    }
  };

  return (
    <div className="space-y-6">
      <label className="text-xs font-light text-gray-400 uppercase tracking-wider">
        Mot-clé
      </label>
      <div className="flex gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Entrez un mot-clé..."
          className="flex-1 px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors text-2xl font-light tracking-wide"
        />
        <motion.button
          onClick={onGenerate}
          disabled={!value.trim()}
          className="px-12 py-4 bg-white text-black font-light text-sm uppercase tracking-wider hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Générer
        </motion.button>
      </div>
    </div>
  );
}
