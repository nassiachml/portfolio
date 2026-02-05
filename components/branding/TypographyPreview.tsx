"use client";

import { motion } from "framer-motion";

interface TypographyPreviewProps {
  name: string;
  fontFamily: string;
  description: string;
  examples: {
    text: string;
    size: string;
    weight: string;
  }[];
  index: number;
}

export default function TypographyPreview({
  name,
  fontFamily,
  description,
  examples,
  index,
}: TypographyPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 font-mono mb-2">{fontFamily}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="space-y-6">
        {examples.map((example, i) => (
          <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
            <p
              className="text-gray-900"
              style={{
                fontFamily: fontFamily,
                fontSize: example.size,
                fontWeight: example.weight,
                lineHeight: 1.2,
              }}
            >
              {example.text}
            </p>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              {example.size} / {example.weight}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
