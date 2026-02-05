"use client";

import { motion } from "framer-motion";
import { PackagingType, PACKAGING_PRICES } from "@/lib/product-pricing";
import { Package, Gift } from "lucide-react";

interface PackagingSelectorProps {
  selectedPackaging: PackagingType;
  onPackagingChange: (packaging: PackagingType) => void;
}

const PACKAGING_OPTIONS: {
  value: PackagingType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "standard",
    label: "Standard",
    description: "Emballage classique",
    icon: <Package size={20} />,
  },
  {
    value: "premium",
    label: "Premium",
    description: "Boîte + sac cadeau",
    icon: <Gift size={20} />,
  },
];

export default function PackagingSelector({
  selectedPackaging,
  onPackagingChange,
}: PackagingSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300">Packaging</label>
      <div className="grid grid-cols-2 gap-3">
        {PACKAGING_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onPackagingChange(option.value)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedPackaging === option.value
                ? "border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/30"
                : "border-dark-border bg-dark-card/50 hover:border-blue-600/50"
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-blue-400">{option.icon}</div>
              <h4 className="font-semibold text-white">{option.label}</h4>
            </div>
            <p className="text-xs text-gray-400 mb-2">{option.description}</p>
            {PACKAGING_PRICES[option.value] > 0 ? (
              <p className="text-sm font-bold text-blue-400">
                +{PACKAGING_PRICES[option.value].toLocaleString("fr-FR")} €
              </p>
            ) : (
              <p className="text-sm text-gray-500">Inclus</p>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
