"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ProductConfig,
  calculateProductPrice,
  formatPrice,
} from "@/lib/product-pricing";
import { ShoppingCart, Check } from "lucide-react";

interface PriceSummaryProps {
  config: ProductConfig;
  totalPrice: number;
}

export default function PriceSummary({
  config,
  totalPrice,
}: PriceSummaryProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 30 });
  const displayPrice = useTransform(spring, (value) => Math.round(value));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.set(totalPrice);
  }, [totalPrice, spring]);

  useEffect(() => {
    const unsubscribe = displayPrice.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [displayPrice]);

  const selectedOptions = [
    config.logo && "Logo brodé",
    config.text && "Texte personnalisé",
    config.sole && "Semelle renforcée",
  ].filter(Boolean);

  const materialLabels = {
    toile: "Toile standard",
    "cuir-synthetique": "Cuir synthétique",
    "cuir-premium": "Cuir premium",
  };

  const colorLabels = {
    blanc: "Blanc",
    noir: "Noir",
    beige: "Beige",
    rouge: "Rouge",
  };

  const packagingLabels = {
    standard: "Standard",
    premium: "Premium (boîte + sac)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 sticky top-24"
    >
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Produit</p>
          <p className="font-semibold text-white">Sneakers Streetwear</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Couleur</p>
          <p className="font-semibold text-white">{colorLabels[config.color]}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Taille</p>
          <p className="font-semibold text-white">{config.size}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Matière</p>
          <p className="font-semibold text-white">
            {materialLabels[config.material]}
          </p>
        </div>

        {selectedOptions.length > 0 && (
          <div>
            <p className="text-sm text-gray-400 mb-2">Options sélectionnées</p>
            <div className="space-y-1">
              {selectedOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="text-emerald-400" size={14} />
                  <span>{option}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-400 mb-1">Packaging</p>
          <p className="font-semibold text-white">
            {packagingLabels[config.packaging]}
          </p>
        </div>
      </div>

      <div className="pt-6 border-t-2 border-bordeaux-500/30">
        <p className="text-sm text-gray-400 mb-2">Prix total</p>
        <motion.p
          className="text-4xl font-bold text-gradient mb-6"
          key={totalPrice}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {formatPrice(displayValue)}
        </motion.p>

        <motion.button
          className="w-full px-6 py-4 bg-gradient-bordeaux rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-bordeaux-900/50 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart size={20} />
          <span>Ajouter au panier</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
