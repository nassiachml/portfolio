"use client";

import { motion } from "framer-motion";
import { ProductColor, COLOR_HEX } from "@/lib/product-pricing";

interface ProductPreviewProps {
  color: ProductColor;
  material: string;
}

export default function ProductPreview({ color, material }: ProductPreviewProps) {
  const colorHex = COLOR_HEX[color];

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Fond avec gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surface via-dark-card to-dark-bg rounded-3xl" />
        
        {/* Sneaker SVG avec couleur dynamique */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full relative z-10"
          style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}
        >
          {/* Semelle */}
          <motion.path
            d="M80 320 Q100 340 150 340 L250 340 Q300 340 320 320 L320 380 L80 380 Z"
            fill="#2a2a2a"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Corps principal de la sneaker */}
          <motion.path
            d="M100 200 Q90 150 120 120 Q150 90 200 100 Q250 90 280 120 Q310 150 300 200 L300 280 Q290 300 250 310 L150 310 Q110 300 100 280 Z"
            fill={colorHex}
            stroke={color === "blanc" ? "#e5e5e5" : "none"}
            strokeWidth="2"
            initial={{ fill: COLOR_HEX.blanc }}
            animate={{ fill: colorHex }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Lanières */}
          {[140, 180, 220, 260].map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y={150 + i * 20}
              width="8"
              height="60"
              rx="4"
              fill={color === "blanc" ? "#000000" : color === "noir" ? "#FFFFFF" : "#000000"}
              opacity={0.3}
              initial={{ y: 150 + i * 20 - 20, opacity: 0 }}
              animate={{ y: 150 + i * 20, opacity: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            />
          ))}
          
          {/* Logo/Nike Swoosh style */}
          <motion.path
            d="M150 180 Q180 200 220 190 Q250 180 270 200"
            fill="none"
            stroke={color === "blanc" ? "#000000" : color === "noir" ? "#FFFFFF" : "#000000"}
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          
          {/* Détails */}
          <motion.circle
            cx="200"
            cy="240"
            r="15"
            fill={color === "blanc" ? "#000000" : color === "noir" ? "#FFFFFF" : "#000000"}
            opacity={0.2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />
        </svg>

        {/* Badge matériau */}
        <motion.div
          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-xl bg-black/40 border border-white/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs font-semibold text-white capitalize">
            {material.replace("-", " ")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
