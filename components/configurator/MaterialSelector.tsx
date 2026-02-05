"use client";

import { motion } from "framer-motion";
import { ProductMaterial, MATERIAL_PRICES } from "@/lib/product-pricing";

interface MaterialSelectorProps {
  selectedMaterial: ProductMaterial;
  onMaterialChange: (material: ProductMaterial) => void;
}

const MATERIALS: { value: ProductMaterial; label: string; icon: string }[] = [
  { value: "toile", label: "Toile standard", icon: "🧵" },
  { value: "cuir-synthetique", label: "Cuir synthétique", icon: "👜" },
  { value: "cuir-premium", label: "Cuir premium", icon: "✨" },
];

export default function MaterialSelector({
  selectedMaterial,
  onMaterialChange,
}: MaterialSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-300">Matière</label>
      <div className="space-y-2">
        {MATERIALS.map((material) => (
          <motion.button
            key={material.value}
            onClick={() => onMaterialChange(material.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              selectedMaterial === material.value
                ? "border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-900/30"
                : "border-dark-border bg-dark-card/50 hover:border-purple-600/50"
            }`}
            whileHover={{ scale: 1.01, x: 5 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{material.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{material.label}</h4>
                </div>
              </div>
              <div className="text-right">
                {MATERIAL_PRICES[material.value] > 0 ? (
                  <span className="text-sm font-bold text-purple-400">
                    +{MATERIAL_PRICES[material.value].toLocaleString("fr-FR")} €
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">Inclus</span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
